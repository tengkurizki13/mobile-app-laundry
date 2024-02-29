const { Request,User,Track } = require("../models");
const { Op } = require('sequelize');
const { format } = require("date-fns");
const { Sequelize } = require('sequelize');

class RequestController {
  static async getStatusSummary(status, option = {}) {
    // Tambahkan opsi filter ke dalam query
    if (option.where === undefined) {
      option.where = { status: status };
    } else {
      option.where.status = status;
    }
  
    const summary = await Request.findOne({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('price')), 'totalPrice'],
        [Sequelize.fn('sum', Sequelize.col('scale')), 'totalScale'],
        [Sequelize.fn('count', Sequelize.col('id')), 'totalCount']
      ],
      ...option // Gunakan opsi filter
    });
  
    return summary.toJSON();
  }
  
  static async getAllStatusSummary(option = {}) {
    const statusList = ['proses', 'penimbangan', 'pencucian', 'pengeringan', 'pengemasan', 'pembayaran', 'selesai'];
    const summaryData = {};
  
    for (const status of statusList) {
      summaryData[status] = await RequestController.getStatusSummary(status, option);
    }
  
    return summaryData;
  }
  
  static async requests(req, res, next) {
    try {
      let option = {};
  
      // Jika ada query startDate dan endDate, tambahkan filter waktu
      if (req.query.startDate && req.query.endDate) {
        option.where = {
          createdAt: {
            [Op.between]: [
              format(new Date(req.query.startDate), 'yyyy-MM-dd'),
              format(new Date(req.query.endDate), 'yyyy-MM-dd 23:59:59')
            ]
          }
        };
      }
  
      // Mengambil summary untuk semua status dengan opsi filter
      const summaryData = await RequestController.getAllStatusSummary(option);
  
      // Mengirimkan hasil akhir sebagai respons
        res.status(200).json({
        message: "berhasil get data dashboard",
        data : [
          {
              totalpembayaran : summaryData.proses.totalPrice || 0,
              jumlahOrder : summaryData.proses.totalCount || 0,
              jumlahTimbangan : summaryData.proses.totalScale || 0,
              typeStatus : "proses"
          },
          {
              totalpembayaran : summaryData.penimbangan.totalPrice || 0,
              jumlahOrder : summaryData.penimbangan.totalCount || 0,
              jumlahTimbangan : summaryData.penimbangan.totalScale || 0,
              typeStatus : "penimbangan"
          },
          { 
              totalpembayaran : summaryData.pencucian.totalPrice || 0,
              jumlahOrder : summaryData.pencucian.totalCount || 0,
              jumlahTimbangan : summaryData.pencucian.totalScale || 0,
              typeStatus : "pencucian"
          },
          {
              totalpembayaran : summaryData.pengeringan.totalPrice || 0,
              jumlahOrder : summaryData.pengeringan.totalCount || 0,
              jumlahTimbangan : summaryData.pengeringan.totalScale || 0,
              typeStatus : "pengeringan"
          },
          {
              totalpembayaran : summaryData.pengemasan.totalPrice || 0,
              jumlahOrder : summaryData.pengemasan.totalCount || 0,
              jumlahTimbangan : summaryData.pengemasan.totalScale || 0,
              typeStatus : "pengemasan"
          },
          {
              totalpembayaran : summaryData.pembayaran.totalPrice || 0,
              jumlahOrder : summaryData.pembayaran.totalCount || 0,
              jumlahTimbangan : summaryData.pembayaran.totalScale || 0,
              typeStatus : "pembayaran"
          },
          {
              totalpembayaran : summaryData.selesai.totalPrice || 0,
              jumlahOrder : summaryData.selesai.totalCount || 0,
              jumlahTimbangan : summaryData.selesai.totalScale || 0,
              typeStatus : "selesai"
         }
        ]
        // Tambahkan hasil dari status lainnya jika diperlukan
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  
  
}

module.exports = RequestController;
