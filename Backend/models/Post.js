import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { _id: false, timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true, _id: true }
);

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
    imagePublicId: {
      type: String,
      default: "",
    },
    likes: {
      type: [likeSchema],
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

postSchema.pre("validate", function () {
  if (!this.text && !this.imageUrl) {
    throw new Error("A post must contain text, an image, or both.");
  }
});

postSchema.virtual("likesCount").get(function () {
  return this.likes ? this.likes.length : 0;
});

postSchema.virtual("commentsCount").get(function () {
  return this.comments ? this.comments.length : 0;
});

postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

postSchema.index({ createdAt: -1, _id: -1 });

const Post = mongoose.model("Post", postSchema);

export default Post;