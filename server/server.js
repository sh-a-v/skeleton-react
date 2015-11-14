import env from '../env';
import config from '../config';

import colors from 'colors/safe';
import path from 'path';
import Express from 'express';

import serverProxy from './server-proxy';
import serverLocales from './server-locales';

import localeRouter from './server-routers/locale-router';
import pointRouters from './server-routers/point-routers';


let app = Express();

/* Proxy */
app.use(config.proxyPath, serverProxy.apiProxy);

/* Assets */
app.use(config.assetsPath, Express.static(path.resolve('./build')));

/* Locales */
app.use(config.localesPath, localeRouter);

/* Points */
pointRouters.forEach(pointRouter => {
  app.use(pointRouter.url, pointRouter.router);
});


/* Run */
console.log(colors.blue.bold(`Run express server..`));
app.listen(config.expressPort, () => {
  console.log(colors.green.bold(`Server is running`));
  console.log(colors.green.bold(`Server address:`), colors.red.bold(`${config.serverAddress}`));
  console.log(colors.green.bold(`Client address:`), colors.red.bold(`${config.clientAddress}\n`));
});
