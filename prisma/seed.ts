import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding database...');

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Toán học' },
      update: {},
      create: { name: 'Toán học', description: 'Mathematics - Khoa học về số, lượng và không gian', color: '#3B82F6', icon: '∑' },
    }),
    prisma.category.upsert({
      where: { name: 'Vật lý' },
      update: {},
      create: { name: 'Vật lý', description: 'Physics - Khoa học về vật chất, năng lượng và lực', color: '#EF4444', icon: '⚛' },
    }),
    prisma.category.upsert({
      where: { name: 'Hóa học' },
      update: {},
      create: { name: 'Hóa học', description: 'Chemistry - Khoa học về chất và phản ứng hóa học', color: '#10B981', icon: '⚗' },
    }),
    prisma.category.upsert({
      where: { name: 'Sinh học' },
      update: {},
      create: { name: 'Sinh học', description: 'Biology - Khoa học về sự sống', color: '#84CC16', icon: '🧬' },
    }),
    prisma.category.upsert({
      where: { name: 'Triết học' },
      update: {},
      create: { name: 'Triết học', description: 'Philosophy - Tư tưởng về bản chất của thực tại', color: '#8B5CF6', icon: '☯' },
    }),
    prisma.category.upsert({
      where: { name: 'Lịch sử' },
      update: {},
      create: { name: 'Lịch sử', description: 'History - Nghiên cứu về quá khứ', color: '#F59E0B', icon: '📜' },
    }),
    prisma.category.upsert({
      where: { name: 'Địa lý' },
      update: {},
      create: { name: 'Địa lý', description: 'Geography - Khoa học về Trái Đất', color: '#06B6D4', icon: '🌍' },
    }),
  ]);

  // Countries
  const countries = await Promise.all([
    prisma.country.upsert({
      where: { name: 'Hy Lạp cổ đại' },
      update: {},
      create: { name: 'Hy Lạp cổ đại', code: 'GRC', region: 'Châu Âu', description: 'Nôi của triết học và toán học phương Tây' },
    }),
    prisma.country.upsert({
      where: { name: 'Trung Quốc' },
      update: {},
      create: { name: 'Trung Quốc', code: 'CHN', region: 'Châu Á', description: 'Nền văn minh cổ xưa' },
    }),
    prisma.country.upsert({
      where: { name: 'Ấn Độ' },
      update: {},
      create: { name: 'Ấn Độ', code: 'IND', region: 'Châu Á', description: 'Cái nôi của toán học phương Đông' },
    }),
    prisma.country.upsert({
      where: { name: 'Anh' },
      update: {},
      create: { name: 'Anh', code: 'GBR', region: 'Châu Âu', description: 'Trung tâm cách mạng khoa học' },
    }),
    prisma.country.upsert({
      where: { name: 'Đức' },
      update: {},
      create: { name: 'Đức', code: 'DEU', region: 'Châu Âu', description: 'Trung tâm triết học và khoa học' },
    }),
  ]);

  // Knowledge Entries
  const pythagoras = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định lý Pythagoras',
      description: 'Định lý về tam giác vuông',
      content: 'Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông: a² + b² = c²',
      year: 500,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[0].id, isPrimary: true }]
      }
    }
  });

  const confucius = await prisma.knowledgeEntry.create({
    data: {
      title: 'Triết học Khổng Tử',
      description: 'Nền tảng của Nho giáo',
      content: 'Khổng Tử đề xướng học thuyết về đạo đức, nhân nghĩa, lễ giáo',
      year: 551,
      isBc: true,
      importanceLevel: 5,
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[1].id, isPrimary: true }]
      }
    }
  });

  const newton = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định luật vạn vật hấp dẫn',
      description: 'Isaac Newton khám phá lực hấp dẫn',
      content: 'Mọi vật thể trong vũ trụ đều hút nhau với lực tỉ lệ thuận với khối lượng và tỉ lệ nghịch với bình phương khoảng cách',
      year: 1687,
      isBc: false,
      importanceLevel: 5,
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const einstein = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết tương đối hẹp',
      description: 'Albert Einstein cách mạng hóa vật lý',
      content: 'Thời gian và không gian là tương đối, E=mc². Vận tốc ánh sáng là hằng số tuyệt đối',
      year: 1905,
      isBc: false,
      importanceLevel: 5,
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  // Relationship: Einstein builds upon Newton
  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: einstein.id,
      targetId: newton.id,
      relationshipType: 'builds_upon',
      description: 'Thuyết tương đối mở rộng và điều chỉnh định luật Newton ở vận tốc cao'
    }
  });

  console.log('✅ Seeding completed!');
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${countries.length} countries`);
  console.log(`Created 4 knowledge entries with relationships`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
