const { User } = require("../models");
const {isConnected,fileSock} = require("../wa_confic")
const { format } = require("date-fns");
const { Op } = require('sequelize');
const { sequelize } = require('../models'); 
const Redis = require("ioredis");
const redis = new Redis({
  host: 'localhost', 
  port: 6379, 
});

class UserController {
  static async users(req, res, next) {
    try {

      let response;
      let option = {
        order: [["id", "DESC"]],
        where: {
          username: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        attributes: {
            exclude: ["password"],
          },
      };

      if (req.query.search) {
        console.log("masuk if search");
        response = await User.findAll(option);
      }else{
        console.log("masuk tidak if search");
        const userCache = await redis.get("app:users");
        if (!userCache) {
          let users = await User.findAll();
          await redis.set("app:users", JSON.stringify(users));
          response = users;
        }else {
          response = JSON.parse(userCache);
        }
      }



      res.status(200).json({
        message: "all users",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async userById(req, res, next) {
    try {
      const { id } = req.params;
      let option = {
        attributes: {
          exclude: ["password"],
        },
      };
      let user = await User.findByPk(id, option);

      if (!user) throw { name: "notFound" };

      res.status(200).json({
        message: "detail user",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userAdd(req, res, next) {
    let transaction;
    try {
      if (isConnected) {
          const {
            username,
            phoneNumber,
          } = req.body;


          let numberWA = phoneNumber;
          let currentTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
          let pesan = `Halo ${username},

Kami telah membuat akun mu di laundry kami dengan nomer wa ${phoneNumber}, pada waktu ${currentTime}

Salam hangat,
Tim laundry citra jaya`;

          numberWA = '62' + numberWA.substring(1) + "@s.whatsapp.net";
          const exists = await fileSock().onWhatsApp(numberWA);

          if (exists?.jid || (exists && exists[0]?.jid)) {
              transaction = await sequelize.transaction(); // Mulai transaksi basis data


              let newUser =  await User.create({
                username,
                phoneNumber,
              }, {
                  transaction,
              });

              // Kirim pesan dan tunggu responsenya
              await fileSock().sendMessage(exists.jid || exists[0].jid, { text: pesan });

            
              // Commit transaksi jika semua operasi berhasil
              await transaction.commit();

              await redis.del("app:users");
              res.status(201).json(
                {
                  message: "User has been created successfully",
                },
              );

          } else {
              throw { name: "notListed" };
          }
      } else {
          throw { name: "notConnected" };
      }
  } catch (error) {
      if (transaction) await transaction.rollback(); 
      console.error("Error updating user status:", error);
      next(error);
  }
  }

  static async userDelete(req, res, next) {
    try {
      const { id } = req.params;

      let user = await User.findByPk(id);

      if (!user) throw { name: "notFound" };

      await user.destroy({ where: { id } });
      await redis.del("app:users");
      await redis.del("app:requests");
      res.status(200).json(
        {
          massage: `user with id ${user.id} success to delete`,
        },
      );
    } catch (error) {
      next(error);
    }
  }

  static async userUpdate(req, res, next) {
    let transaction;
    try {
      if (isConnected) {
      const { id } = req.params;


      const {
        username,
        phoneNumber,
      } = req.body;

      let user = await User.findByPk(id);

      if (!user) throw { name: "notFound" };

      let option = {
            where: { id }
      };


      let numberWA = phoneNumber;
      let currentTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
      let pesan = `Halo ${username},

Kami telah membuat akun mu di laundry kami dengan nomer wa ${phoneNumber}, pada waktu ${currentTime}

Salam hangat,
Tim laundry citra jaya`;

numberWA = '62' + numberWA.substring(1) + "@s.whatsapp.net";
const exists = await fileSock().onWhatsApp(numberWA);

if (exists?.jid || (exists && exists[0]?.jid)) {
    transaction = await sequelize.transaction();
  

      await user.update({
        username,
        phoneNumber,
      },option,{
        transaction,
    });


        // Kirim pesan dan tunggu responsenya
        await fileSock().sendMessage(exists.jid || exists[0].jid, { text: pesan });

        await transaction.commit();

        await redis.del("app:users");
        await redis.del("app:requests");
        res.status(200).json({
          massage: `user success to update`,
        });

  
      } else {
        throw { name: "notListed" };
    }
  }else{
    throw { name: "notConnected" };
  }
      
    } catch (error) {
      next(error);
    }
  }


}

module.exports = UserController;
