import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    const countryId = searchParams.get('countryId');
    const yearFrom = searchParams.get('yearFrom');
    const yearTo = searchParams.get('yearTo');
    const isBc = searchParams.get('isBc');
    const search = searchParams.get('search');

    const where: any = {};

    if (categoryId) {
      where.categories = {
        some: { categoryId }
      };
    }

    if (countryId) {
      where.countries = {
        some: { countryId }
      };
    }

    if (yearFrom) {
      where.year = { ...where.year, gte: parseInt(yearFrom) };
    }

    if (yearTo) {
      where.year = { ...where.year, lte: parseInt(yearTo) };
    }

    if (isBc !== null && isBc !== undefined) {
      where.isBc = isBc === 'true';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];
    }

    const entries = await prisma.knowledgeEntry.findMany({
      where,
      include: {
        categories: {
          include: { category: true }
        },
        countries: {
          include: { country: true }
        },
        tags: {
          include: { tag: true }
        }
      },
      orderBy: [
        { isBc: 'desc' },
        { year: 'asc' }
      ]
    });

    return NextResponse.json({ success: true, data: entries });
  } catch (error: any) {
    console.error('Error fetching knowledge entries:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, content, year, month, day, isBc, approximateDate, importanceLevel, source, categories, countries, tags } = body;

    const entry = await prisma.knowledgeEntry.create({
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

    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating knowledge entry:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
