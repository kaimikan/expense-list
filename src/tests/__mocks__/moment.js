// we can redefine our own version of moment() specifically for testing
const moment = require.requireActual("moment");

export default (timestamp = 0) => {
  return moment(timestamp);
};
