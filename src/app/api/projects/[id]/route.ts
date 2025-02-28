import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const project = await Project.findById(id).select('_id name tasks owner views visit');
    if (!project) return NextResponse.json({ error: 'Project not found!' }, { status: 404 });

    const session = await getServerSession();
    let updateData = {};

    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email }).select('_id');

      if (user && user._id.toString() === project.owner) {
        updateData = { visit: new Date() };
      } else {
        updateData = { views: project.views + 1 };
      }
    } else {
      updateData = { views: project.views + 1 };
    }

    await Project.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(
      {
        _id: project._id,
        name: project.name,
        tasks: project.tasks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Get Single project error: ', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
