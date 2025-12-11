import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceId, targetId, relationshipType, description } = body;

    // Validate required fields
    if (!sourceId || !targetId || !relationshipType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate relationship type
    const validTypes = ['influences', 'builds_upon', 'contradicts', 'related_to'];
    if (!validTypes.includes(relationshipType)) {
      return NextResponse.json(
        { error: 'Invalid relationship type' },
        { status: 400 }
      );
    }

    // Check if both entries exist
    const [source, target] = await Promise.all([
      prisma.knowledgeEntry.findUnique({ where: { id: sourceId } }),
      prisma.knowledgeEntry.findUnique({ where: { id: targetId } }),
    ]);

    if (!source || !target) {
      return NextResponse.json(
        { error: 'Source or target entry not found' },
        { status: 404 }
      );
    }

    // Check if relationship already exists
    const existingRelationship = await prisma.knowledgeRelationship.findFirst({
      where: {
        sourceId,
        targetId,
        relationshipType,
      },
    });

    if (existingRelationship) {
      return NextResponse.json(
        { error: 'Relationship already exists' },
        { status: 409 }
      );
    }

    // Create the relationship
    const relationship = await prisma.knowledgeRelationship.create({
      data: {
        sourceId,
        targetId,
        relationshipType,
        description,
      },
      include: {
        source: {
          include: {
            categories: { include: { category: true } },
            countries: { include: { country: true } },
          },
        },
        target: {
          include: {
            categories: { include: { category: true } },
            countries: { include: { country: true } },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: relationship,
    });
  } catch (error) {
    console.error('Error creating relationship:', error);
    return NextResponse.json(
      { error: 'Failed to create relationship' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Relationship ID is required' },
        { status: 400 }
      );
    }

    await prisma.knowledgeRelationship.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting relationship:', error);
    return NextResponse.json(
      { error: 'Failed to delete relationship' },
      { status: 500 }
    );
  }
}
