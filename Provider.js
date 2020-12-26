import React, { createContext, useReducer } from 'react';
import { RESTORE_USER, LOGIN, LOGOUT, SET_TODO, SET_ERRORS } from "./actions";
import isEmpty from "./utils/isEmpty";

const initialState = {
  isLoading: true,
  isAuth: false,
  user: {},
  todoItems: [],
  errors: {},
};

const Store = createContext(initialState);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case RESTORE_USER:
        return {
          ...oldState,
          isAuth: !isEmpty(action.user),
          user: action.user,
          isLoading: false,
        };
      case LOGIN:
        return {
          ...oldState,
          isAuth: true,
          user: action.user
        };
      case LOGOUT:
        return {
          ...oldState,
          isAuth: false,
          isLoading: false,
          user: {}
        };
      case SET_TODO:
        return {
          ...oldState,
          todoItems: action.todoItems
        };
      case SET_ERRORS:
        return {
          ...oldState,
          errors: action.errors
        };
    }
  }, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      { children }
    </Store.Provider>
  )
};

export { Store };
export default Provider;