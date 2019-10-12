/**
 * Author: TaiGuangYin
 * Created Time: 2019-10-07
 * Description: markdown 文档
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});
