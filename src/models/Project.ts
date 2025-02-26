import mongoose, { Schema, Document } from 'mongoose';

export interface ITask {
  _id?: string;
  name: string;
  description?: string | null;
  device: 'browser' | 'app';
  protoUrl: string;
  target: string;
}

export interface IProject extends Document {
  protoUrl: string;
  owner: string;
  name: string;
  image?: string | null;
  views: number;
  visit: Date | null;
  tasks?: ITask[];
}

const TaskSchema: Schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String, default: null },
    device: { type: String, enum: ['browser', 'app'], default: 'app' },
    protoUrl: { type: String, required: true },
    target: { type: String, required: true },
  },
  { _id: true }
);

const ProjectSchema: Schema<IProject> = new Schema(
  {
    protoUrl: { type: String, required: true },
    owner: { type: String, required: true },
    name: { type: String, default: 'New project' },
    image: { type: String, default: null },
    views: { type: Number, default: 0 },
    visit: { type: Date, default: null },
    tasks: { type: [TaskSchema], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
