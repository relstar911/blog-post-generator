import mongoose, { Schema, Document } from 'mongoose';

export interface BlogPostDocument extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  likes: number;
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  viewCount: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<BlogPostDocument>('BlogPost', BlogPostSchema);
