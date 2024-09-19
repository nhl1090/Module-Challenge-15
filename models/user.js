const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    first: String,
    last: String,
    age: Number,
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('fullName')
  .get(function () {
    return `${this.first} ${this.last}`;
  })

  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

const User = model('user', userSchema);

module.exports = User;