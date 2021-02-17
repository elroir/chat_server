const { Schema, model } = require('mongoose');

//Cambiar a la BD SQL
const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true        
    },
    message: {
        type: String,
        required: true
    }

}, {
    timestamps:true
});

MessageSchema.method('toJSON', function() {
    const { __v, _id, password, ...object} = this.toObject();
    return object;
});

module.exports = model('Message', MessageSchema);