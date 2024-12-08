import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string | null;
  handle?: string | null;
  img_url?: string | null;
  figmaId?: string | null;
  authType?: 'local' | 'figma';
  subscribe?: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: null },
    handle: { type: String, required: true, default: null },
    img_url: { type: String, required: true, default: null },
    figmaId: { type: String, required: true, unique: true, sparse: true },
    authType: { type: String, required: true, enum: ['local', 'figma'], default: 'local' },
    subscribe: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
