import points from '../points';

let entry = {
  vendor: [
    'react'
  ]
};

points.forEach(point => {
  entry[point.name] = point.path;
});

export default entry;
