import env from '../env';
import config from '../config';
import points from '../points';

import Express from 'express';
import path from 'path';

import pointRouters from './routers/point-routers';


let app = Express();

/* Points */
pointRouters.forEach(pointRouter => {
  app.use(pointRouter.url, pointRouter.router);
});

/* Run */
app.listen(config.expressPort, () => {
  console.log(`Express server run on port ${config.expressPort}`);
});
