import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding additional history knowledge (set 2)...');

  // Get existing categories and countries
  const historyCategory = await prisma.category.findUnique({
    where: { name: 'Lịch sử' }
  });

  if (!historyCategory) {
    throw new Error('History category not found. Please run seed.ts first.');
  }

  const greeceCountry = await prisma.country.findUnique({ where: { name: 'Hy Lạp' } });
  const chinaCountry = await prisma.country.findUnique({ where: { name: 'Trung Quốc' } });
  const usaCountry = await prisma.country.findUnique({ where: { name: 'Hoa Kỳ' } });
  const ukCountry = await prisma.country.findUnique({ where: { name: 'Anh' } });
  const germanyCountry = await prisma.country.findUnique({ where: { name: 'Đức' } });

  // Create 10 new history knowledge entries

  const renaissance = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thời kỳ Phục Hưng',
      description: 'Phong trào văn hóa, nghệ thuật và khoa học ở châu Âu',
      content: `Thời kỳ Phục Hưng (Renaissance) là một phong trào văn hóa, nghệ thuật, chính trị và kinh tế bắt đầu từ Italia vào thế kỷ 14 và lan rộng ra toàn châu Âu cho đến thế kỷ 17. Thuật ngữ "Renaissance" có nghĩa là "tái sinh" bằng tiếng Pháp, phản ánh sự hồi sinh quan tâm đến văn hóa cổ điển Hy Lạp và La Mã. Thời kỳ này đánh dấu sự chuyển đổi từ thời Trung Cổ sang thời Hiện đại, với những thay đổi sâu sắc trong nghệ thuật, kiến trúc, khoa học, và tư duy con người.

Phục Hưng Italia bắt đầu ở Florence dưới sự bảo trợ của gia tộc Medici, những nhà ngân hàng giàu có tài trợ cho các nghệ sĩ và học giả. Các thiên tài như Leonardo da Vinci (1452-1519) thể hiện tinh thần "uomo universale" (con người toàn diện), giỏi cả hội họa, điêu khắc, kiến trúc, khoa học, và kỹ thuật. Michelangelo (1475-1564) tạo ra những kiệt tác như tượng David và bích họa trần nhà nguyện Sistine. Raphael (1483-1520) hoàn thiện nghệ thuật hội họa với các tác phẩm hài hòa và cân đối hoàn hảo.

Phục Hưng không chỉ là phong trào nghệ thuật mà còn là cuộc cách mạng tư tưởng. Chủ nghĩa nhân văn (Humanism) đặt con người và khả năng của con người vào trung tâm, thay vì tập trung hoàn toàn vào tôn giáo như thời Trung Cổ. Các học giả như Petrarch và Erasmus nghiên cứu các văn bản cổ điển, phát triển tư duy phê phán và phương pháp khoa học mới. Sự phát minh của máy in Gutenberg (khoảng 1440) đã cách mạng hóa việc phổ biến kiến thức, cho phép sách được sản xuất hàng loạt và lan tỏa ý tưởng nhanh chóng.

Ảnh hưởng của Phục Hưng vượt xa châu Âu và kéo dài đến ngày nay. Nó đặt nền móng cho khoa học hiện đại thông qua các nhà khoa học như Copernicus và Galileo, những người thách thức quan điểm truyền thống về vũ trụ. Phục Hưng cũng ảnh hưởng đến chính trị với các tác phẩm như "Il Principe" (Quân Chủ) của Machiavelli, và khám phá địa lý với các chuyến đi của Columbus và Magellan. Di sản của Phục Hưng có thể thấy trong nghệ thuật, kiến trúc, văn học, và tư duy phê phán ngày nay.`,
      year: 1350,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Jacob Burckhardt, Renaissance History',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const blackdeath = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cái chết Đen (Dịch hạch)',
      description: 'Đại dịch tàn khốc nhất lịch sử châu Âu',
      content: `Cái chết Đen (Black Death) là đại dịch hạch (plague) tàn khốc nhất trong lịch sử nhân loại, tàn phá châu Âu từ 1347 đến 1353. Bệnh được gây ra bởi vi khuẩn Yersinia pestis, lây lan qua bọ chét trên chuột. Tên gọi "Black Death" xuất phát từ các triệu chứng đáng sợ bao gồm các hạch sưng đen (buboes) và hoại tử da. Dịch bệnh được cho là bắt nguồn từ Trung Á và lan sang châu Âu qua con đường Tơ lụa, khi các thương nhân và lính đánh thuê mang mầm bệnh trở về từ Đông phương.

Dịch hạch đầu tiên xuất hiện ở cảng Messina, Sicily vào tháng 10 năm 1347, khi 12 con tàu từ Biển Đen cập bến với hầu hết thủy thủ đã chết hoặc hấp hối. Từ đó, bệnh lan rộng với tốc độ kinh hoàng khắp châu Âu. Ước tính từ 75 đến 200 triệu người đã chết, chiếm khoảng 30-60% dân số châu Âu thời đó. Một số vùng như Florence mất 80% dân số. Giovanni Boccaccio, nhà văn Italia, đã ghi lại cảnh tượng kinh hoàng trong tác phẩm "Decameron", mô tả xác chết chất đống trên đường phố và sự sụp đổ của trật tự xã hội.

Nguyên nhân và cách lây lan của bệnh không được hiểu vào thời điểm đó. Mọi người đổ lỗi cho không khí độc hại (miasma), sự sắp đặt của các hành tinh, hoặc sự trừng phạt của Thần. Điều này dẫn đến các phản ứng cực đoan như phong trào Flagellants (những người tự đánh đòn mình để chuộc tội) và việc đổ lỗi cho người Do Thái, dẫn đến các cuộc thảm sát tàn khốc. Các phương pháp "điều trị" bao gồm chảy máu, áp dụng thảo mộc, và đeo mặt nạ có mũi dài chứa đầy hương liệu (mặt nạ bác sĩ dịch hạch nổi tiếng).

Mặc dù tàn khốc, Cái chết Đen đã có những ảnh hưởng sâu rộng đến lịch sử châu Âu. Sự thiếu hụt lao động trầm trọng đã cải thiện vị thế của nông dân còn sống sót, dẫn đến sự sụp đổ dần của chế độ phong kiến. Tiền lương tăng cao, và quyền lực của lãnh chủ giảm sút. Y học và khoa học bắt đầu phát triển khi con người tìm kiếm giải thích và giải pháp thực tế hơn. Cuối cùng, kinh nghiệm chung về thảm họa này đã góp phần hình thành ý thức châu Âu chung. Các đợt bùng phát dịch hạch tiếp tục xảy ra trong nhiều thế kỷ sau, nhưng không bao giờ tàn khốc như đại dịch đầu tiên này.`,
      year: 1347,
      isBc: false,
      approximateDate: false,
      importanceLevel: 5,
      source: 'Giovanni Boccaccio, Medieval chronicles',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const frenchrev = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cách mạng Pháp',
      description: 'Cuộc cách mạng thay đổi lịch sử châu Âu',
      content: `Cách mạng Pháp (1789-1799) là một trong những sự kiện quan trọng nhất trong lịch sử thế giới, đánh dấu sự chấm dứt của chế độ quân chủ chuyên chế và sự trỗi dậy của các nguyên tắc dân chủ, tự do, và bình đẳng ở châu Âu. Cuộc cách mạng bắt đầu vào ngày 14 tháng 7 năm 1789 với sự kiện Bastille bị tấn công - một nhà tù tượng trưng cho sự áp bức của chế độ quân chủ. Nguyên nhân của cách mạng bao gồm khủng hoảng tài chính nghiêm trọng, sự bất bình đẳng xã hội trong hệ thống đẳng cấp cũ (Ancien Régime), và ảnh hưởng của tư tưởng Khai sáng.

Xã hội Pháp trước cách mạng được chia thành ba đẳng cấp (Estates): tăng lữ (First Estate), quý tộc (Second Estate), và dân thường (Third Estate) chiếm 98% dân số nhưng gánh chịu hầu hết gánh nặng thuế. Khi vua Louis XVI triệu tập Estates-General (Hội nghị ba đẳng cấp) vào tháng 5/1789 để giải quyết khủng hoảng tài chính, đại biểu đẳng cấp thứ ba đã tách ra và tự tuyên bố thành Hội đồng Lập hiến Quốc gia (National Constituent Assembly). Họ ban hành Tuyên ngôn Nhân quyền và Dân quyền (Declaration of the Rights of Man and of the Citizen) vào tháng 8/1789, khẳng định các nguyên tắc tự do, bình đẳng, và chủ quyền quốc gia.

Cách mạng trải qua nhiều giai đoạn, từ quân chủ lập hiến (1789-1792) đến nền Cộng hòa cực đoan và Thời kỳ Khủng bố (Reign of Terror, 1793-1794) dưới sự lãnh đạo của Robespierre và Jacobins. Trong thời kỳ này, hàng chục nghìn người bị xử tử bằng máy chém, bao gồm cả vua Louis XVI (tháng 1/1793) và hoàng hậu Marie Antoinette (tháng 10/1793). Các khẩu hiệu "Liberté, Égalité, Fraternité" (Tự do, Bình đẳng, Bác ái) trở thành biểu tượng của cách mạng và sau này của nền Cộng hòa Pháp.

Cách mạng Pháp đã có ảnh hưởng sâu rộng đến lịch sử thế giới. Nó đã truyền cảm hứng cho các phong trào cách mạng và độc lập trên toàn thế giới, từ Haiti đến Mỹ Latinh. Các nguyên tắc dân chủ, nhân quyền, và chủ quyền của nhân dân mà nó khẳng định đã trở thành nền tảng của hệ thống chính trị hiện đại. Tuy nhiên, cách mạng cũng cho thấy những nguy hiểm của chủ nghĩa cực đoan và bạo lực chính trị. Cuối cùng, cách mạng mở đường cho sự trỗi dậy của Napoleon Bonaparte, người sẽ định hình lại bản đồ châu Âu trong những thập kỷ tiếp theo. Di sản của Cách mạng Pháp - từ hệ thống pháp luật Napoleonic Code đến các khái niệm về quốc gia dân tộc - vẫn còn ảnh hưởng sâu rộng đến thế giới ngày nay.`,
      year: 1789,
      isBc: false,
      approximateDate: false,
      importanceLevel: 5,
      source: 'French Revolutionary Archives',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const industrialrev = await prisma.knowledgeEntry.create({
    data: {
      title: 'Cách mạng Công nghiệp',
      description: 'Sự chuyển đổi từ sản xuất thủ công sang cơ khí hóa',
      content: `Cách mạng Công nghiệp (Industrial Revolution) là quá trình chuyển đổi sâu sắc từ nền kinh tế nông nghiệp và thủ công sang nền kinh tế công nghiệp và cơ khí hóa, bắt đầu từ Anh vào giữa thế kỷ 18 và lan rộng ra toàn thế giới. Đây là một trong những bước ngoặt quan trọng nhất trong lịch sử nhân loại, thay đổi căn bản cách con người sống, làm việc, và tương tác. Cách mạng bắt đầu với ngành dệt may, khi các phát minh như máy kéo sợi Jenny của James Hargreaves (1764) và máy dệt nước của Richard Arkwright (1769) đã tăng năng suất lên gấp nhiều lần.

Động cơ hơi nước của James Watt (cải tiến 1769) là một trong những phát minh quan trọng nhất, cung cấp nguồn năng lượng đáng tin cậy cho các nhà máy, mỏ than, và cuối cùng là giao thông vận tải. Máy xe lửa của George Stephenson (1814) đã cách mạng hóa vận tải, cho phép hàng hóa và người di chuyển với tốc độ và quy mô chưa từng có. Đường sắt đầu tiên dành cho hành khách, từ Liverpool đến Manchester (1830), đánh dấu bước ngoặt trong lịch sử giao thông. Công nghiệp thép phát triển mạnh mẽ với quy trình Bessemer (1856), cung cấp thép giá rẻ cho xây dựng đường sắt, cầu, và tòa nhà.

Cách mạng Công nghiệp mang lại sự thịnh vượng chưa từng có nhưng cũng tạo ra những vấn đề xã hội nghiêm trọng. Đô thị hóa nhanh chóng dẫn đến các thành phố công nghiệp đông đúc, ô nhiễm, với điều kiện sống tồi tệ cho giai cấp công nhân. Công nhân, bao gồm cả phụ nữ và trẻ em, làm việc 12-16 giờ mỗi ngày trong điều kiện nguy hiểm với mức lương thấp. Charles Dickens đã miêu tả sống động những khó khăn này trong các tiểu thuyết của ông. Sự bất bình đẳng gia tăng dẫn đến sự phát triển của các phong trào lao động, công đoàn, và các tư tưởng chính trị mới như chủ nghĩa xã hội và chủ nghĩa Mác.

Ảnh hưởng của Cách mạng Công nghiệp là toàn cầu và lâu dài. Nó đã tạo ra khoảng cách kinh tế lớn giữa các nước công nghiệp hóa và các nước khác, dẫn đến chủ nghĩa đế quốc khi các cường quốc châu Âu tìm kiếm nguyên liệu thô và thị trường. Về mặt tích cực, nó đã tăng năng suất, cải thiện mức sống trung bình (mặc dù không đồng đều), và thúc đẩy đổi mới công nghệ. Cách mạng Công nghiệp lần thứ hai (cuối thế kỷ 19 - đầu thế kỷ 20) mang đến điện, hóa chất, và sản xuất hàng loạt. Ngày nay, chúng ta đang sống trong Cách mạng Công nghiệp lần thứ tư, được đặc trưng bởi trí tuệ nhân tạo, robot, và công nghệ sinh học, tiếp tục di sản của sự chuyển đổi bắt đầu từ hơn 250 năm trước.`,
      year: 1760,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'James Watt, Industrial History',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: ukCountry ? {
        create: [{ countryId: ukCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  const wwi = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chiến tranh Thế giới thứ nhất',
      description: 'Đại chiến toàn cầu đầu tiên 1914-1918',
      content: `Chiến tranh Thế giới thứ nhất (World War I, 1914-1918), còn được gọi là "Đại Chiến" (Great War), là một trong những xung đột đẫm máu nhất lịch sử, gây ra cái chết của hơn 17 triệu người và làm thay đổi bản đồ chính trị thế giới. Chiến tranh bùng nổ vào ngày 28 tháng 7 năm 1914, một tháng sau khi Thái tử Franz Ferdinand của Áo-Hung bị ám sát ở Sarajevo bởi Gavrilo Princip, một người Serbia dân tộc chủ nghĩa. Sự kiện này đã kích hoạt một chuỗi các liên minh và tuyên chiến, kéo các cường quốc châu Âu vào xung đột.

Các nước tham chiến chia thành hai進 phe chính: Đồng Minh (Allied Powers) bao gồm Pháp, Anh, Nga, và sau này là Italia và Hoa Kỳ; và Liên minh Trung tâm (Central Powers) bao gồm Đức, Áo-Hung, và Đế quốc Ottoman. Chiến tranh nhanh chóng đi vào bế tắc trên Mặt trận Tây Âu, nơi hàng triệu binh lính đối đầu nhau trong mạng lưới chiến hào kéo dài từ Biển Bắc đến Thụy Sĩ. Các trận đánh như Verdun (1916) và Somme (1916) đã giết chết hàng trăm nghìn người mà hầu như không có tiến bộ lãnh thổ nào. Chiến tranh hào này trở thành biểu tượng của sự vô nghĩa và sự tàn khốc của chiến tranh hiện đại.

Thế Chiến I chứng kiến việc sử dụng công nghệ quân sự mới đáng sợ. Khí độc (chlorine và mustard gas) được sử dụng lần đầu tiên quy mô lớn, gây ra cái chết đau đớn cho hàng chục nghìn người. Xe tăng xuất hiện lần đầu trong Trận Somme năm 1916. Máy bay chuyển từ công cụ trinh sát thành vũ khí tấn công. Súng máy như Maxim gun có thể bắn hàng trăm viên đạn mỗi phút, làm cho các cuộc tấn công bộ binh trở nên cực kỳ chết chóc. Chiến tranh tàu ngầm, đặc biệt là các U-boat của Đức, đe dọa đường tiếp tế qua Đại Tây Dương. Việc Đức đánh chìm tàu Lusitania năm 1915, giết chết 128 người Mỹ, đã góp phần đưa Hoa Kỳ vào chiến tranh năm 1917.

Chiến tranh kết thúc vào ngày 11 tháng 11 năm 1918 khi Đức ký đình chiến. Hiệp ước Versailles năm 1919 đã đặt ra các điều khoản khắc nghiệt đối với Đức, buộc họ chấp nhận toàn bộ trách nhiệm cho chiến tranh và phải trả bồi thường khổng lồ. Chiến tranh đã dẫn đến sự sụp đổ của bốn đế chế lớn: Đức, Áo-Hung, Nga (Cách mạng Bolshevik 1917), và Ottoman. Bản đồ châu Âu được vẽ lại với nhiều quốc gia mới như Tiệp Khắc, Yugoslavia, và Ba Lan. Hội Quốc Liên được thành lập với hy vọng ngăn chặn chiến tranh tương lai, mặc dù nó cuối cùng đã thất bại. Di sản của Thế Chiến I bao gồm sự mất niềm tin vào lý tưởng tiến bộ, ảnh hưởng văn hóa sâu sắc (văn học, nghệ thuật phản chiến), và tạo điều kiện cho Chiến tranh Thế giới thứ hai chỉ hai thập kỷ sau.`,
      year: 1914,
      isBc: false,
      approximateDate: false,
      importanceLevel: 5,
      source: 'WWI Historical Archives',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const wwii = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chiến tranh Thế giới thứ hai',
      description: 'Xung đột toàn cầu lớn nhất lịch sử 1939-1945',
      content: `Chiến tranh Thế giới thứ hai (World War II, 1939-1945) là xung đột quân sự lớn nhất và đẫm máu nhất trong lịch sử nhân loại, với ước tính 70-85 triệu người chết, chiếm khoảng 3% dân số thế giới thời đó. Chiến tranh bắt đầu vào ngày 1 tháng 9 năm 1939 khi Đức quốc xã (Nazi Germany) dưới sự lãnh đạo của Adolf Hitler xâm lược Ba Lan, khiến Anh và Pháp tuyên chiến với Đức. Chiến tranh là hậu quả trực tiếp của Thế Chiến I, với các điều khoản khắc nghiệt của Hiệp ước Versailles, Đại suy thoái kinh tế, và sự trỗi dậy của chủ nghĩa phát xít ở Đức, Italia, và Nhật Bản.

Chiến tranh chia làm hai giai đoạn chính và nhiều mặt trận. Ở châu Âu, Đức quốc xã sử dụng chiến thuật blitzkrieg (chiến tranh chớp nhoáng) để nhanh chóng chinh phục hầu hết Tây Âu vào năm 1940, chỉ để lại Anh đứng vững. Trận Anh (Battle of Britain, 1940) là chiến dịch không chiến lớn đầu tiên trong lịch sử, nơi Không quân Hoàng gia Anh (RAF) đã ngăn chặn thành công cuộc xâm lược của Đức. Năm 1941, Hitler mở Operation Barbarossa, cuộc xâm lược khổng lồ vào Liên Xô với hơn 3 triệu quân, dẫn đến những trận đánh khốc liệt nhất chiến tranh như Stalingrad (1942-43) và Kursk (1943). Mặt trận Đông Âu chiếm phần lớn thương vong của chiến tranh.

Ở Thái Bình Dương, Nhật Bản đã tấn công Trân Châu Cảng (Pearl Harbor) vào ngày 7 tháng 12 năm 1941, kéo Hoa Kỳ vào chiến tranh. Chiến tranh Thái Bình Dương được đặc trưng bởi các trận hải chiến lớn như Midway (1942) và các cuộc chiến đảo đẫm máu như Iwo Jima và Okinawa. Chiến tranh cũng chứng kiến những tội ác chiến tranh khủng khiếp, đặc biệt là Holocaust - nỗ lực của Đức quốc xã nhằm tiêu diệt người Do Thái, giết chết 6 triệu người Do Thái và hàng triệu người khác bao gồm người Roma, người đồng tính, người khuyết tật, và tù nhân chính trị.

Chiến tranh kết thúc ở châu Âu vào ngày 8 tháng 5 năm 1945 (VE Day) khi Đức đầu hàng sau khi Hitler tự sát. Ở Thái Bình Dương, chiến tranh kết thúc vào ngày 15 tháng 8 năm 1945 (VJ Day) sau khi Hoa Kỳ thả hai quả bom nguyên tử lên Hiroshima (6/8) và Nagasaki (9/8), buộc Nhật Bản đầu hàng. Thế Chiến II đã định hình lại trật tự thế giới: Liên Hợp Quốc được thành lập năm 1945; Chiến tranh Lạnh bắt đầu giữa Hoa Kỳ và Liên Xô; nhiều đế quốc thuộc địa sụp đổ dẫn đến làn sóng độc lập ở Châu Á và Châu Phi; Nhật Bản và Đức được tái thiết thành các nền dân chủ thịnh vượng; và thời đại hạt nhân bắt đầu, thay đổi mãi mãi địa chính trị và chiến lược quân sự toàn cầu.`,
      year: 1939,
      isBc: false,
      approximateDate: false,
      importanceLevel: 5,
      source: 'WWII Historical Archives',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const coldwar = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chiến tranh Lạnh',
      description: 'Căng thẳng địa chính trị giữa Hoa Kỳ và Liên Xô',
      content: `Chiến tranh Lạnh (Cold War, 1947-1991) là thời kỳ căng thẳng địa chính trị, quân sự, và tư tưởng giữa Hoa Kỳ và các đồng minh phương Tây (khối tư bản chủ nghĩa dân chủ) với Liên Xô và các đồng minh phương Đông (khối cộng sản xã hội chủ nghĩa). Được gọi là "lạnh" vì hai siêu cường không bao giờ đối đầu trực tiếp trong một cuộc chiến tranh nóng toàn diện, chủ yếu do sợ hủy diệt lẫn nhau bằng vũ khí hạt nhân. Thuật ngữ "Chiến tranh Lạnh" được phổ biến bởi nhà báo Mỹ Walter Lippmann năm 1947. Bài phát biểu "Bức màn Sắt" (Iron Curtain) của Winston Churchill năm 1946 đã cảnh báo về sự chia rẽ của châu Âu.

Chiến tranh Lạnh có nguồn gốc từ sự mâu thuẫn tư tưởng và lợi ích chiến lược sau Thế Chiến II. Học thuyết Truman (1947) cam kết Hoa Kỳ ngăn chặn sự lan rộng của chủ nghĩa cộng sản (chính sách containment). Kế hoạch Marshall (1948) cung cấp hàng tỷ đô la để tái thiết Tây Âu. Liên Xô đáp trả bằng cách thiết lập các chính phủ cộng sản ở Đông Âu và hình thành Cominform. Cuộc phong tỏa Berlin (1948-49) và sự thành lập của Bức tường Berlin (1961) trở thành biểu tượng của sự chia rẽ. NATO (1949) và Khối Warsaw (1955) là hai liên minh quân sự đối lập.

Cuộc chạy đua vũ trang hạt nhân là đặc điểm nổi bật của Chiến tranh Lạnh. Sau khi Liên Xô thử nghiệm bom nguyên tử đầu tiên năm 1949, cả hai bên phát triển kho vũ khí hạt nhân khổng lồ có khả năng hủy diệt thế giới nhiều lần. Khái niệm MAD (Mutually Assured Destruction - Hủy diệt lẫn nhau được đảm bảo) ngăn chặn chiến tranh trực tiếp. Cuộc khủng hoảng tên lửa Cuba (1962) đưa thế giới đến bờ vực chiến tranh hạt nhân khi Liên Xô đặt tên lửa ở Cuba. Các cuộc chiến tranh ủy nhiệm (proxy wars) diễn ra ở Triều Tiên (1950-53), Việt Nam (1955-75), Afghanistan (1979-89), và nhiều nơi khác.

Chiến tranh Lạnh kết thúc với sự sụp đổ của Liên Xô năm 1991, sau một loạt các sự kiện bao gồm cải cách glasnost và perestroika của Gorbachev, sự sụp đổ của Bức tường Berlin (1989), và các cuộc cách mạng dân chủ ở Đông Âu. Hoa Kỳ trở thành siêu cường duy nhất trong thời kỳ đơn cực (unipolar moment). Di sản của Chiến tranh Lạnh bao gồm sự hình thành trật tự thế giới sau 1945, chạy đua vũ trang và công nghệ (bao gồm chương trình vũ trụ), ảnh hưởng văn hóa sâu sắc (phim ảnh, văn học về gián điệp và chiến tranh hạt nhân), và các vấn đề chưa được giải quyết như căng thẳng Nga-phương Tây, vấn đề Triều Tiên, và di sản của các cuộc chiến tranh ủy nhiệm.`,
      year: 1947,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Walter Lippmann, Cold War History',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  const romanempire = await prisma.knowledgeEntry.create({
    data: {
      title: 'Đế chế La Mã',
      description: 'Một trong những đế chế vĩ đại nhất lịch sử',
      content: `Đế chế La Mã (Roman Empire) là một trong những nền văn minh có ảnh hưởng nhất trong lịch sử thế giới, tồn tại từ năm 27 TCN (khi Augustus trở thành hoàng đế đầu tiên) đến năm 476 SCN (sự sụp đổ của Tây La Mã) và kéo dài đến năm 1453 ở Đông La Mã (Byzantine). Đế chế phát triển từ Nền Cộng hòa La Mã (509-27 TCN), mở rộng từ một thành bang nhỏ ở Italia trung tâm thành một đế chế rộng lớn bao trùm toàn bộ Địa Trung Hải, từ Anh đến Mesopotamia, từ Rhine và Danube đến sa mạc Sahara.

Augustus Caesar (trị vì 27 TCN - 14 SCN) đã thiết lập Pax Romana (Hòa bình La Mã), một thời kỳ ổn định và th繁vinh kéo dài gần 200 năm. Trong thời kỳ này, đế chế đạt đến đỉnh cao dưới các hoàng đế như Trajan (98-117), khi lãnh thổ mở rộng nhất. La Mã phát triển hệ thống hành chính phức tạp, quân đội chuyên nghiệp (legions), mạng lưới đường bộ rộng khắp (hơn 400,000 km), và hệ thống pháp luật La Mã (Roman Law) đặt nền móng cho hệ thống pháp lý phương Tây. Các thành tựu kỹ thuật bao gồm cầu đạo nước (aqueducts), nhà tắm công cộng, đấu trường Colosseum, và kiến trúc vòm bê tông.

La Mã cũng có những đóng góp văn hóa và trí tuệ to lớn. Tiếng Latin trở thành ngôn ngữ của học thuật và hành chính trong hơn một thiên niên kỷ, và là nguồn gốc của các ngôn ngữ Latinh (Pháp, Tây Ban Nha, Italia, Bồ Đào Nha, Romania). Văn học La Mã với Virgil (Aeneid), Ovid (Metamorphoses), và Cicero đã định hình văn học phương Tây. Triết học Stoic với Marcus Aurelius ảnh hưởng sâu rộng. Đế chế La Mã đã chấp nhận Kitô giáo làm tôn giáo chính thức dưới hoàng đế Constantine (313 SCN), biến đổi một tôn giáo bị đàn áp thành lực lượng định hình châu Âu.

Đế chế La Mã sụp đổ do nhiều nguyên nhân phức tạp: khủng hoảng chính trị và quân sự, suy thoái kinh tế, áp lực từ các bộ tộc Germanic (barbarian invasions), bệnh dịch, và chia rẽ nội bộ. Edward Gibbon trong "The History of the Decline and Fall of the Roman Empire" (1776-1789) đã phân tích chi tiết quá trình này. Mặc dù sụp đổ, di sản của La Mã vẫn tồn tại: hệ thống pháp luật, kiến trúc, ngôn ngữ, Kitô giáo, khái niệm về đế chế và quyền công dân, và nhiều khía cạnh của nền văn minh phương Tây hiện đại. Khái niệm "Đế chế La Mã" tiếp tục truyền cảm hứng và được các nhà cầm quyền từ Charlemagne đến Napoleon đến Hitler tìm cách tái tạo.`,
      year: 27,
      isBc: true,
      approximateDate: false,
      importanceLevel: 5,
      source: 'Edward Gibbon, Roman History',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const silkroad = await prisma.knowledgeEntry.create({
    data: {
      title: 'Con đường Tơ lụa',
      description: 'Mạng lưới thương mại kết nối Đông - Tây',
      content: `Con đường Tơ lụa (Silk Road) không phải là một con đường duy nhất mà là một mạng lưới các tuyến đường thương mại kết nối Đông Á với Địa Trung Hải, Trung Đông, và châu Âu, hoạt động từ khoảng thế kỷ 2 TCN đến thế kỷ 15 SCN. Tên gọi "Silk Road" được đặt bởi nhà địa lý học người Đức Ferdinand von Richthofen năm 1877, phản ánh tầm quan trọng của lụa Trung Quốc trong thương mại, mặc dù nhiều hàng hóa khác cũng được buôn bán như gia vị, đá quý, kim loại, gốm sứ, thủy tinh, và giấy.

Con đường Tơ lụa được mở ra chính thức dưới triều đại Hán (206 TCN - 220 SCN), đặc biệt sau các chuyến đi của nhà ngoại giao Zhang Qian (khoảng 138-126 TCN) đến Tây vực. Tuyến đường chính đi từ Chang'an (nay là Xi'an) ở Trung Quốc, qua Dunhuang và sa mạc Taklamakan, qua các oasis như Samarkand và Bukhara ở Trung Á, rồi đến Đế chế Ba Tư và cuối cùng là Constantinople và Địa Trung Hải. Ngoài tuyến đường đất liền, còn có các tuyến đường biển kết nối Trung Quốc với Ấn Độ, Đông Nam Á, và Trung Đông.

Con đường Tơ lụa không chỉ là tuyến thương mại mà còn là con đường trao đổi văn hóa, tôn giáo, và công nghệ. Phật giáo lan truyền từ Ấn Độ sang Trung Quốc qua con đường này, tạo ra sự pha trộn văn hóa Greco-Buddhist ở Gandhara. Hồi giáo cũng lan rộng dọc theo các tuyến đường này. Các phát minh Trung Quốc như giấy, thuốc súng, và la bàn được truyền sang phương Tây. Ngược lại, nho, nho lạc đà, và các loại cây trồng mới được đưa vào Trung Quốc. Nghệ thuật, kiến trúc, và âm nhạc cũng được trao đổi, tạo ra sự pha trộn văn hóa độc đáo.

Con đường Tơ lụa bắt đầu suy tàn từ thế kỷ 15 do nhiều yếu tố: sự trỗi dậy của Đế quốc Ottoman làm gián đoạn thương mại, sự phát triển của các tuyến đường hàng hải an toàn hơn và nhanh hơn quanh Châu Phi do người châu Âu khám phá, và sự sụp đổ của các đế chế dọc theo tuyến đường. Tuy nhiên, di sản của Con đường Tơ lụa vẫn tồn tại trong các thành phố lịch sử như Samarkand và Bukhara, trong sự pha trộn văn hóa của các khu vực dọc theo tuyến đường, và trong ý tưởng về kết nối toàn cầu. Ngày nay, sáng kiến "Một vành đai, một con đường" (Belt and Road Initiative) của Trung Quốc tìm cách khôi phục và hiện đại hóa các kết nối này.`,
      year: 130,
      isBc: true,
      approximateDate: true,
      importanceLevel: 4,
      source: 'Zhang Qian, Ferdinand von Richthofen',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: chinaCountry ? {
        create: [{ countryId: chinaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  const printing = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát minh máy in Gutenberg',
      description: 'Cách mạng truyền thông với máy in chữ di động',
      content: `Phát minh máy in chữ di động (Movable Type Printing Press) của Johannes Gutenberg khoảng năm 1440 ở Mainz, Đức, được coi là một trong những phát minh quan trọng nhất trong lịch sử nhân loại, khởi đầu cho cuộc Cách mạng In ấn. Mặc dù chữ in di động đã được phát minh trước đó ở Trung Quốc bởi Bi Sheng vào thế kỷ 11 (sử dụng đất sét nung), phát minh của Gutenberg sử dụng hợp kim kim loại (chì, thiếc, và antimon) và kết hợp với máy ép rượu vang cải tiến, tạo ra một hệ thống hiệu quả và bền bỉ hơn nhiều.

Công trình nổi tiếng nhất của Gutenberg là Kinh Thánh Gutenberg (Gutenberg Bible), hoàn thành khoảng năm 1455, với khoảng 180 bản được in. Đây là cuốn sách lớn đầu tiên được in ở phương Tây bằng chữ di động. Mỗi trang có 42 dòng văn bản Latin, được in với chất lượng và độ chính xác đáng kinh ngạc, so sánh được với các bản thảo viết tay tốt nhất. Công nghệ của Gutenberg cho phép sao chép văn bản nhanh chóng, chính xác, và với chi phí thấp hơn nhiều so với việc sao chép thủ công. Một văn bản mất vài năm để sao chép bằng tay giờ có thể được in trong vài tuần.

Ảnh hưởng của máy in Gutenberg đối với xã hội châu Âu là sâu rộng và cách mạng. Nó đã dân chủ hóa kiến thức, làm cho sách trở nên rẻ hơn và dễ tiếp cận hơn với tầng lớp trung lưu và thậm chí một số người nghèo. Tỷ lệ biết chữ tăng lên đáng kể. Máy in đã tạo điều kiện cho sự lan rộng của Cải cách Tân giáo vào đầu thế kỷ 16, khi các bài viết của Martin Luther được in và phân phối rộng rãi. "95 Luận cương" của Luther (1517) đã được in thành hàng ngàn bản và lan truyền khắp châu Âu trong vài tuần.

Máy in cũng đóng vai trò quan trọng trong Thời kỳ Phục Hưng, Cách mạng Khoa học, và Thời đại Khai sáng bằng cách cho phép truyền bá nhanh chóng các ý tưởng mới. Nó đã chuẩn hóa ngôn ngữ và chính tả, thúc đẩy sự phát triển của các ngôn ngữ dân tộc. Khoa học được hưởng lợi rất nhiều vì các phát hiện có thể được chia sẻ nhanh chóng và chính xác. Báo chí phát triển, tạo ra dư luận công khai và cuối cùng góp phần vào các phong trào dân chủ. Các học giả coi máy in Gutenberg là một "điểm chuyển mình" trong lịch sử, đánh dấu sự chuyển từ thời Trung Cổ sang thời Hiện đại. Elizabeth Eisenstein trong "The Printing Press as an Agent of Change" (1979) đã phân tích sâu rộng tác động văn hóa và xã hội của phát minh này.`,
      year: 1440,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Johannes Gutenberg, Elizabeth Eisenstein',
      categories: {
        create: [{ categoryId: historyCategory.id, isPrimary: true }]
      },
      countries: germanyCountry ? {
        create: [{ countryId: germanyCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  console.log('✅ Additional history seeding (set 2) completed!');
  console.log('Created 10 new history knowledge entries:');
  console.log('1. Thời kỳ Phục Hưng');
  console.log('2. Cái chết Đen (Dịch hạch)');
  console.log('3. Cách mạng Pháp');
  console.log('4. Cách mạng Công nghiệp');
  console.log('5. Chiến tranh Thế giới thứ nhất');
  console.log('6. Chiến tranh Thế giới thứ hai');
  console.log('7. Chiến tranh Lạnh');
  console.log('8. Đế chế La Mã');
  console.log('9. Con đường Tơ lụa');
  console.log('10. Phát minh máy in Gutenberg');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
