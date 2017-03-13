
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/g-recipies',
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
