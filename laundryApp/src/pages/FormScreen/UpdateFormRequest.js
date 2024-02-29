import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import tw from 'twrnc';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchRequestById, updateRequestHandler, fetchRequests } from '../../store/actions/actionCreator';
import {loader} from '../../assets/images';

const UpdateFormRequest = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const { users } = useSelector((state) => state.user);
  const { request } = useSelector((state) => state.request);

  const [data, setData] = useState({
    scale: '',
    price: '',
    userId: ''
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchRequestById(id)).then(() => {
        dispatch(fetchUsers()).then(() => {
          setLoading(false);
        
        });
      });
    }
  }, []);

  useEffect(() => {
    setData({
      scale: String(request?.scale), // Mengonversi ke string
      price: String(request?.price), // Mengonversi ke string
      userId: String(request?.userId) // Mengonversi ke string
    });
  },[request])
  

  const handleCancel = () => {
    navigation.navigate('Homescreen');
  };

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);
    dispatch(updateRequestHandler(data, id))
      .then(() => {
        dispatch(fetchRequests()).then(() => {
          setLoading(false);
          Alert.alert('Pesan', 'Anda telah memperbarui data');
          navigation.navigate('Homescreen');
        });
      })
      .catch(() => {
        setLoading(false);
        navigation.navigate('FormUpdateRequestscreen', { id });
      });
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
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg  font-semibold italic pb-5`}>Form edit card laundry</Text>
      <View style={tw`w-3/4`}>
        <TextInput
          style={tw`border border-gray-400 p-2 rounded mb-2`}
          placeholder="Total Timbangan"
          value={data.scale}
          onChangeText={(value) => handleChange('scale', value)}
        />
        <TextInput
          style={tw`border border-gray-400 p-2 rounded mb-2`}
          placeholder="Total Harga"
          value={data.price}
          onChangeText={(value) => handleChange('price', value)}
        />
        <RNPickerSelect
          items={users.map(user => ({ label: user.username, value: user.id.toString() }))} // Mengonversi ke string
          onValueChange={(value) => handleChange('userId', value)}
          value={data.userId} // Menggunakan nilai `userId` dari `data`
          style={{
            inputIOS: tw`border border-gray-400 p-2 rounded mb-2`,
            inputAndroid: tw`border border-gray-400 p-2 rounded mb-2`,
          }}
          placeholder={{
            label: 'Pilih customer',
            value: null,
          }}
        />
        <TouchableOpacity
          style={tw`bg-green-500 p-3 rounded justify-center items-center`}
          onPress={handleSubmit}
        >
          <Text style={tw`text-white`}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-red-500 p-3 rounded justify-center items-center mt-4`}
          onPress={handleCancel}
        >
          <Text style={tw`text-white`}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateFormRequest;
