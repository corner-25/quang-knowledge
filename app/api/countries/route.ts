import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      include: {
        _count: {
          select: { knowledgeCountries: true }
        }
      },
      orderBy: [
        { region: 'asc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json({ success: true, data: countries });
  } catch (error: any) {
    console.error('Error fetching countries:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const country = await prisma.country.create({
      data: body
    });

    return NextResponse.json({ success: true, data: country }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating country:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
