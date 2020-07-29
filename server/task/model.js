import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    time: { type: Date, required: true },
    status: {type: String, require: true},
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model('Task', schema);