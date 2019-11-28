const mongoose = require('mongoose');
const dbConf = require('../config/db.conf');

class DB {
  constructor() {}
  connect() {
    mongoose.connect(`mongodb://${dbConf.HOST}:${dbConf.PORT}/${dbConf.DBNAME}`,  {
      useNewUrlParser: true,
      useFindAndModify: false /** findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify */
    })
      .then(() => {
        console.log('mongodb connect successfully')
      })
  }
}

module.exports = new DB()
