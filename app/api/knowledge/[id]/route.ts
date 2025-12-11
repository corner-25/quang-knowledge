import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entry = await prisma.knowledgeEntry.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        countries: { include: { country: true } },
        tags: { include: { tag: true } }
      }
    });

    if (!entry) {
      return NextResponse.json(
        { success: false, error: 'Knowledge entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: entry });
  } catch (error: any) {
    console.error('Error fetching knowledge entry:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, content, year, month, day, isBc, approximateDate, importanceLevel, source, categories, countries, tags } = body;

    // Delete existing relations
    await prisma.knowledgeCategory.deleteMany({ where: { knowledgeId: id } });
    await prisma.knowledgeCountry.deleteMany({ where: { knowledgeId: id } });
    await prisma.knowledgeTag.deleteMany({ where: { knowledgeId: id } });

    // Update entry with new relations
    const entry = await prisma.knowledgeEntry.update({
      where: { id },
      data: {
        title,
        description,
        content,
        year: parseInt(year),
        month: month ? parseInt(month) : null,
        day: day ? parseInt(day) : null,
        isBc: isBc || false,
        approximateDate: approximateDate || false,
        importanceLevel: importanceLevel || 3,
        source,
        categories: categories ? {
          create: categories.map((c: any) => ({
            categoryId: c.id,
            isPrimary: c.isPrimary || false
          }))
        } : undefined,
        countries: countries ? {
          create: countries.map((c: any) => ({
            countryId: c.id,
            isPrimary: c.isPrimary || false
          }))
        } : undefined,
        tags: tags ? {
          create: tags.map((t: any) => ({
            tag: {
              connectOrCreate: {
                where: { name: t.name },
                create: { name: t.name }
              }
            }
          }))
        } : undefined
      },
      include: {
        categories: { include: { category: true } },
        countries: { include: { country: true } },
        tags: { include: { tag: true } }
      }
    });

    return NextResponse.json({ success: true, data: entry });
  } catch (error: any) {
    console.error('Error updating knowledge entry:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.knowledgeEntry.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Knowledge entry deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting knowledge entry:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
