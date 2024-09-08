import mongoose, { Schema, Document } from 'mongoose';

export interface PostViewDocument extends Document {
  post: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PostViewSchema: Schema = new Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<PostViewDocument>('PostView', PostViewSchema);
