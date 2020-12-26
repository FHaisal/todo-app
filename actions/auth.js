import AsyncStorage from '@react-native-async-storage/async-storage';
import { RESTORE_USER, LOGIN, LOGOUT } from "./types";
import { setErrors } from "./errors";
import extractErrors from "../utils/extractErrors";
import setAuthToken from "../utils/setAuthToken";
import axios from 'axios';

const ADDRESS = 'http://192.168.0.2:5000';

export const restoreUser = async (dispatch) => {
  try {
    setAuthToken(await AsyncStorage.getItem('token'));

    const res = await axios.get(`${ADDRESS}/users`);

    dispatch({
      type: RESTORE_USER,
      user: res.data
    });
  } catch (e) {
    await logoutUser(dispatch);
  }
};

export const registerUser = async (data, dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post(`${ADDRESS}/users/register`, body, config);

    await AsyncStorage.setItem('token', res.data.token);

    await restoreUser(dispatch);

  } catch (e) {
    setErrors(dispatch, extractErrors(e.response.data.errors));
  }
};

export const loginUser = async (data, dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post(`${ADDRESS}/users/login`, body, config);

    await AsyncStorage.setItem('token', res.data.token);

    await restoreUser(dispatch);

  } catch (e) {
    setErrors(dispatch, extractErrors(e.response.data.errors));
  }
};

export const logoutUser = async (dispatch) => {
  try {
    await AsyncStorage.removeItem('token');

    dispatch({
      type: LOGOUT,
    });
  } catch (e) {
    console.error(`logout():\n${e}`);
  }
};

