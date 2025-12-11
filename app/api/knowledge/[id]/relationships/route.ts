import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get relationships where this entry is the source
    const outgoingRelationships = await prisma.knowledgeRelationship.findMany({
      where: { sourceId: id },
      include: {
        target: {
          include: {
            categories: {
              include: { category: true },
            },
            countries: {
              include: { country: true },
            },
          },
        },
      },
    });

    // Get relationships where this entry is the target
    const incomingRelationships = await prisma.knowledgeRelationship.findMany({
      where: { targetId: id },
      include: {
        source: {
          include: {
            categories: {
              include: { category: true },
            },
            countries: {
              include: { country: true },
            },
          },
        },
      },
    });

    // Group by relationship type
    const influences = outgoingRelationships
      .filter((r) => r.relationshipType === 'influences')
      .map((r) => r.target);

    const buildsUpon = outgoingRelationships
      .filter((r) => r.relationshipType === 'builds_upon')
      .map((r) => r.target);

    const contradicts = outgoingRelationships
      .filter((r) => r.relationshipType === 'contradicts')
      .map((r) => r.target);

    const relatedTo = [
      ...outgoingRelationships
        .filter((r) => r.relationshipType === 'related_to')
        .map((r) => r.target),
      ...incomingRelationships
        .filter((r) => r.relationshipType === 'related_to')
        .map((r) => r.source),
    ];

    // Also include reverse relationships
    const influencedBy = incomingRelationships
      .filter((r) => r.relationshipType === 'influences')
      .map((r) => r.source);

    const basedOn = incomingRelationships
      .filter((r) => r.relationshipType === 'builds_upon')
      .map((r) => r.source);

    return NextResponse.json({
      influences,
      buildsUpon,
      contradicts,
      relatedTo,
      influencedBy,
      basedOn,
    });
  } catch (error) {
    console.error('Error fetching relationships:', error);
    return NextResponse.json(
      { error: 'Failed to fetch relationships' },
      { status: 500 }
    );
  }
}
