import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
  figmaId?: string;
  authType: 'local' | 'figma';
  subscribe?: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    figmaId: {
      type: String,
      unique: true,
      sparse: true,
    },
    authType: {
      type: String,
      enum: ['local', 'figma'],
      required: true,
      default: 'local',
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Создание модели
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
