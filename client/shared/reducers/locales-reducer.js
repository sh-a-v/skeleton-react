import {
  LOCALE_CHANGED,
  LOCALE_LOAD,
  LOCALE_LOAD_SUCCESS,
  LOCALE_LOAD_ERROR
} from 'client/shared/actions/action-types';

const initialState = {
  ru: null,
  en: null,
  currentLocale: 'en',
  loaded : false,
  loading: false,
  error  : null
};

export default function locales(state=initialState, action={}) {
  switch (action.type) {

    case LOCALE_CHANGED:
      return {
        ...state,
        currentLocale: action.locale
      };

    case LOCALE_LOAD:
      return {
        ...state,
        loading: true
      };

    case LOCALE_LOAD_SUCCESS:
      return {
        ...state,
        [action.locale]: action.translations,
        currentLocale  : action.locale,
        loaded : true,
        loading: false,
        error  : null
      };

    case LOCALE_LOAD_ERROR:
      return {
        ...state,
        loaded : false,
        loading: false,
        error  : action.error
      };

    default:
      return state;

  }
}
