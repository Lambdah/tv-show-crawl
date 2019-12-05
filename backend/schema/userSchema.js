var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var showSchema = new Schema({
    title: {type: String},
    subscribeTime: {type: Date, default: Date.now}
});
var userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    subscribedShows:{
        type: [showSchema]
    }
});

userSchema.path('email').validate({
   validator: function(v){
       return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$.test(v)
   },
    message: props => `${props.value} is not a valid email`
});
userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

module.exports = User;