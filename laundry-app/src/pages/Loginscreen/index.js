import tw from 'twrnc';
import React, { useEffect } from 'react';
import {halamanDepan} from '../../assets/images';
import {  Text, View, TouchableOpacity, BackHandler, Alert,Image, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
    if (user == "admin") {
      navigation.navigate('Qrcodescreen');
    }else  if (user == "owner") {
      navigation.navigate('Statisticscreen');
    }
  };

  

  return (
    <View style={tw`flex-1`}>
      <ImageBackground source={halamanDepan} style={tw`w-100 h-100`}>

      <View style={{  height:900,backgroundColor:"white",borderRadius:20,marginTop:380 }} >
        <Text style={{marginTop:50,fontSize:20,fontWeight:200,marginStart:30,fontStyle:"italic" }}>Hallo, Siapa Anda??</Text>
        <View style={{ marginTop:40,flexDirection:"row" }}>
        <View>
        <TouchableOpacity style={{ backgroundColor:"green",marginHorizontal:40,paddingHorizontal:20,paddingVertical:10,borderRadius:30}} onPress={() => navigateToHome("admin")}>
                  <Text style={tw`text-white text-sm font-semibold italic`}><AntDesign name="user" size={20} color="black" />  Admin</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={{ backgroundColor:"gray",marginHorizontal:20,paddingHorizontal:20,paddingVertical:10,borderRadius:30}} onPress={() => navigateToHome("owner")}>
                  <Text style={tw`text-white text-sm font-semibold italic`}><AntDesign name="user" size={20} color="black" />  Owner</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
      </ImageBackground>
    </View>
  );
};

export default Loginscreen
;
