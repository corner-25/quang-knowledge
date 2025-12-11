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

  // ============ PHYSICS KNOWLEDGE ============

  const archimedesPrinciple = await prisma.knowledgeEntry.create({
    data: {
      title: 'Nguyên lý Archimedes',
      description: 'Định luật về lực đẩy trong chất lỏng',
      content: 'Vật nhúng trong chất lỏng chịu lực đẩy hướng lên bằng trọng lượng phần chất lỏng mà vật chiếm chỗ. Archimedes phát hiện điều này khi ngâm mình trong bồn tắm và hét lên "Eureka!"',
      year: 250,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Archimedes',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[0].id, isPrimary: true }]
      }
    }
  });

  const galileoMotion = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định luật rơi tự do của Galileo',
      description: 'Mọi vật rơi với gia tốc như nhau',
      content: 'Galileo Galilei chứng minh rằng trong chân không, mọi vật thể rơi với cùng gia tốc, không phụ thuộc vào khối lượng. Ông thách thức quan điểm của Aristotle kéo dài 2000 năm.',
      year: 1589,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Galileo Galilei',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const newtonLaws = await prisma.knowledgeEntry.create({
    data: {
      title: 'Ba định luật Newton về chuyển động',
      description: 'Nền tảng của cơ học cổ điển',
      content: '1) Định luật quán tính 2) F = ma 3) Lực và phản lực. Isaac Newton công bố trong "Principia Mathematica" (1687) - tác phẩm khoa học vĩ đại nhất mọi thời đại.',
      year: 1687,
      isBc: false,
      importanceLevel: 5,
      source: 'Newton - Principia Mathematica',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const thermodynamics = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định luật nhiệt động lực học',
      description: 'Năng lượng và entropy',
      content: 'Các định luật nhiệt động: 1) Năng lượng được bảo toàn 2) Entropy luôn tăng trong hệ cô lập 3) Entropy = 0 tại nhiệt độ tuyệt đối. Phát triển bởi Carnot, Clausius, Kelvin.',
      year: 1850,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Carnot, Clausius, Kelvin',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const maxwell = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phương trình Maxwell về điện từ',
      description: 'Thống nhất điện và từ trường',
      content: 'James Clerk Maxwell phát triển 4 phương trình mô tả điện trường, từ trường và mối quan hệ giữa chúng. Dự đoán ánh sáng là sóng điện từ. Đây là nền tảng của vật lý hiện đại.',
      year: 1865,
      isBc: false,
      importanceLevel: 5,
      source: 'Maxwell - A Dynamical Theory of the Electromagnetic Field',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const relativityGeneral = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết tương đối rộng',
      description: 'Trọng lực là độ cong của không-thời gian',
      content: 'Einstein mô tả trọng lực không phải là lực mà là hiện tượng uốn cong của không-thời gian do khối lượng gây ra. Dự đoán sóng hấp dẫn, lỗ đen, giãn nở vũ trụ.',
      year: 1915,
      isBc: false,
      importanceLevel: 5,
      source: 'Einstein - General Relativity',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const quantumMechanics = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cơ học lượng tử',
      description: 'Vật lý ở tầm vi mô',
      content: 'Heisenberg, Schrödinger, Bohr phát triển cơ học lượng tử - mô tả hành vi của hạt ở cấp độ nguyên tử. Bao gồm nguyên lý bất định, hàm sóng, superpositon.',
      year: 1925,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Heisenberg, Schrödinger, Bohr',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const nuclearFission = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phản ứng phân hạch hạt nhân',
      description: 'Otto Hahn và Lise Meitner phát hiện phân hạch',
      content: 'Phát hiện uranium có thể bị phân tách thành các hạt nhân nhỏ hơn, giải phóng năng lượng khổng lồ. Dẫn đến phát triển năng lượng hạt nhân và bom nguyên tử.',
      year: 1938,
      isBc: false,
      importanceLevel: 5,
      source: 'Hahn & Meitner',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const standardModel = await prisma.knowledgeEntry.create({
    data: {
      title: 'Mô hình chuẩn của vật lý hạt',
      description: 'Lý thuyết thống nhất các hạt cơ bản',
      content: 'Mô hình chuẩn mô tả 3 trong 4 lực cơ bản (điện từ, yếu, mạnh) và các hạt cơ bản: quark, lepton, boson. Được xác nhận bởi phát hiện Higgs boson (2012).',
      year: 1975,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Glashow, Salam, Weinberg',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const gravitationalWaves = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát hiện sóng hấp dẫn',
      description: 'LIGO xác nhận dự đoán của Einstein',
      content: 'Sau 100 năm Einstein dự đoán, LIGO lần đầu tiên phát hiện trực tiếp sóng hấp dẫn từ 2 lỗ đen va chạm, mở ra kỷ nguyên thiên văn học sóng hấp dẫn.',
      year: 2015,
      isBc: false,
      importanceLevel: 5,
      source: 'LIGO Scientific Collaboration',
      categories: {
        create: [{ categoryId: categories[1].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // ============ CHEMISTRY KNOWLEDGE ============

  const atomism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết nguyên tử của Democritus',
      description: 'Vật chất cấu tạo từ các hạt không thể phân chia',
      content: 'Democritus đề xuất rằng mọi vật chất được tạo thành từ các hạt nhỏ không thể chia cắt gọi là "atomos" (nguyên tử). Mặc dù không có bằng chứng thực nghiệm, đây là tiền đề của hóa học hiện đại.',
      year: 400,
      isBc: true,
      approximateDate: true,
      importanceLevel: 4,
      source: 'Democritus',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }, { categoryId: categories[4].id, isPrimary: false }]
      },
      countries: {
        create: [{ countryId: countries[0].id, isPrimary: true }]
      }
    }
  });

  const conservationMass = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định luật bảo toàn khối lượng',
      description: 'Lavoisier - Cha đẻ của hóa học hiện đại',
      content: 'Antoine Lavoisier chứng minh khối lượng được bảo toàn trong phản ứng hóa học. Ông đặt tên oxygen, hydrogen và loại bỏ thuyết phlogiston sai lầm.',
      year: 1789,
      isBc: false,
      importanceLevel: 5,
      source: 'Lavoisier - Traité Élémentaire de Chimie',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const daltonAtomic = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết nguyên tử Dalton',
      description: 'Nền tảng khoa học của hóa học',
      content: 'John Dalton đề xuất: 1) Nguyên tử là đơn vị nhỏ nhất không thể chia 2) Nguyên tử cùng nguyên tố giống nhau 3) Phản ứng hóa học là sắp xếp lại nguyên tử.',
      year: 1808,
      isBc: false,
      importanceLevel: 5,
      source: 'Dalton - A New System of Chemical Philosophy',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const periodicTable = await prisma.knowledgeEntry.create({
    data: {
      title: 'Bảng tuần hoàn Mendeleev',
      description: 'Sắp xếp các nguyên tố hóa học',
      content: 'Dmitri Mendeleev tạo bảng tuần hoàn dựa trên khối lượng nguyên tử và tính chất hóa học. Ông dự đoán chính xác các nguyên tố chưa được phát hiện như gallium, germanium.',
      year: 1869,
      isBc: false,
      importanceLevel: 5,
      source: 'Mendeleev',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const electron = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát hiện electron',
      description: 'J.J. Thomson và tia cathode',
      content: 'J.J. Thomson phát hiện electron qua thí nghiệm tia cathode, chứng minh nguyên tử có cấu trúc bên trong và không phải là đơn vị không thể chia như Dalton nghĩ.',
      year: 1897,
      isBc: false,
      importanceLevel: 5,
      source: 'J.J. Thomson',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }, { categoryId: categories[1].id, isPrimary: false }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const nuclearModel = await prisma.knowledgeEntry.create({
    data: {
      title: 'Mô hình nguyên tử hạt nhân',
      description: 'Rutherford phát hiện hạt nhân nguyên tử',
      content: 'Ernest Rutherford bắn hạt alpha vào lá vàng mỏng, phát hiện nguyên tử có hạt nhân nhỏ, đặc, mang điện dương ở trung tâm với electron quay xung quanh.',
      year: 1911,
      isBc: false,
      importanceLevel: 5,
      source: 'Rutherford',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }, { categoryId: categories[1].id, isPrimary: false }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const chemicalBond = await prisma.knowledgeEntry.create({
    data: {
      title: 'Lý thuyết liên kết hóa học',
      description: 'Lewis và liên kết cộng hóa trị',
      content: 'Gilbert Lewis giới thiệu khái niệm cặp electron dùng chung trong liên kết cộng hóa trị, và quy tắc octet. Giải thích tại sao các nguyên tử kết hợp với nhau.',
      year: 1916,
      isBc: false,
      importanceLevel: 5,
      source: 'Gilbert Lewis',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const penicillin = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát hiện Penicillin',
      description: 'Kháng sinh đầu tiên - Alexander Fleming',
      content: 'Alexander Fleming tình cờ phát hiện nấm Penicillium tiêu diệt vi khuẩn. Penicillin cứu sống hàng triệu người, mở đầu kỷ nguyên kháng sinh.',
      year: 1928,
      isBc: false,
      importanceLevel: 5,
      source: 'Fleming',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }, { categoryId: categories[3].id, isPrimary: false }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const dnaStructure = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cấu trúc DNA xoắn kép',
      description: 'Watson, Crick và bí mật sự sống',
      content: 'James Watson và Francis Crick khám phá cấu trúc xoắn kép của DNA dựa trên dữ liệu nhiễu xạ tia X của Rosalind Franklin. Giải thích cơ chế di truyền ở cấp phân tử.',
      year: 1953,
      isBc: false,
      importanceLevel: 5,
      source: 'Watson & Crick',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }, { categoryId: categories[3].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const crispr = await prisma.knowledgeEntry.create({
    data: {
      title: 'CRISPR - Chỉnh sửa gen',
      description: 'Công nghệ cách mạng hóa sinh học',
      content: 'Jennifer Doudna và Emmanuelle Charpentier phát triển CRISPR-Cas9 - công cụ chỉnh sửa gen chính xác, rẻ và dễ dùng. Mở ra khả năng chữa bệnh di truyền, cải thiện cây trồng.',
      year: 2012,
      isBc: false,
      importanceLevel: 5,
      source: 'Doudna & Charpentier',
      categories: {
        create: [{ categoryId: categories[2].id, isPrimary: true }, { categoryId: categories[3].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // ============ BIOLOGY KNOWLEDGE ============

  const cellTheory = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết tế bào',
      description: 'Tế bào là đơn vị cơ bản của sự sống',
      content: 'Schleiden và Schwann đề xuất: 1) Mọi sinh vật được tạo từ tế bào 2) Tế bào là đơn vị cơ bản về cấu trúc và chức năng 3) Tế bào mới sinh ra từ tế bào có sẵn (Virchow bổ sung).',
      year: 1839,
      isBc: false,
      importanceLevel: 5,
      source: 'Schleiden, Schwann, Virchow',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const evolution = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết tiến hóa của Darwin',
      description: 'Chọn lọc tự nhiên và nguồn gốc loài',
      content: 'Charles Darwin đề xuất thuyết tiến hóa qua chọn lọc tự nhiên: sinh vật có đặc điểm thích nghi tốt sống sót và sinh sản nhiều hơn. Giải thích sự đa dạng sinh học trên Trái Đất.',
      year: 1859,
      isBc: false,
      importanceLevel: 5,
      source: 'Darwin - On the Origin of Species',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const mendelGenetics = await prisma.knowledgeEntry.create({
    data: {
      title: 'Di truyền học Mendel',
      description: 'Định luật di truyền cơ bản',
      content: 'Gregor Mendel thí nghiệm với đậu Hà Lan, phát hiện các định luật di truyền: phân ly, phân ly độc lập. Đặt nền móng cho di truyền học hiện đại.',
      year: 1866,
      isBc: false,
      importanceLevel: 5,
      source: 'Mendel - Experiments on Plant Hybridization',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const germ = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết vi trùng gây bệnh',
      description: 'Pasteur và Koch chứng minh vi khuẩn gây bệnh',
      content: 'Louis Pasteur và Robert Koch chứng minh vi sinh vật gây ra bệnh tật. Pasteur phát triển phương pháp tiệt trùng (pasteurization). Koch xác định nguyên nhân lao, tả, than.',
      year: 1870,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Pasteur & Koch',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const photosynthesis = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cơ chế quang hợp',
      description: 'Cây xanh chuyển ánh sáng thành năng lượng hóa học',
      content: 'Các nhà khoa học phát hiện quang hợp: 6CO₂ + 6H₂O + ánh sáng → C₆H₁₂O₆ + 6O₂. Cây sử dụng chlorophyll để chuyển năng lượng mặt trời thành glucose, tạo oxygen.',
      year: 1905,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Multiple Scientists',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }, { categoryId: categories[2].id, isPrimary: false }]
      },
      countries: {
        create: []
      }
    }
  });

  const insulin = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát hiện Insulin',
      description: 'Banting & Best cứu sống bệnh nhân tiểu đường',
      content: 'Frederick Banting và Charles Best chiết xuất insulin từ tụy, điều trị thành công bệnh tiểu đường type 1. Trước đó, bệnh này là án tử hình.',
      year: 1921,
      isBc: false,
      importanceLevel: 5,
      source: 'Banting & Best',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }, { categoryId: categories[2].id, isPrimary: false }]
      },
      countries: {
        create: []
      }
    }
  });

  const centralDogma = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định đề trung tâm sinh học phân tử',
      description: 'Luồng thông tin di truyền DNA → RNA → Protein',
      content: 'Francis Crick đề xuất định đề trung tâm: thông tin di truyền chuyển từ DNA sang RNA (transcription), rồi từ RNA sang protein (translation). Đây là nguyên lý cơ bản của sinh học phân tử.',
      year: 1958,
      isBc: false,
      importanceLevel: 5,
      source: 'Francis Crick',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }, { categoryId: categories[2].id, isPrimary: false }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const pcr = await prisma.knowledgeEntry.create({
    data: {
      title: 'PCR - Khuếch đại DNA',
      description: 'Kary Mullis và công nghệ PCR',
      content: 'Kary Mullis phát minh PCR (Polymerase Chain Reaction) - kỹ thuật nhân bản DNA nhanh chóng. Cách mạng hóa nghiên cứu gen, pháp y, chẩn đoán bệnh.',
      year: 1983,
      isBc: false,
      importanceLevel: 5,
      source: 'Kary Mullis',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }, { categoryId: categories[2].id, isPrimary: false }]
      },
      countries: {
        create: []
      }
    }
  });

  const humanGenome = await prisma.knowledgeEntry.create({
    data: {
      title: 'Dự án bộ gen người hoàn thành',
      description: 'Giải mã toàn bộ DNA con người',
      content: 'Dự án bộ gen người (Human Genome Project) giải trình tự ~3 tỷ cặp bazơ trong DNA người. Mở ra kỷ nguyên y học cá nhân hóa, hiểu về bệnh tật và tiến hóa.',
      year: 2003,
      isBc: false,
      importanceLevel: 5,
      source: 'Human Genome Project',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }, { categoryId: categories[2].id, isPrimary: false }]
      },
      countries: {
        create: []
      }
    }
  });

  const immunotherapy = await prisma.knowledgeEntry.create({
    data: {
      title: 'Liệu pháp miễn dịch ung thư',
      description: 'Khai thác hệ miễn dịch để chống ung thư',
      content: 'James Allison và Tasuku Honjo phát triển liệu pháp ức chế điểm kiểm soát miễn dịch, giúp hệ miễn dịch tấn công tế bào ung thư. Cách mạng hóa điều trị ung thư.',
      year: 2018,
      isBc: false,
      importanceLevel: 5,
      source: 'Allison & Honjo - Nobel Prize 2018',
      categories: {
        create: [{ categoryId: categories[3].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // ============ HISTORY KNOWLEDGE ============

  const mesopotamia = await prisma.knowledgeEntry.create({
    data: {
      title: 'Nền văn minh Lưỡng Hà',
      description: 'Nền văn minh đầu tiên của nhân loại',
      content: 'Nền văn minh Lưỡng Hà (Mesopotamia) nảy sinh giữa sông Tigris và Euphrates. Phát minh chữ viết hình nêm, bánh xe, luật Hammurabi. Đây là cái nôi của nền văn minh phương Tây.',
      year: 3500,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Archaeological evidence',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const greatWall = await prisma.knowledgeEntry.create({
    data: {
      title: 'Xây dựng Vạn Lý Trường Thành',
      description: 'Công trình kiến trúc vĩ đại nhất thế giới',
      content: 'Tần Thủy Hoàng ra lệnh nối các đoạn tường thành thành một công trình phòng thủ liên tục dài hàng nghìn km. Vạn Lý Trường Thành trở thành biểu tượng của Trung Quốc.',
      year: 221,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Chinese Historical Records',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[1].id, isPrimary: true }]
      }
    }
  });

  const romanEmpire = await prisma.knowledgeEntry.create({
    data: {
      title: 'Đế chế La Mã',
      description: 'Đế chế hùng mạnh nhất thế giới cổ đại',
      content: 'Đế chế La Mã thống trị vùng Địa Trung Hải, châu Âu và Trung Đông trong hơn 500 năm. Hệ thống luật La Mã, kiến trúc, và tiếng Latin ảnh hưởng sâu rộng đến văn minh phương Tây.',
      year: 27,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Roman Historical Records',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const islamicGoldenAge = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thời kỳ Hoàng kim Hồi giáo',
      description: 'Trung tâm khoa học và văn hóa thế giới',
      content: 'Từ thế kỷ 8-13, thế giới Hồi giáo trở thành trung tâm tri thức với những tiến bộ vượt bậc về toán học, thiên văn, y học, hóa học. Nhà Trí tuệ ở Baghdad lưu giữ và phát triển tri thức cổ đại.',
      year: 750,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Islamic Historical Records',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const renaissance = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thời kỳ Phục Hưng',
      description: 'Sự bùng nổ nghệ thuật và khoa học châu Âu',
      content: 'Phong trào Phục Hưng (Renaissance) bắt đầu từ Italy, đánh dấu sự chuyển từ thời Trung Cổ sang Hiện đại. Leonardo da Vinci, Michelangelo, Galileo - nghệ thuật và khoa học đạt đỉnh cao.',
      year: 1400,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'European Historical Records',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const americanRevolution = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cách mạng Mỹ',
      description: 'Độc lập của Hợp chủng quốc Hoa Kỳ',
      content: 'Tuyên ngôn Độc lập (1776) tuyên bố "tất cả mọi người sinh ra đều bình đẳng" và quyền tự do, hạnh phúc. Hoa Kỳ trở thành nền dân chủ đầu tiên hiện đại, ảnh hưởng đến các cuộc cách mạng sau này.',
      year: 1776,
      isBc: false,
      importanceLevel: 5,
      source: 'Declaration of Independence',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const frenchRevolution = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cách mạng Pháp',
      description: 'Lật đổ chế độ quân chủ, thiết lập dân chủ',
      content: 'Cách mạng Pháp (1789) lật đổ chế độ quân chủ tuyệt đối, tuyên bố "Tự do, Bình đẳng, Bác ái". Tuyên ngôn Nhân quyền và Dân quyền đặt nền móng cho nhân quyền hiện đại.',
      year: 1789,
      isBc: false,
      importanceLevel: 5,
      source: 'Declaration of the Rights of Man',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const industrialRevolution = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cách mạng Công nghiệp',
      description: 'Chuyển đổi từ nông nghiệp sang công nghiệp',
      content: 'Cách mạng Công nghiệp bắt đầu ở Anh với máy hơi nước, nhà máy dệt, đường sắt. Thay đổi căn bản cách con người sống và làm việc, tạo ra xã hội hiện đại.',
      year: 1760,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Economic History',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[3].id, isPrimary: true }]
      }
    }
  });

  const worldWarII = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chiến tranh Thế giới thứ II',
      description: 'Cuộc chiến lớn nhất lịch sử nhân loại',
      content: 'CTTG II (1939-1945) là cuộc xung đột toàn cầu giữa Đồng minh và Trục, gây ra 70-85 triệu người chết. Kết thúc bằng bom nguyên tử ở Hiroshima và Nagasaki. Định hình trật tự thế giới hiện đại.',
      year: 1939,
      isBc: false,
      importanceLevel: 5,
      source: 'Historical Records',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const internetRevolution = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cách mạng Internet',
      description: 'World Wide Web và kỷ nguyên thông tin',
      content: 'Tim Berners-Lee phát minh World Wide Web (1989). Internet thay đổi căn bản cách con người giao tiếp, làm việc, học tập. Mở ra kỷ nguyên số hóa và toàn cầu hóa thông tin.',
      year: 1989,
      isBc: false,
      importanceLevel: 5,
      source: 'CERN - Tim Berners-Lee',
      categories: {
        create: [{ categoryId: categories[5].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // ============ GEOGRAPHY KNOWLEDGE ============

  const earthShape = await prisma.knowledgeEntry.create({
    data: {
      title: 'Trái Đất hình cầu',
      description: 'Eratosthenes đo chu vi Trái Đất',
      content: 'Eratosthenes (276-194 BC) là người đầu tiên tính toán chu vi Trái Đất với độ chính xác đáng kinh ngạc bằng cách đo bóng của cột ở hai địa điểm khác nhau. Chứng minh Trái Đất hình cầu.',
      year: 240,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Eratosthenes',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }, { categoryId: categories[0].id, isPrimary: false }]
      },
      countries: {
        create: [{ countryId: countries[0].id, isPrimary: true }]
      }
    }
  });

  const silkRoad = await prisma.knowledgeEntry.create({
    data: {
      title: 'Con đường tơ lụa',
      description: 'Mạng lưới thương mại xuyên Á-Âu',
      content: 'Con đường tơ lụa là mạng lưới tuyến đường thương mại kết nối phương Đông và phương Tây, từ Trung Quốc đến Địa Trung Hải. Không chỉ trao đổi hàng hóa mà còn văn hóa, tôn giáo, công nghệ.',
      year: 130,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Historical Trade Routes',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }, { categoryId: categories[5].id, isPrimary: false }]
      },
      countries: {
        create: [{ countryId: countries[1].id, isPrimary: true }]
      }
    }
  });

  const colombusAmerica = await prisma.knowledgeEntry.create({
    data: {
      title: 'Columbus khám phá châu Mỹ',
      description: 'Kết nối Tân - Cựu thế giới',
      content: 'Christopher Columbus đặt chân đến châu Mỹ (1492), mở đầu kỷ nguyên khám phá địa lý. Thay đổi hoàn toàn bản đồ thế giới và lịch sử nhân loại với "Columbian Exchange" - trao đổi sinh vật, văn hóa giữa hai bên Đại Tây Dương.',
      year: 1492,
      isBc: false,
      importanceLevel: 5,
      source: 'Historical Records',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }, { categoryId: categories[5].id, isPrimary: false }]
      },
      countries: {
        create: []
      }
    }
  });

  const magellanCircumnavigation = await prisma.knowledgeEntry.create({
    data: {
      title: 'Vòng quanh thế giới của Magellan',
      description: 'Chứng minh Trái Đất hình cầu bằng thực nghiệm',
      content: 'Ferdinand Magellan và đoàn thám hiểm (1519-1522) là những người đầu tiên đi vòng quanh Trái Đất, chứng minh thực tế rằng Trái Đất là hình cầu và các đại dương liên kết với nhau.',
      year: 1522,
      isBc: false,
      importanceLevel: 5,
      source: 'Historical Expedition Records',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }, { categoryId: categories[5].id, isPrimary: false }]
      },
      countries: {
        create: []
      }
    }
  });

  const platetectonics = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết kiến tạo mảng',
      description: 'Lục địa di động và động đất',
      content: 'Alfred Wegener đề xuất thuyết trôi dạt lục địa (1912), sau này phát triển thành thuyết kiến tạo mảng. Giải thích tại sao lục địa di chuyển, núi lửa phun trào, động đất xảy ra. Các mảng kiến tạo trôi nổi trên lớp magma.',
      year: 1912,
      isBc: false,
      importanceLevel: 5,
      source: 'Wegener - Continental Drift Theory',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const mountEverest = await prisma.knowledgeEntry.create({
    data: {
      title: 'Đo đạc đỉnh Everest',
      description: 'Điểm cao nhất Trái Đất',
      content: 'Great Trigonometrical Survey of India xác định đỉnh Everest (8,849m) là điểm cao nhất trên Trái Đất (1856). Tên gọi để vinh danh George Everest, nhà trắc địa trưởng Ấn Độ.',
      year: 1856,
      isBc: false,
      importanceLevel: 4,
      source: 'Survey of India',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[2].id, isPrimary: true }]
      }
    }
  });

  const amazonRainforest = await prisma.knowledgeEntry.create({
    data: {
      title: 'Rừng nhiệt đới Amazon',
      description: 'Lá phổi xanh của Trái Đất',
      content: 'Rừng Amazon là khu rừng nhiệt đới lớn nhất thế giới (5.5 triệu km²), chứa 10% đa dạng sinh học toàn cầu. Sản xuất 20% oxy Trái Đất, đóng vai trò quan trọng trong điều hòa khí hậu.',
      year: 1541,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Geographical Studies',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }, { categoryId: categories[3].id, isPrimary: false }]
      },
      countries: {
        create: []
      }
    }
  });

  const gps = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hệ thống GPS',
      description: 'Định vị toàn cầu bằng vệ tinh',
      content: 'Global Positioning System (GPS) của Hoa Kỳ đi vào hoạt động đầy đủ (1995), cho phép xác định vị trí chính xác ở bất kỳ đâu trên Trái Đất. Cách mạng hóa địa lý, giao thông, quân sự, và cuộc sống hàng ngày.',
      year: 1995,
      isBc: false,
      importanceLevel: 5,
      source: 'US Department of Defense',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const climateChange = await prisma.knowledgeEntry.create({
    data: {
      title: 'Biến đổi khí hậu toàn cầu',
      description: 'Trái Đất đang nóng lên',
      content: 'IPCC (Intergovernmental Panel on Climate Change) cảnh báo Trái Đất nóng lên do khí nhà kính từ hoạt động con người. Băng tan, mực nước biển dâng, thời tiết cực đoan. Thách thức lớn nhất thế kỷ 21.',
      year: 1988,
      isBc: false,
      importanceLevel: 5,
      source: 'IPCC Reports',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const googleEarth = await prisma.knowledgeEntry.create({
    data: {
      title: 'Google Earth',
      description: 'Toàn bộ Trái Đất trong tầm tay',
      content: 'Google Earth (2005) cho phép mọi người khám phá Trái Đất qua ảnh vệ tinh 3D. Dân chủ hóa việc tiếp cận thông tin địa lý, thay đổi cách chúng ta học và hiểu về thế giới.',
      year: 2005,
      isBc: false,
      importanceLevel: 4,
      source: 'Google Inc.',
      categories: {
        create: [{ categoryId: categories[6].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // ============ PHILOSOPHY KNOWLEDGE ============

  const socrates = await prisma.knowledgeEntry.create({
    data: {
      title: 'Triết học Socrates',
      description: 'Phương pháp vấn đáp và "Biết mình không biết"',
      content: 'Socrates đặt nền móng cho triết học phương Tây với phương pháp vấn đáp (Socratic method). Ông dạy rằng "Một cuộc đời không được xem xét kỹ là không đáng sống" và khẳng định "Tôi chỉ biết rằng tôi không biết gì".',
      year: 399,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Plato - Dialogues',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[0].id, isPrimary: true }]
      }
    }
  });

  const plato = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết Lý tưởng của Plato',
      description: 'Thế giới ý niệm và hang động',
      content: 'Plato đề xuất thế giới được chia làm hai: thế giới vật chất (bóng tối) và thế giới lý tưởng (ánh sáng). Ngụ ngôn hang động minh họa con người bị giam cầm trong vô minh, chỉ thấy bóng của thực tại.',
      year: 380,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Plato - The Republic',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[0].id, isPrimary: true }]
      }
    }
  });

  const aristotle = await prisma.knowledgeEntry.create({
    data: {
      title: 'Logic học Aristotle',
      description: 'Nền tảng của logic hình thức',
      content: 'Aristotle phát triển logic hình thức đầu tiên với tam đoạn luận. Ông cũng đề xuất 4 nguyên nhân: nguyên nhân chất liệu, hình thức, tác động và mục đích. Ảnh hưởng sâu rộng đến khoa học.',
      year: 350,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Aristotle - Organon',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[0].id, isPrimary: true }]
      }
    }
  });

  const descartes = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chủ nghĩa duy lý Descartes',
      description: 'Tôi tư duy, vậy tôi tồn tại',
      content: 'René Descartes đặt nền móng triết học hiện đại với "Cogito ergo sum" (Tôi tư duy, vậy tôi tồn tại). Ông phân đôi tâm-thân, cho rằng lý trí là nguồn gốc của tri thức.',
      year: 1637,
      isBc: false,
      importanceLevel: 5,
      source: 'Descartes - Discourse on Method',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const kant = await prisma.knowledgeEntry.create({
    data: {
      title: 'Triết học phê phán Kant',
      description: 'Cách mạng Copernicus trong triết học',
      content: 'Immanuel Kant tổng hợp chủ nghĩa duy lý và kinh nghiệm luận. Ông cho rằng tri thức phát sinh từ cả kinh nghiệm lẫn cấu trúc tiên nghiệm của tâm trí. "Hai điều khiến tôi kinh ngạc: bầu trời đầy sao trên đầu và luật đạo đức trong lòng".',
      year: 1781,
      isBc: false,
      importanceLevel: 5,
      source: 'Kant - Critique of Pure Reason',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const hegel = await prisma.knowledgeEntry.create({
    data: {
      title: 'Biện chứng Hegel',
      description: 'Luận đề - Phản đề - Hợp đề',
      content: 'Georg Hegel phát triển phép biện chứng: mỗi ý tưởng (luận đề) tạo ra mâu thuẫn (phản đề), dẫn đến sự tổng hợp cao hơn (hợp đề). Lịch sử là quá trình Tinh thần Tuyệt đối tự nhận thức.',
      year: 1807,
      isBc: false,
      importanceLevel: 5,
      source: 'Hegel - Phenomenology of Spirit',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const marx = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chủ nghĩa Mác',
      description: 'Duy vật biện chứng và đấu tranh giai cấp',
      content: 'Karl Marx đảo ngược Hegel, cho rằng điều kiện vật chất quyết định ý thức. Lịch sử là đấu tranh giai cấp, tư bản chủ nghĩa sẽ tự sụp đổ và dẫn đến chủ nghĩa cộng sản.',
      year: 1848,
      isBc: false,
      importanceLevel: 5,
      source: 'Marx & Engels - The Communist Manifesto',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }, { categoryId: categories[5].id, isPrimary: false }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const nietzsche = await prisma.knowledgeEntry.create({
    data: {
      title: 'Siêu nhân Nietzsche',
      description: 'Thần đã chết và Ý chí quyền lực',
      content: 'Friedrich Nietzsche tuyên bố "Thần đã chết" - các giá trị truyền thống sụp đổ. Ông đề xuất "siêu nhân" (Übermensch) tự tạo ra giá trị của mình, sống theo "ý chí quyền lực" thay vì đạo đức đàn bầy.',
      year: 1883,
      isBc: false,
      importanceLevel: 5,
      source: 'Nietzsche - Thus Spoke Zarathustra',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: [{ countryId: countries[4].id, isPrimary: true }]
      }
    }
  });

  const existentialism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chủ nghĩa hiện sinh Sartre',
      description: 'Tồn tại đi trước bản chất',
      content: 'Jean-Paul Sartre khẳng định con người không có bản chất định sẵn - "tồn tại đi trước bản chất". Chúng ta bị "kết án tự do", phải tự tạo ra ý nghĩa cuộc đời và chịu trách nhiệm tuyệt đối.',
      year: 1943,
      isBc: false,
      importanceLevel: 5,
      source: 'Sartre - Being and Nothingness',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const postmodernism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hậu hiện đại',
      description: 'Nghi ngờ các siêu tường thuật',
      content: 'Triết học hậu hiện đại (Lyotard, Derrida, Foucault) nghi ngờ các "siêu tường thuật" lớn (tôn giáo, khoa học, tiến bộ). Không có chân lý tuyệt đối, chỉ có các góc nhìn và diễn giải khác nhau.',
      year: 1979,
      isBc: false,
      approximateDate: true,
      importanceLevel: 4,
      source: 'Lyotard - The Postmodern Condition',
      categories: {
        create: [{ categoryId: categories[4].id, isPrimary: true }]
      },
      countries: {
        create: []
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

  // Physics Relationships
  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: newtonLaws.id,
      targetId: galileoMotion.id,
      relationshipType: 'builds_upon',
      description: 'Định luật Newton phát triển từ nghiên cứu của Galileo về chuyển động'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: relativityGeneral.id,
      targetId: newtonLaws.id,
      relationshipType: 'builds_upon',
      description: 'Thuyết tương đối rộng mở rộng và điều chỉnh định luật Newton về trọng lực'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: quantumMechanics.id,
      targetId: newton.id,
      relationshipType: 'contradicts',
      description: 'Cơ học lượng tử thay thế cơ học Newton ở cấp độ vi mô'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: maxwell.id,
      targetId: einstein.id,
      relationshipType: 'influences',
      description: 'Phương trình Maxwell là cơ sở cho Einstein phát triển thuyết tương đối hẹp'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: gravitationalWaves.id,
      targetId: relativityGeneral.id,
      relationshipType: 'builds_upon',
      description: 'Phát hiện sóng hấp dẫn xác nhận dự đoán của thuyết tương đối rộng'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: standardModel.id,
      targetId: quantumMechanics.id,
      relationshipType: 'builds_upon',
      description: 'Mô hình chuẩn được xây dựng trên nền tảng cơ học lượng tử'
    }
  });

  // Chemistry Relationships
  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: daltonAtomic.id,
      targetId: atomism.id,
      relationshipType: 'builds_upon',
      description: 'Thuyết nguyên tử Dalton phát triển từ ý tưởng của Democritus với bằng chứng khoa học'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: daltonAtomic.id,
      targetId: conservationMass.id,
      relationshipType: 'builds_upon',
      description: 'Thuyết nguyên tử giải thích định luật bảo toàn khối lượng'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: periodicTable.id,
      targetId: daltonAtomic.id,
      relationshipType: 'builds_upon',
      description: 'Bảng tuần hoàn tổ chức các nguyên tố dựa trên thuyết nguyên tử'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: electron.id,
      targetId: daltonAtomic.id,
      relationshipType: 'contradicts',
      description: 'Phát hiện electron chứng minh nguyên tử không phải là đơn vị không thể chia'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: nuclearModel.id,
      targetId: electron.id,
      relationshipType: 'builds_upon',
      description: 'Mô hình hạt nhân mở rộng khám phá về cấu trúc nguyên tử sau khi phát hiện electron'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: chemicalBond.id,
      targetId: electron.id,
      relationshipType: 'builds_upon',
      description: 'Lý thuyết liên kết hóa học dựa trên sự tương tác của electron'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: dnaStructure.id,
      targetId: chemicalBond.id,
      relationshipType: 'builds_upon',
      description: 'Cấu trúc DNA được giải thích qua các liên kết hóa học giữa các bazơ nitơ'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: crispr.id,
      targetId: dnaStructure.id,
      relationshipType: 'builds_upon',
      description: 'CRISPR chỉnh sửa gen dựa trên hiểu biết về cấu trúc DNA'
    }
  });

  // Biology Relationships
  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: evolution.id,
      targetId: cellTheory.id,
      relationshipType: 'builds_upon',
      description: 'Thuyết tiến hóa giải thích sự phát triển đa dạng của các tế bào và sinh vật'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: mendelGenetics.id,
      targetId: evolution.id,
      relationshipType: 'related_to',
      description: 'Di truyền học Mendel cung cấp cơ chế cho thuyết tiến hóa'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: penicillin.id,
      targetId: germ.id,
      relationshipType: 'builds_upon',
      description: 'Penicillin phát triển từ hiểu biết về vi trùng gây bệnh'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: centralDogma.id,
      targetId: dnaStructure.id,
      relationshipType: 'builds_upon',
      description: 'Định đề trung tâm mô tả luồng thông tin từ DNA'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: centralDogma.id,
      targetId: mendelGenetics.id,
      relationshipType: 'builds_upon',
      description: 'Định đề trung tâm giải thích cơ chế phân tử của di truyền Mendel'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: pcr.id,
      targetId: dnaStructure.id,
      relationshipType: 'builds_upon',
      description: 'PCR sử dụng kiến thức về cấu trúc DNA để nhân bản'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: humanGenome.id,
      targetId: pcr.id,
      relationshipType: 'builds_upon',
      description: 'Dự án bộ gen người sử dụng PCR để giải trình tự DNA'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: humanGenome.id,
      targetId: dnaStructure.id,
      relationshipType: 'builds_upon',
      description: 'Giải mã bộ gen dựa trên hiểu biết về cấu trúc DNA'
    }
  });

  // Philosophy Relationships
  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: plato.id,
      targetId: socrates.id,
      relationshipType: 'builds_upon',
      description: 'Plato là học trò của Socrates và phát triển triết học của thầy'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: aristotle.id,
      targetId: plato.id,
      relationshipType: 'contradicts',
      description: 'Aristotle bác bỏ thuyết Lý tưởng của Plato, ủng hộ kinh nghiệm luận'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: descartes.id,
      targetId: aristotle.id,
      relationshipType: 'related_to',
      description: 'Descartes đánh dấu sự chuyển từ triết học cổ đại sang hiện đại'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: hegel.id,
      targetId: kant.id,
      relationshipType: 'builds_upon',
      description: 'Hegel phát triển triết học Kant với phép biện chứng'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: marx.id,
      targetId: hegel.id,
      relationshipType: 'builds_upon',
      description: 'Marx đảo ngược biện chứng Hegel từ duy tâm sang duy vật'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: existentialism.id,
      targetId: nietzsche.id,
      relationshipType: 'builds_upon',
      description: 'Chủ nghĩa hiện sinh phát triển từ ý tưởng của Nietzsche về tự do và giá trị'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: postmodernism.id,
      targetId: nietzsche.id,
      relationshipType: 'builds_upon',
      description: 'Hậu hiện đại kế thừa quan điểm phê phán của Nietzsche về chân lý'
    }
  });

  // History Relationships
  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: islamicGoldenAge.id,
      targetId: algebra.id,
      relationshipType: 'influences',
      description: 'Thời kỳ Hoàng kim Hồi giáo là bối cảnh phát triển của Đại số'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: renaissance.id,
      targetId: islamicGoldenAge.id,
      relationshipType: 'builds_upon',
      description: 'Phục Hưng kế thừa tri thức từ thế giới Hồi giáo'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: renaissance.id,
      targetId: galileoMotion.id,
      relationshipType: 'influences',
      description: 'Thời kỳ Phục Hưng tạo điều kiện cho cách mạng khoa học của Galileo'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: americanRevolution.id,
      targetId: frenchRevolution.id,
      relationshipType: 'influences',
      description: 'Cách mạng Mỹ truyền cảm hứng cho Cách mạng Pháp'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: industrialRevolution.id,
      targetId: thermodynamics.id,
      relationshipType: 'related_to',
      description: 'Cách mạng Công nghiệp thúc đẩy nghiên cứu nhiệt động lực học'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: worldWarII.id,
      targetId: nuclearFission.id,
      relationshipType: 'related_to',
      description: 'Phân hạch hạt nhân dẫn đến bom nguyên tử trong CTTG II'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: internetRevolution.id,
      targetId: humanGenome.id,
      relationshipType: 'influences',
      description: 'Internet tạo điều kiện hợp tác toàn cầu cho Dự án bộ gen người'
    }
  });

  // Geography Relationships
  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: earthShape.id,
      targetId: euclidGeometry.id,
      relationshipType: 'builds_upon',
      description: 'Đo chu vi Trái Đất dựa trên hình học Euclid'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: magellanCircumnavigation.id,
      targetId: earthShape.id,
      relationshipType: 'builds_upon',
      description: 'Vòng quanh thế giới chứng thực lý thuyết Trái Đất hình cầu'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: colombusAmerica.id,
      targetId: renaissance.id,
      relationshipType: 'influences',
      description: 'Thời kỳ Phục Hưng thúc đẩy các cuộc khám phá địa lý'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: silkRoad.id,
      targetId: islamicGoldenAge.id,
      relationshipType: 'related_to',
      description: 'Con đường tơ lụa truyền bá tri thức Hồi giáo'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: amazonRainforest.id,
      targetId: evolution.id,
      relationshipType: 'related_to',
      description: 'Đa dạng sinh học Amazon minh họa thuyết tiến hóa'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: climateChange.id,
      targetId: amazonRainforest.id,
      relationshipType: 'related_to',
      description: 'Phá rừng Amazon góp phần vào biến đổi khí hậu'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: gps.id,
      targetId: einstein.id,
      relationshipType: 'builds_upon',
      description: 'GPS sử dụng thuyết tương đối để hiệu chỉnh thời gian vệ tinh'
    }
  });

  await prisma.knowledgeRelationship.create({
    data: {
      sourceId: googleEarth.id,
      targetId: gps.id,
      relationshipType: 'builds_upon',
      description: 'Google Earth sử dụng dữ liệu GPS và vệ tinh'
    }
  });

  console.log('✅ Seeding completed!');
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${countries.length} countries`);
  console.log(`Created 74 knowledge entries (14 Math + 10 Physics + 10 Chemistry + 10 Biology + 10 History + 10 Philosophy + 10 Geography)`);
  console.log(`Created 49 relationships`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
