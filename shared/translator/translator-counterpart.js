import { Instance as Counterpart } from 'counterpart';

import { GLOBAL_PARAMS } from 'shared/global-params';

let translator = new Counterpart();

if (GLOBAL_PARAMS.initialState) {
  let locales       = GLOBAL_PARAMS.initialState.locales;
  let currentLocale = locales.currentLocale;

  translator.registerTranslations(currentLocale, locales[currentLocale]);
  translator.setLocale(currentLocale);
}

export default translator;
