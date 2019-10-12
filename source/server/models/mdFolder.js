/**
 * Author: TaiGuangYin
 * Created Time: 2019-10-07
 * Description: markdown 目录
 */
const mongoose = require('../utils/mongoose').mongoose;
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    title:  String,
    userid: { type: Number, index: true },
    children: Object,
    expand: {type: Boolean, default: false},
    selected: {type: Boolean, default: false}
});

const Folder = mongoose.model('Folder', folderSchema);

/**
 * 添加目录
 * @param title
 * @param userid
 * @param pid
 * @returns {Promise|Promise<this>}
 */
function create(title,userid,pid) {
    const folder = new Folder({ title: title ,userid: userid, pid: pid});
    return folder.save();
}


/**
 * 根据文档查找
 * @param id
 * @returns {Promise<Model|null>|Promise<Model>}
 */
function findById(id) {
    return Folder.findById(id)
}

/**
 * 根据用户ID查找
 * @param id
 * @returns {Promise<Model|null>|Promise<Model>}
 */
function findByUserid(userid) {
    return Folder.find({
        userid: userid
    }).exec();
}

/**
 * 更新名称
 * @param id
 * @param title
 * @returns {Query|void}
 */
function update(id,title){
    return Folder.findOneAndUpdate(id, { title: title });
}

exports.create = create;
exports.findById = findById;
exports.findByUserid = findByUserid;
exports.update = update;
