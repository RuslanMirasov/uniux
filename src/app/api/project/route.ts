import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { getMetaFromUrl } from '@/lib/getMetaFromUrl';
import Project from '@/models/Project';
import User from '@/models/User';

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const userId = await User.findOne({ email: session?.user?.email }).select('_id');
    const projects = await Project.find({ owner: userId._id }).select('_id name image updatedAt');

    if (!projects) {
      return NextResponse.json({ message: 'projects not found' }, { status: 404 });
    }

    return NextResponse.json(projects, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const { owner, protoUrl } = await req.json();
    if (!owner || !protoUrl) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const project = await Project.findOne({ protoUrl, owner });
    if (project) {
      return NextResponse.json({ message: 'Project already exist' }, { status: 409 });
    }

    const metaFromUrl = await getMetaFromUrl(protoUrl);
    const { name, image } = metaFromUrl;

    const newProject = await Project.create({ protoUrl, owner, name, image });
    return NextResponse.json({ message: 'Project created successfully', project: newProject }, { status: 201 });
  } catch (error) {
    console.log('Create New Project ERROR: ', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
