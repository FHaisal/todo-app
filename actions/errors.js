import { SET_ERRORS } from './types';

export const setErrors = (dispatch, errors={}) => dispatch({ type: SET_ERRORS, errors });