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
      content: `Định lý Pythagoras là một trong những định lý cơ bản và quan trọng nhất trong toán học, được đặt theo tên nhà toán học Hy Lạp cổ đại Pythagoras of Samos (khoảng 570-495 TCN). Định lý phát biểu rằng: "Trong một tam giác vuông, bình phương độ dài cạnh huyền bằng tổng bình phương độ dài hai cạnh góc vuông", được biểu diễn bằng công thức nổi tiếng: a² + b² = c².

Mặc dù mang tên Pythagoras, nhưng thực tế định lý này đã được biết đến từ lâu trước đó ở Babylon và Ai Cập, nơi người ta đã áp dụng nguyên lý này trong xây dựng kim tự tháp và đo đạc ruộng đất. Tuy nhiên, Pythagoras và các môn đồ của ông là những người đầu tiên chứng minh một cách hình thức và logic cho định lý này, chuyển nó từ kiến thức thực nghiệm thành một chân lý toán học được chứng minh.

Trường phái Pythagoras tin rằng vũ trụ được chi phối bởi các con số và các mối quan hệ toán học. Định lý Pythagoras không chỉ là một công cụ tính toán mà còn thể hiện sự hài hòa và trật tự trong tự nhiên. Nó đã trở thành nền tảng cho việc phát triển hình học Euclid, lượng giác, và nhiều lĩnh vực toán học khác.

Ứng dụng của định lý này vô cùng rộng rãi: từ kiến trúc, xây dựng, thiên văn học, điều hướng, đến vật lý và kỹ thuật. Trong không gian nhiều chiều, định lý được mở rộng thành công thức tính khoảng cách Euclidean, là cơ sở cho hình học giải tích và nhiều lĩnh vực toán học hiện đại. Định lý Pythagoras thực sự là cầu nối giữa hình học và đại số, mở đường cho sự phát triển của toán học trong hàng ngàn năm sau đó.`,
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
      content: `Khổng Tử (Confucius, 551-479 TCN), tên thật là Khổng Khâu (孔丘), là nhà tư tưởng, triết gia và nhà giáo dục vĩ đại nhất của Trung Quốc cổ đại. Ông sinh ra trong thời kỳ Xuân Thu, một giai đoạn hỗn loạn với chiến tranh liên miên giữa các nước chư hầu. Chứng kiến sự tan rã của trật tự xã hội, Khổng Tử đã phát triển một hệ thống tư tưởng nhằm phục hồi hòa bình và ổn định cho xã hội.

Trung tâm của triết học Khổng Tử là khái niệm "Nhân" (仁) - lòng nhân ái, yêu thương con người. Ông dạy rằng một xã hội lý tưởng được xây dựng trên năm mối quan hệ cơ bản: vua-tôi, cha-con, vợ-chồng, anh-em, bạn-bè. Mỗi mối quan hệ đều có những trách nhiệm và nghĩa vụ riêng, được duy trì bằng "Lễ" (禮) - các nghi thức và chuẩn mực đạo đức.

Khổng Tử nhấn mạnh tầm quan trọng của giáo dục và tu dưỡng đạo đức. Ông tin rằng bất kỳ ai cũng có thể trở thành "quân tử" (người cao thượng) thông qua học tập và rèn luyện. Triết học của ông không phải là tôn giáo mà là một hệ thống đạo đức và xã hội học, tập trung vào cách sống đúng đắn trong thế gian hơn là những vấn đề siêu hình.

Ảnh hưởng của Khổng Tử đối với văn hóa Trung Quốc và Đông Á là không thể đo lường được. Nho giáo đã trở thành tư tưởng chính thống của Trung Quốc trong hơn 2000 năm, định hình hệ thống giáo dục, thi cử, chính trị và đạo đức xã hội. Các giá trị như hiếu thảo, trung thành, tôn trọng người lớn tuổi, và chú trọng giáo dục vẫn còn ảnh hưởng sâu sắc đến các nền văn hóa Trung Quốc, Nhật Bản, Hàn Quốc, Việt Nam cho đến ngày nay. Tác phẩm "Luận Ngữ" (論語) ghi lại những lời dạy của ông đã trở thành một trong những kinh điển quan trọng nhất của nhân loại.`,
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
      content: `Định luật vạn vật hấp dẫn của Isaac Newton, được công bố trong tác phẩm bất hủ "Philosophiæ Naturalis Principia Mathematica" (Các Nguyên lý Toán học của Triết học Tự nhiên) năm 1687, là một trong những khám phá khoa học vĩ đại nhất mọi thời đại. Định luật này phát biểu rằng: "Mọi vật thể trong vũ trụ đều hút nhau với một lực tỉ lệ thuận với tích khối lượng của chúng và tỉ lệ nghịch với bình phương khoảng cách giữa chúng", được biểu diễn bằng công thức F = G(m₁m₂)/r².

Truyền thuyết nổi tiếng kể rằng Newton đã nảy ra ý tưởng này khi quan sát một quả táo rơi xuống đất tại Woolsthorpe Manor năm 1666, trong thời kỳ đại dịch bệnh dịch hạch buộc Đại học Cambridge phải đóng cửa. Ông tự hỏi: liệu lực kéo quả táo xuống đất có phải là cùng một lực giữ Mặt Trăng trên quỹ đạo quanh Trái Đất? Câu hỏi này đã dẫn đến một trong những thống nhất vĩ đại nhất trong khoa học.

Trước Newton, người ta tin rằng các quy luật chi phối chuyển động trên Trái Đất (thế giới dưới mặt trăng) khác biệt hoàn toàn với các quy luật chi phối các thiên thể (thế giới trên mặt trăng). Newton đã chứng minh rằng chỉ cần một định luật duy nhất có thể giải thích cả sự rơi của quả táo lẫn chuyển động của các hành tinh. Ông đã sử dụng định luật của mình để giải thích các định luật Kepler về chuyển động hành tinh, hiện tượng thủy triều, sự dẹt ở hai cực của Trái Đất, và nhiều hiện tượng thiên văn khác.

Định luật vạn vật hấp dẫn đã thống trị vật lý học trong hơn 200 năm, cho phép con người dự đoán chính xác chuyển động của các hành tinh, tính toán quỹ đạo vệ tinh, và thậm chí khám phá các hành tinh mới (như Neptune) dựa trên những bất thường trong quỹ đạo của các hành tinh đã biết. Mặc dù thuyết tương đối rộng của Einstein sau này đã cung cấp một mô tả chính xác hơn về trọng lực, định luật Newton vẫn đủ chính xác cho hầu hết các ứng dụng thực tế và tiếp tục được sử dụng rộng rãi trong kỹ thuật và khoa học không gian.`,
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
      content: `Thuyết tương đối hẹp (Special Relativity) được Albert Einstein công bố năm 1905 trong bài báo lịch sử "Về Động học của các Vật thể Chuyển động" (On the Electrodynamics of Moving Bodies) đã cách mạng hóa hoàn toàn quan niệm của chúng ta về không gian, thời gian, và vật chất. Lúc này Einstein chỉ mới 26 tuổi và đang làm việc tại Văn phòng Bằng sáng chế ở Bern, Thụy Sĩ.

Thuyết tương đối hẹp dựa trên hai tiên đề đơn giản nhưng mang tính cách mạng: (1) Các định luật vật lý giống nhau trong mọi hệ quy chiếu quán tính (chuyển động thẳng đều), và (2) Vận tốc ánh sáng trong chân không là hằng số (khoảng 300,000 km/s) đối với mọi quan sát viên, bất kể họ chuyển động như thế nào. Tiên đề thứ hai này mâu thuẫn hoàn toàn với kinh nghiệm thông thường: nếu bạn chạy theo một tia sáng, nó vẫn chạy xa bạn với cùng vận tốc!

Từ hai tiên đề này, Einstein đã suy ra những kết luận đáng kinh ngạc: thời gian trôi chậm hơn đối với vật thể chuyển động nhanh (giãn nở thời gian), độ dài của vật thể co lại theo hướng chuyển động (co ngắn độ dài), và khối lượng tăng lên khi vận tốc tăng. Những hiệu ứng này chỉ đáng kể ở vận tốc gần bằng vận tốc ánh sáng, giải thích tại sao chúng ta không nhận thấy trong cuộc sống hàng ngày.

Phương trình nổi tiếng nhất mọi thời đại E=mc² cũng xuất phát từ thuyết tương đối hẹp, cho thấy khối lượng và năng lượng là hai mặt của cùng một thực thể. Một lượng khối lượng cực nhỏ có thể chuyển hóa thành một lượng năng lượng khổng lồ (vì c² là một số rất lớn), giải thích nguồn năng lượng của Mặt Trời và là cơ sở lý thuyết cho cả năng lượng hạt nhân và bom nguyên tử.

Thuyết tương đối hẹp đã được xác minh bởi vô số thí nghiệm, từ việc quan sát hạt muon từ tia vũ trụ (sống lâu hơn do giãn nở thời gian) đến hệ thống GPS (phải hiệu chỉnh đồng hồ do hiệu ứng tương đối). Nó là nền tảng của vật lý hạt năng lượng cao và không thể thiếu trong việc thiết kế máy gia tốc hạt như Large Hadron Collider.`,
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
      content: `"Cơ sở" (Elements) của Euclid, được viết khoảng năm 300 TCN tại Alexandria, Ai Cập, là một trong những tác phẩm có ảnh hưởng nhất trong lịch sử toán học và khoa học. Đây không chỉ là một cuốn sách hình học mà còn là một kiệt tác về phương pháp luận khoa học - cách xây dựng một hệ thống tri thức từ những tiên đề cơ bản thông qua lập luận logic chặt chẽ.

Euclid bắt đầu với 5 tiên đề (postulates) và 5 khái niệm chung (common notions) - những chân lý tự nhiên không cần chứng minh. Năm tiên đề nổi tiếng bao gồm: (1) Có thể vẽ một đường thẳng nối hai điểm bất kỳ, (2) Có thể kéo dài một đoạn thẳng thành một đường thẳng vô hạn, (3) Có thể vẽ một đường tròn với tâm và bán kính cho trước, (4) Mọi góc vuông đều bằng nhau, và (5) Tiên đề song song (qua một điểm ngoài một đường thẳng, chỉ có duy nhất một đường thẳng song song với đường thẳng đó).

Từ những tiên đề này, Euclid đã chứng minh 465 định lý, bao gồm định lý Pythagoras, tính chất của tam giác và đường tròn, lý thuyết tỷ lệ, và nhiều kết quả khác. Mỗi định lý được chứng minh dựa trên các định lý trước đó hoặc trực tiếp từ các tiên đề, tạo nên một chuỗi logic hoàn hảo. Phương pháp tiên đề hóa này đã trở thành mô hình cho mọi ngành khoa học.

"Cơ sở" là cuốn sách được sử dụng nhiều thứ hai trong lịch sử phương Tây (sau Kinh Thánh), được dịch ra hầu hết các ngôn ngữ trên thế giới và được sử dụng làm sách giáo khoa hình học trong hơn 2000 năm. Nó đã định hình cách chúng ta tư duy về không gian, logic, và chứng minh toán học. Ngay cả khi hình học phi-Euclid được phát hiện vào thế kỷ 19 (bằng cách thay đổi tiên đề thứ 5), tầm quan trọng của tác phẩm Euclid vẫn không hề giảm sút - nó vẫn là nền tảng của hình học phẳng và một ví dụ hoàn hảo về sức mạnh của tư duy diễn dịch.`,
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
      content: `Phát minh số 0 là một trong những bước tiến cách mạng nhất trong lịch sử toán học, được thực hiện bởi các nhà toán học Ấn Độ vào khoảng thế kỷ 5-6 sau Công nguyên. Trước đó, nhiều nền văn minh đã sử dụng các ký hiệu giữ chỗ (placeholder) để biểu thị vị trí trống trong hệ thống số, nhưng người Ấn Độ là những người đầu tiên coi số 0 như một con số thực sự với giá trị riêng của nó.

Nhà toán học và thiên văn học Brahmagupta (598-668) là người đầu tiên đưa ra các quy tắc toán học cho số 0 trong tác phẩm "Brahmasphutasiddhanta" (Sự mở đầu đúng đắn của vũ trụ) năm 628. Ông định nghĩa các phép toán với số 0: một số cộng với 0 bằng chính nó, một số nhân với 0 bằng 0, và thậm chí đề cập đến phép chia cho 0 (mặc dù định nghĩa của ông về điều này chưa hoàn toàn chính xác theo chuẩn mực hiện đại).

Tầm quan trọng của số 0 không chỉ nằm ở giá trị số học của nó mà còn ở vai trò trong hệ thống số thập phân vị trí (positional decimal system). Không có số 0, chúng ta không thể phân biệt giữa 15 và 105, hay 200 và 2. Số 0 cho phép chúng ta biểu diễn bất kỳ số nào, dù lớn hay nhỏ, chỉ với 10 chữ số (0-9), thay vì cần một ký hiệu riêng cho mỗi số như hệ thống số La Mã.

Số 0 du nhập vào thế giới Hồi giáo thông qua các nhà toán học như Al-Khwarizmi vào thế kỷ 9, và sau đó được Leonardo Fibonacci giới thiệu vào châu Âu vào thế kỷ 13 qua cuốn sách "Liber Abaci". Ban đầu, số 0 bị nghi ngờ ở châu Âu vì khái niệm "không có gì" mâu thuẫn với triết học thời bấy giờ. Tuy nhiên, tính tiện lợi vượt trội của hệ thống số Ấn Độ-Ả Rập cuối cùng đã chiến thắng.

Ngày nay, số 0 không chỉ là nền tảng của toán học mà còn của khoa học máy tính (hệ nhị phân 0 và 1), vật lý (nhiệt độ tuyệt đối), và nhiều lĩnh vực khác. Không có số 0, toán học hiện đại và cách mạng khoa học sẽ không thể xảy ra.`,
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
      content: `Muhammad ibn Musa al-Khwarizmi (khoảng 780-850) là nhà toán học, thiên văn học và địa lý học Ba Tư làm việc tại Nhà Trí tuệ (House of Wisdom) ở Baghdad trong Thời kỳ Hoàng kim Hồi giáo. Tác phẩm nổi tiếng nhất của ông "Kitab al-Jabr wa-l-Muqabala" (Cuốn sách ngắn gọn về Phép tính Phục hồi và Cân bằng), viết khoảng năm 820, đã đặt nền móng cho một nhánh hoàn toàn mới của toán học - đại số.

Chữ "algebra" (đại số) trong tiếng Anh và nhiều ngôn ngữ khác bắt nguồn trực tiếp từ từ "al-jabr" trong tiêu đề cuốn sách, có nghĩa là "phép phục hồi" (hoàn thành, chẳng hạn như thêm cùng một lượng vào cả hai vế của phương trình). Thậm chí từ "algorithm" (thuật toán) cũng xuất phát từ tên Latinh hóa của ông: "Algoritmi".

Trước Al-Khwarizmi, toán học chủ yếu là hình học (như của Hy Lạp) hoặc số học (như của Ấn Độ). Ông là người đầu tiên phát triển một phương pháp có hệ thống để giải các phương trình bằng cách sử dụng các quy tắc đại số, không cần dựa vào hình học. Cuốn sách của ông trình bày cách giải sáu loại phương trình bậc nhất và bậc hai, phân loại chúng thành các dạng chuẩn, và cung cấp các thuật toán bước-by-bước để giải chúng.

Điều đặc biệt của phương pháp Al-Khwarizmi là tính trừu tượng: thay vì chỉ giải các bài toán cụ thể với các số cụ thể, ông phát triển các quy trình chung có thể áp dụng cho bất kỳ bài toán nào có cùng dạng. Đây chính là bản chất của tư duy đại số - làm việc với các ký hiệu đại diện cho các số chưa biết.

Tác phẩm của Al-Khwarizmi đã được dịch sang tiếng Latin vào thế kỷ 12 và trở thành sách giáo khoa toán học chính ở các trường đại học châu Âu trong nhiều thế kỷ. Ông cũng giới thiệu hệ thống số Ấn Độ (gồm số 0) vào thế giới Hồi giáo và sau đó là châu Âu. Đại số của Al-Khwarizmi đã mở đường cho sự phát triển của toán học hiện đại, từ việc giải phương trình phức tạp đến lý thuyết nhóm, vành, trường trong đại số trừu tượng.`,
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
      content: `Giải tích (Calculus) là một trong những thành tựu trí tuệ vĩ đại nhất của nhân loại, được phát triển độc lập bởi Isaac Newton (1642-1727) và Gottfried Wilhelm Leibniz (1646-1716) vào cuối thế kỷ 17. Newton phát triển "phương pháp fluxion" của mình vào khoảng 1665-1666 (trong thời kỳ đại dịch buộc ông phải rời Cambridge), trong khi Leibniz công bố công trình của mình vào năm 1684-1686. Cả hai đã tạo ra cùng một công cụ toán học mạnh mẽ, nhưng với ký hiệu và cách tiếp cận khác nhau.

Giải tích giải quyết hai vấn đề cơ bản nhưng có vẻ ngược nhau: (1) Cho biết vị trí của một vật thể theo thời gian, làm thế nào tính vận tốc tức thời của nó? (Đạo hàm - Differentiation), và (2) Cho biết vận tốc, làm thế nào tính quãng đường đã đi? (Tích phân - Integration). Newton và Leibniz đã khám phá ra định lý cơ bản của giải tích: hai phép toán này là nghịch đảo của nhau!

Đạo hàm cho phép chúng ta tính tốc độ thay đổi tức thời - độ dốc của tiếp tuyến tại một điểm trên đường cong, vận tốc tức thời, hay tốc độ tăng trưởng. Tích phân cho phép tính diện tích dưới đường cong, quãng đường đi được, hoặc tổng của vô số lượng nhỏ vô cùng. Ký hiệu d/dx (đạo hàm) và ∫ (tích phân) của Leibniz vẫn được sử dụng cho đến ngày nay.

Trước giải tích, toán học chỉ có thể xử lý các đại lượng tĩnh và hữu hạn. Giải tích mở ra khả năng nghiên cứu sự thay đổi liên tục, chuyển động, và các quá trình động. Newton đã sử dụng giải tích để chứng minh định luật vạn vật hấp dẫn và các định luật chuyển động của mình, giải thích chuyển động của các hành tinh. Nó trở thành ngôn ngữ của vật lý, kỹ thuật, kinh tế, và hầu hết các khoa học tự nhiên.

Giải tích đã dẫn đến sự phát triển của phương trình vi phân (mô tả mọi thứ từ dao động lò xo đến chuyển động của hành tinh), lý thuyết xác suất, cơ học lượng tử, tương đối rộng, và vô số ứng dụng khác. Mọi công trình kỹ thuật hiện đại - từ cầu, máy bay, mạch điện, đến dự đoán thời tiết và AI - đều dựa trên giải tích. Không có công cụ này, cách mạng khoa học và công nghiệp sẽ không thể xảy ra.`,
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
      content: `Số phức là một trong những khái niệm toán học kỳ diệu nhất, mở rộng hệ thống số thực để bao gồm căn bậc hai của số âm. Nhà toán học Italy Gerolamo Cardano (1501-1576) là người đầu tiên công khai sử dụng số phức trong tác phẩm "Ars Magna" (Nghệ thuật vĩ đại) năm 1545, mặc dù ông gọi chúng là "những số tinh tế và vô dụng". Cardano đang cố giải phương trình bậc ba x³ = 15x + 4 bằng công thức của mình, nhưng gặp phải biểu thức chứa √(-121). Theo logic thông thường, không có số nào bình phương lên được -121. Tuy nhiên, Cardano đã dám sử dụng những "số không tồn tại" này trong tính toán, và kỳ diệu thay, khi thực hiện các phép toán, những số "ảo" này triệt tiêu lẫn nhau, để lại đáp án thực hoàn toàn chính xác! Rafael Bombelli (1526-1572) là người đầu tiên đưa ra quy tắc toán học chặt chẽ cho số phức. Ông định nghĩa đơn vị ảo i với tính chất i² = -1, và chỉ ra rằng số phức có dạng a + bi. Leonhard Euler đã đưa số phức lên một tầm cao mới với công thức e^(iπ) + 1 = 0. Số phức là ngôn ngữ không thể thiếu của cơ học lượng tử, kỹ thuật điện, xử lý tín hiệu, và nhiều lĩnh vực khác.`,
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
      content: `Lý thuyết xác suất ra đời từ một câu hỏi về cờ bạc. Năm 1654, Antoine Gombaud, Chevalier de Méré, một nhà quý tộc Pháp thích đánh bạc, đã đặt ra một vấn đề cho nhà toán học Blaise Pascal (1623-1662): Nếu hai người chơi phải dừng trò chơi trước khi kết thúc, làm thế nào chia tiền cược một cách công bằng dựa trên điểm số hiện tại? Đây được gọi là "Vấn đề chia điểm" (Problem of Points). Pascal đã trao đổi thư từ với Pierre de Fermat (1607-1665) về vấn đề này. Cả hai đã phát triển các phương pháp khác nhau nhưng đều đưa đến cùng đáp án, đặt nền móng cho lý thuyết xác suất hiện đại. Pascal sử dụng tam giác Pascal (mặc dù nó đã được biết đến ở Trung Quốc và Ba Tư trước đó) để tính các tổ hợp. Fermat sử dụng phương pháp đếm trực tiếp. Cả hai đều nhận ra rằng xác suất không phải là về những gì đã xảy ra, mà là về những gì có thể xảy ra - tất cả các kết quả có thể. Christiaan Huygens viết cuốn sách đầu tiên về xác suất "De Ratiociniis in Ludo Aleae" (Về Lập luận trong Trò chơi Xúc xắc) năm 1657. Jacob Bernoulli phát triển Định luật số lớn (1713), chứng minh rằng khi số lần thử nghiệm tăng lên, tần suất thực nghiệm sẽ hội tụ về xác suất lý thuyết. Lý thuyết xác suất hiện nay là nền tảng của thống kê, khoa học dữ liệu, học máy, vật lý thống kê, tài chính, bảo hiểm, và vô số lĩnh vực khác.`,
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
      content: `Trong hơn 2000 năm, hình học Euclid được coi là chân lý tuyệt đối về không gian. Nhưng tiên đề thứ 5 của Euclid về đường song song (qua một điểm ngoài một đường thẳng, chỉ có duy nhất một đường thẳng song song) luôn khiến các nhà toán học cảm thấy không tự nhiên. Nhiều người đã cố chứng minh nó từ bốn tiên đề đầu, nhưng đều thất bại. Cuối cùng, ba nhà toán học độc lập đã có một ý tưởng táo bạo: nếu thay đổi tiên đề thứ 5, điều gì sẽ xảy ra? Nikolai Lobachevsky (Nga, 1792-1856) công bố nghiên cứu đầu tiên vào 1829, János Bolyai (Hungary, 1802-1860) công bố độc lập vào 1832, và Carl Friedrich Gauss (Đức) đã phát triển ý tưởng tương tự nhưng không công bố. Lobachevsky đề xuất: qua một điểm ngoài một đường thẳng, có VÔ SỐ đường thẳng song song với nó. Nghe có vẻ vô lý, nhưng khi xây dựng hệ thống logic từ giả thiết này, ông không tìm thấy mâu thuẫn nào! Hình học này được gọi là hình học hyperbolic. Riemann sau đó phát triển hình học elliptic (qua một điểm ngoài một đường thẳng, KHÔNG có đường thẳng nào song song - như trên bề mặt hình cầu). Khám phá này là một cú sốc triết học: không chỉ có MỘT hình học đúng! Euclid chỉ mô tả một trong nhiều hình học có thể. Einstein sau này đã sử dụng hình học phi-Euclid để mô tả không-thời gian cong trong thuyết tương đối rộng.`,
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
      content: `Georg Cantor (1845-1918), nhà toán học người Đức gốc Nga, đã tạo ra lý thuyết tập hợp - một trong những lý thuyết toán học táo bạo và gây tranh cãi nhất. Công trình của ông bắt đầu vào những năm 1870, đặc biệt là bài báo năm 1874 chứng minh rằng các số thực "nhiều hơn" các số tự nhiên. Khám phá kinh ngạc nhất của Cantor là có nhiều "kích thước" vô cực khác nhau! Ông chứng minh rằng tập số tự nhiên {1, 2, 3,...} có cùng "lực lượng" với tập số hữu tỷ (phân số) - cả hai đều đếm được (countable). Nhưng tập số thực KHÔNG đếm được - nó có một "lực lượng vô cực" lớn hơn! Cantor gọi lực lượng vô cực của số tự nhiên là ℵ₀ (aleph-null), và chứng minh rằng lực lượng của tập hợp các tập con của một tập hợp luôn lớn hơn lực lượng của chính tập hợp đó. Điều này có nghĩa là có vô số "cấp độ vô cực" khác nhau, mỗi cấp độ lớn hơn cấp độ trước! Công trình của Cantor ban đầu bị nhiều nhà toán học phản đối dữ dội. Leopold Kronecker, thầy cũ của ông, gọi ông là "kẻ phá hoại khoa học" và cố ngăn công bố nghiên cứu của ông. Henri Poincaré gọi lý thuyết tập hợp là "một căn bệnh". Áp lực này, cùng với những nghịch lý được phát hiện trong lý thuyết tập hợp, đã góp phần vào những đợt suy sụp thần kinh của Cantor. Tuy nhiên, David Hilbert bảo vệ ông: "Không ai có thể đuổi chúng ta ra khỏi thiên đường mà Cantor đã tạo ra cho chúng ta". Ngày nay, lý thuyết tập hợp là nền tảng của toán học hiện đại, cung cấp ngôn ngữ chung cho mọi nhánh toán học.`,
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
      content: `Năm 1931, Kurt Gödel (1906-1978), một nhà logic học trẻ tuổi người Áo, đã công bố một trong những kết quả sâu sắc và đáng kinh ngạc nhất trong lịch sử toán học: Định lý bất toàn (Incompleteness Theorems). Định lý này đã phá vỡ giấc mơ của nhiều nhà toán học về việc xây dựng một hệ thống toán học hoàn hảo, hoàn chỉnh và nhất quán. Định lý bất toàn thứ nhất phát biểu: Trong bất kỳ hệ thống hình thức nào đủ mạnh để mô tả số học (như hệ tiên đề Peano), nếu hệ thống đó nhất quán (không tự mâu thuẫn), thì sẽ tồn tại những mệnh đề đúng mà KHÔNG THỂ chứng minh được trong hệ thống đó. Định lý thứ hai còn sâu sắc hơn: Một hệ thống nhất quán không thể tự chứng minh tính nhất quán của chính nó. Gödel đã sử dụng một kỹ thuật thiên tài gọi là "Gödel numbering" - gán số cho mỗi ký hiệu và công thức toán học, biến các mệnh đề về toán học thành các mệnh đề về số học. Sau đó ông xây dựng một mệnh đề G có nghĩa là "Mệnh đề G không thể chứng minh được". Nếu G chứng minh được, thì nội dung của nó sai, dẫn đến mâu thuẫn. Vậy G không chứng minh được - nhưng điều đó chính xác là những gì G nói, vậy G đúng! Định lý này đã làm sụp đổ Chương trình Hilbert - tham vọng chứng minh tính đầy đủ và nhất quán của toán học. Nó cho thấy toán học có giới hạn vốn có, không thể vượt qua. Ảnh hưởng vượt ra ngoài toán học, liên quan đến triết học, khoa học máy tính (vấn đề dừng), và thậm chí cả ý thức con người.`,
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
      content: `Vào năm 1637, Pierre de Fermat viết một ghi chú bên lề cuốn "Arithmetica" của Diophantus: "Tôi đã tìm ra một chứng minh thực sự kỳ diệu cho mệnh đề này, nhưng lề sách quá hẹp để chứa nó". Mệnh đề đó là: Không tồn tại ba số nguyên dương x, y, z thỏa mãn x^n + y^n = z^n với n > 2. Với n=2, đây chính là định lý Pythagoras với vô số nghiệm. Nhưng với n≥3, Fermat khẳng định KHÔNG có nghiệm nào! Trong 358 năm tiếp theo, Định lý lớn Fermat trở thành bài toán nổi tiếng nhất trong toán học. Vô số nhà toán học đã cố chứng minh nó. Euler chứng minh cho n=3 và n=4. Sophie Germain đạt tiến bộ quan trọng cho các số nguyên tố đặc biệt. Dần dần, nó được chứng minh cho nhiều giá trị n cụ thể, nhưng chứng minh tổng quát vẫn là bí ẩn. Andrew Wiles, một nhà toán học người Anh, đã mơ ước giải bài toán này từ khi 10 tuổi. Sau bảy năm làm việc trong bí mật tuyệt đối (1986-1993), ông công bố chứng minh tại hội nghị ở Cambridge. Nhưng sau đó phát hiện một lỗ hổng! Wiles phải làm việc thêm một năm nữa với học trò Richard Taylor để sửa chứa. Chứng minh cuối cùng dài 129 trang, sử dụng các công cụ toán học hiện đại tinh vi không tồn tại vào thời Fermat: đường cong elliptic, dạng modular, đại số đồng điều,... Năm 1995, chứng minh được chấp nhận. Wiles nhận Giải Abel 2016. Định lý lớn Fermat đã được giải, nhưng "chứng minh kỳ diệu" của Fermat (nếu có) vẫn là bí ẩn.`,
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
      content: `Archimedes of Syracuse (287-212 TCN) là một trong những nhà khoa học vĩ đại nhất thời cổ đại, người đã khám phá ra nguyên lý nổi tiếng mang tên ông. Theo truyền thuyết, vua Hiero II của Syracuse nghi ngờ thợ kim hoàn đã pha bạc vào vương miện vàng của mình và yêu cầu Archimedes kiểm tra mà không được làm hỏng vương miện. Archimedes đã suy nghĩ về vấn đề này trong nhiều ngày mà không tìm ra lời giải. Một hôm, khi ngâm mình vào bồn tắm đầy nước, ông nhận thấy mực nước dâng lên khi cơ thể ông chìm xuống. Đột nhiên, ông nhận ra giải pháp! Ông đã nhảy ra khỏi bồn và chạy trần truồng qua đường phố Syracuse hét lên "Eureka! Eureka!" (Tôi đã tìm ra!). Nguyên lý Archimedes phát biểu: "Một vật thể nhúng trong chất lỏng (toàn bộ hay một phần) sẽ chịu một lực đẩy hướng lên bằng trọng lượng của phần chất lỏng mà vật thể đó chiếm chỗ". Điều này giải thích tại sao một số vật nổi còn một số vật chìm: nếu lực đẩy lớn hơn trọng lượng vật, vật sẽ nổi; nếu nhỏ hơn, vật sẽ chìm. Nguyên lý này không chỉ giúp Archimedes giải quyết vấn đề vương miện (bằng cách so sánh thể tích nước bị đẩy ra bởi vương miện và một khối vàng thuần có cùng khối lượng) mà còn có ứng dụng rộng rãi trong thiết kế tàu thuyền, tàu ngầm, khí cầu, và đo mật độ. Archimedes cũng áp dụng nguyên lý này để tính tỷ trọng của các vật liệu khác nhau, đặt nền móng cho thủy tĩnh học - một nhánh của cơ học chất lỏng.`,
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
      content: `Galileo Galilei (1564-1642) đã thực hiện một trong những thí nghiệm quan trọng nhất trong lịch sử khoa học, đánh dấu sự chuyển từ triết học tư biện sang khoa học thực nghiệm. Trong hơn 2000 năm, học thuyết của Aristotle được coi là chân lý: vật nặng rơi nhanh hơn vật nhẹ, với tốc độ tỉ lệ thuận với khối lượng. Galileo đã dám thách thức điều này. Truyền thuyết kể rằng vào năm 1589, Galileo đã thả hai quả cầu có khối lượng khác nhau từ tháp nghiêng Pisa và chứng minh chúng chạm đất cùng lúc. Mặc dù câu chuyện này có thể là hư cấu, nhưng Galileo thực sự đã tiến hành các thí nghiệm cẩn thận để chứng minh định luật của mình. Vấn đề với việc thả vật từ tháp là vật rơi quá nhanh để quan sát chính xác. Vì vậy, Galileo đã thiết kế một thí nghiệm thông minh hơn: cho các quả cầu lăn xuống mặt phẳng nghiêng. Lăn chậm hơn rơi tự do, cho phép đo đạc chính xác hơn. Ông phát hiện rằng trong cùng điều kiện, tất cả các vật thể - dù nặng hay nhẹ - đều tăng tốc với cùng một tốc độ (khoảng 9.8 m/s² trên Trái Đất). Galileo giải thích rằng trong thực tế, vật nhẹ như lông vũ rơi chậm hơn là do sức cản không khí, không phải do bản chất của chuyển động rơi. Trong chân không, mọi vật đều rơi với cùng gia tốc. Điều này được chứng minh ngoạn mục trong sứ mệnh Apollo 15: phi hành gia David Scott đã thả một chiếc búa và một chiếc lông vũ trên Mặt Trăng (không có không khí), và chúng chạm đất cùng lúc! Công trình của Galileo đã đặt nền móng cho định luật chuyển động của Newton và phương pháp khoa học hiện đại.`,
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
      content: `Ba định luật chuyển động của Isaac Newton, được công bố trong "Philosophiæ Naturalis Principia Mathematica" năm 1687, là nền tảng của cơ học cổ điển và một trong những thành tựu khoa học vĩ đại nhất mọi thời đại. Định luật 1 (Định luật Quán tính): "Một vật thể sẽ duy trì trạng thái đứng yên hoặc chuyển động thẳng đều trừ khi có lực tác dụng lên nó". Điều này mâu thuẫn với quan niệm thông thường rằng cần có lực để duy trì chuyển động. Newton chỉ ra rằng trong điều kiện lý tưởng (không ma sát), một vật đang chuyển động sẽ tiếp tục chuyển động mãi mãi mà không cần thêm lực. Định luật 2 (Định luật Gia tốc): "Lực tác dụng lên một vật thể bằng khối lượng nhân với gia tốc của nó: F = ma". Đây là phương trình nổi tiếng nhất trong vật lý cổ điển, cho phép tính toán chính xác chuyển động của các vật thể khi biết các lực tác dụng. Định luật 3 (Định luật Tác dụng và Phản tác dụng): "Với mọi tác dụng, luôn có một phản tác dụng bằng về độ lớn và ngược về chiều". Khi bạn đẩy một bức tường, bức tường đẩy lại bạn với cùng lực. Điều này giải thích cách tên lửa bay (khí phụt ra sau tạo lực đẩy tên lửa về phía trước). Ba định luật này, kết hợp với định luật vạn vật hấp dẫn, tạo thành một hệ thống hoàn chỉnh có thể giải thích và dự đoán chuyển động của mọi vật thể từ quả táo rơi đến chuyển động của các hành tinh. Chúng thống trị vật lý học trong 200 năm cho đến khi Einstein và cơ học lượng tử xuất hiện, nhưng vẫn đủ chính xác cho hầu hết các ứng dụng thực tế ngày nay.`,
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
      content: `Nhiệt động lực học là ngành khoa học nghiên cứu nhiệt, năng lượng, và entropy, được phát triển trong thế kỷ 19 để hiểu cách thức hoạt động của động cơ hơi nước và sau này trở thành một trong những lý thuyết sâu sắc nhất của vật lý. Định luật thứ nhất (Bảo toàn Năng lượng): Năng lượng không thể tạo ra hay hủy diệt, chỉ có thể chuyển từ dạng này sang dạng khác. Định luật này được phát biểu bởi Julius von Mayer và James Joule vào những năm 1840. Nó có nghĩa là tổng năng lượng của một hệ cô lập luôn không đổi. Động cơ vĩnh cửu loại 1 (tạo ra năng lượng từ hư không) là không thể. Định luật thứ hai (Entropy Tăng): Trong một hệ cô lập, entropy (độ hỗn loạn) luôn tăng theo thời gian. Rudolf Clausius phát biểu định luật này vào năm 1850. Nó giải thích tại sao nhiệt tự nhiên truyền từ nơi nóng sang nơi lạnh chứ không ngược lại, tại sao động cơ không thể hoàn toàn hiệu quả (luôn có nhiệt thất thoát), và định hướng "mũi tên thời gian" - quá khứ khác tương lai vì entropy tăng. Định luật thứ ba (Định lý Nernst): Khi nhiệt độ tiến đến không tuyệt đối (0 Kelvin hay -273.15°C), entropy của một tinh thể hoàn hảo tiến đến 0. Walther Nernst phát biểu định luật này năm 1906. Nó có nghĩa là không thể đạt được nhiệt độ 0 tuyệt đối trong thực tế. Nhiệt động lực học không chỉ áp dụng cho động cơ mà còn cho vũ trụ học (định mệnh nhiệt của vũ trụ), hóa học (cân bằng phản ứng), sinh học (chuyển hóa năng lượng trong tế bào), và thậm chí cả thông tin (entropy thông tin). Định luật thứ hai còn có ý nghĩa triết học sâu sắc về bản chất không thể đảo ngược của thời gian.`,
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
      content: `James Clerk Maxwell (1831-1879), nhà vật lý Scotland, đã thực hiện một trong những thống nhất vĩ đại nhất trong khoa học bằng cách kết hợp điện học và từ học thành một lý thuyết duy nhất - điện từ học. Năm 1865, trong bài báo "A Dynamical Theory of the Electromagnetic Field", Maxwell trình bày bốn phương trình toán học (sau này được gọi là Phương trình Maxwell) mô tả cách điện trường và từ trường tương tác và lan truyền trong không gian. Bốn phương trình Maxwell mô tả: (1) Định luật Gauss cho điện trường - điện tích tạo ra điện trường, (2) Định luật Gauss cho từ trường - không tồn tại "điện tích từ" đơn cực, (3) Định luật Faraday - từ trường thay đổi tạo ra điện trường, và (4) Định luật Ampère-Maxwell - dòng điện và điện trường thay đổi tạo ra từ trường. Khám phá quan trọng nhất của Maxwell là khi giải các phương trình này, ông nhận thấy điện trường và từ trường có thể tạo ra nhau và lan truyền trong không gian dưới dạng sóng - sóng điện từ! Tốc độ lan truyền của sóng này, tính từ các hằng số điện và từ, chính xác bằng vận tốc ánh sáng đã được đo. Maxwell đã đưa ra kết luận táo bạo: "Ánh sáng chính là sóng điện từ!". Điều này thống nhất quang học với điện từ học. Maxwell dự đoán rằng phải tồn tại các sóng điện từ khác với tần số khác nhau - một dự đoán được Heinrich Hertz xác nhận năm 1887 khi phát hiện sóng vô tuyến. Ngày nay chúng ta biết toàn bộ phổ điện từ: sóng vô tuyến, vi sóng, hồng ngoại, ánh sáng nhìn thấy, tử ngoại, tia X, và tia gamma. Phương trình Maxwell là nền tảng của mọi công nghệ điện từ hiện đại: radio, TV, điện thoại di động, WiFi, radar, và vô số thiết bị khác. Einstein gọi công trình của Maxwell là "sự thay đổi sâu sắc nhất mà vật lý học trải qua kể từ thời Newton".`,
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
      content: `Thuyết tương đối rộng (General Relativity), được Albert Einstein hoàn thiện năm 1915, là một trong những lý thuyết đẹp và sâu sắc nhất trong vật lý. Nếu thuyết tương đối hẹp (1905) cách mạng hóa quan niệm về không gian và thời gian, thì tương đối rộng đã cách mạng hóa hoàn toàn cách chúng ta hiểu về trọng lực. Trong suốt hơn 200 năm, định luật vạn vật hấp dẫn của Newton đã giải thích trọng lực như một lực hút giữa các vật có khối lượng. Nhưng Newton không giải thích được TẠI SAO trọng lực tồn tại hay nó truyền qua không gian như thế nào. Einstein đã có một cách nhìn hoàn toàn khác: trọng lực không phải là một lực! Nó là kết quả của việc khối lượng (và năng lượng) làm cong không-thời gian. Hãy tưởng tượng không-thời gian như một tấm vải căng phẳng. Khi đặt một quả cầu nặng lên, nó tạo ra một vết lõm. Các vật thể nhỏ hơn gần đó sẽ "lăn" theo độ cong này - đó chính là những gì chúng ta gọi là "rơi" hay "quỹ đạo". Einstein tóm tắt: "Vật chất nói cho không-thời gian cách cong, không-thời gian nói cho vật chất cách chuyển động". Lý thuyết này đưa ra nhiều dự đoán kinh ngạc: (1) Ánh sáng bị bẻ cong bởi trọng lực (thấu kính hấp dẫn), (2) Thời gian trôi chậm hơn trong trường hấp dẫn mạnh, (3) Sóng hấp dẫn - gợn sóng trong không-thời gian lan truyền với vận tốc ánh sáng, (4) Lỗ đen - vùng không-thời gian cong đến mức ngay cả ánh sáng cũng không thoát ra được, (5) Vũ trụ có thể giãn nở hoặc co lại. Tất cả những dự đoán này đã được xác nhận bằng quan sát: độ lệch ánh sáng sao trong nhật thực 1919, GPS phải hiệu chỉnh đồng hồ, sóng hấp dẫn phát hiện 2015, ảnh lỗ đen 2019, và vũ trụ giãn nở. Tương đối rộng là nền tảng của vũ trụ học hiện đại.`,
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
      content: `Cơ học lượng tử là lý thuyết mô tả thế giới ở cấp độ nguyên tử và hạt hạ nguyên tử - một thế giới kỳ lạ đến mức thách thức mọi trực giác thông thường. Được phát triển trong những năm 1920 bởi Werner Heisenberg, Erwin Schrödinger, Niels Bohr, Max Born, và nhiều người khác, cơ học lượng tử là một trong hai trụ cột của vật lý hiện đại (cùng với tương đối rộng). Mọi thứ bắt đầu khi Max Planck (1900) phát hiện năng lượng bức xạ được phát ra theo từng "gói" rời rạc (lượng tử), không liên tục. Einstein (1905) giải thích hiệu ứng quang điện bằng cách coi ánh sáng như hạt (photon). Niels Bohr (1913) đề xuất electron trong nguyên tử chỉ tồn tại ở những mức năng lượng rời rạc. Nhưng bức tranh toàn diện chỉ hình thành vào giữa những năm 1920. Cơ học lượng tử đưa ra những khái niệm kỳ lạ: (1) Lưỡng tính sóng-hạt: Electron, photon, và mọi vật thể khác đều có cả tính chất sóng lẫn hạt, (2) Nguyên lý bất định Heisenberg: Không thể biết chính xác đồng thời vị trí và động lượng của một hạt, (3) Hàm sóng và Xác suất: Thay vì biết chính xác hạt ở đâu, ta chỉ biết xác suất tìm thấy nó, (4) Superposition: Một hạt có thể ở nhiều trạng thái cùng lúc cho đến khi được đo, (5) Entanglement: Hai hạt có thể "liên đới" sao cho trạng thái của một hạt ảnh hưởng tức thời đến hạt kia dù cách xa. Einstein không bao giờ hoàn toàn chấp nhận cơ học lượng tử, nổi tiếng với câu nói "Chúa không chơi xúc xắc". Tuy nhiên, cơ học lượng tử là lý thuyết vật lý chính xác nhất từng được kiểm chứng, với dự đoán khớp thực nghiệm đến 10 chữ số thập phân! Nó là nền tảng của hóa học, sinh học phân tử, và mọi công nghệ hiện đại: transistor, laser, MRI, năng lượng hạt nhân, máy tính lượng tử.`,
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
      content: `Phân hạch hạt nhân là quá trình một hạt nhân nguyên tử nặng bị tách thành hai hạt nhân nhỏ hơn, giải phóng một lượng năng lượng khổng lồ. Khám phá này vào năm 1938 đã thay đổi lịch sử nhân loại, dẫn đến cả năng lượng hạt nhân lẫn vũ khí hạt nhân. Vào tháng 12/1938, các nhà hóa học Otto Hahn và Fritz Strassmann tại Berlin đã bắn neutron vào uranium và phát hiện sản phẩm là barium - một nguyên tố có khối lượng khoảng một nửa uranium. Điều này hoàn toàn bất ngờ! Họ đã gửi kết quả cho Lise Meitner, nhà vật lý người Do Thái đang lánh nạn ở Thụy Điển. Meitner cùng cháu Otto Frisch đã đưa ra giải thích đúng: hạt nhân uranium đã bị phân tách (fission) thành hai hạt nhân nhỏ hơn! Sử dụng công thức E=mc² của Einstein, Meitner tính toán rằng mỗi phân hạch giải phóng khoảng 200 MeV năng lượng - một lượng khổng lồ so với phản ứng hóa học thông thường (vài eV). Điều quan trọng hơn là mỗi phân hạch cũng giải phóng 2-3 neutron. Những neutron này có thể gây phân hạch thêm các hạt nhân uranium khác, tạo ra phản ứng dây chuyền. Nếu kiểm soát được, đây là nguồn năng lượng khổng lồ (nhà máy điện hạt nhân). Nếu không kiểm soát, đây là vụ nổ kinh hoàng (bom nguyên tử). Khám phá này được công bố ngay trước Thế chiến II, dẫn đến Dự án Manhattan của Mỹ phát triển bom nguyên tử. Hai quả bom đã được thả xuống Hiroshima và Nagasaki tháng 8/1945, kết thúc chiến tranh nhưng mở ra kỷ nguyên hạt nhân với cả hy vọng (năng lượng sạch) lẫn nỗi sợ hãi (chiến tranh hạt nhân). Năm 1944, Otto Hahn nhận giải Nobel Hóa học, nhưng Lise Meitner - người đưa ra giải thích lý thuyết - không được công nhận, một trong những bất công lớn nhất trong lịch sử giải Nobel.`,
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
      content: `Mô hình Chuẩn (Standard Model) là một trong những thành tựu vĩ đại nhất của vật lý thế kỷ 20, mô tả 3 trong 4 lực cơ bản của tự nhiên (lực điện từ, lực yếu và lực mạnh) cùng với tất cả các hạt cơ bản cấu tạo nên vật chất. Lý thuyết này được phát triển qua nhiều thập kỷ bởi các nhà vật lý như Sheldon Glashow, Abdus Salam, Steven Weinberg và nhiều người khác.

Mô hình Chuẩn phân loại các hạt cơ bản thành hai nhóm chính: fermion (vật chất) và boson (lực). Các fermion bao gồm 6 loại quark (up, down, charm, strange, top, bottom) và 6 loại lepton (electron, muon, tau và 3 neutrino tương ứng). Các boson trung gian bao gồm photon (điện từ), gluon (lực mạnh), W và Z boson (lực yếu), và Higgs boson (khối lượng).

Điểm đỉnh cao của Mô hình Chuẩn là việc phát hiện Higgs boson tại máy gia tốc LHC (CERN) vào năm 2012, sau gần 50 năm tìm kiếm. Hạt Higgs giải thích tại sao các hạt cơ bản có khối lượng thông qua cơ chế Higgs. Phát hiện này đã mang về giải Nobel Vật lý 2013 cho Peter Higgs và François Englert.

Mặc dù cực kỳ thành công trong việc dự đoán kết quả thực nghiệm với độ chính xác đáng kinh ngạc, Mô hình Chuẩn vẫn chưa hoàn chỉnh. Nó không bao gồm lực hấp dẫn, không giải thích vật chất tối và năng lượng tối (chiếm 95% vũ trụ), và chưa thống nhất được với thuyết tương đối rộng. Việc tìm kiếm lý thuyết "Beyond the Standard Model" vẫn đang tiếp diễn.`,
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
      content: `Vào ngày 14 tháng 9 năm 2015, sau gần 100 năm kể từ khi Albert Einstein dự đoán sự tồn tại của chúng trong thuyết tương đối rộng, sóng hấp dẫn đã được phát hiện trực tiếp lần đầu tiên bởi đài quan sát LIGO (Laser Interferometer Gravitational-Wave Observatory). Đây là một trong những khám phá khoa học vĩ đại nhất thế kỷ 21, mở ra một cách hoàn toàn mới để quan sát vũ trụ.

Sóng hấp dẫn là những gợn sóng trong không-thời gian, được tạo ra bởi các sự kiện vũ trụ cực kỳ bạo lực như hai lỗ đen va chạm, sao neutron hợp nhất, hoặc siêu tân tinh bùng nổ. Sự kiện đầu tiên mà LIGO phát hiện (được đặt tên GW150914) đến từ vụ va chạm của hai lỗ đen cách Trái Đất 1.3 tỷ năm ánh sáng, giải phóng năng lượng tương đương 3 lần khối lượng Mặt Trời trong vài phần nghìn giây.

LIGO hoạt động bằng cách sử dụng laser để đo những thay đổi cực kỳ nhỏ trong khoảng cách giữa các gương cách nhau 4km - những thay đổi nhỏ hơn kích thước của một proton. Đây là một kỳ tích kỹ thuật đòi hỏi công nghệ chính xác nhất từng được con người tạo ra. Hệ thống sử dụng hai đài quan sát ở Louisiana và Washington để loại bỏ nhiễu và xác nhận tín hiệu.

Phát hiện này đã mang về giải Nobel Vật lý 2017 cho Rainer Weiss, Barry Barish và Kip Thorne. Kể từ đó, LIGO và các đài quan sát khác như Virgo đã phát hiện hàng chục sự kiện sóng hấp dẫn, mở ra kỷ nguyên "thiên văn học đa thông tin" - kết hợp quan sát sóng hấp dẫn với ánh sáng, tia X và các dạng bức xạ khác để hiểu sâu hơn về vũ trụ.`,
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
      content: `Democritus (khoảng 460-370 TCN), nhà triết học Hy Lạp cổ đại, là một trong những người đầu tiên đề xuất thuyết nguyên tử - một ý tưởng mang tính cách mạng cho thời đại của ông. Ông đề xuất rằng mọi vật chất trong vũ trụ đều được cấu tạo từ những hạt vô cùng nhỏ bé, không thể phân chia được nữa, mà ông gọi là "atomos" (trong tiếng Hy Lạp có nghĩa là "không thể cắt"). Đây là nguồn gốc của từ "atom" (nguyên tử) trong tiếng Anh hiện đại.

Theo Democritus, các nguyên tử này tồn tại trong khoảng không vô tận, chuyển động liên tục và kết hợp với nhau theo nhiều cách khác nhau để tạo ra mọi vật thể mà chúng ta thấy. Các nguyên tử khác nhau về hình dạng, kích thước và khối lượng, và những khác biệt này quyết định tính chất của vật chất. Ví dụ, các chất ngọt được tạo thành từ các nguyên tử tròn và mịn, trong khi các chất đắng có nguyên tử sắc và nhọn.

Mặc dù lý thuyết của Democritus chủ yếu dựa trên lý luận triết học chứ không có bằng chứng thực nghiệm, nhưng nó đáng kinh ngạc về mặt tiên đoán. Trong gần 2000 năm, thuyết nguyên tử bị át đi bởi triết lý Aristotle cho rằng vật chất có thể chia nhỏ vô hạn. Chỉ đến thế kỷ 19, khi John Dalton phát triển thuyết nguyên tử khoa học dựa trên bằng chứng thực nghiệm, thì ý tưởng của Democritus mới được công nhận là nền tảng của hóa học hiện đại.

Tầm nhìn xa trông rộng của Democritus về bản chất của vật chất đã đi trước thời đại hơn 2000 năm, và ngày nay ông được công nhận là một trong những nhà tư tưởng khoa học vĩ đại nhất của thời cổ đại.`,
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
      content: `Antoine-Laurent de Lavoisier (1743-1794), nhà hóa học người Pháp, được mệnh danh là "Cha đẻ của hóa học hiện đại" nhờ những đóng góp đột phá của ông trong việc biến hóa học từ một nghề giả kim thành một khoa học chính xác. Công trình quan trọng nhất của ông là việc phát hiện và chứng minh Định luật Bảo toàn Khối lượng vào cuối thế kỷ 18, được công bố trong tác phẩm "Traité Élémentaire de Chimie" (1789).

Định luật này phát biểu rằng: "Trong một phản ứng hóa học khép kín, tổng khối lượng của các chất tham gia phản ứng luôn bằng tổng khối lượng của các sản phẩm". Nói cách khác, vật chất không thể tự sinh ra hoặc biến mất, mà chỉ chuyển từ dạng này sang dạng khác. Lavoisier đã chứng minh điều này thông qua các thí nghiệm cẩn thận, sử dụng cân chính xác để đo lường khối lượng trước và sau phản ứng.

Lavoisier cũng là người đặt tên cho oxygen (từ tiếng Hy Lạp nghĩa là "sinh acid") và hydrogen (nghĩa là "sinh nước"), và ông đã loại bỏ hoàn toàn thuyết phlogiston sai lầm - lý thuyết cho rằng có một chất gọi là phlogiston được giải phóng khi vật cháy. Thay vào đó, ông chứng minh rằng quá trình cháy là sự kết hợp với oxygen từ không khí.

Bi kịch của cuộc đời Lavoisier là ông bị đưa lên đoạn đầu đài trong Cách mạng Pháp năm 1794 vì vai trò thu thuế của ông. Theo truyền thuyết, khi xin hoãn thi hành án để hoàn thành nghiên cứu, quan tòa đã nói: "Cộng hòa không cần nhà khoa học". Nhà toán học Joseph-Louis Lagrange sau đó đã than thở: "Chỉ mất một giây để chặt đầu này, nhưng một trăm năm cũng không đủ để tạo ra một cái đầu tương tự".`,
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
      content: `John Dalton (1766-1844), nhà hóa học và vật lý học người Anh, đã biến ý tưởng triết học cổ xưa về nguyên tử thành một lý thuyết khoa học có cơ sở thực nghiệm vững chắc. Năm 1808, trong tác phẩm "A New System of Chemical Philosophy", Dalton đã trình bày Thuyết Nguyên Tử - một trong những nền tảng quan trọng nhất của hóa học hiện đại.

Thuyết nguyên tử Dalton bao gồm năm giả thuyết chính: (1) Mọi vật chất đều được cấu tạo từ các nguyên tử - những hạt nhỏ nhất, không thể chia cắt và không thể phá hủy; (2) Tất cả nguyên tử của cùng một nguyên tố hóa học đều giống hệt nhau về khối lượng và tính chất; (3) Nguyên tử của các nguyên tố khác nhau có khối lượng và tính chất khác nhau; (4) Nguyên tử không thể tạo ra hoặc phá hủy trong phản ứng hóa học; (5) Hợp chất được hình thành khi nguyên tử của các nguyên tố khác nhau kết hợp với nhau theo tỷ lệ số nguyên đơn giản.

Dalton đã sử dụng lý thuyết của mình để giải thích Định luật Bảo toàn Khối lượng của Lavoisier, Định luật Tỷ lệ Xác định của Proust, và tự mình phát hiện ra Định luật Tỷ lệ Bội số. Ông cũng là người đầu tiên tạo ra bảng khối lượng nguyên tử tương đối, mặc dù nhiều giá trị ban đầu của ông không chính xác do hạn chế về kỹ thuật đo lường thời đó.

Mặc dù một số giả thuyết của Dalton sau này được chứng minh là không hoàn toàn đúng (ví dụ, nguyên tử có thể chia nhỏ hơn thành proton, neutron và electron; các đồng vị của cùng một nguyên tố có khối lượng khác nhau), nhưng thuyết nguyên tử của ông vẫn là bước đột phá lớn, biến hóa học từ một nghề thủ công thành một khoa học định lượng chính xác. Dalton cũng nổi tiếng với nghiên cứu về mù màu - một tình trạng mà chính ông cũng mắc phải, nên còn được gọi là "Daltonism".`,
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
      content: `Năm 1869, nhà hóa học người Nga Dmitri Mendeleev (1834-1907) đã tạo ra một trong những công cụ quan trọng nhất trong lịch sử khoa học: Bảng Tuần hoàn các Nguyên tố Hóa học. Khi đó, chỉ có khoảng 63 nguyên tố được biết đến, và nhiều nhà khoa học đang cố gắng tìm ra cách sắp xếp chúng một cách có ý nghĩa. Mendeleev đã thành công bằng cách sắp xếp các nguyên tố theo thứ tự tăng dần của khối lượng nguyên tử, đồng thời nhóm những nguyên tố có tính chất hóa học tương tự vào cùng một cột.

Điều làm nên thiên tài của Mendeleev không chỉ là việc sắp xếp các nguyên tố đã biết, mà còn ở sự can đảm để để trống một số ô trong bảng của mình. Ông nhận ra rằng phải có những nguyên tố chưa được phát hiện để lấp đầy các khoảng trống này. Đáng kinh ngạc hơn, ông đã dự đoán chi tiết về tính chất vật lý và hóa học của ba nguyên tố chưa biết, mà ông gọi là eka-aluminium, eka-boron và eka-silicon.

Trong vòng 20 năm sau đó, cả ba nguyên tố này đều được phát hiện và được đặt tên là gallium (1875), scandium (1879) và germanium (1886). Các tính chất của chúng hoàn toàn khớp với dự đoán của Mendeleev, chứng minh tính đúng đắn của bảng tuần hoàn và biến ông thành một trong những nhà khoa học nổi tiếng nhất thời đại.

Bảng tuần hoàn hiện đại đã được cải tiến dựa trên số hiệu nguyên tử (số proton) thay vì khối lượng nguyên tử, sau khi cấu trúc nguyên tử được hiểu rõ hơn. Tuy nhiên, nguyên tắc cơ bản của Mendeleev - rằng tính chất của nguyên tố lặp lại theo chu kỳ - vẫn là nền tảng. Ngày nay, bảng tuần hoàn có 118 nguyên tố, và nguyên tố số 101 được đặt tên là Mendelevium để vinh danh ông.`,
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
      content: `Năm 1897, nhà vật lý người Anh Joseph John Thomson (1856-1940) đã thực hiện một trong những khám phá quan trọng nhất trong lịch sử khoa học: phát hiện ra electron - hạt hạ nguyên tử đầu tiên được biết đến. Khám phá này đã chứng minh rằng nguyên tử không phải là "không thể chia" như tên gọi của nó (atomos trong tiếng Hy Lạp), mà có cấu trúc bên trong phức tạp hơn nhiều.

Thomson đã nghiên cứu tia cathode - những tia phát sáng bí ẩn xuất hiện trong các ống thủy tinh chân không khi có dòng điện chạy qua. Bằng cách cho tia cathode đi qua điện trường và từ trường, ông đã chứng minh rằng chúng bị lệch hướng theo cách cho thấy chúng là các hạt mang điện tích âm. Quan trọng hơn, bất kể ống cathode được làm từ kim loại nào, tỷ số điện tích trên khối lượng (e/m) của các hạt này luôn giống nhau.

Thomson kết luận rằng những hạt này - mà ông gọi là "corpuscles" nhưng sau này được đổi tên thành "electron" - là thành phần cơ bản của mọi nguyên tử. Ông đề xuất mô hình "bánh pudding nho khô" (plum pudding model): nguyên tử là một quả cầu điện tích dương đồng nhất, với các electron âm nhúng bên trong như nho khô trong bánh pudding.

Mặc dù mô hình nguyên tử của Thomson sau này bị thay thế bởi mô hình Rutherford và Bohr chính xác hơn, nhưng việc phát hiện ra electron đã mở ra kỷ nguyên vật lý hạt. Thomson được trao giải Nobel Vật lý năm 1906 cho khám phá này. Thú vị là con trai ông, George Paget Thomson, cũng được trao giải Nobel Vật lý năm 1937 cho việc chứng minh electron có tính chất sóng - một minh chứng cho tính đối ngẫu sóng-hạt trong cơ học lượng tử.`,
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
      content: `Năm 1911, nhà vật lý người New Zealand Ernest Rutherford (1871-1937) đã thực hiện một thí nghiệm mang tính cách mạng đã thay đổi hoàn toàn hiểu biết của chúng ta về cấu trúc nguyên tử. Thí nghiệm nổi tiếng của ông, được gọi là "thí nghiệm lá vàng", đã lật đổ mô hình "bánh pudding nho khô" của J.J. Thomson và thiết lập mô hình nguyên tử hạt nhân mà chúng ta vẫn sử dụng cho đến ngày nay.

Trong thí nghiệm, Rutherford và các cộng sự Hans Geiger và Ernest Marsden đã bắn một chùm hạt alpha (hạt nhân helium mang điện dương) vào một lá vàng mỏng. Theo mô hình Thomson, các hạt alpha nên đi xuyên qua lá vàng với độ lệch rất nhỏ, vì điện tích dương được phân bố đồng đều trong toàn bộ nguyên tử. Tuy nhiên, kết quả thí nghiệm hoàn toàn bất ngờ: trong khi phần lớn hạt alpha đi thẳng qua, một số ít bị lệch góc lớn, và thậm chí có hạt bị bật ngược trở lại!

Rutherford đã mô tả sự ngạc nhiên của mình: "Đó là sự kiện đáng kinh ngạc nhất từng xảy ra với tôi trong cuộc đời. Nó gần như không thể tin được, như thể bạn bắn một viên đạn 15 inch vào một tờ giấy mỏng và nó bật ngược lại trúng bạn". Ông kết luận rằng toàn bộ điện tích dương và hầu hết khối lượng của nguyên tử phải tập trung trong một hạt nhân cực kỳ nhỏ và đặc ở trung tâm, với các electron quay xung quanh trong một khoảng không rộng lớn.

Mô hình hạt nhân của Rutherford cho thấy nguyên tử chủ yếu là khoảng trống: nếu hạt nhân có kích thước bằng một quả bóng chày, thì electron gần nhất sẽ ở cách khoảng 1 km! Khám phá này đã mở đường cho sự phát triển của cơ học lượng tử và hiểu biết sâu sắc hơn về cấu trúc vật chất. Rutherford được trao giải Nobel Hóa học năm 1908 (trước thí nghiệm lá vàng) và được coi là "cha đẻ của vật lý hạt nhân".`,
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
      content: `Năm 1916, nhà hóa học người Mỹ Gilbert Newton Lewis (1875-1946) đã công bố một trong những lý thuyết quan trọng nhất trong hóa học: lý thuyết về liên kết hóa học thông qua việc chia sẻ các cặp electron. Công trình này đã giải đáp câu hỏi cơ bản: tại sao và bằng cách nào các nguyên tử kết hợp với nhau để tạo thành phân tử?

Lewis đề xuất rằng nguyên tử có xu hướng đạt được cấu hình electron bền vững giống khí hiếm, với 8 electron ở lớp vỏ ngoài cùng (gọi là "quy tắc octet"). Để đạt được điều này, các nguyên tử có thể chia sẻ các cặp electron với nhau, tạo thành liên kết cộng hóa trị. Ông đã giới thiệu ký hiệu Lewis - biểu diễn electron hóa trị bằng các dấu chấm xung quanh ký hiệu nguyên tố - một công cụ đơn giản nhưng cực kỳ hữu ích vẫn được sử dụng rộng rãi cho đến ngày nay.

Lý thuyết của Lewis không chỉ giải thích liên kết cộng hóa trị mà còn đưa ra khái niệm "cặp electron tự do" (lone pair) - những cặp electron không tham gia liên kết nhưng ảnh hưởng đến hình dạng phân tử và tính chất hóa học. Ông cũng mở rộng định nghĩa về acid-base với lý thuyết acid-base Lewis: acid là chất nhận cặp electron, base là chất cho cặp electron - một định nghĩa tổng quát hơn nhiều so với định nghĩa Arrhenius truyền thống.

Mặc dù có những đóng góp to lớn, Lewis không bao giờ nhận được giải Nobel Hóa học - một trong những thiếu sót đáng tiếc nhất trong lịch sử giải thưởng này. Tuy nhiên, di sản của ông sống mãi trong mỗi cấu trúc Lewis mà hàng triệu sinh viên vẽ ra mỗi năm. Lý thuyết liên kết của Lewis đã đặt nền móng cho sự hiểu biết hiện đại về cấu trúc phân tử và phản ứng hóa học.`,
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
      content: `Vào một buổi sáng tháng 9 năm 1928, nhà vi sinh vật học người Scotland Alexander Fleming (1881-1955) trở về phòng thí nghiệm sau kỳ nghỉ hè và phát hiện một điều kỳ lạ: một trong những đĩa petri nuôi cấy vi khuẩn Staphylococcus của ông đã bị nhiễm nấm mốc, và xung quanh vùng nấm mốc, các vi khuẩn đã bị tiêu diệt. Phát hiện tình cờ này đã dẫn đến một trong những khám phá y học quan trọng nhất mọi thời đại: penicillin - kháng sinh đầu tiên.

Fleming nhận ra rằng nấm mốc Penicillium notatum đã tiết ra một chất có khả năng tiêu diệt vi khuẩn, mà ông đặt tên là "penicillin". Ông đã công bố phát hiện này năm 1929, nhưng ban đầu nó không nhận được nhiều sự chú ý. Penicillin rất khó chiết xuất và tinh chế, và Fleming không có nguồn lực để phát triển nó thành thuốc sử dụng trên lâm sàng.

Phải đến năm 1940, hai nhà khoa học tại Oxford là Howard Florey và Ernst Boris Chain mới tìm ra phương pháp sản xuất penicillin với số lượng lớn. Trong Chiến tranh Thế giới thứ II, penicillin đã cứu sống hàng ngàn lính bị thương khỏi nhiễm trùng - một nguyên nhân tử vong hàng đầu trong các cuộc chiến tranh trước đó. Thuốc này đặc biệt hiệu quả với nhiễm trùng huyết, viêm phổi, giang mai và nhiều bệnh nhiễm khuẩn khác.

Phát hiện của Fleming đã mở ra "Kỷ nguyên Vàng của Kháng sinh", dẫn đến việc phát triển hàng trăm loại kháng sinh khác, cứu sống hàng trăm triệu người trên toàn thế giới. Năm 1945, Fleming, Florey và Chain cùng nhận giải Nobel Y học. Trong bài phát biểu nhận giải Nobel, Fleming đã cảnh báo về nguy cơ kháng kháng sinh - một vấn đề đang trở nên nghiêm trọng ngày nay. Câu chuyện về penicillin là một minh chứng hoàn hảo cho vai trò của may mắn trong khoa học, nhưng cũng nhấn mạnh tầm quan trọng của một tâm trí quan sát tinh tường.`,
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
      content: `Vào ngày 25 tháng 4 năm 1953, tạp chí Nature đã công bố một bài báo chỉ có 900 từ nhưng lại thay đổi hoàn toàn sinh học hiện đại. Trong bài báo đó, James Watson (24 tuổi) và Francis Crick (36 tuổi) đã mô tả cấu trúc xoắn kép (double helix) của DNA - phân tử mang thông tin di truyền của mọi sinh vật. Họ kết thúc bài báo bằng một câu nổi tiếng: "Chúng tôi nhận thấy rằng cặp ghép đặc biệt mà chúng tôi đề xuất ngay lập tức gợi ý một cơ chế sao chép có thể có cho vật chất di truyền".

Khám phá này dựa rất nhiều vào dữ liệu nhiễu xạ tia X của Rosalind Franklin, đặc biệt là bức ảnh "Photo 51" nổi tiếng cho thấy cấu trúc xoắn của DNA. Thật đáng tiếc, Franklin đã qua đời vì ung thư năm 1958 ở tuổi 37, và không được nhận giải Nobel Sinh học-Y học 1962 cùng với Watson, Crick và Maurice Wilkins (giải Nobel không được trao sau khi người nhận đã qua đời). Đóng góp của Franklin trong nhiều năm đã bị che lấp, nhưng ngày nay bà được công nhận đúng mức.

Mô hình xoắn kép cho thấy DNA gồm hai sợi xoắn quanh nhau như cầu thang xoắn ốc. Mỗi sợi là chuỗi nucleotide gồm đường (deoxyribose), phosphate và một trong bốn base nitơ: adenine (A), thymine (T), guanine (G), cytosine (C). Quy tắc bắt cặp bổ sung rất đơn giản nhưng quan trọng: A luôn ghép với T, G luôn ghép với C. Điều này giải thích cơ chế sao chép DNA: mỗi sợi có thể làm khuôn để tạo sợi bổ sung.

Phát hiện cấu trúc DNA đã mở ra cuộc cách mạng sinh học phân tử, dẫn đến việc giải mã bộ gen người, công nghệ ADN tái tổ hợp, xét nghiệm DNA, và vô số ứng dụng khác. Đây thực sự là "bí mật của sự sống" - giải thích làm thế nào thông tin di truyền được lưu trữ, sao chép và truyền từ thế hệ này sang thế hệ khác.`,
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
      content: `Năm 2012, Jennifer Doudna và Emmanuelle Charpentier đã công bố một công nghệ mang tính cách mạng: CRISPR-Cas9 - một công cụ chỉnh sửa gen chính xác, rẻ tiền và dễ sử dụng đến mức nó đã dân chủ hóa hoàn toàn kỹ thuật gen. Khám phá này đã mang về cho họ giải Nobel Hóa học 2020 và đã làm biến đổi toàn bộ lĩnh vực sinh học và y học chỉ trong vòng một thập kỷ.

CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) ban đầu được phát hiện như một hệ thống miễn dịch của vi khuẩn chống lại virus. Vi khuẩn sử dụng enzyme Cas9 như "kéo phân tử" để cắt DNA của virus xâm nhập. Doudna và Charpentier đã nhận ra rằng hệ thống này có thể được lập trình lại để cắt bất kỳ chuỗi DNA nào mà chúng ta muốn - tạo ra một công cụ chỉnh sửa gen có độ chính xác cao.

Công nghệ CRISPR hoạt động như chức năng "tìm và thay thế" trong trình soạn thảo văn bản, nhưng cho DNA. Một phân tử RNA dẫn đường (guide RNA) được thiết kế để nhận diện một chuỗi DNA cụ thể trong bộ gen. Sau khi tìm thấy mục tiêu, enzyme Cas9 cắt DNA tại vị trí đó. Tế bào sau đó sẽ sửa chữa vết cắt, và trong quá trình này, chúng ta có thể thêm, xóa hoặc thay thế các đoạn gen.

Ứng dụng của CRISPR rộng khắp và đang phát triển nhanh chóng: chữa trị bệnh di truyền như bệnh hồng cầu hình liềm và mù màu, phát triển liệu pháp ung thư mới, tạo ra cây trồng chịu hạn và kháng sâu bệnh, nghiên cứu chức năng gen, thậm chí cả hồi sinh các loài đã tuyệt chủng. Tuy nhiên, công nghệ này cũng đặt ra những câu hỏi đạo đức sâu sắc, đặc biệt là về khả năng chỉnh sửa gen dòng mầm (thay đổi di truyền cho thế hệ tương lai) và "thiết kế em bé".`,
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
      content: `Thuyết Tế bào là một trong những nguyên lý nền tảng nhất của sinh học hiện đại, thiết lập rằng tế bào là đơn vị cơ bản của sự sống. Lý thuyết này được phát triển trong thế kỷ 19 thông qua công trình của nhiều nhà khoa học, chủ yếu là Matthias Schleiden, Theodor Schwann và Rudolf Virchow.

Năm 1838, nhà thực vật học người Đức Matthias Schleiden đề xuất rằng tất cả thực vật đều được tạo thành từ tế bào. Một năm sau, năm 1839, nhà động vật học Theodor Schwann mở rộng ý tưởng này cho động vật, tạo thành Thuyết Tế bào cổ điển với hai nguyên lý chính: (1) Tất cả sinh vật đều được cấu tạo từ một hoặc nhiều tế bào; (2) Tế bào là đơn vị cơ bản về cấu trúc và chức năng của sinh vật.

Năm 1855, Rudolf Virchow đã bổ sung nguyên lý quan trọng thứ ba: "Omnis cellula e cellula" (mọi tế bào đều sinh ra từ tế bào có sẵn). Điều này bác bỏ hoàn toàn thuyết sinh tự phát - niềm tin lâu đời rằng sự sống có thể tự nhiên phát sinh từ vật chất vô sinh. Virchow cũng ứng dụng thuyết tế bào vào y học, thiết lập nền tảng cho bệnh lý học tế bào.

Thuyết Tế bào đã thống nhất toàn bộ sinh học dưới một khuôn khổ chung, giải thích rằng dù là vi khuẩn đơn bào hay voi khổng lồ, tất cả đều tuân theo cùng một nguyên tắc cơ bản. Nó đã mở đường cho vô số khám phá sau này về sinh học phân tử, di truyền học, miễn dịch học và y học hiện đại. Ngày nay, chúng ta biết rằng cơ thể người có khoảng 37 nghìn tỷ tế bào, mỗi tế bào là một đơn vị sống phức tạp với hàng nghìn phản ứng hóa học diễn ra mỗi giây.`,
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
      content: `Ngày 24 tháng 11 năm 1859, Charles Darwin (1809-1882) xuất bản cuốn sách "On the Origin of Species" (Nguồn gốc các loài) - một trong những tác phẩm khoa học có ảnh hưởng sâu sắc nhất mọi thời đại. Cuốn sách đã bán hết 1250 bản in ngay trong ngày đầu tiên và đã thay đổi hoàn toàn cách chúng ta hiểu về sự sống trên Trái Đất.

Darwin đề xuất cơ chế "chọn lọc tự nhiên" để giải thích sự tiến hóa: (1) Sinh vật sinh ra nhiều con hơn số có thể sống sót; (2) Có sự biến dị giữa các cá thể trong quần thể; (3) Những cá thể có đặc điểm giúp chúng thích nghi tốt hơn với môi trường sẽ có khả năng sống sót và sinh sản cao hơn; (4) Các đặc điểm có lợi này được truyền lại cho thế hệ sau. Qua nhiều thế hệ, quá trình này dẫn đến sự thay đổi dần dần của loài và có thể tạo ra các loài mới.

Ý tưởng này đến với Darwin sau chuyến hành trình 5 năm (1831-1836) trên tàu HMS Beagle, đặc biệt là khi quan sát các loài chim sẻ và rùa khác nhau trên quần đảo Galápagos. Darwin nhận ra rằng các loài này có nguồn gốc chung nhưng đã tiến hóa khác nhau để thích nghi với các đảo khác nhau. Thú vị là nhà tự nhiên học Alfred Russel Wallace cũng độc lập phát triển ý tưởng tương tự, thúc đẩy Darwin công bố lý thuyết của mình.

Thuyết tiến hóa đã thống nhất toàn bộ sinh học, giải thích vô số quan sát: tại sao hóa thạch cho thấy sinh vật thay đổi theo thời gian, tại sao cơ quan tàn dư tồn tại, tại sao phân loại sinh học có cấu trúc phân cấp giống cây phả hệ. Kết hợp với di truyền học Mendel và sinh học phân tử, nó tạo thành "Tổng hợp Hiện đại" - nền tảng của sinh học hiện đại. Như nhà di truyền học Theodosius Dobzhansky đã nói: "Không có gì trong sinh học có ý nghĩa nếu không xét trong bối cảnh tiến hóa".`,
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
      content: `Gregor Mendel (1822-1884), một tu sĩ Augustinian ở Tu viện St. Thomas tại Brno (nay thuộc Cộng hòa Séc), đã đặt nền móng cho di truyền học hiện đại thông qua các thí nghiệm tỉ mỉ với cây đậu Hà Lan trong vườn tu viện. Từ năm 1856 đến 1863, ông đã lai tạo và theo dõi khoảng 28,000 cây đậu qua nhiều thế hệ, ghi chép cẩn thận về các đặc điểm như màu hoa, hình dạng hạt, chiều cao cây.

Mendel đã phát hiện ra các quy luật cơ bản của di truyền, mà ngày nay được gọi là Định luật Mendel. Định luật Phân ly phát biểu rằng mỗi tính trạng được quy định bởi một cặp "yếu tố di truyền" (ngày nay gọi là gen), và các yếu tố này phân ly độc lập trong quá trình tạo giao tử. Định luật Phân ly Độc lập cho biết các cặp gen khác nhau di truyền độc lập với nhau (tuy nhiên sau này người ta phát hiện điều này chỉ đúng với các gen nằm trên các nhiễm sắc thể khác nhau).

Mendel cũng phân biệt giữa tính trạng trội và lặn, giải thích tại sao một số đặc điểm có thể "biến mất" ở thế hệ con và xuất hiện lại ở thế hệ cháu. Ông đã sử dụng toán học và thống kê để phân tích kết quả - một cách tiếp cận cách mạng trong sinh học thời đó - và phát hiện ra tỷ lệ 3:1 nổi tiếng trong thế hệ F2.

Thật đáng tiếc, công trình của Mendel bị bỏ qua trong suốt cuộc đời ông. Ông đã trình bày kết quả tại Hội Nghiên cứu Tự nhiên Brno năm 1865 và xuất bản năm 1866, nhưng bài báo hầu như không được ai chú ý. Chỉ đến năm 1900, sau khi Mendel đã qua đời 16 năm, ba nhà khoa học độc lập (Hugo de Vries, Carl Correns và Erich von Tschermak) mới "tái phát hiện" các định luật của ông, và Mendel cuối cùng được công nhận là "Cha đẻ của Di truyền học". Công trình của ông đã cung cấp cơ sở toán học cho thuyết tiến hóa của Darwin và là tiền đề cho cuộc cách mạng di truyền học phân tử sau này.`,
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
      content: `Thuyết Vi trùng Gây bệnh (Germ Theory of Disease) là một trong những tiến bộ y học quan trọng nhất trong lịch sử, thiết lập rằng nhiều bệnh tật được gây ra bởi các vi sinh vật - những sinh vật quá nhỏ để nhìn thấy bằng mắt thường. Lý thuyết này được phát triển chủ yếu bởi hai nhà khoa học vĩ đại: Louis Pasteur (1822-1895) của Pháp và Robert Koch (1843-1910) của Đức.

Louis Pasteur ban đầu nghiên cứu về lên men và phân hủy, chứng minh rằng các quá trình này do vi sinh vật gây ra, không phải do "sinh tự phát". Các thí nghiệm nổi tiếng của ông với bình cổ thiên nga đã bác bỏ thuyết sinh tự phát một cách thuyết phục. Ông sau đó áp dụng kiến thức này vào y học, chứng minh rằng vi khuẩn cũng gây bệnh. Pasteur đã phát triển phương pháp tiệt trùng (pasteurization) để tiêu diệt vi khuẩn trong sữa và rượu vang, và tạo ra các vaccine chống bệnh dại, bệnh than và tả gà.

Robert Koch đi xa hơn bằng cách phát triển các phương pháp nghiêm ngặt để chứng minh vi khuẩn cụ thể gây ra bệnh cụ thể. Ông đã thiết lập "Định đề Koch" (Koch's Postulates) - bốn tiêu chí để xác định mối quan hệ nhân quả giữa vi sinh vật và bệnh tật. Sử dụng các định đề này, Koch đã xác định được vi khuẩn gây bệnh lao (Mycobacterium tuberculosis, 1882), tả (Vibrio cholerae, 1883) và bệnh than (Bacillus anthracis, 1876). Ông cũng phát triển các kỹ thuật nuôi cấy vi khuẩn và nhuộm màu vi khuẩn vẫn được sử dụng cho đến ngày nay.

Thuyết vi trùng gây bệnh đã cách mạng hóa y học và y tế công cộng. Nó dẫn đến việc phát triển các biện pháp vệ sinh, khử trùng trong phẫu thuật (Joseph Lister), xử lý nước, quản lý chất thải, và cuối cùng là kháng sinh. Trước đó, bệnh viện thường là nơi nguy hiểm với tỷ lệ tử vong cao do nhiễm trùng. Sau khi thuyết vi trùng được chấp nhận, tỷ lệ tử vong trong phẫu thuật giảm đáng kể. Cả Pasteur và Koch đều được trao giải Nobel (Koch năm 1905), và cả hai đều có viện nghiên cứu danh tiếng mang tên mình cho đến ngày nay.`,
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
      content: `Quang hợp là một trong những quá trình sinh học quan trọng nhất trên Trái Đất - nó chuyển đổi năng lượng ánh sáng mặt trời thành năng lượng hóa học dưới dạng glucose, đồng thời tạo ra oxygen mà tất cả động vật cần để thở. Hiểu biết về quang hợp đã được tích lũy qua nhiều thế kỷ bởi hàng loạt nhà khoa học.

Jan Baptista van Helmont (1648) là người đầu tiên thách thức quan niệm rằng cây lấy khối lượng từ đất. Joseph Priestley (1772) phát hiện ra rằng cây "phục hồi" không khí bị "làm hỏng" bởi nến cháy hoặc chuột thở. Jan Ingen-Housz (1779) chứng minh rằng quá trình này chỉ xảy ra khi có ánh sáng mặt trời và chỉ ở các phần xanh của cây. Julius von Sachs (1862) chứng minh rằng quang hợp tạo ra glucose. Melvin Calvin và cộng sự (1950s) đã làm rõ chu trình Calvin - chuỗi phản ứng cố định CO₂ thành đường, công trình mà ông được trao giải Nobel Hóa học 1961.

Phương trình tổng quát của quang hợp là: 6CO₂ + 6H₂O + ánh sáng → C₆H₁₂O₆ + 6O₂. Quá trình này diễn ra trong lục lạp của tế bào thực vật, gồm hai giai đoạn chính: Phản ứng sáng (ở tilakoit) chuyển năng lượng ánh sáng thành ATP và NADPH, đồng thời giải phóng O₂ từ phân tử nước; và Chu trình Calvin (ở stroma) sử dụng ATP và NADPH để cố định CO₂ thành glucose.

Quang hợp là nền tảng của hầu hết mọi chuỗi thức ăn trên Trái Đất, cung cấp thức ăn cho sinh vật dị dưỡng. Nó cũng đã tạo ra bầu khí quyển giàu oxygen của chúng ta - một sự kiện cách mạng xảy ra khoảng 2.4 tỷ năm trước (Sự kiện Oxy hóa Lớn). Ngày nay, các nhà khoa học đang nghiên cứu quang hợp nhân tạo như một giải pháp tiềm năng cho khủng hoảng năng lượng và biến đổi khí hậu.`,
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
      content: `Năm 1921, tại Đại học Toronto, Canada, bác sĩ trẻ Frederick Banting và sinh viên y khoa Charles Best đã thực hiện một trong những khám phá y học cứu sống nhiều người nhất trong lịch sử: chiết xuất hormone insulin từ tụy và sử dụng nó để điều trị bệnh tiểu đường type 1. Trước đó, bệnh tiểu đường type 1 là một bản án tử hình, với bệnh nhân thường chết trong vòng vài tháng đến vài năm sau khi chẩn đoán.

Banting đã có ý tưởng rằng nếu buộc các ống tụy của chó, tuyến tụy sẽ teo lại nhưng các "đảo tụy" (islets of Langerhans) - nơi sản xuất insulin - vẫn còn nguyên vẹn và có thể chiết xuất được chất chống tiểu đường. Làm việc trong phòng thí nghiệm được cho mượn vào mùa hè năm 1921, Banting và Best đã chiết xuất được chất mà họ gọi là "isletin" (sau này đổi tên thành insulin).

Vào ngày 11 tháng 1 năm 1922, họ đã tiêm insulin lần đầu tiên cho Leonard Thompson, một cậu bé 14 tuổi đang hấp hối vì tiểu đường. Kết quả thật kỳ diệu: đường huyết của cậu giảm xuống mức bình thường và cậu đã phục hồi. Cậu sống thêm 13 năm nữa nhờ insulin. Tin tức lan truyền nhanh chóng, và đến năm 1923, insulin đã có sẵn để điều trị cho hàng ngàn bệnh nhân.

Frederick Banting và John Macleod (giáo sư cung cấp phòng thí nghiệm) được trao giải Nobel Y học năm 1923 - một trong những giải Nobel được trao nhanh nhất trong lịch sử. Banting đã chia giải thưởng của mình với Best, và Macleod chia với James Collip (nhà hóa sinh giúp tinh chế insulin). Phát hiện insulin không chỉ cứu sống hàng trăm triệu người mà còn mở đường cho kỷ nguyên liệu pháp hormone thay thế. Ngày nay, các dạng insulin tái tổ hợp được sản xuất bằng công nghệ DNA, giúp hàng triệu người tiểu đường trên toàn thế giới có thể sống cuộc sống bình thường.`,
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
      content: `Năm 1958, Francis Crick - người đồng phát hiện cấu trúc DNA - đã phát biểu "Định đề Trung tâm của Sinh học Phân tử" (Central Dogma of Molecular Biology), mô tả luồng thông tin di truyền trong tế bào: DNA → RNA → Protein. Đây là một trong những nguyên lý nền tảng nhất của sinh học hiện đại, giải thích cách thông tin di truyền được lưu trữ, sao chép và biểu hiện.

Định đề trung tâm mô tả hai quá trình chính: (1) Phiên mã (Transcription) - thông tin từ DNA được sao chép thành RNA, đặc biệt là mRNA (messenger RNA). Quá trình này diễn ra trong nhân tế bào, với enzyme RNA polymerase đọc chuỗi DNA và tổng hợp chuỗi RNA bổ sung. (2) Dịch mã (Translation) - mRNA di chuyển ra ribosome trong tế bào chất, nơi thông tin được "dịch" thành chuỗi amino acid để tạo thành protein. Mỗi bộ ba base trên mRNA (codon) mã hóa cho một amino acid cụ thể.

Crick ban đầu phát biểu rằng thông tin chỉ đi một chiều: một khi thông tin đã chuyển sang protein, nó không thể quay ngược lại RNA hoặc DNA. Tuy nhiên, sau này người ta phát hiện một số ngoại lệ quan trọng: Sao chép ngược (Reverse Transcription) - một số virus như HIV sử dụng enzyme reverse transcriptase để tạo DNA từ RNA, một khám phá đã mang về giải Nobel Y học 1975 cho Howard Temin và David Baltimore.

Định đề trung tâm thống nhất hiểu biết của chúng ta về di truyền và sinh học phân tử, giải thích cách gen (DNA) kiểm soát đặc điểm của sinh vật thông qua protein. Nó là nền tảng cho vô số công nghệ sinh học hiện đại, từ kỹ thuật gen đến phát triển thuốc, và giúp chúng ta hiểu rõ hơn về bệnh tật, tiến hóa và bản chất của sự sống.`,
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
      content: `Vào một đêm tháng 4 năm 1983, khi đang lái xe qua núi vào buổi tối ở California, nhà hóa sinh Kary Mullis (1944-2019) đã có một ý tưởng đơn giản nhưng thiên tài: một phương pháp để nhân bản DNA với số lượng lớn trong ống nghiệm. Phát minh này, được gọi là PCR (Polymerase Chain Reaction - Phản ứng Chuỗi Polymerase), đã cách mạng hóa hoàn toàn sinh học phân tử và mang về cho ông giải Nobel Hóa học năm 1993.

PCR là một kỹ thuật cho phép sao chép một đoạn DNA cụ thể hàng triệu hoặc thậm chí hàng tỷ lần chỉ trong vài giờ. Quy trình gồm ba bước lặp đi lặp lại: (1) Biến tính (Denaturation) - đun nóng DNA đến 94-96°C để tách hai sợi DNA; (2) Gắn mồi (Annealing) - hạ nhiệt độ xuống 50-65°C để các "mồi" (primer) - những đoạn DNA ngắn được thiết kế đặc biệt - gắn vào vị trí mục tiêu trên DNA; (3) Kéo dài (Extension) - tăng nhiệt độ lên 72°C để enzyme DNA polymerase (thường là Taq polymerase từ vi khuẩn sống ở suối nước nóng) tổng hợp DNA mới. Sau mỗi chu kỳ, lượng DNA tăng gấp đôi, nên sau 30-40 chu kỳ, ta có hàng tỷ bản sao.

Trước PCR, việc phân tích DNA đòi hỏi một lượng mẫu lớn và mất nhiều ngày hoặc tuần. PCR đã thay đổi hoàn toàn điều này, cho phép khuyếch đại DNA từ một lượng mẫu cực kỳ nhỏ - thậm chí chỉ từ một tế bào duy nhất hoặc một sợi tóc. Điều này đã mở ra vô số ứng dụng: xét nghiệm pháp y từ hiện trường tội phạm, chẩn đoán bệnh truyền nhiễm (bao gồm COVID-19), xét nghiệm di truyền, nghiên cứu tiến hóa từ DNA cổ đại, xác định quan hệ huyết thống, và phát triển thuốc.

Mullis là một nhân vật khá độc đáo - ngoài việc là nhà khoa học xuất sắc, ông còn nổi tiếng với những quan điểm gây tranh cãi và lối sống phóng khoáng. Khi nhận giải Nobel, ông đã nói: "Làm sao mà nghĩ ra PCR? Tôi không biết. Tôi chỉ thích lái xe vào ban đêm và suy nghĩ." PCR hiện là một trong những kỹ thuật được sử dụng nhiều nhất trong sinh học phân tử, có mặt trong hầu hết các phòng thí nghiệm sinh học trên toàn thế giới.`,
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
      content: `Vào ngày 14 tháng 4 năm 2003, đúng 50 năm sau khi Watson và Crick công bố cấu trúc DNA, Dự án Bộ gen Người (Human Genome Project - HGP) đã tuyên bố hoàn thành việc giải trình tự toàn bộ bộ gen người. Đây là một trong những thành tựu khoa học vĩ đại nhất thế kỷ 21, được so sánh với việc con người đổ bộ Mặt Trăng về mặt tầm quan trọng và độ phức tạp.

HGP được khởi động chính thức năm 1990, là một dự án hợp tác quốc tế khổng lồ do Hoa Kỳ dẫn đầu với sự tham gia của 20 quốc gia. Mục tiêu là xác định trình tự của khoảng 3 tỷ cặp base (A, T, G, C) tạo nên DNA người, và xác định vị trí cũng như chức năng của khoảng 20,000-25,000 gen. Ban đầu ước tính tốn 15 năm và 3 tỷ đô la, nhưng nhờ tiến bộ công nghệ đột phá (đặc biệt là tự động hóa giải trình tự DNA), dự án hoàn thành sớm hơn và rẻ hơn dự kiến.

Một phần thú vị của câu chuyện là cuộc đua giữa HGP công khai và công ty tư nhân Celera Genomics do Craig Venter lãnh đạo. Venter sử dụng phương pháp "shotgun sequencing" nhanh hơn nhưng gây tranh cãi. Năm 2000, cả hai bên đã cùng công bố bản nháp đầu tiên trong một sự kiện có sự tham gia của Tổng thống Bill Clinton và Thủ tướng Anh Tony Blair, nhấn mạnh tầm quan trọng toàn cầu của dự án.

HGP đã mang lại vô số lợi ích: Chúng ta phát hiện ra rằng con người chỉ có khoảng 20,000 gen - ít hơn nhiều so với dự đoán ban đầu 100,000 gen, và chỉ khoảng 2% DNA mã hóa protein. HGP đã tạo nền tảng cho y học chính xác và y học cá nhân hóa, giúp hiểu rõ hơn về ung thư và bệnh di truyền, phát triển thuốc mới, và nghiên cứu tiến hóa con người. Chi phí giải trình tự bộ gen đã giảm từ 3 tỷ đô la xuống còn dưới 1000 đô la ngày nay, khiến nó trở nên phổ biến trong nghiên cứu và lâm sàng.`,
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
      content: `Năm 2018, giải Nobel Y học được trao cho James P. Allison (Hoa Kỳ) và Tasuku Honjo (Nhật Bản) vì công trình tiên phong về liệu pháp miễn dịch ung thư - một cách tiếp cận cách mạng trong điều trị ung thư bằng cách "mở khóa" hệ miễn dịch của chính bệnh nhân để tấn công các tế bào ung thư. Khác với hóa trị hoặc xạ trị trực tiếp tiêu diệt tế bào ung thư, liệu pháp này khai thác sức mạnh của hệ miễn dịch.

Hệ miễn dịch có các "điểm kiểm soát" (immune checkpoints) - những protein hoạt động như phanh để ngăn hệ miễn dịch tấn công các tế bào bình thường. Allison đã nghiên cứu protein CTLA-4, còn Honjo nghiên cứu protein PD-1 - cả hai đều là điểm kiểm soát quan trọng. Họ phát hiện rằng tế bào ung thư thông minh khai thác các "phanh" này để trốn tránh hệ miễn dịch. Bằng cách sử dụng kháng thể để ức chế (block) các protein này, họ đã "nhấc chân khỏi phanh" và cho phép tế bào T của hệ miễn dịch tấn công ung thư.

Allison đã phát triển ipilimumab (Yervoy), kháng thể chống CTLA-4, được FDA phê duyệt năm 2011 để điều trị ung thư hắc tố. Honjo góp phần phát triển nivolumab (Opdivo) và pembrolizumab (Keytruda), các kháng thể chống PD-1. Pembrolizumab đặc biệt nổi tiếng vì cứu sống cựu Tổng thống Hoa Kỳ Jimmy Carter khỏi ung thư hắc tố di căn não năm 2015 - một trường hợp trước đây được coi là không thể chữa khỏi.

Liệu pháp ức chế điểm kiểm soát miễn dịch đã mang lại kết quả đáng kinh ngạc cho một số bệnh nhân, với khả năng thuyên giảm lâu dài hoặc thậm chí chữa khỏi ở các loại ung thư trước đây không thể điều trị như ung thư phổi di căn, ung thư thận, ung thư bàng quang. Tuy nhiên, nó không hiệu quả với tất cả bệnh nhân và có thể gây ra tác dụng phụ nghiêm trọng khi hệ miễn dịch tấn công các cơ quan khỏe mạnh. Nghiên cứu hiện đang tập trung vào việc hiểu tại sao một số bệnh nhân đáp ứng tốt và một số không, và cách kết hợp với các liệu pháp khác để nâng cao hiệu quả.`,
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
      content: `Nền văn minh Lưỡng Hà (Mesopotamia, nghĩa là "vùng đất giữa hai dòng sông") nảy sinh khoảng 3500 TCN tại vùng đồng bằng màu mỡ giữa sông Tigris và Euphrates (nay thuộc Iraq và Syria). Đây được coi là "cái nôi của nền văn minh" - nơi con người lần đầu tiên chuyển từ xã hội săn bắn hái lượm sang sống định cư, phát triển nông nghiệp, xây dựng thành phố và tạo ra hệ thống chính trị phức tạp.

Lưỡng Hà là nơi ra đời của nhiều phát minh quan trọng nhất trong lịch sử nhân loại: Chữ viết hình nêm (cuneiform) - hệ thống chữ viết đầu tiên của thế giới, được khắc trên các tấm đất sét; Bánh xe - cách mạng hóa giao thông và thương mại; Hệ thống thủy lợi phức tạp để tưới tiêu; Toán học cơ số 60 (chúng ta vẫn dùng cho đồng hồ và góc); Thiên văn học và lịch; Luật Hammurabi - bộ luật viết đầu tiên với nguyên tắc "mắt đền mắt, răng đền răng".

Trong suốt hơn 3000 năm, Lưỡng Hà là quê hương của nhiều đế chế hùng mạnh: Sumer, Akkad, Babylon, Assyria. Thành phố Babylon dưới thời Nebuchadnezzar II có Vườn treo Babylon - một trong Bảy kỳ quan thế giới cổ đại. Tháp Babel trong Kinh thánh có thể là ám chỉ các ziggurat (tháp bậc thang) của người Lưỡng Hà.

Di sản của Lưỡng Hà ảnh hưởng sâu rộng đến nền văn minh nhân loại: hệ thống luật pháp, kiến trúc đô thị, tổ chức nhà nước, tôn giáo (nhiều câu chuyện trong Kinh thánh có nguồn gốc từ thần thoại Lưỡng Hà, như câu chuyện đại hồng thủy), và khoa học. Không ngoa khi nói rằng mọi nền văn minh sau này đều mang trong mình dấu ấn của Lưỡng Hà.`,
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
      content: `Vạn Lý Trường Thành là công trình kiến trúc phòng thủ vĩ đại nhất từng được xây dựng. Tần Thủy Hoàng (259-210 TCN), hoàng đế đầu tiên thống nhất Trung Quốc, đã ra lệnh nối các đoạn tường rời rạc của các nước chư hầu thành một hệ thống phòng thủ liên tục dài hàng nghìn km vào khoảng 221 TCN để bảo vệ biên giới phía bắc khỏi người Hung Nô.

Việc xây dựng đòi hỏi hàng triệu người lao động trong nhiều thế kỷ. Các triều đại sau, đặc biệt là nhà Minh (1368-1644), đã tiếp tục xây dựng và củng cố. Tổng chiều dài hơn 21,000 km nếu tính tất cả các nhánh, bao gồm tường thành, pháo đài canh gác, trạm biên và hệ thống báo hiệu. Hàng trăm nghìn người chết trong quá trình xây dựng.

Năm 1987, UNESCO công nhận là Di sản Thế giới. Vạn Lý Trường Thành là biểu tượng của Trung Quốc, thể hiện sức mạnh, sự kiên trì và trí tuệ của dân tộc Trung Hoa.`,
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
      content: `Đế chế La Mã (27 TCN - 476 CN phương Tây, 1453 CN phương Đông) là một trong những đế chế hùng mạnh và ảnh hưởng nhất trong lịch sử. Bắt đầu từ thành Rome nhỏ bé, La Mã đã mở rộng để thống trị toàn bộ vùng Địa Trung Hải, châu Âu, Bắc Phi và một phần Trung Đông, với dân số đỉnh cao khoảng 70 triệu người.

Đế chế La Mã được thành lập năm 27 TCN khi Augustus trở thành hoàng đế đầu tiên, kết thúc Cộng hòa La Mã. Thời kỳ "Pax Romana" (Hòa bình La Mã) dưới Augustus và các hoàng đế đầu tiên đã mang lại 200 năm ổn định và thịnh vượng. La Mã xây dựng hệ thống đường bộ rộng khắp, hệ thống cấp nước, đấu trường Colosseum, và các công trình kiến trúc vĩ đại khác.

Di sản của La Mã ảnh hưởng sâu rộng đến văn minh phương Tây: Luật La Mã là nền tảng của hệ thống pháp luật hiện đại; Tiếng Latin là gốc của các ngôn ngữ Latinh (Pháp, Tây Ban Nha, Ý, Bồ Đào Nha); Kiến trúc La Mã với vòm và mái vòm; Cơ đốc giáo trở thành tôn giáo chính thức dưới Constantine; Hệ thống chính quyền và quân đội. Khi La Mã sụp đổ năm 476, châu Âu rơi vào thời Trung Cổ, nhưng di sản của La Mã vẫn sống mãi.`,
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
      content: `Từ thế kỷ 8 đến 13, thế giới Hồi giáo trở thành trung tâm tri thức toàn cầu với những tiến bộ vượt bậc trong toán học, thiên văn, y học, hóa học, triết học và nhiều lĩnh vực khác. Nhà Trí tuệ (Bayt al-Hikma) ở Baghdad, được thành lập dưới thời Abbasid, là nơi tập hợp các học giả từ khắp nơi để dịch thuật, bảo tồn và phát triển tri thức cổ đại của Hy Lạp, Ba Tư, Ấn Độ.

Các nhà học giả Hồi giáo đã có những đóng góp to lớn: Al-Khwarizmi sáng lập đại số và thuật toán; Ibn Sina (Avicenna) viết Canon of Medicine - sách giáo khoa y học được dùng ở châu Âu trong 600 năm; Al-Razi phát hiện nhiều bệnh và phương pháp điều trị; Ibn al-Haytham sáng lập quang học hiện đại; Al-Biruni nghiên cứu địa lý và thiên văn. Họ đã bảo tồn tri thức cổ đại khi châu Âu rơi vào thời Trung Cổ, và sau này truyền lại cho châu Âu, góp phần vào Thời Phục Hưng.`,
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
      content: `Phong trào Phục Hưng (Renaissance) bắt đầu từ Italy vào thế kỷ 14, đánh dấu sự chuyển đổi từ thời Trung Cổ sang thời Hiện đại. Đây là thời kỳ "tái sinh" văn hóa, nghệ thuật và khoa học, lấy cảm hứng từ nền văn minh cổ đại Hy Lạp-La Mã. Leonardo da Vinci với Mona Lisa và các phát minh khoa học; Michelangelo với David và trần nhà Sistine Chapel; Raphael, Donatello - nghệ thuật đạt đỉnh cao chưa từng có.

Phục Hưng không chỉ là nghệ thuật mà còn là khoa học và tư tưởng: Galileo và thiên văn học, Copernicus với thuyết nhật tâm, Leonardo với giải phẫu và kỹ thuật, Gutenberg với máy in - cách mạng hóa việc truyền bá tri thức. Chủ nghĩa nhân văn đặt con người vào trung tâm, thay thế thần học. Phục Hưng đã đặt nền móng cho thời Khai sáng, Cách mạng Khoa học và thế giới hiện đại.`,
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
      content: `Cách mạng Mỹ (1775-1783) là cuộc đấu tranh của 13 thuộc địa Anh ở Bắc Mỹ để giành độc lập, dẫn đến thành lập Hợp chủng quốc Hoa Kỳ. Ngày 4 tháng 7 năm 1776, Tuyên ngôn Độc lập được Thomas Jefferson soạn thảo đã tuyên bố: "Chúng tôi cho những chân lý này là hiển nhiên: tất cả mọi người sinh ra đều bình đẳng, Tạo hóa ban cho họ những quyền bất khả xâm phạm, trong đó có quyền sống, tự do và mưu cầu hạnh phúc."

Sau 8 năm chiến tranh dưới sự lãnh đạo của George Washington, Mỹ giành độc lập. Hiến pháp Hoa Kỳ (1787) thiết lập một nền dân chủ đại nghị với sự phân quyền và kiểm soát lẫn nhau (checks and balances), trở thành mô hình cho nhiều quốc gia sau này. Cách mạng Mỹ đã truyền cảm hứng cho Cách mạng Pháp và các phong trào dân chủ trên toàn thế giới.`,
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
      content: `Cách mạng Pháp (1789-1799) là một trong những sự kiện quan trọng nhất lịch sử thế giới, lật đổ chế độ quân chủ tuyệt đối và hệ thống phong kiến kéo dài hàng thế kỷ. Ngày 14/7/1789, dân chúng Paris tấn công pháo đài Bastille, đánh dấu bắt đầu cách mạng. Tuyên ngôn Nhân quyền và Dân quyền (1789) tuyên bố "con người sinh ra tự do và bình đẳng về quyền", với khẩu hiệu "Tự do, Bình đẳng, Bác ái" trở thành biểu tượng.

Cách mạng trải qua nhiều giai đoạn: Quân chủ lập hiến, Cộng hòa, Khủng bố (Robespierre), và cuối cùng Napoleon lên nắm quyền. Mặc dù đẫm máu và hỗn loạn, Cách mạng Pháp đã xóa bỏ đặc quyền quý tộc, thúc đẩy quyền công dân, tách biệt nhà thờ và nhà nước, thiết lập hệ mét, và truyền bá ý tưởng dân chủ và nhân quyền khắp châu Âu thông qua các cuộc chiến tranh Napoleon.`,
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
      content: `Cách mạng Công nghiệp bắt đầu ở Anh vào khoảng 1760-1840, là quá trình chuyển đổi từ nền kinh tế nông nghiệp thủ công sang sản xuất công nghiệp bằng máy móc. James Watt cải tiến máy hơi nước (1769), động lực cho nhà máy và đường sắt. Máy kéo sợi, máy dệt cơ giới cách mạng hóa công nghiệp dệt. Đường sắt và tàu hơi nước kết nối các thành phố và quốc gia.

Cách mạng Công nghiệp thay đổi căn bản xã hội: người dân di cư từ nông thôn vào thành phố, giai cấp công nhân ra đời, năng suất tăng vọt, mức sống cải thiện nhưng cũng có ô nhiễm và bất bình đẳng gia tăng. Cách mạng lan sang châu Âu, Mỹ và sau đó toàn cầu, tạo ra thế giới công nghiệp hiện đại và đặt nền móng cho các cuộc cách mạng công nghệ tiếp theo.`,
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
      content: `Chiến tranh Thế giới thứ II (1939-1945) là cuộc xung đột toàn cầu lớn nhất và đẫm máu nhất trong lịch sử, với hơn 100 triệu quân nhân từ 30 quốc gia tham chiến. Chiến tranh bắt đầu khi Đức quốc xã của Hitler xâm lược Ba Lan (1/9/1939). Hai진영 chính: Đồng minh (Anh, Pháp, Liên Xô, Mỹ, Trung Quốc) và Trục (Đức, Ý, Nhật). Ước tính 70-85 triệu người chết, bao gồm Holocaust với 6 triệu người Do Thái.

Chiến tranh kết thúc năm 1945: châu Âu với sự đầu hàng của Đức (8/5/1945), và châu Á sau khi Mỹ thả bom nguyên tử ở Hiroshima (6/8) và Nagasaki (9/8), Nhật đầu hàng (15/8/1945). Chiến tranh đã định hình trật tự thế giới hiện đại: Liên Hợp Quốc được thành lập, Mỹ và Liên Xô trở thành siêu cường, Chiến tranh Lạnh bắt đầu, quá trình giải phóng dân tộc tại châu Á-Phi diễn ra, và Nhật-Đức được tái thiết thành nền dân chủ thịnh vượng.`,
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
      content: `Năm 1989, Tim Berners-Lee, nhà khoa học máy tính người Anh làm việc tại CERN (Thụy Sĩ), đã phát minh World Wide Web - hệ thống thông tin toàn cầu với các trang web được kết nối bằng siêu liên kết (hyperlinks). Ông đã tạo ra HTTP (giao thức truyền tải), HTML (ngôn ngữ đánh dấu), URL (địa chỉ web), và trình duyệt web đầu tiên. Web được công khai miễn phí năm 1991, một quyết định đã thay đổi thế giới.

Internet và Web đã cách mạng hóa mọi khía cạnh của cuộc sống: giao tiếp (email, mạng xã hội), thương mại (thương mại điện tử), giáo dục (học trực tuyến), giải trí (streaming, game), làm việc (làm việc từ xa), và chính trị (dân chủ kỹ thuật số). Từ vài triệu người dùng những năm 1990, Internet hiện có hơn 5 tỷ người dùng. Nó đã tạo ra các gã khổng lồ công nghệ (Google, Facebook, Amazon), nền kinh tế kỹ thuật số, và mở ra kỷ nguyên Big Data và AI.`,
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
      content: `Eratosthenes of Cyrene (276-194 TCN), nhà toán học và địa lý học Hy Lạp cổ đại, là người đầu tiên tính toán chu vi Trái Đất với độ chính xác đáng kinh ngạc. Vào khoảng năm 240 TCN, ông quan sát thấy rằng vào ngày hạ chí, mặt trời chiếu thẳng đứng vào giếng nước ở Syene (nay là Aswan, Ai Cập), trong khi cùng lúc đó ở Alexandria, cách đó khoảng 800 km về phía bắc, một cột dựng thẳng đứng tạo ra bóng với góc khoảng 7.2 độ.

Eratosthenes suy luận rằng nếu Trái Đất là hình cầu, góc bóng này phản ánh sự khác biệt về vĩ độ giữa hai địa điểm. Ông đo khoảng cách giữa hai thành phố (bằng cách thuê người đi bộ đo), sau đó áp dụng hình học để tính toán chu vi Trái Đất. Kết quả của ông là khoảng 39,375 km - gần với giá trị thực tế ngày nay (40,075 km tại xích đạo) một cách đáng kinh ngạc, với sai số chỉ khoảng 2-15%.

Thành tựu này không chỉ chứng minh Trái Đất có hình cầu (một ý tưởng đã được chấp nhận rộng rãi trong giới học giả Hy Lạp), mà còn cho thấy sức mạnh của phương pháp khoa học: quan sát, đo lường, suy luận toán học. Eratosthenes còn vẽ bản đồ thế giới, phát minh hệ thống kinh vĩ độ, và tính độ nghiêng trục Trái Đất. Công trình của ông đặt nền móng cho địa lý học và trắc địa học hiện đại.`,
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
      content: `Con đường tơ lụa (Silk Road) là mạng lưới các tuyến đường thương mại cổ đại kết nối phương Đông và phương Tây, trải dài từ Trung Quốc qua Trung Á, Trung Đông đến châu Âu và Địa Trung Hải. Được hình thành từ khoảng thế kỷ 2 TCN dưới thời Hán Vũ Đế, con đường này được đặt tên theo mặt hàng quý giá nhất: lụa Trung Quốc. Chiều dài tổng cộng khoảng 6,400 km, đi qua địa hình đa dạng từ sa mạc Gobi, dãy Himalaya, đến thảo nguyên Trung Á.

Con đường tơ lụa không phải một tuyến đường duy nhất mà là mạng lưới phức tạp gồm nhiều nhánh đường bộ và đường biển. Các thương nhân vận chuyển không chỉ lụa mà còn gia vị, đá quý, thuỷ tinh, gốm sứ, ngọc trai, giấy, thuốc súng. Quan trọng hơn, đây là cầu nối văn hóa khổng lồ: Phật giáo từ Ấn Độ lan sang Trung Quốc, Hồi giáo lan rộng, các ý tưởng triết học, nghệ thuật, khoa học được trao đổi.

Con đường tơ lụa đóng vai trò then chốt trong thời kỳ hoàng kim của Hồi giáo (750-1258), kết nối các nền văn minh lớn: Trung Quốc, Ấn Độ, Ba Tư, La Mã. Marco Polo nổi tiếng đã đi theo con đường này vào thế kỷ 13. Con đường tơ lụa suy tàn sau khi các tuyến đường biển được phát triển trong thời đại khám phá địa lý (thế kỷ 15-16), nhưng di sản văn hóa của nó vẫn còn mãi.`,
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
      content: `Chuyến hành trình lịch sử của Christopher Columbus năm 1492 đánh dấu bước ngoặt quan trọng trong lịch sử nhân loại. Được Vua Ferdinand và Nữ hoàng Isabella của Tây Ban Nha tài trợ, Columbus đặt chân lên Bahamas ngày 12/10/1492 (ông nghĩ mình đến Ấn Độ, do đó gọi người bản địa là "Indians"). Mặc dù không phải người châu Âu đầu tiên đến châu Mỹ (người Viking đã đến Newfoundland vào thế kỷ 11), nhưng chuyến đi của Columbus mở ra kỷ nguyên tiếp xúc thường xuyên giữa châu Âu và châu Mỹ.

Hậu quả của sự kiện này là "Columbian Exchange" - một cuộc trao đổi sinh học và văn hóa chưa từng có giữa Tân Thế Giới và Cựu Thế Giới. Từ châu Mỹ, khoai tây, ngô, cà chua, socola, thuốc lá được đưa sang châu Âu, thay đổi chế độ ăn uống và nền kinh tế toàn cầu. Ngược lại, ngựa, bò, lợn, lúa mì, đường, bệnh tật (đậu mùa, sởi) từ châu Âu sang châu Mỹ.

Tuy nhiên, di sản của Columbus cũng gây tranh cãi: việc xâm chiếm dẫn đến sự sụp đổ của các nền văn minh bản địa (Aztec, Inca, Maya), nạn nô lệ, bệnh dịch giết chết hàng triệu người bản địa (ước tính 90% dân số). Sự kiện này thay đổi hoàn toàn bản đồ địa lý và chính trị thế giới, mở đầu cho thời đại thực dân châu Âu và hình thành thế giới toàn cầu hóa ngày nay.`,
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
      content: `Chuyến hành trình vòng quanh thế giới của Ferdinand Magellan (1519-1522) là một trong những kỳ công vĩ đại nhất trong lịch sử khám phá địa lý. Magellan, một nhà hàng hải người Bồ Đào Nha phục vụ cho Tây Ban Nha, xuất phát với 5 con tàu và 270 thủy thủ từ Seville tháng 9/1519, với mục tiêu tìm tuyến đường phía tây đến quần đảo Moluccas (Spice Islands) giàu gia vị.

Chuyến đi đầy gian nan: Magellan phải đối mặt với nổi loạn, thiếu lương thực, thời tiết khắc nghiệt. Ông phát hiện ra eo biển ở nam Mỹ (nay gọi là eo biển Magellan) nối Đại Tây Dương với một đại dương mới mà ông đặt tên là Thái Bình Dương vì nước biển lặng. Tháng 3/1521, ông đến Philippines nhưng bị giết trong một cuộc xung đột với thổ dân địa phương.

Juan Sebastián Elcano, một sĩ quan của Magellan, tiếp tục chỉ huy và đưa con tàu Victoria duy nhất còn lại với 18 thủy thủ trở về Tây Ban Nha tháng 9/1522. Chuyến đi kéo dài gần 3 năm, đi qua 3 đại dương, chứng minh thực tế rằng Trái Đất là hình cầu, tất cả các đại dương đều kết nối với nhau, và thế giới lớn hơn nhiều so với ước tính trước đó. Đây là bước ngoặt trong hiểu biết địa lý, mở ra kỷ nguyên giao thương toàn cầu.`,
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
      content: `Thuyết kiến tạo mảng (Plate Tectonics) là lý thuyết khoa học cách mạng giải thích cấu trúc và sự vận động của lớp vỏ Trái Đất. Nguồn gốc của nó bắt đầu từ Alfred Wegener, nhà khí tượng học người Đức, khi ông đề xuất thuyết trôi dạt lục địa (Continental Drift) năm 1912. Wegener quan sát thấy các bờ biển của châu Phi và Nam Mỹ khớp với nhau như những mảnh ghép, và phát hiện hóa thạch giống nhau ở các lục địa xa nhau. Ông cho rằng tất cả các lục địa từng gắn liền thành siêu lục địa Pangaea khoảng 200-300 triệu năm trước, sau đó tách ra và trôi dạt.

Ban đầu, thuyết của Wegener bị giới khoa học bác bỏ vì ông không giải thích được cơ chế nào khiến lục địa di chuyển. Đến những năm 1950-1960, với khám phá về dải núi giữa đại dương và sự lan truyền của đáy biển, các nhà khoa học phát triển thuyết kiến tạo mảng hoàn chỉnh. Lý thuyết này cho biết lớp vỏ Trái Đất được chia thành khoảng 7-8 mảng kiến tạo lớn và nhiều mảng nhỏ, trôi nổi trên lớp quyển mềm (asthenosphere) chứa magma nóng chảy.

Các mảng này di chuyển với tốc độ vài cm mỗi năm do dòng đối lưu trong lớp manti. Tại ranh giới mảng, ba loại tương tác xảy ra: (1) mảng tách ra (divergent) tạo dải núi giữa đại dương; (2) mảng va chạm (convergent) tạo núi cao, hào sâu, và núi lửa; (3) mảng trượt ngang (transform) gây động đất. Thuyết kiến tạo mảng giải thích hầu hết các hiện tượng địa chất: động đất, núi lửa, sự hình thành núi, phân bố hóa thạch, và vị trí khoáng sản. Đây là nền tảng của địa chất học hiện đại.`,
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
      content: `Việc xác định đỉnh Everest là điểm cao nhất trên Trái Đất là thành tựu của Great Trigonometrical Survey of India, một dự án trắc địa khổng lồ do Anh thực hiện trong thế kỷ 19. Từ năm 1830, các nhà trắc địa bắt đầu đo đạc dãy Himalaya từ khoảng cách xa, sử dụng phương pháp tam giác đo (triangulation) với các máy kinh vĩ chính xác cao.

Năm 1852, nhà toán học người Bengal Radhanath Sikdar, thành viên của nhóm Survey, là người đầu tiên tính toán được rằng đỉnh "Peak XV" (như lúc đó được gọi) cao 29,002 feet (8,840m) - cao hơn bất kỳ đỉnh núi nào đã biết. Con số này được xác nhận và công bố chính thức năm 1856. Năm 1865, Royal Geographical Society đổi tên đỉnh núi thành "Mount Everest" để vinh danh Sir George Everest (1790-1866), Surveyor General of India từ 1830-1843, người đã giám sát dự án đo đạc.

Tuy nhiên, đỉnh núi đã có tên địa phương từ lâu: người Tây Tạng gọi là Chomolungma (Nữ thần của vũ trụ), người Nepal gọi là Sagarmatha (Trán của bầu trời). Chiều cao chính thức hiện nay là 8,848.86m (được Nepal và Trung Quốc công bố chung năm 2020). Đỉnh Everest thu hút hàng nghìn người leo núi mỗi năm, với đỉnh núi được chinh phục lần đầu bởi Edmund Hillary và Tenzing Norgay vào năm 1953.`,
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
      content: `Rừng nhiệt đới Amazon là hệ sinh thái rừng mưa nhiệt đới lớn nhất và đa dạng sinh học nhất trên hành tinh, trải rộng khoảng 5.5 triệu km² (gần bằng diện tích châu Âu) trên 9 quốc gia Nam Mỹ, chủ yếu ở Brazil (60%). Sông Amazon, dòng sông lớn thứ hai thế giới về chiều dài và lớn nhất về lưu lượng nước, chảy qua trung tâm khu rừng với hơn 1,100 nhánh sông.

Rừng Amazon chứa khoảng 10% tổng số loài sinh vật trên Trái Đất: ước tính 390 tỷ cây cá thể thuộc 16,000 loài, 2.5 triệu loài côn trùng, 2,000 loài chim và động vật có vú, 2,200 loài cá, và hàng nghìn loài thực vật có giá trị y học. Mỗi hecta rừng Amazon có thể chứa nhiều loài cây hơn toàn bộ Bắc Mỹ. Rừng được gọi là "lá phổi xanh của Trái Đất" vì sinh ra khoảng 20% oxy trong khí quyển (mặc dù cũng tiêu thụ gần hết lượng oxy đó).

Quan trọng hơn, Amazon đóng vai trò then chốt trong điều hòa khí hậu toàn cầu: hấp thụ hàng tỷ tấn CO2 mỗi năm, tạo mưa cho khu vực và xa hơn thông qua "dòng sông bay" (flying rivers) - hơi nước bay hơi từ lá cây. Khoảng 400-500 bộ tộc thổ dân sống trong rừng, nhiều bộ tộc vẫn chưa tiếp xúc với thế giới bên ngoài. Tuy nhiên, nạn phá rừng đang đe dọa Amazon: kể từ 1970 đã mất 17% diện tích rừng, chủ yếu do chăn nuôi, khai thác gỗ, và khai khoáng.`,
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
      content: `Global Positioning System (GPS) là hệ thống định vị vệ tinh toàn cầu do Bộ Quốc phòng Hoa Kỳ phát triển, được coi là một trong những cách mạng công nghệ lớn nhất thế kỷ 20. Dự án bắt đầu những năm 1970 cho mục đích quân sự, với vệ tinh đầu tiên phóng lên năm 1978. Hệ thống hoạt động dựa trên 24 vệ tinh (cùng với vài vệ tinh dự phòng) quay quanh Trái Đất ở độ cao 20,200 km, mỗi vệ tinh quay hết một vòng trong 12 giờ.

Nguyên lý hoạt động: thiết bị GPS nhận tín hiệu từ ít nhất 4 vệ tinh, tính toán khoảng cách đến mỗi vệ tinh dựa trên thời gian tín hiệu truyền đi (tín hiệu radio đi với tốc độ ánh sáng), sau đó xác định vị trí chính xác bằng phương pháp tam giác. Ban đầu GPS chỉ dành cho quân đội với độ chính xác cao, trong khi dân dụng bị giảm độ chính xác cố ý. Năm 1995, hệ thống đạt "Initial Operational Capability" với đủ 24 vệ tinh, và năm 2000, Tổng thống Clinton bỏ việc làm giảm độ chính xác, cho phép dân dụng sử dụng GPS với độ chính xác 5-10m.

GPS đã cách mạng hóa vô số lĩnh vực: hàng hải và hàng không (thay thế la bàn và bản đồ giấy), giao thông vận tải (xe hơi, Uber, Google Maps), nông nghiệp chính xác, đo đạc địa chất, nghiên cứu động vật hoang dã, cứu hộ khẩn cấp, và thậm chí đồng bộ thời gian cho mạng viễn thông và tài chính. Hiện có hàng tỷ thiết bị GPS trên thế giới. Các quốc gia khác cũng phát triển hệ thống riêng: GLONASS (Nga), Galileo (EU), BeiDou (Trung Quốc).`,
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
      content: `Biến đổi khí hậu toàn cầu là sự thay đổi lâu dài trong nhiệt độ và kiểu thời tiết trên Trái Đất, chủ yếu do hoạt động của con người kể từ cuối thế kỷ 19. Năm 1988, Intergovernmental Panel on Climate Change (IPCC) được thành lập bởi Liên Hợp Quốc để đánh giá bằng chứng khoa học về biến đổi khí hậu. Hàng nghìn nhà khoa học từ khắp thế giới đóng góp vào các báo cáo định kỳ của IPCC, tạo thành sự đồng thuận khoa học mạnh mẽ nhất trong lịch sử về một vấn đề môi trường.

Nguyên nhân chính là tăng nồng độ khí nhà kính (CO2, CH4, N2O) trong khí quyển do đốt nhiên liệu hóa thạch (than, dầu, khí đốt), phá rừng, và hoạt động nông nghiệp. CO2 tăng từ 280 ppm trước Cách mạng Công nghiệp lên trên 420 ppm hiện nay - mức cao nhất trong 800,000 năm. Nhiệt độ trung bình toàn cầu đã tăng khoảng 1.1°C kể từ thời tiền công nghiệp, và đang tăng tốc.

Hậu quả quan sát được: băng ở hai cực và sông băng tan nhanh, mực nước biển dâng (20cm trong thế kỷ 20), các đợt nóng cực đoan, hạn hán, lũ lụt, bão nhiệt đới mạnh hơn, đại dương axit hóa, các loài sinh vật tuyệt chủng gia tăng. Nếu nhiệt độ tăng vượt 2°C (so với thời tiền công nghiệp), các nhà khoa học cảnh báo về những điểm bùng phát (tipping points) không thể đảo ngược: tan băng vĩnh cửu phát thải methane, rừng Amazon chuyển thành thảo nguyên, dòng hải lưu Đại Tây Dương sụp đổ.

Biến đổi khí hậu là thách thức lớn nhất thế kỷ 21, đe dọa an ninh lương thực, nguồn nước, sức khỏe, và gây di cư khí hậu hàng loạt. Hiệp định Paris 2015 cam kết giữ mức tăng nhiệt độ dưới 2°C, lý tưởng là 1.5°C, thông qua giảm phát thải và chuyển đổi năng lượng tái tạo.`,
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
      content: `Google Earth là ứng dụng bản đồ 3D toàn cầu được Google phát hành năm 2005, đánh dấu một cuộc cách mạng trong cách con người tiếp cận thông tin địa lý. Dự án bắt nguồn từ công ty Keyhole, Inc., được CIA tài trợ và phát triển phần mềm EarthViewer 3D. Google mua lại Keyhole năm 2004 và đổi tên thành Google Earth, phát hành miễn phí cho công chúng vào tháng 6/2005.

Google Earth kết hợp ảnh vệ tinh, ảnh hàng không, dữ liệu GIS, và mô hình 3D để tạo ra bản đồ tương tác của Trái Đất. Người dùng có thể phóng to/thu nhỏ, xoay, nghiêng để xem địa hình 3D, đo khoảng cách, xem ảnh lịch sử, và thậm chí bay qua các thành phố với mô hình 3D chi tiết. Phiên bản Google Earth Pro (miễn phí từ 2015) cung cấp hình ảnh độ phân giải cao hơn và công cụ đo đạc chuyên nghiệp.

Ứng dụng này đã dân chủ hóa việc tiếp cận thông tin địa lý, trước đây chỉ có cho quân đội, chính phủ, và công ty lớn. Nó được sử dụng rộng rãi trong giáo dục (học sinh khám phá thế giới từ lớp học), nghiên cứu (theo dõi phá rừng, biến đổi khí hậu), nhân đạo (ứng phó thảm họa), bất động sản, du lịch, và cả điều tra báo chí. Google Earth còn có chế độ xem Sao (Sky), Sao Hỏa, và Mặt Trăng.

Năm 2017, Google Earth được viết lại hoàn toàn với công nghệ web, cho phép chạy trực tiếp trên trình duyệt không cần cài đặt. Tính năng "Voyager" đưa người dùng vào các chuyến tham quan được hướng dẫn về địa lý, lịch sử, và khoa học. Google Earth Engine cung cấp cho các nhà khoa học truy cập vào petabyte dữ liệu ảnh vệ tinh và công cụ phân tích mạnh mẽ để nghiên cứu Trái Đất ở quy mô toàn cầu.`,
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
      content: `Socrates (469-399 TCN) được coi là cha đẻ của triết học phương Tây. Ông không để lại tác phẩm viết nào, mà dạy học bằng cách đối thoại trên đường phố Athens. Phương pháp vấn đáp của Socrates (Socratic method) sử dụng câu hỏi để vạch trần mâu thuẫn và dẫn người đối thoại đến chân lý. Ông khẳng định "Tôi chỉ biết rằng tôi không biết gì" - thừa nhận sự vô minh là bước đầu tiên hướng tới trí tuệ.

Socrates dạy rằng "Một cuộc đời không được xem xét kỹ là không đáng sống", nhấn mạnh tầm quan trọng của tự phản tỉnh và sống có ý thức. Ông bị kết án tử hình năm 399 TCN vì tội "làm hư hỏng thanh niên" và "không tôn thờ các vị thần thành phố". Thay vì trốn thoát, ông uống thuốc độc hemlock, trở thành biểu tượng của triết gia kiên trì với nguyên tắc đến chết. Học trò của ông, Plato, đã ghi lại cuộc đời và triết học của thầy.`,
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
      content: `Plato (428-348 TCN), học trò của Socrates, đề xuất Thuyết Lý tưởng (Theory of Forms): thế giới được chia làm hai - thế giới vật chất (hiện tượng) mà chúng ta cảm nhận chỉ là bóng tối của thế giới ý niệm (Forms) hoàn hảo và bất biến. Ví dụ, mọi chiếc ghế vật chất chỉ là bản sao không hoàn hảo của "Ý niệm Ghế" vĩnh cửu.

Ngụ ngôn Hang động nổi tiếng minh họa điều này: những tù nhân bị xích trong hang, nhìn thấy chỉ là bóng của các vật thể được chiếu lên tường, tưởng đó là thực tại. Khi được giải thoát và nhìn thấy ánh sáng mặt trời (chân lý), họ mới nhận ra mình sống trong vô minh. Plato thành lập Học viện (Academy) ở Athens - trường đại học đầu tiên của phương Tây, và viết nhiều tác phẩm triết học dưới dạng đối thoại, trong đó "The Republic" là nổi tiếng nhất.`,
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
      content: `Aristotle (384-322 TCN), học trò của Plato, được coi là nhà bách khoa toàn thư với đóng góp cho mọi lĩnh vực từ triết học, khoa học đến chính trị. Ông phát triển logic hình thức đầu tiên với tam đoạn luận (syllogism): Mọi người đều phải chết (tiền đề lớn), Socrates là người (tiền đề nhỏ), vậy Socrates phải chết (kết luận). Logic của ông thống trị trong 2000 năm.

Aristotle bác bỏ thế giới lý tưởng của Plato, cho rằng hình thức tồn tại trong chính các vật thể vật chất. Ông đề xuất 4 nguyên nhân: chất liệu (vật liệu), hình thức (cấu trúc), tác động (người tạo ra), và mục đích (telos - mục đích cuối cùng). Ông thành lập trường Lyceum, là gia sư của Alexander Đại đế, và ảnh hưởng sâu rộng đến triết học Trung Cổ thông qua Thomas Aquinas.`,
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
      content: `René Descartes (1596-1650) được coi là cha đẻ của triết học hiện đại với câu nói nổi tiếng "Cogito ergo sum" (Tôi tư duy, vậy tôi tồn tại). Ông sử dụng phương pháp nghi ngờ có hệ thống, nghi ngờ mọi thứ có thể nghi ngờ để tìm ra nền tảng vững chắc cho tri thức. Ông nhận ra rằng ngay cả khi nghi ngờ mọi thứ, việc tự mình đang nghi ngờ chứng tỏ mình đang tư duy, và do đó mình tồn tại.

Descartes đề xuất thuyết phân đôi tâm-thân (mind-body dualism): tâm trí (res cogitans - vật tư duy) và thân thể (res extensa - vật có kích thước) là hai thực thể riêng biệt. Ông cho rằng lý trí, không phải kinh nghiệm, là nguồn gốc của tri thức đích thực. Descartes cũng là nhà toán học vĩ đại, phát minh hệ tọa độ Descartes (Cartesian coordinates) - nền tảng của hình học giải tích.`,
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
      content: `Immanuel Kant (1724-1804) đã tổng hợp chủ nghĩa duy lý (rationalism) và kinh nghiệm luận (empiricism) trong "Critique of Pure Reason" (1781), tạo ra "Cách mạng Copernicus trong triết học". Ông cho rằng tri thức không đơn thuần đến từ kinh nghiệm hay lý trí, mà là sự tổng hợp của cả hai: tâm trí có các cấu trúc tiên nghiệm (a priori) như không gian, thời gian, nhân quả, và chúng hình thành cách chúng ta trải nghiệm thế giới.

Kant phân biệt "hiện tượng" (phenomena - thế giới như chúng ta trải nghiệm) và "vật tự thân" (noumena - thế giới như nó thực sự tồn tại, không thể nhận thức được). Trong đạo đức học, ông đề xuất "mệnh lệnh tuyệt đối" (categorical imperative): chỉ hành động theo nguyên tắc mà bạn muốn trở thành luật phổ biến. Câu nói nổi tiếng của ông: "Hai điều khiến tôi kinh ngạc càng ngày càng tăng: bầu trời đầy sao trên đầu và luật đạo đức trong lòng".`,
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
      content: `Georg Wilhelm Friedrich Hegel (1770-1831) phát triển phép biện chứng (dialectic): mỗi ý tưởng (luận đề/thesis) tất yếu tạo ra mâu thuẫn của nó (phản đề/antithesis), và hai thứ này được tổng hợp thành một ý tưởng cao hơn (hợp đề/synthesis), sau đó lại trở thành luận đề mới. Quá trình này lặp đi lặp lại, thúc đẩy sự phát triển của tư tưởng và lịch sử.

Hegel cho rằng lịch sử là quá trình Tinh thần Tuyệt đối (Absolute Spirit) tự nhận thức thông qua văn hóa, nghệ thuật, tôn giáo và triết học. Mỗi thời đại lịch sử là một bước trong hành trình này. Triết học của Hegel vô cùng phức tạp và có ảnh hưởng sâu rộng đến các tư tưởng sau này, đặc biệt là Marx (duy vật biện chứng) và các trường phái hiện sinh.`,
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
      content: `Karl Marx (1818-1883) "đảo ngược" Hegel, tạo ra duy vật biện chứng (dialectical materialism): không phải ý thức quyết định đời sống, mà điều kiện vật chất của đời sống xã hội quyết định ý thức xã hội. Lịch sử là lịch sử đấu tranh giai cấp giữa những người sở hữu tư liệu sản xuất và những người lao động. "Tuyên ngôn Cộng sản" (1848) khởi đầu: "Một bóng ma đang lang thang khắp châu Âu - bóng ma của chủ nghĩa cộng sản".

Marx phân tích tư bản chủ nghĩa trong "Das Kapital", chỉ ra giá trị thặng dư, bóc lột giai cấp công nhân, và các mâu thuẫn nội tại sẽ dẫn đến sự sụp đổ của nó. Ông dự đoán cách mạng vô sản sẽ lật đổ tư sản, thiết lập chế độ xã hội chủ nghĩa và cuối cùng là cộng sản - xã hội không giai cấp. Tư tưởng của Marx đã ảnh hưởng sâu rộng đến thế kỷ 20, thúc đẩy các cuộc cách mạng ở Nga, Trung Quốc và nhiều nước khác.`,
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
      content: `Friedrich Nietzsche (1844-1900) tuyên bố "Thần đã chết" - các giá trị truyền thống của Cơ đốc giáo và đạo đức phương Tây đã sụp đổ sau thời Khai sáng. Điều này tạo ra cuộc khủng hoảng ý nghĩa (nihilism). Nietzsche đề xuất "siêu nhân" (Übermensch) - con người tự tạo ra giá trị của riêng mình, không phụ thuộc vào đạo đức đàn bầy (herd morality) hay tôn giáo. Siêu nhân sống theo "ý chí quyền lực" (will to power) - không phải ý chí thống trị, mà là ý chí tự vượt qua và tự tạo ra.

Nietzsche phê phán đạo đức Cơ đốc giáo là "đạo đức nô lệ", tôn vinh sự yếu đuối thay vì sức mạnh. Ông đề xuất "vĩnh cửu luân hồi" (eternal return) như thử nghiệm tư tưởng: nếu phải sống lại cuộc đời này vô số lần, bạn có muốn không? Tư tưởng của Nietzsche ảnh hưởng sâu rộng đến triết học hiện sinh, hậu hiện đại, và tâm lý học (Freud). Thật đáng tiếc, tư tưởng của ông sau này bị Đức Quốc xã lạm dụng và bóp méo.`,
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
      content: `Jean-Paul Sartre (1905-1980) là nhà triết học chủ chốt của chủ nghĩa hiện sinh (existentialism) thế kỷ 20. Ông khẳng định "tồn tại đi trước bản chất" (existence precedes essence): con người không có bản chất hay mục đích định sẵn, chúng ta sinh ra trước, rồi mới tự tạo ra bản chất của mình thông qua các lựa chọn và hành động. Không có Thần, không có ý nghĩa vũ trụ cho sẵn - chúng ta phải tự tạo ra ý nghĩa của mình.

Sartre nói chúng ta bị "kết án tự do" (condemned to be free): không thể trốn tránh tự do và trách nhiệm cho cuộc đời mình. "Bad faith" (tín ngưỡng sai) là khi chúng ta cố tình lừa dối bản thân, phủ nhận tự do của mình bằng cách giả vờ rằng ta bị quyết định bởi hoàn cảnh, vai trò xã hội, hay quá khứ. Sartre cũng là nhà văn (được trao nhưng từ chối giải Nobel Văn học 1964), nhà hoạt động chính trị cánh tả, và bạn đời của Simone de Beauvoir - nhà nữ quyền nổi tiếng.`,
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
      content: `Triết học hậu hiện đại (postmodernism) phát triển từ những năm 1960-70 với Jean-François Lyotard, Jacques Derrida, Michel Foucault. Ly otard định nghĩa hậu hiện đại là "sự hoài nghi đối với các siêu tường thuật" (metanarratives) - những câu chuyện lớn giải thích toàn bộ thực tại: tôn giáo (ý chí của Thần), khoa học (tiến bộ lý trí), Marx (giải phóng giai cấp). Hậu hiện đại cho rằng không có chân lý tuyệt đối hay khách quan, mà chỉ có vô số chân lý nhỏ, cục bộ, phụ thuộc văn hóa và ngôn ngữ.

Derrida phát triển "giải cấu trúc" (deconstruction), chỉ ra cách ngôn ngữ và văn bản mang nhiều nghĩa, mâu thuẫn nhau. Foucault nghiên cứu cách quyền lực tạo ra tri thức và chân lý qua các thể chế (nhà tù, bệnh viện, trường học). Hậu hiện đại ảnh hưởng sâu rộng đến văn học, nghệ thuật, kiến trúc, và lý thuyết văn hóa, nhưng cũng gây tranh cãi vì bị cho là tương đối hóa chân lý và phá hủy nền tảng của khoa học và đạo đức.`,
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
