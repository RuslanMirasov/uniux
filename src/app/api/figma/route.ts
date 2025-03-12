import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileKey = searchParams.get('fileKey');
  const nodeId = searchParams.get('nodeId');

  if (!fileKey || !nodeId) {
    return NextResponse.json({ error: 'Missing fileKey or nodeId' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_PERSONAL_ACCESS_TOKEN!,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data from Figma API' }, { status: response.status });
    }

    const data = await response.json();
    const node = data.nodes[nodeId];

    if (!node) {
      return NextResponse.json({ error: 'Node not found' }, { status: 404 });
    }

    return NextResponse.json({ name: node.document.name });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
