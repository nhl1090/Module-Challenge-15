const { Schema, model } = require('mongoose');

// Schema to create Thought/Post model
const thoughtSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    text: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `thoughtCount` that gets the amount of comments per user
thoughtSchema
  .virtual('thoughtCount')
  // Getter
  .get(function () {
    return this.thoughts.length;
  });

// Initialize our Thought/Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
