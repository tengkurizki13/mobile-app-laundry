import tw from 'twrnc';
import React, { useState,useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign,MaterialCommunityIcons,FontAwesome5,FontAwesome6 } from '@expo/vector-icons';
import { fetchUsers,deleteUserHandler,fetchRequests} from '../../store/actions/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {loader} from '../../assets/images';


const Userscreen = ({navigation}) => {
  const[loading,setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('');
  const {users} = useSelector(((state) => state.user))



  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchUsers())
      .then(() => {
        setLoading(false)
      })
    },[])


  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    // Tambahkan logika pencarian sesuai kebutuhan Anda di sini
    dispatch(fetchUsers(searchQuery)); 
  };

  const handleDelete = (id) => {
    // Tampilkan konfirmasi alert sebelum menghapus item
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus customer ini?',
      [
        {
          text: 'Batal',
          onPress: () => console.log('Penghapusan dibatalkan'),
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => {
            // Lakukan penghapusan item di sini jika pengguna menekan "Ya"
            dispatch(deleteUserHandler(id))
            .then(() => {
              dispatch(fetchUsers())
              .then(() => {
                dispatch(fetchRequests())
                .then(() => {
                  Alert.alert(
                    'Berhasil menghapus customer !!!',
                  );
                  setLoading(false)
                }).catch((error) =>{
                  console.log("Err",error);
                })
              }).catch((error) =>{
                console.log("Err",error);
              })
            })
          },
        },
      ],
      { cancelable: false }
    );
  };

  const navigateToForm = (type,id) => {
    if (type == "add") {
      navigation.navigate('FormAddUserscreen');
    }else  if (type == "edit") {
      // navigation.navigate('FormAddRequestscreen');
      navigation.navigate('FormUpdateUserscreen', { id });
    }
  };


  function clearFilter() {
    dispatch(fetchUsers()).then(() => {
      setSearchQuery("")
    })
  }

  // contional if data not relode yet
  if (loading) {
    return (
      <View style={tw`flex-1 bg-white justify-center items-center`}>
      <Image source={loader} style={tw`w-10 h-10`} />
      <Text style={tw`font-semibold text-white`}>Memuat ____ ...............</Text>
      </View>
    )
  }

  

  return (
    <ScrollView contentContainerStyle={tw`flex-grow pt-20 items-center bg-teal-200`}>
      <View style={tw`w-11/12`}>
        {/* Form Pencarian */}
        <View style={tw`mb-5 flex-row items-center justify-between`}>
          <TextInput
            style={tw`flex-1 bg-white border-2 border-gray-300 rounded-full px-4 py-3 shadow-md`}
            placeholder="search by username"
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={tw`bg-blue-500 rounded-full ml-2 p-3`} onPress={handleSearch}>
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Tombol-tombol aksi */}
        <View>
          <View style={tw`bg-white rounded-lg p-5 shadow-2xl mb-5`}>
            {/* Tombol-tombol aksi */}
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity style={tw`bg-blue-500 rounded p-2 flex-row items-center`} onPress={() => clearFilter()}>
                <Text style={tw`text-white text-sm font-semibold mr-1`}><MaterialCommunityIcons name="broom" size={24} color="black" /></Text>
              </TouchableOpacity>
              {/* Tombol Detail */}
              <TouchableOpacity style={tw`bg-green-500 rounded p-2 flex-row items-center ml-2`} onPress={() => navigateToForm("add")}>
                <Text style={tw`text-white text-sm font-semibold mr-1`}><AntDesign name="pluscircle" size={24} color="black" /></Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Tambahkan card pesanan lainnya di sini */}
        </View>
        {/* Daftar Pesanan */}
        <View style={{backgroundColor:"#fff",paddingVertical:40,paddingHorizontal:30,borderRadius:40}}>
        {users.length === 0 ?  
     <View style={tw`flex-1 bg-white justify-center items-center`}>
     <Text style={tw`font-semibold`}>data kosong</Text>
 </View> 
    : 
    
        <View>
        {users.map((user, index) => (
          <View style={tw`bg-white rounded-lg p-5 shadow-2xl mb-5`} key={index}>
             <Text style={tw`mb-2 text-gray-700`}>terdaftar pada
              <Text style={tw`font-semibold italic`}> {format(new Date(user.createdAt), 'dd MMM yyyy')}</Text>
            </Text>

            <View style={tw`bg-white rounded-lg p-5 shadow-xl mb-5`}>
            <Text style={tw`mb-2 text-gray-700`}>
              <Text style={tw`font-semibold`}>Nama = </Text> {user.username}
            </Text>
            <Text style={tw`mb-2 text-gray-700`}>
              <Text style={tw`font-semibold`}>No Wa =  </Text> {user.phoneNumber}
            </Text>
            </View>
            {/* Tombol-tombol aksi */}
            <View style={tw`flex-row justify-between`}>
                 <TouchableOpacity style={tw`bg-yellow-500 rounded p-2 flex-row items-center`} onPress={() => navigateToForm("edit", user.id)}>
                  <Text style={tw`text-white text-sm font-semibold`}><FontAwesome5 name="edit" size={24} color="black" /></Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-red-500 rounded p-2 flex-row items-center`} onPress={() => handleDelete(user.id)}>
                  <Text style={tw`text-white text-sm font-semibold`}><FontAwesome6 name="trash-can" size={24} color="black" /></Text>
                </TouchableOpacity>
              </View>
          </View>
          ))}
          {/* Tambahkan card pesanan lainnya di sini */}
        </View>
}
</View>
      </View>
    </ScrollView>
  );
};

export default Userscreen;
