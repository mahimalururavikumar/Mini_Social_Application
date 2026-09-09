import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Denormalized so the feed never has to populate() the user on every read
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    user: 
    { type: mongoose.Schema.Types.ObjectId,
         ref: "User", required: true 
    },
    username: 
    { 
        type: String, 
        required: true 
    },
    text: 
    {
         type: String, 
         required: true, 
         trim: true, 
         maxlength: 500 
    },
  },
  { timestamps: true, _id: true }
);

postSchema.pre("validate", function (next) {
  if (!this.text && !this.imageUrl) {
    return next(new Error("A post must contain text, an image, or both."));
  }
  next();
});

postSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});
postSchema.virtual("commentsCount").get(function () {
  return this.comments.length;
});
postSchema.set("toJSON", { virtuals: true });

postSchema.index({ createdAt: -1, _id: -1 });

const Post = mongoose.model("Post", postSchema);

export default Post;