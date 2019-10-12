/**
 * Author: TaiGuangYin
 * Created Time: 2019-10-07
 * Description: mongoose 封装
 */
const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.MONGODB.url, {useUnifiedTopology: true,useNewUrlParser: true})
    .then(() => console.log('Mongodb Connected!'))
    .catch(err => {
        console.log('mongodb connect error:',err);
    });

mongoose.set('useCreateIndex', true)

exports.mongoose = mongoose;
