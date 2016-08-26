var mongoose = require('mongoose');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

module.exports = new mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email is required"]
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    picture: {
      type: String,
      required: true,
      match: /^http:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true },
    cart: [{
      product: {
        type: mongoose.Schema.Types.ObjectId
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }]
  }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
