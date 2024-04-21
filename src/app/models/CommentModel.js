const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    replys: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        replyContent: { type: String, require: true },
        addedAt: { type: String },
      },
    ],
    addedAt: { type: String },
  },
  {
    timestamps: { type: Date },
  },
);

// Add plugins

module.exports = mongoose.model('Comment', commentSchema);
