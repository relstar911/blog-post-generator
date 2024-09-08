import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
