const { Pool } = require('pg');
const keys = require('./../../config/keys');

//connectionString to our postgresURL
const pool = new Pool({
  connectionString: keys.postgres.pgURI
});

//Export object with query method
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}