console.log('this is loaded');

exports.mysql = {
  id: process.env.MYSQL_USER,
  secret: process.env.MYSQL_PASS
};