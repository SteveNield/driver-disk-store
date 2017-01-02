var config = {};

config.database = {
  uri: process.env.DATABASE_URI || 'mongodb://dbadmin:31zKgC1NV@52.169.117.44:27017/driver-disk-store-integration'//'mongodb://driver-disk-store-db:979ThzU56U@localhost:27017/driver-disk-store'
}

module.exports = config;
