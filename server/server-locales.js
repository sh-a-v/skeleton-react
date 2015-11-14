import env from '../env';

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import jsonConcat from 'json-concat';
import hash from 'object-hash';

export default {
  _getFallbackLocale(mainLocale) {
    return mainLocale === 'ru' || mainLocale === 'en' ? null : 'en';
  },

  _getLocaleDirPath(locale) {
    return path.resolve(`./locales/${locale}`);
  },

  _getBuildLocaleJsonFilePath(locale) {
    return path.resolve(`./build/locale.${locale}.build.json`);
  },

  async _createLocaleJson(locale) {
    let localeDir = this._getLocaleDirPath(locale);

    return new Promise((resolve, reject) => {
      fs.readdir(localeDir, (err, files) => {
        if (err) {
          console.log('==> Error read locale dir', err);
          reject(err);
        }

        files = files.map(file => path.join(localeDir, file));

        jsonConcat({
          src : files,
          dest: null
        }, (err, json=JSON.stringify({})) => {
          if (err) {
            console.log('==> Error concat locale json', err);
            reject(err);
          }

          resolve(json);
        })
      });
    });
  },

  async createLocaleJson(locale) {
    let fallbackLocale = this._getFallbackLocale(locale);
    let localeJson;
    let fallbackLocaleJson;

    if (!fallbackLocale) {
      return await this._createLocaleJson(locale);
    }

    await [
      localeJson = this._createLocaleJson(locale),
      fallbackLocaleJson = this._createLocaleJson(fallbackLocale)
    ];

    return _.merge(fallbackLocale, locale);
  },

  async writeLocaleJsonToFile(locale) {
    let localeJsonFilePath = this._getBuildLocaleJsonFilePath(locale);

    return new Promise(async (resolve, reject) => {
      let localeJson = await this.createLocaleJson(locale);

      fs.writeFile(localeJsonFilePath, JSON.stringify(localeJson), {encoding: 'utf8'}, (err) => {
        if (err) {
          console.log('==> Error write locale file', err);
          reject(err);
        }

        resolve();
      });
    });
  },

  async readLocaleJsonFromFile(locale) {
    let localeJsonFilePath = this._getBuildLocaleJsonFilePath(locale);

    return new Promise(function(resolve, reject) {
      fs.readFile(localeJsonFilePath, {encoding: 'utf8'}, (err, data) => {
        if (err) {
          console.log('==> Error read locale file', err);
          reject(err);
        }

        resolve(JSON.parse(data));
      })
    });
  },

  async getLocale(locale) {
    if (env.isDevelopment()) {
      return await this.createLocaleJson(locale);
    }

    return await this.readLocaleJsonFromFile(locale);
  }
};
