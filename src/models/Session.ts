import mongoose, { Schema, Document } from 'mongoose';

type IUser = {
  name: string | null;
  email: string;
  image: string | null;
};

type ITask = {
  _id: string;
  device: 'browser' | 'app';
  taskName: string;
  protoUrl: string;
  description: string;
};

type IClick = {
  timestamp: number;
  x: number;
  y: number;
};

type IScroll = {
  timestamp: number;
  scrollY: number;
};

export interface ISession extends Document {
  project: string;
  status: 'done' | 'fail' | 'start' | 'info' | null;
  video: string | null;
  scroll: IScroll[];
  clicks: IClick[];
  user: IUser;
  task: ITask;
}

const SessionSchema: Schema<ISession> = new Schema(
  {
    project: { type: String, required: true },
    status: { type: String, enum: ['done', 'fail', 'start', 'info'], default: null },
    video: { type: String, default: null },
    scroll: { type: [{ timestamp: Number, scrollY: Number }], default: [] },
    clicks: { type: [{ timestamp: Number, x: Number, y: Number }], default: [] },
    user: {
      name: { type: String, default: null },
      email: { type: String, required: true },
      image: { type: String, default: null },
    },
    task: {
      _id: { type: String, required: true },
      taskName: { type: String, required: true },
      description: { type: String, required: true },
      device: { type: String, enum: ['browser', 'app'], required: true },
      protoUrl: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Session = mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);

export default Session;
