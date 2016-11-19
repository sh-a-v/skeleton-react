import Express from 'express';

const appRouter = Express.Router();

appRouter.get('*', (req, res) => {
  res.status(200).send('yo');
});

export default appRouter;
