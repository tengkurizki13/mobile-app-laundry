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

      
      // Mengirim permintaan GET ke API dengan URL yang dibangun
      const response = await fetch(url);
      
      
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
      const response = await fetch(BASE_URL + "/api/requests/" + id);
      
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
          "Content-Type": "application/json"        },
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
          "Content-Type": "application/json"        },
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
      // api
      const response = await fetch(BASE_URL + "/api/requests-status/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);

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


export const fetchTracks = (id) => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + "/api/tracks/" + id);

      // contional if error
      if (!response.ok) throw new Error("upss something wrong");
      
      // change data to json
      let data = await response.json();

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
      const response = await fetch(BASE_URL + `/api/users?search=${search}`);

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

      // api
      const response = await fetch(BASE_URL + "/api/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
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
        method: "delete"
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
      const response = await fetch(BASE_URL + "/api/users/" + id);
      
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
          "Content-Type": "application/json"
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
      const response = await fetch(url);

      
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