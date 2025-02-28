import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { getMetaFromUrl } from '@/lib/getMetaFromUrl';
import Project from '@/models/Project';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findOne({ email: session?.user?.email }).select('_id');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { search, sort = 'createdAt', order = 'desc' } = Object.fromEntries(req.nextUrl.searchParams);

    const filter: Record<string, unknown> = { owner: user._id };
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions: Record<string, 1 | -1> = { [sort]: sortOrder };

    const projects = await Project.find(filter).sort(sortOptions).select('_id name image views updatedAt');

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
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
