const mongoose = require('mongoose');

const dbConn = async() => {
  try{
    await mongoose.connect(process.env.DB_CNN);
    console.log('DB ONLINE!');
  } catch (e){
    console.error(e);
    throw new Error('Database error');
  }
}

module.exports = {
  dbConn
}