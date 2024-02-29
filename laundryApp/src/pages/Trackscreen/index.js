import React from 'react';
import { View, Text, ScrollView,TouchableOpacity,Image } from 'react-native';
import { format } from 'date-fns';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../../store/actions/actionCreator';
import tw from 'twrnc';
import {loader} from '../../assets/images';

const Trackscreen = ({ route,navigation }) => {
  // Simulasi data track
  const { id } = route.params;
  const dispatch = useDispatch()
  const {tracks} = useSelector(((state) => state.track))
  const[loading,setLoading] = useState(true)


  useEffect(() => {
    // contional to cek id form params
    if(id) {
        dispatch(fetchTracks(id))
        .then(() => {
          setLoading(false)
        })
      }
    },[])

    const handleCancel = () => {
      navigation.navigate('Homescreen');
    };
  

    if (loading) {
      return (
        <View style={tw`flex-1 bg-white justify-center items-center`}>
        <Image source={loader} style={tw`w-10 h-10`} />
        <Text style={tw`font-semibold text-white`}>Memuat ____ ...............</Text>
        </View>
      )
    }

  return (
    <ScrollView contentContainerStyle={tw`bg-gray-100 p-4 flex-grow bg-teal-200`}>
      <View style={tw`bg-white p-4 rounded-md mt-5`}>
        <View style={tw`flex-row justify-between my-4`}>
          <View style={tw`flex-1 mr-2 mb-5`}>
            <Text style={tw`text-sm text-gray-500`}>Date</Text>
            <Text>{format(new Date(tracks[0].Request.createdAt), 'dd MMM yyyy HH:mm:ss')}</Text>
          </View>
          <View style={tw`flex-1 ml-2 mb-5`}>
            <Text style={tw`text-sm text-gray-500`}>Order No.</Text>
            <Text>{tracks[0].Request.id}</Text>
          </View>
        </View>

        <Text style={tw`text-sm text-gray-500 mb-2 mb-5 font-semibold italic`}>Riwayat laundry</Text>

        <View style={tw`flex flex-col my-5`}>
          {tracks.map((track, index) => (
            <View key={index} style={tw`items-center mb-2`}>
              <Text style={tw`bg-green-500 text-white px-3 py-1 rounded-md mb-1`}>{track.status}</Text>
              <Text style={tw`text-gray-500 mb-5 italic`}>{format(new Date(track.createdAt), 'dd MMM HH:mm')}</Text>
            </View>
          ))}
        </View>
        
        <Text style={tw`mt-4 italic`}>"silahkan hubungi developer jika ada kendala ya!!"</Text>
        <TouchableOpacity
          style={tw`bg-red-500 p-3 rounded justify-center items-center mt-4`}
          onPress={handleCancel}
        >
          <Text style={tw`text-white`}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Trackscreen;
