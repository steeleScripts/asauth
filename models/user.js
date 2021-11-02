const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true } 
    }, { timestamps: true });

UserSchema.pre('save', function(next){ 
    var user = this; 

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next;

    // Generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrpyt.hash(user.password, salt, function(err, hash){ 
            if(err) return next(err);

            // Override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);