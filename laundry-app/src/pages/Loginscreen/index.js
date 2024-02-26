import tw from 'twrnc';
import React, { useEffect } from 'react';
import {  Text, View, TouchableOpacity, BackHandler, Alert } from 'react-native';

const Loginscreen
 = ({navigation}) => {

  // Di dalam komponen Anda
useEffect(() => {
  const backAction = () => {
    Alert.alert("Konfirmasi", "Apakah Anda ingin keluar dari aplikasi?", [
      {
        text: "Tidak",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Ya", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
}, []);

const navigateToHome = (user) => {
  console.log(user);
    if (user == "admin") {
      navigation.navigate('Qrcodescreen');
    }else  if (user == "owner") {
      navigation.navigate('Statisticscreen');
    }
  };

  

  return (
    <View style={tw`flex-1 bg-white justify-center items-center bg-lime-400`}>
      <View>
          <View style={tw`rounded-lg p-5 shadow-md`}>
            {/* Tombol-tombol aksi */}
            <View style={tw`mb-5`}>
              <TouchableOpacity style={tw`bg-blue-500 rounded p-2 flex-row items-center mb-5`} onPress={() => navigateToHome("admin")}>
                <Text style={tw`text-white text-sm font-semibold mr-1`}>admin</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`mt-5 bg-white`}>
              <TouchableOpacity style={tw`bg-green-500 rounded p-2 flex-row items-center`} onPress={() => navigateToHome("owner")}>
                <Text style={tw`text-white text-sm font-semibold mr-1`}>owner</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Tambahkan card pesanan lainnya di sini */}
        </View>
    </View>
  );
};

export default Loginscreen
;
