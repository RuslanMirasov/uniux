import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Project, { IProjectData } from '@/models/Project';

export const getProjectById = async (id: string): Promise<IProjectData | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  await dbConnect();
  const project = await Project.findById(id).lean<IProjectData>();

  if (!project || Array.isArray(project)) return null;

  return {
    ...project,
    _id: project._id.toString(),
  };
};
