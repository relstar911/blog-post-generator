import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  bio?: string;
  location?: string;
  website?: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String },
  location: { type: String },
  website: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);
