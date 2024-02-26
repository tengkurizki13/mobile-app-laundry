import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,Alert } from 'react-native';
import tw from 'twrnc';
import { useDispatch,useSelector } from 'react-redux';
import { fetchUserById,updateUserHandler,fetchUsers,fetchRequests } from '../../store/actions/actionCreator';

const UpdateFormUser = ({navigation,route}) => {

  const { id } = route.params;
  const dispatch = useDispatch()

  const {user} = useSelector(((state) => state.user))
   // State
   const [data, setData] = useState({
    username: '',
    phoneNumber: '',
  });

  const handleCancel = () => {
    navigation.navigate('Userscreen');
  };


  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id)).then(() => {
          setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    setData({
      username: user?.username, // Mengonversi ke string
      phoneNumber: user?.phoneNumber, // Mengonversi ke string
    });
  },[user])


 
  // Fungsi untuk mengubah nilai input
  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = () => {
    // Lakukan penanganan submit di sini, Anda dapat mengirimkan data ke server atau melakukan tindakan lain sesuai kebutuhan
    dispatch(updateUserHandler(data,id))
      .then(() => {
        // move to router / if successfully
        Alert.alert(
          'Berhasil !!!',
          'anda telah edit customer'
        );
        dispatch(fetchUsers()).then(() => {
          dispatch(fetchRequests()).then(() => {
            navigation.navigate('Userscreen');
          })
        })
      })
      .catch(() => {
        // stay in this page
        navigation.navigate('FormUpdateUserscreen',{ id });
      })
  };


  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg mb-4 text-lg mb-4 font-semibold italic pb-5`}>Form mengedit customer</Text>
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

export default UpdateFormUser;
