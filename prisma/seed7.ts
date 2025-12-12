import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding additional history knowledge...');

  // Get existing categories and countries
  const historyCategory = await prisma.category.findUnique({
    where: { name: 'Lịch sử' }
  });

  const countries = await prisma.country.findMany();
  const chinaCountry = countries.find(c => c.name === 'Trung Quốc');
  const greeceCountry = countries.find(c => c.name === 'Hy Lạp');

  if (!historyCategory) {
    throw new Error('History category not found. Please run seed.ts first.');
  }

  // 10 New History Knowledge Entries

  // 1. Nền văn minh Ai Cập cổ đại
  const ancientEgypt = await prisma.knowledgeEntry.create({
    data: {
      title: 'Nền văn minh Ai Cập cổ đại',
      description: 'Kim tự tháp, pharaoh và sông Nile',
      content: `Nền văn minh Ai Cập cổ đại, phát triển dọc sông Nile từ khoảng 3100 TCN đến 30 TCN, là một trong những nền văn minh lâu đời và ấn tượng nhất lịch sử nhân loại, tồn tại hơn 3000 năm. Menes (Narmer) thống nhất Thượng Ai Cập và Hạ Ai Cập thành một vương quốc, mở đầu thời đại các pharaoh - những vị vua được coi là thần sống, hóa thân của thần Horus.

Kim tự tháp Giza, được xây dựng vào thời Vương quốc Cổ (2686-2181 TCN), là kỳ quan kiến trúc của thế giới cổ đại. Kim tự tháp Khufu (Cheops), cao 146m, là công trình nhân tạo cao nhất thế giới trong gần 4000 năm. Người Ai Cập phát triển kỹ thuật xây dựng, toán học, thiên văn học, và y học tiên tiến: họ thực hiện phẫu thuật não, biết về tuần hoàn máu, ướp xác (mummification) để bảo tồn thi thể cho thế giới bên kia.

Chữ tượng hình (hieroglyphics) Ai Cập là hệ thống chữ viết phức tạp với hơn 700 ký hiệu, được khắc trên đền đài, lăng mộ, papyrus. Jean-François Champollion giải mã hieroglyphics năm 1822 nhờ Rosetta Stone - tấm bia ghi cùng một văn bản bằng ba thứ chữ. Sách chết Ai Cập (Book of the Dead) chứa các phép thuật và chú văn giúp người chết vượt qua thế giới bên kia, qua phiên tòa của thần Osiris cân tim với lông vũ của Maat (nữ thần chân lý).

Người Ai Cập tôn thờ nhiều thần: Ra (thần mặt trời), Osiris (thần thế giới bên kia), Isis (nữ thần phép thuật), Anubis (thần ướp xác). Pharaoh Akhenaten (1353-1336 TCN) cố gắng cải cách tôn giáo thành thờ một thần duy nhất Aten, nhưng sau khi ông mất, Ai Cập trở lại đa thần. Cleopatra VII, pharaoh cuối cùng, tự sát năm 30 TCN sau khi thất bại trước La Mã, kết thúc triều đại Ptolemy và nền văn minh Ai Cập độc lập. Di sản Ai Cập ảnh hưởng sâu rộng đến Hy Lạp, La Mã, và văn minh phương Tây.`,
      year: 3100,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Ancient Egyptian History',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 2. Đế chế Hy Lạp của Alexander Đại đế
  const alexanderEmpire = await prisma.knowledgeEntry.create({
    data: {
      title: 'Đế chế Alexander Đại đế',
      description: 'Chinh phục từ Hy Lạp đến Ấn Độ',
      content: `Alexander Đại đế (Alexander III of Macedon, 356-323 TCN) là một trong những nhà quân sự và chinh phục vĩ đại nhất lịch sử, tạo ra đế chế trải dài từ Hy Lạp, qua Ai Cập, Ba Tư, đến tận Ấn Độ trong vòng chỉ 13 năm. Lên ngôi vua Macedonia năm 20 tuổi sau khi cha là Philip II bị ám sát, Alexander kế thừa quân đội mạnh và tham vọng chinh phục thế giới đã biết.

Alexander học triết học dưới sự dạy dỗ của Aristotle, người truyền cho ông niềm đam mê văn hóa Hy Lạp và tầm nhìn về việc truyền bá văn minh Hellenistic. Chiến dịch của ông bắt đầu năm 334 TCN với cuộc xâm lược Ba Tư. Ông đánh bại vua Ba Tư Darius III trong các trận Granicus (334), Issus (333), và quyết định tại Gaugamela (331). Alexander chinh phục Babylon, Susa, Persepolis - trái tim của đế chế Ba Tư hùng mạnh.

Không dừng lại, Alexander tiến sang Trung Á, Afghanistan, và vào Ấn Độ năm 326 TCN, đánh bại vua Porus tại trận sông Hydaspes mặc dù đối mặt với voi chiến. Tuy nhiên, quân đội mệt mỏi sau 11 năm chiến tranh, từ chối tiến xa hơn. Alexander buộc lòng quay về, lập thủ đô tại Babylon. Ông chết đột ngột năm 323 TCN ở tuổi 32, nguyên nhân có thể là sốt rét, ngộ độc, hoặc say rượu - vẫn còn tranh cãi. Đế chế của ông lập tức tan rã, chia thành các vương quốc Diadochi.

Mặc dù ngắn ngủi, đế chế Alexander để lại di sản to lớn: thời đại Hellenistic (323-30 TCN) lan tỏa văn hóa, nghệ thuật, khoa học, triết học Hy Lạp trên khắp Trung Đông và Á Châu. Alexandria ở Ai Cập trở thành trung tâm học thuật vĩ đại với Thư viện Alexandria. Ngôn ngữ Hy Lạp trở thành lingua franca, tạo điều kiện cho Kitô giáo lan rộng sau này. Alexander được tôn vinh như anh hùng, thần thánh, và chiến lược gia quân sự xuất sắc - Napoleon và Julius Caesar đều ngưỡng mộ ông.`,
      year: 336,
      isBc: true,
      approximateDate: false,
      importanceLevel: 5,
      source: 'Ancient Greek History, Plutarch',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: greeceCountry ? {
        create: [{ countryId: greeceCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 3. Con đường tơ lụa đã có, tôi sẽ thêm Đế chế Mông Cổ
  const mongolEmpire = await prisma.knowledgeEntry.create({
    data: {
      title: 'Đế chế Mông Cổ của Thành Cát Tư Hãn',
      description: 'Đế chế liền mảnh lớn nhất lịch sử',
      content: `Đế chế Mông Cổ, được Thành Cát Tư Hãn (Genghis Khan, 1162-1227) thành lập, là đế chế liền mảnh (contiguous) lớn nhất trong lịch sử, đỉnh cao chiếm 24 triệu km² (16% diện tích đất liền Trái Đất), từ Thái Bình Dương đến Đông Âu. Temüjin (tên thật của ông) thống nhất các bộ lạc Mông Cổ năm 1206 và nhận danh hiệu "Thành Cát Tư Hãn" (Chingis Khan - vua vạn vương).

Quân đội Mông Cổ là lực lượng kỵ binh nhanh nhất, cơ động nhất thời bấy giờ. Mỗi chiến binh điều khiển nhiều ngựa, di chuyển 100 km/ngày, sử dụng cung composite bắn xa 300m. Chiến thuật "feigned retreat" (giả vờ rút lui rồi bao vây) và tình báo xuất sắc giúp họ đánh bại các quân đội lớn hơn nhiều. Thành Cát Tư Hãn chinh phục Tây Hạ (1209), Nhà Kim của Trung Quốc (1211-34), Đế quốc Khwarazmian của Ba Tư (1219-21), và tiến vào Đông Âu.

Mông Cổ nổi tiếng tàn bạo với những ai kháng cự: thành phố bị phá hủy hoàn toàn, dân thường bị tàn sát. Ước tính 30-40 triệu người chết trong các cuộc chinh phục Mông Cổ (~11% dân số thế giới thời đó). Baghdad, trung tâm thế giới Hồi giáo, bị phá năm 1258, kết thúc Thời kỳ Hoàng kim Hồi giáo. Tuy nhiên, Mông Cổ cũng bảo vệ thương nhân, tôn trọng tôn giáo đa dạng, khuyến khích trao đổi văn hóa, công nghệ.

Các cháu Thành Cát Tư Hãn tiếp tục mở rộng: Kubilai Hãn thành lập triều đại Nguyên ở Trung Quốc (1271-1368). Pax Mongolica (hòa bình Mông Cổ) mở ra Con đường tơ lụa an toàn, Marco Polo du hành từ châu Âu đến Trung Quốc. Đế chế tan rã vào thế kỷ 14, nhưng di sản vẫn còn: trộn lẫn văn hóa Á-Âu, hệ thống bưu chính (yam), luật pháp (Yassa), và làm thay đổi bản đồ chính trị toàn cầu. DNA hiện đại cho thấy 16 triệu người đàn ông (0.5% nam giới thế giới) có thể là hậu duệ của Thành Cát Tư Hãn!`,
      year: 1206,
      isBc: false,
      importanceLevel: 5,
      source: 'Mongol Empire History, The Secret History of the Mongols',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 4. Thời kỳ khám phá địa lý
  const ageOfDiscovery = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thời đại khám phá địa lý',
      description: 'Châu Âu khám phá thế giới mới',
      content: `Thời đại khám phá (Age of Discovery/Exploration, khoảng 1400-1600) là thời kỳ châu Âu thực hiện các chuyến hải hành xuyên đại dương để khám phá tuyến đường thương mại mới, thuộc địa, và tài nguyên. Động lực gồm: tìm gia vị từ Á châu (hồ tiêu, đinh hương, nhục đậu khấu), vàng, truyền bá Kitô giáo, khát khao danh vọng, và tiến bộ công nghệ hàng hải (la bàn, astrolabe, caravel ship, bản đồ portolan).

Bồ Đào Nha dẫn đầu dưới sự bảo trợ của Hoàng tử Henry the Navigator. Bartolomeu Dias vòng qua Mũi Hảo Vọng (Cape of Good Hope) năm 1488, mở đường đến Ấn Độ. Vasco da Gama đến Calicut, Ấn Độ năm 1498, thiết lập tuyến đường biển đến châu Á. Tây Ban Nha tài trợ Christopher Columbus "đi tây sang đông", ông đến châu Mỹ năm 1492. Ferdinand Magellan (phục vụ Tây Ban Nha) thực hiện chuyến hành trình vòng quanh thế giới đầu tiên (1519-22).

Hiệp ước Tordesillas (1494) chia thế giới "chưa khám phá" giữa Tây Ban Nha và Bồ Đào Nha theo kinh tuyến, được Pope chứng kiến. Conquistador Tây Ban Nha Hernán Cortés chinh phục đế chế Aztec (1519-21), Francisco Pizarro hạ đế chế Inca (1532-33), đem về núi vàng và bạc. Bồ Đào Nha thiết lập đế chế thương mại ở châu Phi, Ấn Độ, Brazil, Macau. Hà Lan, Anh, Pháp sau này cũng tham gia.

Thời đại khám phá thay đổi thế giới: (1) Columbian Exchange: trao đổi động thực vật, cây trồng (khoai tây, ngô, cà chua sang châu Âu; ngựa, bò, lúa mì sang châu Mỹ), và bệnh tật (đậu mùa giết 90% dân bản địa Mỹ). (2) Chuyển trọng tâm kinh tế từ Địa Trung Hải sang Đại Tây Dương. (3) Chủ nghĩa thực dân và buôn bán nô lệ xuyên Đại Tây Dương. (4) Toàn cầu hóa sớm: thế giới lần đầu kết nối qua thương mại biển. (5) Hình thành các đế chế thực dân châu Âu. Đây là điểm bắt đầu của thời đại hiện đại.`,
      year: 1492,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Age of Discovery Historical Records',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 5. Cách mạng Khoa học thế kỷ 17
  const scientificRevolution = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cách mạng Khoa học',
      description: 'Từ thần học sang khoa học thực nghiệm',
      content: `Cách mạng Khoa học (Scientific Revolution, khoảng 1500-1700) là sự chuyển đổi sâu sắc trong tư duy về thế giới, từ quan niệm trung cổ dựa trên thần học và Aristotle sang phương pháp khoa học hiện đại dựa trên quan sát, thí nghiệm, toán học. Đây là nền tảng của khoa học và công nghệ hiện đại, thay đổi hoàn toàn nền văn minh nhân loại.

Nicolaus Copernicus khởi đầu với "De revolutionibus orbium coelestium" (1543), đề xuất mô hình nhật tâm (heliocentric): Mặt Trời ở trung tâm, Trái Đất và các hành tinh quay quanh. Điều này mâu thuẫn với mô hình địa tâm (geocentric) của Ptolemy và giáo lý Công giáo. Galileo Galilei sử dụng kính thiên văn (1609) quan sát mặt trăng của Sao Mộc, pha của Sao Kim, chứng minh Copernicus đúng. Năm 1633, Công giáo xét xử Galileo với tội dị giáo, buộc ông rút lời và quản thúc tại gia.

Johannes Kepler phát hiện ba định luật chuyển động hành tinh (1609-19): quỹ đạo ellipse, không phải tròn hoàn hảo. Isaac Newton tổng hợp tất cả trong "Principia Mathematica" (1687): định luật vạn vật hấp dẫn và ba định luật chuyển động, giải thích cả chuyển động trên Trái Đất lẫn các thiên thể bằng một lý thuyết thống nhất - đỉnh cao của cách mạng khoa học.

Francis Bacon phát triển phương pháp quy nạp (inductive method) trong "Novum Organum" (1620): từ quan sát cụ thể đến quy luật tổng quát, nhấn mạnh thí nghiệm. René Descartes đề xuất phương pháp diễn dịch (deductive method) và chủ nghĩa duy lý toán học trong "Discourse on Method" (1637). Cả hai cùng hình thành phương pháp khoa học hiện đại. Các viện Khoa học được thành lập: Royal Society of London (1660), Académie des Sciences ở Paris (1666).

Cách mạng Khoa học không chỉ thay đổi tri thức mà còn thái độ: từ tin vào quyền uy cổ đại (Aristotle, Kinh thánh) sang tin vào lý trí, quan sát, thí nghiệm. Nó dẫn đến Thời đại Khai sáng, Cách mạng Công nghiệp, và thế giới hiện đại. Như Isaac Newton viết: "Nếu tôi nhìn xa hơn, đó là vì tôi đứng trên vai những người khổng lồ."`,
      year: 1543,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Copernicus, Galileo, Kepler, Newton, Bacon',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 6. Thời đại Khai sáng (Enlightenment)
  const enlightenment = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thời đại Khai sáng',
      description: 'Lý trí, tự do, tiến bộ',
      content: `Thời đại Khai sáng (Age of Enlightenment/Age of Reason, khoảng 1650-1800) là phong trào trí thức châu Âu nhấn mạnh lý trí, khoa học, chủ nghĩa cá nhân, quyền con người, và phê phán truyền thống, dogma tôn giáo, chế độ quân chủ chuyên chế. Khai sáng bắt nguồn từ Cách mạng Khoa học và triết học Descartes, Locke, lan rộng khắp châu Âu, ảnh hưởng sâu rộng đến chính trị, xã hội, văn hóa.

John Locke ("Hai luận về Chính phủ", 1689) đề xuất quyền tự nhiên (natural rights): sự sống, tự do, tài sản; chính phủ chỉ hợp pháp khi có sự đồng ý của người bị trị (consent of the governed). Nếu chính phủ vi phạm quyền, dân có quyền cách mạng. Ý tưởng này ảnh hưởng Hiến pháp Mỹ và Cách mạng Pháp. Montesquieu ("Tinh thần pháp luật", 1748) đề xuất tam quyền phân lập (lập pháp, hành pháp, tư pháp) để ngăn chuyên quyền.

Voltaire ủng hộ tự do ngôn luận, tôn giáo, phê phán Công giáo và mê tín. Jean-Jacques Rousseau ("Khế ước xã hội", 1762) nổi tiếng với "Con người sinh ra tự do, nhưng ở khắp nơi trong xiềng xích", đề xuất chủ quyền nhân dân và ý chí chung. Immanuel Kant định nghĩa Khai sáng: "Dám biết!" (Sapere aude) - dũng cảm sử dụng lý trí của chính mình mà không dựa vào quyền uy.

Denis Diderot và Jean d'Alembert biên tập "Encyclopédie" (1751-72) - 28 tập tổng hợp tri thức nhân loại, phổ biến ý tưởng Khai sáng. Adam Smith ("Của cải của các quốc gia", 1776) đặt nền móng kinh tế học hiện đại với "bàn tay vô hình" của thị trường tự do. David Hume phát triển chủ nghĩa kinh nghiệm và hoài nghi triết học.

Khai sáng dẫn đến: (1) Cách mạng Mỹ (1776) và Pháp (1789) - lật đổ quân chủ, thiết lập dân chủ. (2) Tuyên ngôn Nhân quyền và Dân quyền. (3) Thế tục hóa (secularization) xã hội, tách nhà thờ khỏi nhà nước. (4) Cải cách giáo dục, nhấn mạnh lý trí, khoa học. (5) Chủ nghĩa nhân đạo, chống nô lệ, cải cách tù nhân. Khai sáng là nền tảng tư tưởng của thế giới hiện đại: dân chủ, nhân quyền, khoa học, pháp quyền.`,
      year: 1715,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Locke, Voltaire, Rousseau, Kant, Encyclopédie',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 7. Thống nhất Đức
  const germanUnification = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thống nhất nước Đức',
      description: 'Bismarck và đế quốc Đức',
      content: `Thống nhất nước Đức (German Unification) dưới sự lãnh đạo của Otto von Bismarck (1815-1898), Thủ tướng Prussia, biến vùng đất chia cắt thành 39 quốc gia (German Confederation) thành Đế quốc Đức (German Empire) mạnh nhất châu Âu năm 1871. Đây là sự kiện địa chính trị quan trọng nhất thế kỷ 19, thay đổi cân bằng quyền lực châu Âu và dẫn đến hai cuộc Thế chiến.

Sau Đại hội Vienna (1815), vùng đất Đức vẫn chia cắt dưới ảnh hưởng của Áo (Austria) và Prussia. Bismarck, được vua Wilhelm I bổ nhiệm năm 1862, theo đuổi chính sách "sắt và máu" (Blut und Eisen): thống nhất bằng quân sự, không phải diễn thuyết. Ông khiêu khích ba cuộc chiến: (1) Chiến tranh Đan Mạch (1864): chiếm Schleswig-Holstein. (2) Chiến tranh Áo-Phổ (1866): đánh bại Áo trong 7 tuần, loại Áo khỏi chính trị Đức, thành lập Liên bang Bắc Đức (North German Confederation).

Bismarck sau đó khéo léo khiêu khích chiến tranh với Pháp. Ông chỉnh sửa Telegram Ems (1870) làm xúc phạm cả Pháp lẫn Prussia, khiến Pháp tuyên chiến. Chiến tranh Pháp-Phổ (1870-71) kết thúc với thắng lợi áp đảo của Prussia: Napoléon III bị bắt tại Sedan, Paris bị bao vây. Ngày 18/1/1871, các hoàng tử Đức tuyên bố Wilhelm I là Hoàng đế Đức (Kaiser) tại Điện Hall of Mirrors, Versailles - một sự sỉ nhục Pháp.

Đế quốc Đức trở thành cường quốc công nghiệp và quân sự hàng đầu châu Âu. Bismarck thực hiện chính sách Realpolitik (chính trị thực tế) tinh vi, duy trì hòa bình châu Âu qua hệ thống đồng minh, cô lập Pháp. Ông còn tiên phong phúc lợi xã hội (bảo hiểm y tế, tai nạn, hưu trí) để giảm ảnh hưởng của đảng xã hội. Tuy nhiên, sau khi Kaiser Wilhelm II sa thải Bismarck (1890), chính sách ngoại giao Đức trở nên hung hăng, dẫn đến cuộc đua vũ trang và Thế chiến I (1914).`,
      year: 1871,
      isBc: false,
      importanceLevel: 4,
      source: 'Otto von Bismarck, German History',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 8. Phong trào Dân quyền Mỹ
  const civilRightsMovement = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phong trào Dân quyền tại Mỹ',
      description: 'Đấu tranh cho bình đẳng chủng tộc',
      content: `Phong trào Dân quyền (Civil Rights Movement, 1954-1968) là cuộc đấu tranh của người Mỹ gốc Phi vì bình đẳng, chống phân biệt chủng tộc (racism, segregation) và đòi quyền bỏ phiếu, giáo dục, việc làm bình đẳng. Mặc dù nô lệ bị bãi bỏ sau Nội chiến (1865), các tiểu bang miền Nam ban hành luật Jim Crow tạo ra "riêng biệt nhưng bình đẳng" (separate but equal) - thực chất là phân biệt đối xử nghiêm trọng.

Bước ngoặt là phán quyết Brown v. Board of Education (1954) của Tòa án Tối cao: phân biệt chủng tộc trong trường học là vi hiến. Rosa Parks (1955) từ chối nhường ghế xe bus cho người da trắng tại Montgomery, Alabama, bị bắt, dẫn đến cuộc tẩy chay xe bus Montgomery kéo dài 381 ngày do Martin Luther King Jr. lãnh đạo - thắng lợi đầu tiên lớn. King theo chủ nghĩa bất bạo động (nonviolent resistance) của Gandhi.

Các sự kiện quan trọng: Little Rock Nine (1957) - 9 học sinh da đen đi học tại trường da trắng được quân đội bảo vệ. Sit-ins (1960) - sinh viên da đen ngồi tại quầy phục vụ chỉ dành cho da trắng, từ chối rời đi. Freedom Rides (1961) - thử nghiệm cấm phân biệt trên xe bus liên bang. March on Washington (1963) - 250,000 người tuần hành, King đọc diễn văn "I Have a Dream". Birmingham Campaign (1963) - cảnh sát dùng chó và vòi rồng tấn công người biểu tình ôn hòa, gây chấn động.

Tổng thống Lyndon B. Johnson ký Civil Rights Act (1964) - cấm phân biệt đối xử trong việc làm, nơi công cộng, và Voting Rights Act (1965) - bảo vệ quyền bỏ phiếu. Martin Luther King Jr. nhận Nobel Hòa bình 1964, nhưng bị ám sát năm 1968 ở tuổi 39. Malcolm X, lãnh đạo Nation of Islam, ủng hộ tự vệ và Black Power, cũng bị ám sát (1965). Phong trào để lại di sản: luật dân quyền, thay đổi thái độ xã hội, mở đường cho đa dạng trong chính trị (Barack Obama - tổng thống da đen đầu tiên, 2009).`,
      year: 1954,
      isBc: false,
      importanceLevel: 5,
      source: 'Martin Luther King Jr., Civil Rights History',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 9. Sụp đổ Liên Xô
  const sovietCollapse = await prisma.knowledgeEntry.create({
    data: {
      title: 'Sụp đổ Liên Xô và kết thúc Chiến tranh Lạnh',
      description: 'Từ Bức tường Berlin đến giải thể USSR',
      content: `Sụp đổ Liên Xô (Soviet Union collapse, 1989-1991) đánh dấu kết thúc Chiến tranh Lạnh (1947-1991) - cuộc đối đầu địa chính trị, ý thức hệ giữa Liên Xô (cộng sản) và Mỹ (tư bản chủ nghĩa) kéo dài gần nửa thế kỷ. Sự kiện này thay đổi trật tự thế giới, kết thúc kỷ nguyên lưỡng cực, mở ra thế giới đơn cực với Mỹ là siêu cường duy nhất.

Mikhail Gorbachev lên nắm quyền lãnh đạo Liên Xô năm 1985, thực hiện cải cách glasnost (công khai, minh bạch) và perestroika (tái cấu trúc kinh tế). Ông muốn cứu vãn chủ nghĩa cộng sản, nhưng vô tình kích hoạt sự sụp đổ. Glasnost cho phép tự do ngôn luận chưa từng có, vạch trần tội ác thời Stalin, làm xói mòn niềm tin vào Đảng. Perestroika gây hỗn loạn kinh tế. Gorbachev cũng rút quân khỏi Afghanistan (1989), chấm dứt cuộc chiến thảm họa 10 năm.

Năm 1989, "Mùa xuân các Dân tộc" quét qua Đông Âu: Ba Lan, Hungary, Đông Đức, Tiệp Khắc, Bulgaria, Romania lật đổ chính quyền cộng sản. Biểu tượng mạnh nhất: Bức tường Berlin sụp đổ (9/11/1989) - hàng triệu người Đông Đức tràn sang Tây Berlin, phá tường bằng tay không. Đông-Tây Đức thống nhất (1990). Gorbachev không can thiệp quân sự như tiền nhiệm, để các nước Đông Âu tự quyết.

Trong Liên Xô, các nước cộng hòa đòi độc lập. Boris Yeltsin, Chủ tịch Nga, đối đầu với Gorbachev. Cuộc đảo chính thất bại của bảo thủ cộng sản (8/1991) làm suy yếu Gorbachev. Ngày 25/12/1991, Gorbachev từ chức, lá cờ đỏ búa liềm hạ xuống khỏi Kremlin lần cuối, thay bằng quốc kỳ Nga. Liên Xô chính thức giải thể, tách thành 15 quốc gia độc lập. Francis Fukuyama tuyên bố "Sự kết thúc của lịch sử" - chiến thắng cuối cùng của dân chủ tự do. Nhưng lịch sử tiếp diễn: Nga dưới Putin, Trung Quốc mô hình riêng, khủng bố, và đối đầu mới.`,
      year: 1991,
      isBc: false,
      importanceLevel: 5,
      source: 'Gorbachev, Cold War History',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 10. Cách mạng Văn hóa Trung Quốc
  const culturalRevolution = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cách mạng Văn hóa Trung Quốc',
      description: 'Mao Trạch Đông và thập kỷ hỗn loạn',
      content: `Cách mạng Văn hóa Vô sản (Great Proletarian Cultural Revolution, 1966-1976) là phong trào chính trị-xã hội triệt để do Mao Trạch Đông phát động, nhằm thanh trừng "yếu tố tư bản" trong Đảng Cộng sản và xã hội Trung Quốc, củng cố quyền lực cá nhân sau thất bại của Nhảy vọt Đại (Great Leap Forward, 1958-62) gây nạn đói chết 15-45 triệu người.

Mao kêu gọi thanh niên "tạo phản là có lý" (造反有理), hàng triệu học sinh thành lập Hồng Vệ binh (Red Guards), tấn công "Tứ cũ" (tư tưởng, văn hóa, phong tục, tập quán cũ). Họ phá hủy di tích lịch sử, đền chùa, sách cổ, đánh đập giáo viên, trí thức, "phần tử phản cách mạng". "Tiểu hồng thư" (Quotations from Chairman Mao) trở thành Kinh thánh cộng sản, mọi người phải học thuộc lòng. Thờ phượng cá nhân Mao đạt cực điểm: "Mao là mặt trời đỏ trong lòng chúng ta."

Xã hội Trung Quốc rơi vào hỗn loạn: trường học đóng cửa, kinh tế đình trệ, nội chiến giữa các phe Hồng Vệ binh. "Cuộc đấu tố" (struggle sessions) công khai làm nhục, tra tấn các đối tượng "phản động": trí thức, nghệ sĩ, doanh nhân, lãnh đạo Đảng. Liu Shaoqi, Chủ tịch nước, bị thanh trừng, chết trong tù (1969). Hàng triệu người bị gửi đến nông thôn "cải tạo tư tưởng". Ước tính 1.5-2 triệu người chết, hàng chục triệu bị đàn áp.

"Băng bốn" (Gang of Four) bao gồm vợ Mao, Giang Thanh, kiểm soát văn hóa, tuyên truyền, thực hiện chính sách cực đoan. Cách mạng Văn hóa chính thức kết thúc năm 1976 khi Mao qua đời. Đặng Tiểu Bình nắm quyền, bắt giữ Băng bốn, phủ nhận Cách mạng Văn hóa là "thảm họa", mở cửa cải cách kinh tế (1978). Di sản: mất mát văn hóa không thể bù đắp, thế hệ "thanh niên xuống tầng lớp" (sent-down youth) bị mất giáo dục, chấn thương tâm lý tập thể. Trung Quốc hiện đại tránh nhắc đến giai đoạn đen tối này, nhưng ký ức vẫn ám ảnh.`,
      year: 1966,
      isBc: false,
      importanceLevel: 5,
      source: 'Mao Zedong, Chinese History',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: chinaCountry ? {
        create: [{ countryId: chinaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  console.log('✅ Additional history seeding completed!');
  console.log('Created 10 new history knowledge entries:');
  console.log('1. Nền văn minh Ai Cập cổ đại');
  console.log('2. Đế chế Alexander Đại đế');
  console.log('3. Đế chế Mông Cổ của Thành Cát Tư Hãn');
  console.log('4. Thời đại khám phá địa lý');
  console.log('5. Cách mạng Khoa học');
  console.log('6. Thời đại Khai sáng');
  console.log('7. Thống nhất nước Đức');
  console.log('8. Phong trào Dân quyền tại Mỹ');
  console.log('9. Sụp đổ Liên Xô và kết thúc Chiến tranh Lạnh');
  console.log('10. Cách mạng Văn hóa Trung Quốc');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
