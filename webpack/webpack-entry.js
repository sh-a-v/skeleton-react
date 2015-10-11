import points, { commonVendor } from '../points';

let entry = {
  vendor: commonVendor
};

points.forEach(point => {
  entry[point.name] = point.path;
});

export default entry;
