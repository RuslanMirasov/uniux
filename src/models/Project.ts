import mongoose, { Schema, Document } from 'mongoose';

export interface ITask {
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
  tasks?: ITask[];
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    protoUrl: { type: String, required: true },
    owner: { type: String, required: true },
    name: { type: String, default: 'New project' },
    image: { type: String, default: null },
    tasks: {
      type: [
        {
          name: { type: String, required: true },
          description: { type: String, default: null },
          device: { type: String, default: 'app' },
          protoUrl: { type: String, required: true },
          target: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
