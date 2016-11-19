import Express from 'express';
import colors from 'colors/safe';

import appRouter from './routers/app-router';

const app = Express();

app.use('*', appRouter);

/* Run */
console.info(colors.blue.bold(`Run express server..`));
const server = app.listen(3000, () => {
  console.info(colors.green.bold(`Server is running`));
});
