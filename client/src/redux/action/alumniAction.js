import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_ALUMNI, SET_ERRORS_HELPER,SET_ERRORS, ALUMNI_UPDATE_PASSWORD, SET_FLAG } from '../actionTypes';


const setAlumni = (data) => {
  return {
    type: SET_ALUMNI,
    payload: data
  };
};
const url = "http://localhost:5000";

export const setChatHistory = (data) => {
  return {
      type: "SET_CHAT",
      payload: data
  }
}
const chatHelp = (data) => {
  return {
      type: "CHAT_HELPER",
      payload: data
  }
}

const getAlumniByRegNameHelper = (data) => {
  return {
      type: "GET_STUDENT_BY_REG_NUM",
      payload: data
  }
}


const privateConversation = (data) => {
  return {
      type: "GET_PRIVATE_CONVERSATION",
      payload: data
  }
}

const privateConversation2 = (data) => {
  return {
      type: "GET_PRIVATE_CONVERSATION2",
      payload: data
  }
}

const newerChatsHelper = (data) => {
  return {
      type: "GET_NEWER_CHATS",
      payload: data
  }
}

const previousChatsHelper = (data) => {
  return {
      type: "GET_PREVIOUS_CHATS",
      payload: data
  }
}
export const alumniLogin = (alumniCredential) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: url + "/api/alumni/login",
        data: alumniCredential
      });
      const { token } = data;
      // Set token to local Storage
      localStorage.setItem('alumniJwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setAlumni(decoded));
      
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};

export const alumniUpdatePassword = (passwordData) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: url + "/api/alumni/updatePassword",
        data: passwordData
      });
      alert('Password Updated Successfully');
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};

export const getOTPAlumni = (alumniEmail) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: url + "/api/alumni/forgotPassword",
        data: alumniEmail
      });
      alert('OTP has been sent to your email');
      dispatch({ type: SET_FLAG });
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};
// export const setAlumniUser = data => {
//   return {
//       type: SET_ALUMNI,
//       payload: data
//   };
// }
export const submitOTPAlumni = (newPasswordWithOtp, history) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: url + "/api/alumni/postOTP",
        data: newPasswordWithOtp
      });
      alert('Password Updated, kindly login with the updated password');
      history.push('/');
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }
  };
  
};
export const sendMessage = (room,messageobj) => {
  return async () => {
      try {
          const { data } = await axios({
              method: 'Post',
              url: url + `/api/alumni/chat/${room}`,
              data: messageobj
          })
      }
      catch (err) {
          console.log("Error in sending message",err.message)
      }
  }
}


export const getPrivateConversation = (roomId) => {
  return async (dispatch) => {
      try {
          const { data } = await axios({
              method: 'Get',
              url: url + `/api/alumni/chat/${roomId}`,
          })
          dispatch(privateConversation(data.result))
      }
      catch (err) {
          console.log("Error in sending message", err.message)
      }
  }
}

export const getPrivateConversation2 = (roomId) => {
  return async (dispatch) => {
      try {
          const { data } = await axios({
              method: 'Get',
              url: url + `/api/alumni/chat/${roomId}`,
          })
          dispatch(privateConversation2(data.result))
      }
      catch (err) {
          console.log("Error in sending message", err.message)
      }
  }
}

export const previousChats = (senderName) => {
  return async (dispatch) => {
      try {
          const { data } = await axios({
              method: 'Get',
              url: url + `/api/alumni/chat/previousChats/${senderName}`,
          })
          dispatch(previousChatsHelper(data.result))
      }
      catch (err) {
          console.log("Error in sending message", err.message)
      }
  }
}
export const newerChats = (receiverName) => {
  return async (dispatch) => {
      try {
          const { data } = await axios({
              method: 'Get',
              url: url + `/api/alumni/chat/newerChats/${receiverName}`,
          })
          dispatch(newerChatsHelper(data.result))
      }
      catch (err) {
          console.log("Error in sending message", err.message)
      }
  }
}
export const alumniUpdate = (updatedData) => {
  return async () => {
      try {
          const { data } = await axios({
              method: 'Post',
              url: url + `/api/alumni/updateProfile`,
              data: updatedData
          })
      }
      catch (err) {
          console.log("Error in sending message", err.message)
      }
  }
}
export const setAlumniUser = data => {
  return {
      type: SET_ALUMNI,
      payload: data
  };
}
export const alumniLogout = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('alumniJwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setAlumni({}));
};