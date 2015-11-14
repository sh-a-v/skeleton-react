import Express from 'express';

import serverLocales from '../server-locales';

let localeRouter = Express.Router();

localeRouter.get('/:locale', async (req, res) => {
  let localeJson = await serverLocales.getLocale(req.params.locale);
  res.json(localeJson);
});

export default localeRouter;
