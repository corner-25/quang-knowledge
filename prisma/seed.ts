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

  // More Math Knowledge
  const euclidGeometry = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hình học Euclid',
      description: 'Nền tảng của hình học cổ điển',
      content: 'Euclid viết "Cơ sở" (Elements) - tác phẩm toán học có ảnh hưởng nhất mọi thời đại. Bao gồm 5 tiên đề và phát triển hệ thống hình học logic.',
      year: 300,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Elements - Euclid',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[0].id, isPrimary: true }]
      }
    }
  });

  const zero = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát minh số 0',
      description: 'Khái niệm về số không',
      content: 'Người Ấn Độ phát minh ký hiệu số 0 và sử dụng nó như một con số. Đây là bước tiến cách mạng trong toán học, cho phép hệ thống số thập phân hoạt động.',
      year: 500,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Indian Mathematics',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[2].id, isPrimary: true }]
      }
    }
  });

  const algebra = await prisma.knowledgeEntry.create({
    data: {
      title: 'Đại số cổ điển',
      description: 'Al-Khwarizmi và sự ra đời của Đại số',
      content: 'Nhà toán học Ba Tư Al-Khwarizmi viết "Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala" - đặt nền móng cho đại số. Từ "algebra" bắt nguồn từ "al-jabr".',
      year: 820,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Al-Khwarizmi',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const calculus = await prisma.knowledgeEntry.create({
    data: {
      title: 'Giải tích (Calculus)',
      description: 'Newton và Leibniz phát minh giải tích',
      content: 'Isaac Newton và Gottfried Leibniz độc lập phát triển giải tích - công cụ toán học nghiên cứu sự thay đổi liên tục. Bao gồm đạo hàm và tích phân.',
      year: 1665,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Newton & Leibniz',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const complexNumbers = await prisma.knowledgeEntry.create({
    data: {
      title: 'Số phức',
      description: 'Giải phương trình bậc cao với căn số âm',
      content: 'Gerolamo Cardano giới thiệu số phức (dạng a + bi, với i² = -1) để giải phương trình bậc ba. Euler sau này phát triển công thức e^(iπ) + 1 = 0.',
      year: 1545,
      isBc: false,
      approximateDate: true,
      importanceLevel: 4,
      source: 'Cardano - Ars Magna',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const probability = await prisma.knowledgeEntry.create({
    data: {
      title: 'Lý thuyết xác suất',
      description: 'Pascal và Fermat đặt nền móng xác suất',
      content: 'Blaise Pascal và Pierre de Fermat trao đổi thư từ về "vấn đề chia điểm" trong trò chơi, đặt nền tảng cho lý thuyết xác suất hiện đại.',
      year: 1654,
      isBc: false,
      importanceLevel: 5,
      source: 'Pascal-Fermat Correspondence',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const nonEuclidean = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hình học phi Euclid',
      description: 'Lobachevsky và hình học hyperbolic',
      content: 'Nikolai Lobachevsky phát triển hình học phi Euclid, chứng minh có thể tồn tại hình học khác ngoài hình học Euclid bằng cách thay đổi tiên đề về đường song song.',
      year: 1829,
      isBc: false,
      importanceLevel: 4,
      source: 'Lobachevsky',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const setTheory = await prisma.knowledgeEntry.create({
    data: {
      title: 'Lý thuyết tập hợp',
      description: 'Georg Cantor và vô cực',
      content: 'Georg Cantor phát triển lý thuyết tập hợp, chứng minh có nhiều "kích thước" vô cực khác nhau. Đây là nền tảng của toán học hiện đại.',
      year: 1874,
      isBc: false,
      importanceLevel: 5,
      source: 'Cantor - Set Theory',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const godelTheorem = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định lý bất toàn Gödel',
      description: 'Giới hạn của toán học',
      content: 'Kurt Gödel chứng minh rằng trong bất kỳ hệ thống toán học đủ mạnh nào, luôn tồn tại mệnh đề đúng nhưng không thể chứng minh được trong hệ thống đó.',
      year: 1931,
      isBc: false,
      importanceLevel: 5,
      source: 'Gödel - Incompleteness Theorems',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }, { categoryId: categories[4].id, isPrimary: false }]
      },
      countries: {
        create: []
      }
    }
  });

  const fermatLastTheorem = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định lý lớn Fermat được chứng minh',
      description: 'Andrew Wiles giải bài toán 358 năm',
      content: 'Andrew Wiles chứng minh định lý lớn Fermat: không tồn tại nghiệm nguyên dương cho x^n + y^n = z^n khi n > 2. Bài toán được đặt ra từ năm 1637.',
      year: 1995,
      isBc: false,
      importanceLevel: 5,
      source: 'Andrew Wiles - Annals of Mathematics',
      categories: {
        create: [{ categoryId: categories[0].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  // Relationships
  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: einstein.id,
      targetId: newton.id,
      relationshipType: 'builds_upon',
      description: 'Thuyết tương đối mở rộng và điều chỉnh định luật Newton ở vận tốc cao'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: calculus.id,
      targetId: euclidGeometry.id,
      relationshipType: 'builds_upon',
      description: 'Giải tích phát triển từ nền tảng hình học Euclid'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: nonEuclidean.id,
      targetId: euclidGeometry.id,
      relationshipType: 'contradicts',
      description: 'Hình học phi Euclid thách thức tiên đề thứ 5 của Euclid'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: setTheory.id,
      targetId: godelTheorem.id,
      relationshipType: 'influences',
      description: 'Lý thuyết tập hợp của Cantor ảnh hưởng đến nghiên cứu của Gödel về nền tảng toán học'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: algebra.id,
      targetId: zero.id,
      relationshipType: 'builds_upon',
      description: 'Đại số phát triển dựa trên hệ thống số thập phân với số 0'
    }
  });

  console.log('✅ Seeding completed!');
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${countries.length} countries`);
  console.log(`Created 14 knowledge entries with relationships`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
