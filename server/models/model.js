const { Pool } = require('pg');

const PG_URI = 'postgres://vmsjoeqc:dmT_b24FWCj-qhrlJHBNMALET1-7oANE@rajje.db.elephantsql.com/vmsjoeqc'

//connectionString to our postgresURL
const pool = new Pool({
  connectionString: PG_URI
});

//Export object with query method
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}