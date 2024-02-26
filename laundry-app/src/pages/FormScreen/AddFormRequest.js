import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,Alert } from 'react-native';
import tw from 'twrnc';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch,useSelector } from 'react-redux';
import { fetchUsers,addRequestHandler,fetchRequests } from '../../store/actions/actionCreator';

const AddFormRequest = ({navigation}) => {

  const dispatch = useDispatch()
  // state
  const[loading,setLoading] = useState(true)
  const {users} = useSelector(((state) => state.user))

  useEffect(() => {
    dispatch(fetchUsers())
      .then(() => {
        setLoading(false)
      })
    },[])


  // State
  const [data, setData] = useState({
    scale: '',
    price: '',
    userId: ''
  });

  // Fungsi untuk mengubah nilai input
  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleCancel = () => {
    navigation.navigate('Homescreen');
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = () => {
    // Lakukan penanganan submit di sini, Anda dapat mengirimkan data ke server atau melakukan tindakan lain sesuai kebutuhan
    console.log('Form submitted:', data);
    dispatch(addRequestHandler(data))
      .then(() => {
        // move to router / if successfully
        Alert.alert(
          'Berhasil !!!',
          'anda telah menambah data'
        );
        dispatch(fetchRequests()).then(() => {
          navigation.navigate('Homescreen');
        })
      })
      .catch(() => {
        // stay in this page
        
        navigation.navigate('FormAddRequestscreen');
      })
  };

    // contional if data not relode yet
    if (loading) {
      return (
        <View>
            <Text style={tw`font-semibold`}>Memuat ____ ...............</Text>
        </View>
      )
    }

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg mb-4 font-semibold italic pb-5`}>Form Menambah card laundry</Text>
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
            items={users.map(user => ({ label: user.username, value: user.id }))}
            onValueChange={(value) => handleChange('userId', value)}
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

export default AddFormRequest;
