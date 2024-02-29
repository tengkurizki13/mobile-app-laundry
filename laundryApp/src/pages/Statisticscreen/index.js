import tw from 'twrnc';
import React, { useState,useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Modal,Pressable,Image } from 'react-native';
import {  Fontisto,  MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchRequestsOwner} from '../../store/actions/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import {loader} from '../../assets/images';

const Statisticscreen = ({navigation}) => {
  const[loading,setLoading] = useState(true)
  const [showFilterDateModal, setShowFilterDateModal] = useState(false);
  const [startOfDate, setStartOfDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endOfDate, setEndOfDate] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const {requestsOwner} = useSelector(((state) => state.request))



  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchRequestsOwner())
      .then(() => {
        setLoading(false)
      })
    },[])

const toggleStartDatepicker = () => {
  setShowStartDatePicker(!showStartDatePicker);
};

const toggleEndDatepicker = () => {
  setShowEndDatePicker(!showEndDatePicker);
};

const handleChangeStartDatepicker = ({type} , selectedDate) => {
  if (type == "set") {
    const currentDate = selectedDate
    setStartDate(currentDate)
    setStartOfDate(currentDate.toDateString())
    toggleStartDatepicker();
  }else{
    toggleStartDatepicker();
  }
};

const handleChangeEndDatepicker = ({type} , selectedDate) => {
  if (type == "set") {
    const currentDate = selectedDate
    setEndDate(currentDate)
    setEndOfDate(currentDate.toDateString())
    toggleEndDatepicker();
  }else{
    toggleEndDatepicker();
  }
};

  const handleDateFilter = () => {
    // Tambahkan logika filter berdasarkan tanggal sesuai kebutuhan Anda di sini
    const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
    const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';
    setShowFilterDateModal(false);
    setStartOfDate("")
    setEndOfDate("")
    dispatch(fetchRequestsOwner(formattedStartDate, formattedEndDate));

  };

  function clearFilter() {
    dispatch(fetchRequestsOwner())
  }

  const handleOutsideModalClick = () => {
    setShowFilterDateModal(false);
    setStartOfDate("")
    setEndOfDate("")
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'proses':
        return 'gray';
      case 'penimbangan':
        return 'orange';
      case 'pencucian':
        return 'blue';
      case 'pengeringan':
        return 'brown';
      case 'pengemasan':
        return 'purple';
      case 'pembayaran':
        return 'red';
      case 'selesai':
        return 'green';
      default:
        return 'gray'; 
    }
  };

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
        <View>
          <View style={tw`bg-white rounded-lg p-5 shadow-2xl mb-5`}>
            {/* Tombol-tombol aksi */}
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity style={tw`bg-gray-500 rounded p-2 flex-row items-center`} onPress={() => setShowFilterDateModal(true)}>
                <Text style={tw`text-white text-sm font-semibold mr-1`}><Fontisto name="date" size={24} color="black" /></Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-blue-500 rounded p-2 flex-row items-center`} onPress={() => clearFilter()}>
                <Text style={tw`text-white text-sm font-semibold mr-1`}><MaterialCommunityIcons name="broom" size={24} color="black" /></Text>
              </TouchableOpacity>
              {/* Tombol Detail */}
            </View>
          </View>
          {/* Tambahkan card pesanan lainnya di sini */}
        </View>
        {/* Daftar Pesanan */}

        <View style={{backgroundColor:"#fff",paddingVertical:40,paddingHorizontal:30,borderRadius:40}}>
        {requestsOwner.length === 0 ?  
    <View>
      <Text>Data kosong</Text>
    </View> 
    : 
        <View>
        {requestsOwner.map((request, index) => (
          <View style={tw`bg-white rounded-lg p-5 shadow-md mb-5 shadow-2xl`} key={index}>
            <View style={tw`bg-white rounded-lg p-5 shadow-md mb-5 shadow-2xl`} key={index}>
            <Text style={tw`mb-2 text-gray-700`}>
              <Text style={tw`font-semibold`}>Jumlah laundry = </Text> {request.jumlahOrder} laundry
            </Text>
            <Text style={tw`mb-2 text-gray-700`}>
              <Text style={tw`font-semibold`}>Total pembayaran = </Text>Rp.  {request.totalpembayaran}
            </Text>
            <Text style={tw`mb-2 text-gray-700`}>
              <Text style={tw`font-semibold`}>Jumlah timbangan = </Text> {request.jumlahTimbangan} Kg
            </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`text-sm `}>Tahap : </Text>
              <TouchableOpacity style={[tw`rounded p-1 flex-row items-center`, { backgroundColor: getStatusColor(request.typeStatus) }]}>
                <Text style={tw`text-white text-sm font-semibold`}>{request.typeStatus}</Text>
              </TouchableOpacity>
            </View>
          </View>
          ))}
          {/* Tambahkan card pesanan lainnya di sini */}
        </View>
} 
</View>
      </View>

      {/* Modal Filter by Date */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterDateModal}
        onRequestClose={() => setShowFilterDateModal(false)}
      >
        <TouchableOpacity style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`} onPress={handleOutsideModalClick}>
          <View style={tw`bg-white p-5 rounded-md w-11/12`}>
            <Text style={tw`text-lg font-semibold mb-3`}>Filter by Date</Text>
            <View style={tw`mb-3`}>
              <Text>Start Date:</Text>

              {showStartDatePicker && 
              <DateTimePicker mode='date' display='spinner' value={startDate} onChange={handleChangeStartDatepicker} />
              }   

              {!showStartDatePicker && 
              <Pressable
              onPress={toggleStartDatepicker}
              >
              <TextInput
                style={tw`bg-gray-100 p-2 rounded-md`}
                type="date"
                value={startOfDate}
                editable={false}
              />
              </Pressable>
              }
              
            </View>
            <View style={tw`mb-3`}>
              <Text>End Date:</Text>
              {showEndDatePicker && 
              <DateTimePicker mode='date' display='spinner' value={endDate} onChange={handleChangeEndDatepicker} />
              }   

              {!showEndDatePicker && 
              <Pressable
              onPress={toggleEndDatepicker}
              >
              <TextInput
                style={tw`bg-gray-100 p-2 rounded-md`}
                type="date"
                value={endOfDate}
                editable={false}
              />
              </Pressable>
              }
            </View>
            <TouchableOpacity
              style={tw`bg-blue-500 rounded-md p-2`}
              onPress={handleDateFilter}
            >
              <Text style={tw`text-white text-center`}>Apply</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default Statisticscreen;
