import {
  BASE_URL,
  REQUESTS_BY_ID_FETCH_SUCCESS,
  REQUESTS_FETCH_SUCCESS,
  USERS_FETCH_SUCCESS,
  TRACKS_FETCH_SUCCESS,
  USERS_BY_ID_FETCH_SUCCESS,
  REQUESTS_OWNER_FETCH_SUCCESS
} from "./actionType";
import { Alert } from 'react-native';


// fuction to create data to reducer
export const requestsFetchSuccess = (payload) => {
  return {
    type: REQUESTS_FETCH_SUCCESS,
    payload: payload,
  };
};

export const requestsOwnerFetchSuccess = (payload) => {
  return {
    type: REQUESTS_OWNER_FETCH_SUCCESS,
    payload: payload,
  };
};


export const requestByidFetchSuccess = (payload) => {
  return {
    type: REQUESTS_BY_ID_FETCH_SUCCESS,
    payload: payload,
  };
};

export const tracksFetchSuccess = (payload) => {
  return {
    type: TRACKS_FETCH_SUCCESS,
    payload: payload,
  };
};

export const usersFetchSuccess = (payload) => {
  return {
    type: USERS_FETCH_SUCCESS,
    payload: payload,
  };
};

export const userByidFetchSuccess = (payload) => {
  return {
    type: USERS_BY_ID_FETCH_SUCCESS,
    payload: payload,
  };
};




// fucntions api to server

// this fucntion api get items from server
export const fetchRequests = (filter = "", search = "", startDate = "", endDate = "") => {
  return async (dispatch) => {
    try {
     
      // Membangun URL berdasarkan filter, pencarian, dan rentang waktu
      let url = BASE_URL + `/api/requests?filter=${filter}&search=${search}`;
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      console.log(url);

      
      // Mengirim permintaan GET ke API dengan URL yang dibangun
      const response = await fetch(url, {
        headers: {
          access_token: 'localStorage.getItem("access_token")',
        },
      });
      
      
      // Jika respons tidak ok, lempar error
      if (!response.ok) throw new Error("upss something wrong");

      // Mengonversi data respons menjadi JSON
      const data = await response.json();


      // Memanggil fungsi lain untuk menangani data
      dispatch(requestsFetchSuccess(data.data));
    } catch (error) {
      // Log error
      console.error(error);
    }
  };
};


// this fucntion api get item by id from server
export const fetchRequestById = (id) => {
  return async (dispatch) => {
    try {

      // api
      const response = await fetch(BASE_URL + "/api/requests/" + id, {
        headers: {
          access_token : "localStorage.getItem('access_token')" // Menggunakan token akses yang telah Anda miliki
        }
      });
      
      // contional if error
      if (!response.ok) throw new Error("upss something wrong");
      
      // change data to json
      let data = await response.json();

      // call other fuction
      dispatch(requestByidFetchSuccess(data.data));
    } catch (error) {

      // log error
      console.log(error);
    }
  };
};


// this fucntion api register from server

export const addRequestHandler = (form) => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + "/api/requests", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token : "localStorage.getItem('access_token')"
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);

    } catch (error) {
      Alert.alert(
        'gagal !!!',
        `${error}`
      );
      // dispatch error
      dispatch(error);
    }
  };
};

export const deleteRequestHandler = (id) => {
  return async (dispatch) => {
    try {

      

      // api
      const response = await fetch(BASE_URL + "/api/requests/" + id, {
        method: "delete",
        headers: {
          access_token : "localStorage.getItem('access_token')"
        },
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);

      // sweet alert
      
    } catch (error) {
      // sweet alert error
      console.log(error);
      // dispatch error
      dispatch(error);
    }
  };
};


export const updateRequestHandler = (form,id) => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + "/api/requests/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token : "localStorage.getItem('access_token')"
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'gagal !!!',
        `${error}`
      );

      // dispatch error
      dispatch(error);
    }
  };
};

export const updateStatusRequestHandler = (form,id) => {
  return async (dispatch) => {
    try {
      console.log("masuik");
      // api
      const response = await fetch(BASE_URL + "/api/requests-status/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token : "localStorage"
        },
        body: JSON.stringify(form),
      });

          console.log(response,"ini data");
      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);
      Alert.alert(
        'kamu berhasil merubah tahap nya',
      );


    } catch (error) {
      // sweet alert error
      console.log(error,"masuk");
      Alert.alert(
        'gagal !!!',
        `${error}`
      );

      // dispatch error
      dispatch(error);
    }
  };
};



// this fucntion api login from server
export const loginHandler = (form) => {
  return async (dispatch) => {
    try {

      // api
      const response = await fetch(BASE_URL + "/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);


      // set localstore

      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("role", data.data.role);

      // sweet alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // sweet alert error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      // dispatch error
      dispatch(error);
    }
  };
};


export const fetchTracks = (id) => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + "/api/tracks/" + id, {
        headers: {
          access_token : "localStorage.getItem('access_token') "// Menggunakan token akses yang telah Anda miliki
        }
      });

      // contional if error
      if (!response.ok) throw new Error("upss something wrong");
      
      // change data to json
      let data = await response.json();

      console.log(data, "di action");

      // call other fuction
      dispatch(tracksFetchSuccess(data.data));
    } catch (error) {
      // log error
      console.log(error);
    }
  };
};


export const fetchUsers = (search = "") => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + `/api/users?search=${search}`, {
        headers: {
          access_token : "localStorage.getItem('access_token')" // Menggunakan token akses yang telah Anda miliki
        }
      });

      // contional if error
      if (!response.ok) throw new Error("upss something wrong");
      
      // change data to json
      let data = await response.json();

      // call other fuction
      dispatch(usersFetchSuccess(data.data));
    } catch (error) {
      // log error
      console.log(error);
    }
  };
};

export const addUserHandler = (form) => {
  return async (dispatch) => {
    try {

      console.log(form);
      // api
      const response = await fetch(BASE_URL + "/api/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token : "localStorage.getItem('access_token')"
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);

      // sweet alert
    } catch (error) {
      // sweet alert error
      console.log(error);
      Alert.alert(
        'gagal !!!',
        `${error}`
      );

      // dispatch error
      dispatch(error);
    }
  };
};

export const deleteUserHandler = (id) => {
  return async (dispatch) => {
    try {

      // api
      const response = await fetch(BASE_URL + "/api/users/" + id, {
        method: "delete",
        headers: {
          access_token : "localStorage.getItem('access_token')"
        },
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);
    } catch (error) {
      // sweet alert error
      console.log(error);
      Alert.alert(
        'gagal !!!',
        `${error}`
      );

      // dispatch error
      dispatch(error);
    }
  };
};

export const fetchUserById = (id) => {
  return async (dispatch) => {
    try {

      // api
      const response = await fetch(BASE_URL + "/api/users/" + id, {
        headers: {
          access_token : "localStorage.getItem('access_token') "// Menggunakan token akses yang telah Anda miliki
        }
      });
      
      // contional if error
      if (!response.ok) throw new Error("upss something wrong");
      
      // change data to json
      let data = await response.json();

      // call other fuction
      dispatch(userByidFetchSuccess(data.data));
    } catch (error) {

      // log error

      Alert.alert(
        'gagal !!!',
        `${error}`
      );

    }
  };
};

export const updateUserHandler = (form,id) => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + "/api/users/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token : "localStorage.getItem('access_token')"
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);
      

      // sweet alert
    } catch (error) {
      // sweet alert error
      console.log(error);
      Alert.alert(
        'gagal !!!',
        `${error}`
      );

      // dispatch error
      dispatch(error);
    }
  };
};


export const fetchRequestsOwner = (startDate = "", endDate = "") => {
  return async (dispatch) => {
    try {
      // Membangun URL berdasarkan filter, pencarian, dan rentang waktu


      let url = BASE_URL + `/api/requests-owner?`;
      if (startDate && endDate) {
        url += `startDate=${startDate}&endDate=${endDate}`;
      }

      // Mengirim permintaan GET ke API dengan URL yang dibangun
      const response = await fetch(url, {
        headers: {
          access_token: "localStorage.getItem('access_token')",
        },
      });

      
      // Jika respons tidak ok, lempar error
      if (!response.ok) throw new Error("upss something wrong");

      // Mengonversi data respons menjadi JSON
      const data = await response.json();


      // Memanggil fungsi lain untuk menangani data
      dispatch(requestsOwnerFetchSuccess(data.data));
    } catch (error) {
      // Log error
      console.error(error);
    }
  };
};