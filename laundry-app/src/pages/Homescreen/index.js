import tw from 'twrnc';
import React, { useState,useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Modal,Alert,Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Fontisto, FontAwesome5, MaterialCommunityIcons,FontAwesome6 } from '@expo/vector-icons';
import { fetchRequests,deleteRequestHandler,updateStatusRequestHandler} from '../../store/actions/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import io from 'socket.io-client';
import DateTimePicker from '@react-native-community/datetimepicker';

const Homescreen = ({navigation}) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const[loading,setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterStatusModal, setShowFilterStatusModal] = useState(false);
  const [showFilterDateModal, setShowFilterDateModal] = useState(false);
  const [startOfDate, setStartOfDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endOfDate, setEndOfDate] = useState("");
  const [checkDate, setCheckDate] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const {requests} = useSelector(((state) => state.request))



  const dispatch = useDispatch()


  useEffect(() => {
    const socket = io('https://82g27vh3-3000.asse.devtunnels.ms');
    socket.on('log', (log) => {
      console.log(log,"ini di home");
      if (log != "connected") {
        navigation.navigate("Qrcodescreen")
      }
    });
    dispatch(fetchRequests())
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
    setCheckDate(true)
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


  const handleChangeStatus = (newStatus) => {
    console.log(startDate,"tanpa of",startOfDate,"ini ada of");
    const formattedStartDate = checkDate ? format(startDate, 'yyyy-MM-dd') : '';
    const formattedEndDate = checkDate ? format(endDate, 'yyyy-MM-dd') : '';
    setSelectedStatus(newStatus);
    dispatch(fetchRequests(newStatus,searchQuery,formattedStartDate,formattedEndDate)); 
  };

  const handleChangeStatusCard = (id,newStatus) => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin merubah tahap?',
      [
        {
          text: 'Batal',
          onPress: () => console.log('pembayaran dibatalkan'),
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => {
            let data = {
              status : newStatus
             }
             dispatch(updateStatusRequestHandler(data,id))
             .then(() => {
               dispatch(fetchRequests())
               .then(() => {
                 setLoading(false)
               })
             })
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleCheckout = (id) => {
    Alert.alert(
      'Konfirmasi perubahan',
      'Apakah Anda yakin ingin melakukan pembayaran?',
      [
        {
          text: 'Batal',
          onPress: () => console.log('perubahan dibatalkan'),
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => {
            let data = {
              status : "selesai"
             }
             dispatch(updateStatusRequestHandler(data,id))
             .then(() => {
               dispatch(fetchRequests())
               .then(() => {
                 setLoading(false)
               })
             })
          },
        },
      ],
      { cancelable: false }
    );
  };


  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    // Tambahkan logika pencarian sesuai kebutuhan Anda di sini
    dispatch(fetchRequests("",searchQuery)); 
  };

  const changePageToTrack = (id) => {
    navigation.navigate('Trackscreen', { id });
  };

  const handleDelete = (id) => {
    // Tampilkan konfirmasi alert sebelum menghapus item
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus data ini?',
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
            dispatch(deleteRequestHandler(id))
            .then(() => {
              dispatch(fetchRequests())
              .then(() => {
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
      navigation.navigate('FormAddRequestscreen');
    }else  if (type == "edit") {
      // navigation.navigate('FormAddRequestscreen');
      navigation.navigate('FormUpdateRequestscreen', { id });
    }
  };


  const statusOptions = [
    { label: 'Proses', value: 'proses' },
    { label: 'Penimbangan', value: 'penimbangan' },
    { label: 'Pencucian', value: 'pencucian' },
    { label: 'Pengeringan', value: 'pengeringan' },
    { label: 'Pengemasan', value: 'pengemasan' },
    { label: 'Pembayaran', value: 'pembayaran' },
    { label: 'Selesai', value: 'selesai' }
  ];

  const handleDateFilter = () => {
    // Tambahkan logika filter berdasarkan tanggal sesuai kebutuhan Anda di sini
    const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
    const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';
    setShowFilterDateModal(false);
    setStartOfDate("")
    setEndOfDate("")
    dispatch(fetchRequests(selectedStatus, searchQuery, formattedStartDate, formattedEndDate));

  };

  function clearFilter() {
    
    dispatch(fetchRequests()).then(() => {
      setSelectedStatus("")
      setSearchQuery("")
      setCheckDate(false)
    })
  }

  const handleOutsideModalClick = () => {
    setShowFilterStatusModal(false);
    setShowFilterDateModal(false);
  };

  // contional if data not relode yet
  if (loading) {
    return (
      <View style={tw`flex-1 bg-white justify-center items-center bg-lime-400`}>
          <Text style={tw`font-semibold text-white`}>Memuat ____ ...............</Text>
      </View>
    )
  }

  

  return (
    <ScrollView contentContainerStyle={tw`flex-grow pt-20 items-center bg-lime-400`}>
      <View style={tw`w-11/12`}>
        {/* Form Pencarian */}
        <View style={tw`mb-5 flex-row items-center justify-between`}>
          <TextInput
            style={tw`flex-1 bg-white border-2 border-gray-300 rounded-full px-4 py-3 shadow-md`}
            placeholder="search by order id"
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={tw`bg-blue-500 rounded-full ml-2 p-3`} onPress={handleSearch}>
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Tombol-tombol aksi */}
        <View>
          <View style={tw`bg-white rounded-lg p-5 shadow-md mb-5`}>
            {/* Tombol-tombol aksi */}
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity style={tw`bg-gray-500 rounded p-2 flex-row items-center`} onPress={() => setShowFilterStatusModal(true)}>
                <Text style={tw`text-white text-sm font-semibold mr-1`}><FontAwesome5 name="filter" size={24} color="black" /></Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-gray-500 rounded p-2 flex-row items-center`} onPress={() => setShowFilterDateModal(true)}>
                <Text style={tw`text-white text-sm font-semibold mr-1`}><Fontisto name="date" size={24} color="black" /></Text>
              </TouchableOpacity>
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
        {requests.length === 0 ?  
     <View style={tw`flex-1 bg-white justify-center items-center bg-lime-400`}>
          <Text style={tw`font-semibold text-white`}>data kosong</Text>
      </View> 
    : 
        <View >
        {requests.map((request, index) => (
          <View style={tw`bg-white rounded-lg p-5 shadow-md mb-5`} key={index}>
            <View style={tw `flex-row items-center justify-between mb-5`}>
            <Text style={tw`mb-2 text-gray-700 italic`}>
              <Text style={tw`font-semibold`}></Text>{format(new Date(request.createdAt), 'dd MMM yyyy')}
            </Text>
            <Text style={tw`mb-2 text-gray-700 uppercase font-semibold`}>
            {request.User.username}
          </Text>
            </View>
            <View style={tw`bg-white rounded-lg p-5 shadow-md mb-3`}>
            <Text style={tw`mb-2 text-gray-700`}>
              <Text style={tw`font-semibold`}>OrderId =</Text> {request.id}
            </Text>
            <Text style={tw`mb-2 text-gray-700`}>
              <Text style={tw`font-semibold`}>Timbangan =</Text> {request.scale} Kg
            </Text>
            <Text style={tw`mb-2 text-gray-700`}>
              <Text style={tw`font-semibold`}>Harga =</Text> Rp. {request.price}
            </Text>
            </View>
            <Text style={tw`mb-2 text-gray-700`}>
              <Text style={tw`font-semibold`}>Tahap</Text>
            </Text>
            {request.status === 'selesai' ? (
                <Text style={{ color: 'green', marginBottom: 10 }} className='fst-italic'>Selesai!!!</Text>
              ) : (
                <Picker
                  selectedValue={request.status}
                  onValueChange={(itemValue) => handleChangeStatusCard(request.id, itemValue)}
                  style={{ height: 50, width: '100%', marginBottom: 10 }}
                >
                  {/* Opsi status berdasarkan status pesanan saat ini */}
                  {request.status === 'proses' && (
                    <Picker.Item label="Proses" value="proses" />
                  )}
                  {(request.status === 'penimbangan' || request.status === 'proses') && (
                    <Picker.Item label="Penimbangan" value="penimbangan" />
                  )}
                  {(request.status === 'pencucian' || request.status === 'proses' || request.status === 'penimbangan') && (
                    <Picker.Item label="Pencucian" value="pencucian" />
                  )}
                  {(request.status === 'pengeringan' || request.status === 'pencucian' || request.status === 'proses' || request.status === 'penimbangan') && (
                    <Picker.Item label="Pengeringan" value="pengeringan" />
                  )}
                  {(request.status === 'pengemasan' || request.status === 'pengeringan' || request.status === 'pencucian' || request.status === 'proses' || request.status === 'penimbangan') && (
                    <Picker.Item label="Pengemasan" value="pengemasan" />
                  )}
                  {(request.status === 'pembayaran' || request.status === 'pengemasan' || request.status === 'pengeringan' || request.status === 'pencucian' || request.status === 'proses' || request.status === 'penimbangan') && (
                    <Picker.Item label="Pembayaran" value="pembayaran" />
                  )}
                </Picker>
              )}
            {/* Tombol-tombol aksi */}
            <View style={tw`flex-row justify-between`}>
                {request.status === 'selesai' ? (
                  <TouchableOpacity style={tw`bg-white-500 rounded p-2 flex-row items-center`}>
                    <Text style={tw`text-white text-sm font-semibold`}>terbayar</Text>
                  </TouchableOpacity>
                ) : request.status === 'pembayaran' ? (
                  <TouchableOpacity style={tw`bg-gray-500 rounded p-2 flex-row items-center`} onPress={() => handleCheckout(request.id)}>
                    <Text style={tw`text-white text-sm font-semibold`}><FontAwesome6 name="money-check-dollar" size={24} color="black" /></Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity style={tw`bg-yellow-500 rounded p-2 flex-row items-center`} onPress={() => navigateToForm("edit", request.id)}>
                      <Text style={tw`text-white text-sm font-semibold`}><FontAwesome5 name="edit" size={24} color="black" /></Text>
                    </TouchableOpacity>
                  </>
                )}
                <TouchableOpacity style={tw`bg-blue-500 rounded p-2 flex-row items-center`} onPress={() => changePageToTrack(request.id)}>
                  <Text style={tw`text-white text-sm font-semibold`}><FontAwesome6 name="backward-step" size={24} color="black" /></Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-red-500 rounded p-2 flex-row items-center`} onPress={() => handleDelete(request.id)}>
                  <Text style={tw`text-white text-sm font-semibold`}><FontAwesome6 name="trash-can" size={24} color="black" /></Text>
                </TouchableOpacity>
              </View>
          </View>
          ))}
          {/* Tambahkan card pesanan lainnya di sini */}
        </View>
}
      </View>

      {/* Modal Filter by Status */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterStatusModal}
        onRequestClose={() => setShowFilterStatusModal(false)}
      >
        <TouchableOpacity style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`} onPress={handleOutsideModalClick}>
          <View style={tw`bg-white p-5 rounded-md w-11/12`}>
            <Text style={tw`text-lg font-semibold mb-3`}>Filter by Status</Text>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={tw`bg-gray-200 rounded-md p-2 mb-2`}
                onPress={() => {
                  handleChangeStatus(option.value);
                  setShowFilterStatusModal(false);
                }}
              >
                <Text style={tw`text-black text-sm font-semibold mr-1`}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

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

export default Homescreen;
