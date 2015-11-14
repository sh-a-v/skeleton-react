import {
  USER_LOAD,
  USER_LOAD_SUCCESS,
  USER_LOAD_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS
} from 'client/shared/actions/action-types';

const initialState = {
  data: {
    login : '',
    email : '',
    locale: 'en'
  },
  auth   : false,
  loading: false,
  loaded : false,
  error  : null
};

export default function user(state=initialState, action={}) {
  switch (action.type) {

    case USER_LOAD:
      return {
        ...state,
        loading: true
      };

    case USER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded : true,
        data   : action.data,
        error  : null
      };

    case USER_LOAD_ERROR:
      return {
        ...state,
        loading: false,
        loaded : false,
        error  : action.error
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        auth   : true,
        loading: false,
        loaded : true,
        data   : action.data
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        auth   : false,
        loading: false,
        loaded : false,
        data   : null
      };

    default:
      return state;

  }
};
