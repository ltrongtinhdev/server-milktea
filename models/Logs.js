const mongoose = require('mongoose')


const LogSchema = new mongoose.Schema({
    ip: Array,
    action: String,
    role: String
},{timestamps: true})
LogSchema.set('toJson',{
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})
const LogMongo = mongoose.model('logmongo',LogSchema)

module.exports = LogMongo