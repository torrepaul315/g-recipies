
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/g_recipies',
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
