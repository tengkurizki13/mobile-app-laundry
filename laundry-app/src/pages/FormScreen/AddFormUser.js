import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Alert } from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { fetchUsers,addUserHandler } from '../../store/actions/actionCreator';

const AddFormUser = ({navigation}) => {

  const dispatch = useDispatch()

  // State
  const [data, setData] = useState({
    username: '',
    phoneNumber: '',
  });

  const handleCancel = () => {
    navigation.navigate('Userscreen');
  };


  // Fungsi untuk mengubah nilai input
  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = () => {
    // Lakukan penanganan submit di sini, Anda dapat mengirimkan data ke server atau melakukan tindakan lain sesuai kebutuhan
    dispatch(addUserHandler(data))
      .then(() => {
        // move to router / if successfully
        Alert.alert(
          'Berhasil !!!',
          'anda telah menambah customer'
        );
        dispatch(fetchUsers()).then(() => {
          navigation.navigate('Userscreen');
        })
      })
      .catch(() => {
        // stay in this page
        
        navigation.navigate('FormAddUserscreen');
      })
  };


  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg mb-4 font-semibold italic pb-5`}>Form Menambah customer</Text>
      <View style={tw`w-3/4`}>
        <TextInput
          style={tw`border border-gray-400 p-2 rounded mb-2`}
          placeholder="username"
          value={data.username}
          onChangeText={(value) => handleChange('username', value)}
        />
        <TextInput
          style={tw`border border-gray-400 p-2 rounded mb-2`}
          placeholder="No Wa"
          value={data.phoneNumber}
          onChangeText={(value) => handleChange('phoneNumber', value)}
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

export default AddFormUser;
