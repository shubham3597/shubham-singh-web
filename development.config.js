const init = () => {
    process.env.NODE_ENV = 'development';
    process.env.PORT = '8080';
    process.env.host = `http://localhost:${process.env.PORT}/`;
    process.env.dbURL = 'mongodb://127.0.0.1:27017/shubham-singh';
    process.env.FILE_UPLOAD_FOLDER = `${__dirname}/uploads/`;
  };
  
  module.exports = { init };
  