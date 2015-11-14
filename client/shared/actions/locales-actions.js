import fetchWrapper from 'shared/tools/fetch-wrapper';

import {
  LOCALE_CHANGED,
  LOCALE_LOAD,
  LOCALE_LOAD_SUCCESS,
  LOCALE_LOAD_ERROR
} from 'client/shared/actions/action-types';

export function set(translator, locale, existLocales) {
  if (existLocales && existLocales[locale]) {
    translator.setLocale(locale);

    return dispatch => {
      dispatch({
        type: LOCALE_CHANGED,
        locale: locale
      });
    };
  }

  return async dispatch => {
    const uri = `/locales/${locale}`;

    await fetchWrapper.fetch(uri, {
      method: 'get'
    })
    .then(res => res.json())
    .then(res => dispatch({
      type: LOCALE_LOAD_SUCCESS,
      translations: res,
      locale: locale
    }))
    .then(res => {
      translator.registerTranslations(locale, res.translations);
      translator.setLocale(locale);
    })
    .catch(error => {
      console.log('==> locales load error:', error);

      dispatch({
        type: LOCALE_LOAD_ERROR,
        error: error,
        locale: locale
      })
    })
  };
}
