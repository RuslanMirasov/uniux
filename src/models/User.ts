import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Интерфейс для документа пользователя
export interface IUser extends Document {
  email: string;
  password?: string | null;
  handle?: string | null;
  img_url?: string | null;
  figmaId?: string | null;
  authType?: 'local' | 'figma';
  subscribe?: boolean;
  comparePassword(password: string): Promise<boolean>;
}

// Схема пользователя
const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    handle: { type: String, default: null },
    img_url: { type: String, default: null },
    figmaId: { type: String, sparse: true },
    authType: { type: String, enum: ['local', 'figma'], default: 'local' },
    subscribe: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Хэширование пароля перед сохранением
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error); // Передаем ошибку дальше
  }
});

// Метод для проверки пароля
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  if (!this.password) return false; // Если пароля нет, возвращаем false
  return bcrypt.compare(password, this.password);
};

// Модель пользователя
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
