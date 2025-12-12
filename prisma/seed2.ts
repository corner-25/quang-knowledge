import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding additional mathematics knowledge...');

  // Get existing categories and countries
  const mathCategory = await prisma.category.findUnique({
    where: { name: 'Toán học' }
  });

  const countries = await prisma.country.findMany();
  const greeceCountry = countries.find(c => c.name === 'Hy Lạp');
  const chinaCountry = countries.find(c => c.name === 'Trung Quốc');
  const usaCountry = countries.find(c => c.name === 'Hoa Kỳ');
  const germanyCountry = countries.find(c => c.name === 'Đức');

  if (!mathCategory) {
    throw new Error('Math category not found. Please run seed.ts first.');
  }

  // 10 New Mathematics Knowledge Entries

  // 1. Lượng giác (Trigonometry)
  const trigonometry = await prisma.knowledgeEntry.create({
    data: {
      title: 'Lượng giác',
      description: 'Toán học về tam giác và hàm lượng giác',
      content: `Lượng giác (Trigonometry, từ tiếng Hy Lạp "trigonon" = tam giác và "metron" = đo lường) là ngành toán học nghiên cứu mối quan hệ giữa góc và cạnh của tam giác. Nguồn gốc của lượng giác có thể truy ngược về thời Babylon và Ai Cập cổ đại (khoảng 2000 TCN), khi người ta cần tính toán góc và khoảng cách trong thiên văn học và xây dựng kim tự tháp.

Hipparchus of Nicaea (190-120 TCN), nhà thiên văn Hy Lạp, được coi là "cha đẻ của lượng giác" khi ông tạo ra bảng dây cung đầu tiên - tiền thân của hàm sin hiện đại. Ông sử dụng lượng giác để tính toán khoảng cách đến Mặt Trăng và Mặt Trời, cũng như dự đoán nhật thực. Ptolemy (khoảng 100-170) sau này đã phát triển và hoàn thiện các bảng lượng giác trong tác phẩm "Almagest".

Các nhà toán học Ấn Độ và Hồi giáo đã phát triển lượng giác thành một ngành toán học độc lập. Aryabhata (476-550) định nghĩa các hàm sin, cosin, và tính toán giá trị sin(30°) chính xác đến 4 chữ số thập phân. Các nhà toán học Ba Tư và Ả Rập như Al-Khwarizmi, Al-Battani phát triển hàm tan, cotan, sec, cosec và các công thức lượng giác quan trọng.

Lượng giác hiện đại với các hàm sin, cos, tan được chuẩn hóa vào thế kỷ 17-18 bởi Leonhard Euler, người đã kết nối lượng giác với số phức qua công thức Euler nổi tiếng: e^(iθ) = cos(θ) + i·sin(θ). Lượng giác là nền tảng cho vật lý (sóng, dao động), kỹ thuật (tín hiệu, mạch điện), đồ họa máy tính, âm nhạc, và GPS.`,
      year: 150,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Hipparchus, Ptolemy, Aryabhata',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: greeceCountry ? {
        create: [{ countryId: greeceCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 2. Logarithm
  const logarithm = await prisma.knowledgeEntry.create({
    data: {
      title: 'Logarit',
      description: 'Phép toán nghịch đảo của lũy thừa',
      content: `Logarit (logarithm) là một trong những phát minh toán học vĩ đại nhất thế kỷ 17, được phát minh độc lập bởi John Napier (Scotland, 1614) và Jost Bürgi (Thụy Sĩ, 1620). Logarit biến phép nhân phức tạp thành phép cộng đơn giản, cách mạng hóa các tính toán thiên văn học, hàng hải, và khoa học thời bấy giờ - khi chưa có máy tính điện tử.

John Napier công bố bảng logarit đầu tiên trong tác phẩm "Mirifici Logarithmorum Canonis Descriptio" (Mô tả bảng Logarit tuyệt diệu) năm 1614. Ông mất 20 năm để tính toán bảng này! Napier định nghĩa logarit dựa trên quan sát rằng: nếu a^x = b, thì x là "logarit của b theo cơ số a", ký hiệu log_a(b) = x. Phép biến đổi này cho phép: log(a×b) = log(a) + log(b).

Henry Briggs, đồng nghiệp của Napier, đề xuất sử dụng cơ số 10 (logarit thập phân hay logarit thường) vì dễ sử dụng trong hệ thập phân. Từ thế kỷ 17 đến giữa thế kỷ 20, các nhà khoa học và kỹ sư sử dụng bảng logarit và thước tính logarit (slide rule) để thực hiện các phép tính phức tạp - ngay cả các kỹ sư NASA còn sử dụng thước tính trong chương trình Apollo!

Logarit tự nhiên (ln) với cơ số e ≈ 2.71828 (số Euler) đặc biệt quan trọng trong toán học và khoa học. Hàm logarit là nghịch đảo của hàm mũ, xuất hiện khắp nơi: độ pH, thang Richter đo động đất, decibel đo âm thanh, độ phức tạp thuật toán (log n), lãi suất kép, tốc độ tăng trưởng dân số, entropy trong nhiệt động lực học, và thông tin entropy trong lý thuyết thông tin.`,
      year: 1614,
      isBc: false,
      importanceLevel: 5,
      source: 'John Napier - Mirifici Logarithmorum Canonis Descriptio',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 3. Số Pi (π)
  const piNumber = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hằng số Pi (π)',
      description: 'Tỷ lệ giữa chu vi và đường kính hình tròn',
      content: `Pi (π) là một trong những hằng số toán học nổi tiếng và quan trọng nhất, biểu diễn tỷ lệ giữa chu vi và đường kính của một hình tròn: π ≈ 3.14159265358979... Pi là số vô tỷ (không biểu diễn được dưới dạng phân số) và là số siêu việt (không phải nghiệm của bất kỳ phương trình đa thức nào với hệ số nguyên).

Người Babylon cổ đại (khoảng 1900-1600 TCN) đã biết π xấp xỉ 3.125, người Ai Cập ghi trong papyrus Rhind (1650 TCN) giá trị 3.16. Archimedes of Syracuse (287-212 TCN) là người đầu tiên tính π một cách khoa học bằng phương pháp đa giác nội tiếp và ngoại tiếp hình tròn, thu được 3.1408 < π < 3.1429 - chính xác đến 2 chữ số thập phân.

Trong suốt lịch sử, các nhà toán học cạnh tranh tính π với độ chính xác ngày càng cao: Zu Chongzhi (Trung Quốc, 429-500) tính được 7 chữ số chính xác; Ludolph van Ceulen (Hà Lan, 1540-1610) tính 35 chữ số và yêu cầu khắc lên bia mộ của mình! Ký hiệu π được William Jones đề xuất năm 1706 và được phổ biến bởi Leonhard Euler năm 1737.

Năm 1761, Johann Lambert chứng minh π là số vô tỷ. Năm 1882, Ferdinand von Lindemann chứng minh π là số siêu việt, giải quyết bài toán cổ đại "hóa tròn thành vuông" (không thể dùng thước và compa để dựng hình vuông có diện tích bằng hình tròn cho trước). Ngày nay, với máy tính siêu mạnh, π đã được tính đến hơn 100 nghìn tỷ chữ số! Pi xuất hiện khắp nơi: từ hình học, giải tích, xác suất, vật lý lượng tử, đến sóng điện từ và DNA.`,
      year: 250,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Archimedes, Zu Chongzhi, Euler, Lambert',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: greeceCountry ? {
        create: [{ countryId: greeceCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 4. Chuỗi Fibonacci
  const fibonacci = await prisma.knowledgeEntry.create({
    data: {
      title: 'Dãy số Fibonacci',
      description: 'Dãy số mà mỗi số là tổng của hai số trước',
      content: `Dãy số Fibonacci là một trong những dãy số nổi tiếng nhất trong toán học, được định nghĩa đệ quy: F(0)=0, F(1)=1, và F(n) = F(n-1) + F(n-2) cho n≥2. Dãy số bắt đầu: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144... Dãy số này được Leonardo Fibonacci (khoảng 1170-1250), nhà toán học Italia, giới thiệu vào châu Âu trong cuốn sách "Liber Abaci" (Sách về Tính toán) năm 1202.

Fibonacci đưa ra bài toán nổi tiếng về sinh sản của thỏ: "Một cặp thỏ sinh ra một cặp thỏ mới mỗi tháng từ tháng thứ hai trở đi. Hỏi sau n tháng có bao nhiêu cặp thỏ?" Câu trả lời chính là số Fibonacci thứ n. Tuy nhiên, dãy số này đã được các nhà toán học Ấn Độ biết đến từ thế kỷ 6, xuất hiện trong công trình về thơ Sanskrit của Pingala và Virahanka.

Điều kỳ diệu của Fibonacci là nó xuất hiện khắp nơi trong tự nhiên: số cánh hoa (hoa cúc có 21, 34, hoặc 55 cánh), số xoắn ốc của vỏ ốc, hạt hướng dương, quả dứa, cây cải bắp Romanesco, cấu trúc DNA, và ngay cả thiên hà xoắn ốc! Tỷ số giữa hai số Fibonacci liên tiếp tiến gần đến Tỷ lệ Vàng (Golden Ratio) φ ≈ 1.618, một hằng số thẩm mỹ xuất hiện trong nghệ thuật, kiến trúc (Kim tự tháp Giza, Parthenon), và âm nhạc.

Dãy Fibonacci có công thức tổng quát đẹp đẽ của Binet: F(n) = (φⁿ - ψⁿ)/√5, trong đó φ = (1+√5)/2 và ψ = (1-√5)/2. Dãy số này có ứng dụng rộng rãi trong khoa học máy tính (thuật toán, cấu trúc dữ liệu), tài chính (phân tích kỹ thuật Fibonacci retracement), sinh học (phyllotaxis - sự sắp xếp lá), và mật mã học.`,
      year: 1202,
      isBc: false,
      importanceLevel: 4,
      source: 'Leonardo Fibonacci - Liber Abaci',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 5. Lý thuyết số
  const numberTheory = await prisma.knowledgeEntry.create({
    data: {
      title: 'Lý thuyết số',
      description: 'Nghiên cứu về số nguyên và tính chất của chúng',
      content: `Lý thuyết số (Number Theory) là một trong những ngành toán học cổ xưa và đẹp đẽ nhất, nghiên cứu về số nguyên và các tính chất của chúng. Euclid trong tác phẩm "Elements" (300 TCN) đã chứng minh các định lý nền tảng: có vô số số nguyên tố, thuật toán Euclid tìm ước chung lớn nhất, và định lý cơ bản của số học.

Pierre de Fermat (1607-1665) là "cha đẻ của lý thuyết số hiện đại". Ông phát hiện nhiều định lý quan trọng: Định lý nhỏ Fermat (nếu p là số nguyên tố thì a^p ≡ a (mod p)), và nổi tiếng nhất là Định lý lớn Fermat (không có ba số nguyên dương a, b, c thỏa mãn a^n + b^n = c^n với n>2) - được ghi chú bên lề cuốn sách với dòng chữ "Tôi đã tìm ra chứng minh tuyệt vời nhưng lề sách quá nhỏ". Định lý này thách thức các nhà toán học suốt 357 năm!

Leonhard Euler, Carl Friedrich Gauss tiếp tục phát triển lý thuyết số. Gauss viết "Disquisitiones Arithmeticae" (1801), được coi là tác phẩm vĩ đại nhất về lý thuyết số, giới thiệu số học đồng dư (modular arithmetic), định luật thuận nghịch bậc hai, và nhiều khái niệm nền tảng. Gauss nói: "Toán học là nữ hoàng của các khoa học, và lý thuyết số là nữ hoàng của toán học."

Lý thuyết số từng được coi là "toán học thuần túy" không có ứng dụng thực tế. Tuy nhiên, vào thế kỷ 20-21, nó trở thành nền tảng của mật mã học hiện đại! Thuật toán RSA (1977) bảo mật Internet dựa trên khó khăn của việc phân tích số lớn thành thừa số nguyên tố. Lý thuyết số còn ứng dụng trong mã sửa lỗi, hàm băm, blockchain, và máy tính lượng tử. Nhiều bài toán lý thuyết số nổi tiếng vẫn chưa giải được: Giả thuyết Riemann, giả thuyết Goldbach, giả thuyết số nguyên tố sinh đôi.`,
      year: 1801,
      isBc: false,
      importanceLevel: 5,
      source: 'Euclid, Fermat, Euler, Gauss - Disquisitiones Arithmeticae',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: germanyCountry ? {
        create: [{ countryId: germanyCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 6. Tô pô học (Topology)
  const topology = await prisma.knowledgeEntry.create({
    data: {
      title: 'Tô pô học',
      description: 'Nghiên cứu tính chất không thay đổi khi biến dạng',
      content: `Tô pô học (Topology, từ tiếng Hy Lạp "topos" = nơi chốn) là ngành toán học nghiên cứu các tính chất của hình học không thay đổi khi vật thể bị uốn, kéo giãn, hoặc biến dạng (nhưng không xé rách hay dính lại). Tô pô học còn được gọi là "hình học cao su" (rubber-sheet geometry). Trong tô pô học, một chiếc cốc cà phê và một chiếc bánh donut (vòng xuyến) là "như nhau" vì cả hai đều có một lỗ và có thể biến dạng từ cái này thành cái kia mà không xé rách!

Leonhard Euler đặt nền móng cho tô pô học năm 1736 với bài toán Bảy cây cầu Königsberg: liệu có thể đi bộ qua tất cả 7 cây cầu của thành phố mà mỗi cầu chỉ đi qua đúng một lần? Euler chứng minh không thể, và trong quá trình đó đã phát minh ra lý thuyết đồ thị và công thức Euler cho đa diện: V - E + F = 2 (đỉnh - cạnh + mặt). Đây là định lý tô pô đầu tiên.

Henri Poincaré (1854-1912) là "cha đẻ của tô pô học hiện đại", phát triển tô pô đại số và homology. Ông đặt ra Giả thuyết Poincaré nổi tiếng (1904): một không gian 3 chiều đơn liên thông compact có cùng tính chất tô pô với hình cầu 3 chiều. Đây là một trong bảy Bài toán Thiên niên kỷ với giải thưởng 1 triệu USD. Grigori Perelman đã chứng minh nó năm 2003 (nhưng từ chối cả giải thưởng lẫn huy chương Fields!).

Tô pô học có ứng dụng bất ngờ: sinh học (cấu trúc DNA xoắn, protein gấp nếp), vật lý (các pha vật chất tô pô, giải Nobel Vật lý 2016), robot học (motion planning), mạng máy tính (network topology), phân tích dữ liệu (topological data analysis), và ngay cả trong kinh tế học. Các khái niệm tô pô như không gian metric, tập mở/đóng, compactness là nền tảng của giải tích hiện đại.`,
      year: 1736,
      isBc: false,
      importanceLevel: 4,
      source: 'Euler, Poincaré, Perelman',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 7. Lý thuyết trò chơi (Game Theory)
  const gameTheory = await prisma.knowledgeEntry.create({
    data: {
      title: 'Lý thuyết trò chơi',
      description: 'Toán học về chiến lược và ra quyết định',
      content: `Lý thuyết trò chơi (Game Theory) là ngành toán học nghiên cứu về xung đột, hợp tác, và ra quyết định chiến lược giữa các tác nhân có lý trí. John von Neumann và Oskar Morgenstern đã sáng lập lý thuyết trò chơi hiện đại với tác phẩm đột phá "Theory of Games and Economic Behavior" (1944). Von Neumann, một thiên tài toán học, chứng minh định lý minimax (1928): trong trò chơi hai người tổng bằng không, luôn tồn tại chiến lược tối ưu.

John Nash cách mạng hóa lĩnh vực này với khái niệm Nash Equilibrium (Cân bằng Nash, 1950): một tình huống trong đó không ai có động cơ đơn phương thay đổi chiến lược của mình nếu các người chơi khác giữ nguyên chiến lược. Nash chứng minh rằng cân bằng này tồn tại trong mọi trò chơi hữu hạn. Thành tựu này đã mang về cho ông giải Nobel Kinh tế năm 1994 (câu chuyện cuộc đời ông được kể trong phim "A Beautiful Mind").

Các ví dụ kinh điển của lý thuyết trò chơi bao gồm: "Tù nhân khốn đốn" (Prisoner's Dilemma) - cho thấy lợi ích cá nhân có thể dẫn đến kết quả tồi cho cả hai; "Diều hâu và Bồ câu" (Hawk-Dove) - về xung đột và đàm phán; "Stag Hunt" - về hợp tác và tin tưởng. Robert Axelrod chứng minh chiến lược "Tit-for-tat" (Răng đòi răng) thắng trong các giải đấu Prisoner's Dilemma lặp lại, giải thích sự tiến hóa của hợp tác.

Lý thuyết trò chơi có ứng dụng rộng rãi: kinh tế học (đấu giá, cạnh tranh thị trường), chính trì (bầu cử, đàm phán quốc tế), sinh học tiến hóa (chiến lược sinh sản, sinh học quần thể), khoa học máy tính (thuật toán, bảo mật mạng), và quân sự (chiến lược, Chiến tranh Lạnh). Thậm chí COVID-19 đã được phân tích qua lý thuyết trò chơi để hiểu hành vi tuân thủ giãn cách xã hội!`,
      year: 1944,
      isBc: false,
      importanceLevel: 5,
      source: 'John von Neumann, Oskar Morgenstern, John Nash',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 8. Hình học giải tích (Analytic Geometry)
  const analyticGeometry = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hình học giải tích',
      description: 'Kết hợp đại số và hình học bằng tọa độ',
      content: `Hình học giải tích (Analytic Geometry hay Coordinate Geometry) là cuộc cách mạng toán học kết hợp hình học và đại số thành một thể thống nhất, được phát minh độc lập bởi René Descartes và Pierre de Fermat vào thập niên 1630. Descartes công bố ý tưởng này trong phụ lục "La Géométrie" (1637) của tác phẩm triết học "Discourse on Method". Hệ tọa độ Descartes (Cartesian coordinates) với trục x và y đặt theo tên ông.

Ý tưởng cốt lõi là biểu diễn các điểm trong không gian bằng cặp số (x, y), và các đường cong hình học bằng các phương trình đại số. Ví dụ: đường tròn bán kính r tại gốc tọa độ là x² + y² = r²; parabol là y = x²; ellipse là x²/a² + y²/b² = 1. Điều này cho phép giải các bài toán hình học bằng đại số và ngược lại - một sự thống nhất mạnh mẽ.

Trước Descartes, hình học (Euclid) và đại số (Al-Khwarizmi) là hai lĩnh vực riêng biệt. Hình học giải tích đã xóa nhòa ranh giới này, mở đường cho nhiều phát triển toán học sau này. Nó là nền tảng thiết yếu cho giải tích (calculus) - Newton và Leibniz đã sử dụng tọa độ để phát triển đạo hàm và tích phân. Vector, ma trận, không gian nhiều chiều đều xuất phát từ hình học giải tích.

Ứng dụng của hình học giải tích vô cùng rộng: vật lý (quỹ đạo hành tinh, chuyển động đạn đạo), kỹ thuật (thiết kế CAD/CAM), đồ họa máy tính và game (rendering 3D, animation), GPS (tọa độ địa lý), robot học (motion control), kiến trúc, và khoa học dữ liệu (không gian đa chiều). Mọi ứng dụng khoa học và kỹ thuật hiện đại đều sử dụng tọa độ Descartes!`,
      year: 1637,
      isBc: false,
      importanceLevel: 5,
      source: 'René Descartes - La Géométrie, Pierre de Fermat',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 9. Thống kê học (Statistics)
  const statistics = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thống kê học',
      description: 'Khoa học về thu thập và phân tích dữ liệu',
      content: `Thống kê học (Statistics) là khoa học về thu thập, phân tích, diễn giải và trình bày dữ liệu. Từ "statistics" xuất phát từ tiếng Latin "statisticum" (về nhà nước), vì ban đầu thống kê được sử dụng để thu thập dữ liệu về dân số, kinh tế, quân sự phục vụ chính phủ. John Graunt (1620-1674) được coi là người đầu tiên phân tích dữ liệu thống kê một cách khoa học trong "Natural and Political Observations Made upon the Bills of Mortality" (1662), nghiên cứu tỷ lệ sinh tử ở London.

Carl Friedrich Gauss phát triển phương pháp bình phương tối thiểu (least squares method) và phân phối chuẩn (normal distribution) - đường cong hình chuông nổi tiếng, xuất hiện khắp nơi trong tự nhiên do Định lý giới hạn trung tâm. Adolphe Quetelet áp dụng thống kê vào khoa học xã hội, tạo ra khái niệm "người trung bình" (l'homme moyen). Francis Galton nghiên cứu tương quan và hồi quy, đặt nền móng cho thống kê hiện đại.

Karl Pearson (1857-1936) sáng lập thống kê toán học hiện đại với phân phối chi-bình phương, hệ số tương quan Pearson, và phương pháp thống kê nhiều chiều. Ronald Fisher (1890-1962) phát triển kiểm định giả thuyết, phương sai (ANOVA), thiết kế thí nghiệm, và ước lượng hợp lý cực đại. Fisher còn áp dụng thống kê vào di truyền học, tạo nền tảng cho sinh học tiến hóa hiện đại.

Thống kê là "ngôn ngữ của khoa học" trong thế kỷ 21. Mọi lĩnh vực đều sử dụng thống kê: y học (thử nghiệm lâm sàng), kinh tế (dự báo), tâm lý học (phân tích hành vi), vật lý (phân tích thí nghiệm), khoa học dữ liệu (machine learning), marketing (A/B testing), chính sách công (dựa trên bằng chứng). Trong thời đại Big Data, thống kê trở thành kỹ năng thiết yếu để hiểu thế giới xung quanh chúng ta.`,
      year: 1662,
      isBc: false,
      importanceLevel: 5,
      source: 'John Graunt, Gauss, Galton, Pearson, Fisher',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 10. Lý thuyết hỗn độn (Chaos Theory)
  const chaosTheory = await prisma.knowledgeEntry.create({
    data: {
      title: 'Lý thuyết hỗn độn',
      description: 'Hành vi không dự đoán được trong hệ xác định',
      content: `Lý thuyết hỗn độn (Chaos Theory) nghiên cứu các hệ thống tất định (deterministic) nhưng cực kỳ nhạy cảm với điều kiện ban đầu, khiến chúng trở nên không thể dự đoán trong dài hạn. Đây là một trong những khám phá toán học sâu sắc nhất thế kỷ 20, thay đổi cách chúng ta hiểu về tính dự đoán và trật tự trong tự nhiên.

Henri Poincaré (1854-1912) là người đầu tiên phát hiện hỗn độn trong bài toán ba vật thể (three-body problem) về chuyển động thiên thể. Ông nhận ra rằng ngay cả các phương trình đơn giản cũng có thể tạo ra hành vi phức tạp không dự đoán được. Edward Lorenz (1917-2008), nhà khí tượng học, khám phá lại hỗn độn năm 1961 khi mô phỏng thời tiết trên máy tính. Ông phát hiện rằng thay đổi nhỏ trong điều kiện đầu vào (từ 0.506127 thành 0.506) dẫn đến dự báo hoàn toàn khác nhau!

Lorenz đặt ra "Hiệu ứng cánh bướm" (Butterfly Effect): "Cánh bướm vỗ ở Brazil có thể gây ra cơn lốc xoáy ở Texas?" - minh họa sự nhạy cảm với điều kiện ban đầu. Ông phát hiện Lorenz attractor, một hình dạng fractal 3D đẹp đẽ mô tả quỹ đạo hỗn độn của hệ thống. Mitchell Feigenbaum phát hiện hằng số Feigenbaum δ ≈ 4.669 xuất hiện phổ biến trong quá trình chuyển từ trật tự sang hỗn độn.

Lý thuyết hỗn độn giải thích nhiều hiện tượng tự nhiên: thời tiết (tại sao dự báo không chính xác sau 7-10 ngày), chuyển động của các hành tinh, turbulence trong chất lỏng, tiết điệu tim, động lực quần thể sinh vật, dao động giá chứng khoán, và giao thông đô thị. Fractals - các hình có cấu trúc tự tương đồng ở mọi tỷ lệ (như tập Mandelbrot) - là biểu hiện hình học của hỗn độn. Hỗn độn cho thấy: có trật tự trong hỗn loạn, và vũ trụ phức tạp hơn nhiều so với những gì Newton và Laplace tưởng tượng.`,
      year: 1963,
      isBc: false,
      importanceLevel: 4,
      source: 'Henri Poincaré, Edward Lorenz, Mitchell Feigenbaum',
      categories: {
        create: [{ categoryId: mathCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  console.log('✅ Additional seeding completed!');
  console.log('Created 10 new mathematics knowledge entries:');
  console.log('1. Lượng giác');
  console.log('2. Logarit');
  console.log('3. Hằng số Pi (π)');
  console.log('4. Dãy số Fibonacci');
  console.log('5. Lý thuyết số');
  console.log('6. Tô pô học');
  console.log('7. Lý thuyết trò chơi');
  console.log('8. Hình học giải tích');
  console.log('9. Thống kê học');
  console.log('10. Lý thuyết hỗn độn');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
