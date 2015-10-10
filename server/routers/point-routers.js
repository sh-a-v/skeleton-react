import _ from 'lodash';
import path from 'path';
import Express from 'express';
import createLocation from 'history/lib/createLocation';
import React from 'react';
import { RoutingContext, match } from 'react-router';

import points from '../../points';


let pointRouters = [];

let createPointRouter = (point) => {
  let pointRouter = Express.Router();

  pointRouter.get('*', async (req, res) => {
    res.send('');

    /*let location    = createLocation(req.baseUrl);
    let pointRoutes = routes[point.name];

    match({ routes: pointRoutes, location }, async (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, `${redirectLocation.pathname}${redirectLocation.search}`);
      } else if (error) {
        res.status(500).send(error.message);
      } else if (renderProps == null) {
        res.status(404).send('Not found');
      } else {
        let html = await serverRender.getHtml({
          point,
          renderProps,
          headers: req.headers,
          path   : req.baseUrl,
          params : req.query
        });

        res.send(html);
      }
    });*/
  });

  return pointRouter;
};

points.forEach(point => {
  let pointRouter = createPointRouter(point);

  pointRouters.push({
    url   : point.url,
    router: pointRouter
  });
});

export default pointRouters;
