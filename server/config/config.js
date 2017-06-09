module.exports = {
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nine-jewels'
};