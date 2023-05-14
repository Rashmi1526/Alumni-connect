import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_ALUMNI, SET_ERRORS, ALUMNI_UPDATE_PASSWORD, SET_FLAG } from '../actionTypes';


const setAlumni = (data) => {
  return {
    type: SET_ALUMNI,
    payload: data
  };
};
const url = "http://localhost:5000";



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

export const alumniLogout = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('alumniJwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setAlumni({}));
};