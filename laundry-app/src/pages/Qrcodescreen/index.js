import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { View, Text, Image, ScrollView,Alert } from 'react-native';
import tw from 'twrnc';

const Qrcodescreen = ({navigation}) => {
  const [qrCodeSrc, setQrCodeSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const socket = io('https://82g27vh3-3000.asse.devtunnels.ms');

    socket.on('qr', (src) => {
      setQrCodeSrc(src);
      setIsLoading(false);
    });

    socket.on('qrstatus', (src) => {
      setQrCodeSrc(src);
      setIsLoading(true);
    });

    socket.on('log', (log) => {
      console.log(log);
      if (log == "connected") {
        navigation.navigate("MainApp")
      }else if(log == "scan"){
        Alert.alert(
          'tolong scan dulu ya!!!',
        );
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={tw`flex-grow items-center justify-center bg-blue-200`}>
      <View style={tw`max-w-md bg-white rounded-md overflow-hidden shadow-md p-4 m-4`}>
        <Text style={tw`bg-green-600 text-white font-bold text-center py-4 mb-4 text-lg`}>WhatsApp API QR</Text>
        <View style={tw`items-center`}>
          {isLoading ? (
            <Text style={tw`text-center`}>Memuat...</Text>
          ) : (
            <Image source={{ uri: qrCodeSrc }} style={tw`w-60 h-60 mb-8`} />
          )}
        </View>
        <View style={tw`bg-gray-100 p-4 rounded-md mb-4`}>
          <Text style={tw`text-gray-800 font-semibold mb-2 text-center`}>Panduan</Text>
          <Text style={tw`text-gray-700 text-sm text-center`}>
            - Scan kode QR berikut dengan aplikasi WhatsApp anda, sebagaimana Whatsapp Web biasanya.
          </Text>
          <Text style={tw`text-gray-700 text-sm text-center`}>
            - Sesi Whatsapp Web yang aktif akan keluar, diganti dengan server ini.
          </Text>
          <Text style={tw`text-gray-700 text-sm text-center font-bold`}>
            Gunakan dengan bijak.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Qrcodescreen;
