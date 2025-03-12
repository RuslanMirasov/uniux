import mongoose, { Schema, Document } from 'mongoose';

export type ITask = {
  _id: string;
  device: 'browser' | 'app';
  taskName: string;
  protoUrl: string;
  description: string;
  target: string;
};

export interface IProject extends Document {
  protoUrl: string;
  owner: string;
  name: string;
  image?: string | null;
  views: number;
  visit: Date | null;
  tasks?: ITask[];
}

export type IProjectData = Omit<IProject, keyof mongoose.Document> & {
  _id: string;
};

const TaskSchema: Schema = new Schema({
  _id: { type: String, required: true },
  taskName: { type: String, required: true },
  description: { type: String, required: true },
  device: { type: String, enum: ['browser', 'app'], default: 'app' },
  protoUrl: { type: String, required: true },
  target: { type: String, required: true },
});

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
