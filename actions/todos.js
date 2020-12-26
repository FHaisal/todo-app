import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_TODO } from "./types";
import { setErrors } from "./errors";
import extractErrors from "../utils/extractErrors";
import axios from 'axios';

const ADDRESS = 'http://192.168.0.2:5000';

export const getTodoItems = async (dispatch) => {
  try {
    const res = await axios.get(`${ADDRESS}/todos`);

    dispatch({
      type: SET_TODO,
      todoItems: res.data
    });

  } catch (e) {
    console.error(`getTodoItems()\n${e}`);
  }
};

export const saveTodoItem = async (todo, dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const body = JSON.stringify({ todo });

  try {
    await axios.post(`${ADDRESS}/todos`, body, config);

    await getTodoItems(dispatch);
  } catch (e) {
    setErrors(dispatch, extractErrors(e.response.data.errors));
  }
};

export const deleteTodoItem = async (todo, dispatch) => {
  try {
    await axios.delete(`${ADDRESS}/todos/${todo._id}`);
    await getTodoItems(dispatch);
  } catch (e) {
    console.error(`deleteTodoItem()\n${e}`);
  }
};

