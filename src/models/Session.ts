import mongoose, { Schema, Document } from 'mongoose';

export type IUser = {
  name: string | null;
  email: string | null;
  image: string | null;
};

export type ITask = {
  _id: string | null;
  device: 'browser' | 'app';
  taskName: string | null;
  protoUrl: string | null;
  description: string | null;
};

export type IClick = {
  time: number;
  x: number;
  y: number;
  scroll: number;
};

export interface ISession extends Document {
  project: string | null;
  status: 'done' | 'fail' | null;
  video: string | null;
  clicks: IClick[];
  user: IUser;
  task: ITask;
}

export type ISessionState = Omit<ISession, keyof Document>;

const SessionSchema: Schema<ISession> = new Schema(
  {
    project: { type: String, default: null },
    status: { type: String, enum: ['done', 'fail', null], default: null },
    video: { type: String, default: null },
    clicks: { type: [{ time: Number, x: Number, y: Number, scroll: Number }], default: [] },
    user: {
      name: { type: String, default: null },
      email: { type: String, default: null },
      image: { type: String, default: null },
    },
    task: {
      _id: { type: String, default: null },
      taskName: { type: String, default: null },
      description: { type: String, default: null },
      device: { type: String, enum: ['browser', 'app'], default: 'app' },
      protoUrl: { type: String, default: null },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Session = mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);

export default Session;
