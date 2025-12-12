import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding additional biology knowledge...');

  // Get existing categories and countries
  const biologyCategory = await prisma.category.findUnique({
    where: { name: 'Sinh học' }
  });

  const countries = await prisma.country.findMany();
  const ukCountry = countries.find(c => c.name === 'Anh');
  const usaCountry = countries.find(c => c.name === 'Hoa Kỳ');

  if (!biologyCategory) {
    throw new Error('Biology category not found. Please run seed.ts first.');
  }

  // 10 New Biology Knowledge Entries

  // 1. Phát hiện vi khuẩn
  const bacteria = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát hiện vi khuẩn',
      description: 'Antonie van Leeuwenhoek và kính hiển vi',
      content: `Antonie van Leeuwenhoek (1632-1723), một thương nhân vải vóc người Hà Lan, là người đầu tiên quan sát và mô tả vi khuẩn (bacteria) năm 1676. Ông tự chế tạo kính hiển vi đơn giản nhưng cực kỳ tinh xảo, với độ phóng đại lên đến 270 lần - vượt xa các kính hiển vi phức hợp thời bấy giờ. Van Leeuwenhoek mài giũa thấu kính tí hon một cách tỉ mỉ, đạt được độ trong suốt và độ cong hoàn hảo.

Vào ngày 7 tháng 9 năm 1674, ông quan sát mẫu nước ao và phát hiện ra những "con vật nhỏ bé" (animalcules) - thực chất là vi khuẩn, động vật nguyên sinh (protozoa), và tảo đơn bào. Ông viết thư cho Royal Society ở London mô tả chi tiết những gì nhìn thấy: "Các sinh vật sống nhỏ bé di chuyển rất duyên dáng, lớn nhất có hình dạng như que củi nhỏ, những con nhỏ nhất thì tròn." Ông còn quan sát vi khuẩn trong mảng bám răng, nước mưa, phân, và tinh trùng.

Khám phá của van Leeuwenhoek mở ra thế giới vi sinh vật - một thế giới vô hình với mắt thường nhưng có mặt khắp nơi và đóng vai trò thiết yếu trong tự nhiên. Tuy nhiên, phải mất gần 200 năm, với công trình của Louis Pasteur và Robert Koch, người ta mới hiểu được vai trò của vi khuẩn trong lên men, thối rữa, và bệnh tật. Van Leeuwenhoek được coi là "cha đẻ của vi sinh vật học" (microbiology).

Vi khuẩn là sinh vật đơn bào prokaryote, chiếm phần lớn sinh khối trên Trái Đất. Chúng có mặt từ 3.5 tỷ năm trước, hình thành khí quyển chứa oxy, tái chế chất dinh dưỡng, cố định nitrogen, sống trong ruột giúp tiêu hóa, sản xuất vitamin, nhưng cũng gây bệnh. Ngành vi sinh vật học hiện đại đã cách mạng hóa y học (kháng sinh, vaccine), công nghệ sinh học (sản xuất insulin, enzyme), và sinh thái học.`,
      year: 1676,
      isBc: false,
      importanceLevel: 5,
      source: 'Antonie van Leeuwenhoek',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 2. Vaccine đầu tiên
  const vaccine = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát minh vaccine',
      description: 'Edward Jenner và vaccine đậu mùa',
      content: `Edward Jenner (1749-1823), bác sĩ người Anh, phát minh vaccine đầu tiên vào năm 1796 - một trong những can thiệp y học cứu sống nhiều người nhất trong lịch sử. Đậu mùa (smallpox) từng là căn bệnh chết người, giết chết 30% người nhiễm và để lại scar vĩnh viễn trên những người sống sót. Ở thế kỷ 18, đậu mùa giết 400,000 người châu Âu mỗi năm, gây mù 1/3 trẻ em sống sót.

Jenner quan sát thấy những người vắt sữa bò thường nhiễm bệnh đậu bò (cowpox) - một bệnh nhẹ, và sau đó họ không bao giờ bị đậu mùa. Ngày 14/5/1796, ông thực hiện thí nghiệm táo bạo: lấy mủ từ vết loét đậu bò của Sarah Nelmes (cô gái vắt sữa bò) cấy vào cánh tay của James Phipps, cậu bé 8 tuổi. James chỉ bị sốt nhẹ. Sáu tuần sau, Jenner cố tình phơi nhiễm James với đậu mùa thật - cậu bé không hề bị bệnh! Jenner đặt tên phương pháp này là "vaccination" (từ "vacca" = bò trong tiếng Latin).

Ban đầu, vaccine của Jenner bị hoài nghi và phản đối (nhiều người sợ bị biến thành bò!). Nhưng hiệu quả rõ ràng đã nhanh chóng thuyết phục mọi người. Vaccine lan rộng khắp châu Âu và thế giới. Napoleon tiêm chủng cho toàn bộ quân đội. Thomas Jefferson tiêm chủng cho gia đình và gọi Jenner là "ân nhân của nhân loại". Royal Society trao huy chương vàng cho Jenner năm 1802.

Nguyên lý: virus đậu bò tương tự virus đậu mùa đủ để hệ miễn dịch nhận biết và tạo kháng thể, nhưng không gây bệnh nghiêm trọng - miễn dịch chéo (cross-immunity). Sau Jenner, Louis Pasteur phát triển vaccine cho dại (rabies), than (anthrax). Ngày nay có vaccine cho hàng chục bệnh: bại liệt, sởi, rubella, viêm gan B, HPV, COVID-19. Tổ chức Y tế Thế giới (WHO) công bố đậu mùa bị tiêu diệt hoàn toàn năm 1980 - bệnh truyền nhiễm đầu tiên và duy nhất con người xóa bỏ được, nhờ chính vaccine của Jenner. Vaccine cứu ước tính 2-3 triệu người mỗi năm.`,
      year: 1796,
      isBc: false,
      importanceLevel: 5,
      source: 'Edward Jenner',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: ukCountry ? {
        create: [{ countryId: ukCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 3. Kháng sinh Penicillin (đã có trong seed.ts nhưng tôi sẽ thêm Streptomycin)
  const antibiotics = await prisma.knowledgeEntry.create({
    data: {
      title: 'Kháng sinh Streptomycin',
      description: 'Selman Waksman và điều trị lao',
      content: `Streptomycin là kháng sinh đầu tiên hiệu quả chống lại bệnh lao (tuberculosis), được Selman Waksman và đồng nghiệp Albert Schatz phát hiện năm 1943 tại Rutgers University. Waksman đặt ra thuật ngữ "antibiotic" (kháng sinh) để chỉ các chất do vi sinh vật tạo ra có khả năng tiêu diệt hoặc ức chế vi khuẩn khác. Ông nhận giải Nobel Y học 1952 cho khám phá này.

Bệnh lao, gây bởi vi khuẩn Mycobacterium tuberculosis, là "bệnh dịch trắng" (white plague) giết chết hàng triệu người qua các thế kỷ. Ở thế kỷ 19-20, lao là nguyên nhân gây tử vong hàng đầu ở phương Tây, giết 1/7 dân số châu Âu. Trước streptomycin, không có thuốc chữa lao hiệu quả - bệnh nhân chỉ được nghỉ ngơi tại các sanatorium ở vùng núi cao, hy vọng không khí trong lành sẽ giúp phổi khỏe hơn.

Waksman và Schatz phân lập streptomycin từ vi khuẩn xạ khuẩn Streptomyces griseus trong đất. Họ tìm kiếm có hệ thống qua hàng nghìn mẫu vi sinh vật đất, thử nghiệm chúng chống lại các mầm bệnh. Streptomycin là kháng sinh đầu tiên hiệu quả với vi khuẩn gram âm và vi khuẩn kháng acid như M. tuberculosis. Thử nghiệm lâm sàng đầu tiên năm 1944 cho thấy kết quả kỳ diệu: bệnh nhân lao giai đoạn cuối hồi phục nhanh chóng.

Streptomycin hoạt động bằng cách gắn vào ribosome 30S của vi khuẩn, gây lỗi đọc mã di truyền và ngăn tổng hợp protein. Tuy nhiên, M. tuberculosis nhanh chóng kháng lại streptomycin đơn trị liệu. Vì vậy ngày nay lao được điều trị bằng liệu pháp kết hợp nhiều kháng sinh (isoniazid, rifampin, ethambutol, pyrazinamide). Streptomycin còn được dùng cho bệnh dịch hạch (plague), tularemia, và một số nhiễm trùng khác. Waksman còn phát hiện nhiều kháng sinh khác: neomycin, actinomycin. Công trình của ông mở ra kỷ nguyên vàng của kháng sinh, cứu sống hàng triệu người.`,
      year: 1943,
      isBc: false,
      importanceLevel: 5,
      source: 'Selman Waksman, Albert Schatz',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 4. Sự phát sinh tự nhiên bị bác bỏ
  const pasteurization = await prisma.knowledgeEntry.create({
    data: {
      title: 'Bác bỏ thuyết phát sinh tự nhiên',
      description: 'Louis Pasteur và thí nghiệm bình cổ ngỗng',
      content: `Louis Pasteur (1822-1895) đã bác bỏ thuyết phát sinh tự nhiên (spontaneous generation) - niềm tin tồn tại hàng ngàn năm rằng sinh vật có thể tự nhiên phát sinh từ vật chất vô sinh. Người ta tin ruồi sinh ra từ thịt thối, chuột từ thóc ẩm ướt, vi khuẩn từ nước canh. Francesco Redi (1668) và Lazzaro Spallanzani (1768) đã thách thức quan niệm này, nhưng vẫn chưa thuyết phục hoàn toàn.

Năm 1859, Pasteur thiết kế thí nghiệm quyết định bằng bình cổ ngỗng (swan-neck flask). Ông đun sôi nước thịt (broth) trong bình có cổ cong hình chữ S. Hơi nước thoát ra nhưng vi khuẩn trong không khí bị bẫy ở cổ cong, không thể vào bình. Kết quả: nước thịt vẫn trong suốt, không hư hỏng dù để lâu tháng. Nhưng khi Pasteur bẻ gãy cổ bình, nước thịt nhanh chóng bị nhiễm vi khuẩn và đục. Điều này chứng minh: vi khuẩn đến từ không khí, không tự phát sinh.

Pasteur kết luận: "Omne vivum ex vivo" (Mọi sự sống đều từ sự sống). Thí nghiệm này không chỉ bác bỏ phát sinh tự nhiên mà còn là nền tảng cho: (1) Thuyết vi trùng gây bệnh (germ theory). (2) Kỹ thuật tiệt trùng và vô trùng trong y học và thực phẩm. (3) Phương pháp thanh trùng Pasteur (pasteurization) - gia nhiệt vừa phải để tiêu diệt mầm bệnh nhưng giữ nguyên hương vị (dùng cho sữa, bia, rượu).

Pasteur còn phát triển vaccine cho bệnh dại (rabies, 1885) - vaccine đầu tiên cho bệnh của người được tạo ra trong phòng thí nghiệm. Trẻ em Joseph Meister, 9 tuổi, bị chó dại cắn, được Pasteur tiêm vaccine thử nghiệm và sống sót - một kỳ tích y học. Pasteur cũng nghiên cứu lên men (fermentation), chứng minh nó do vi khuẩn gây ra, cứu ngành công nghiệp rượu vang Pháp. Viện Pasteur được thành lập năm 1887, trở thành trung tâm nghiên cứu vi sinh hàng đầu thế giới. Công trình của Pasteur đặt nền móng cho vi sinh học hiện đại và y học dự phòng.`,
      year: 1859,
      isBc: false,
      importanceLevel: 5,
      source: 'Louis Pasteur',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 5. Chu trình Krebs
  const krebsCycle = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chu trình Krebs (chu trình axit citric)',
      description: 'Cơ chế tạo năng lượng trong tế bào',
      content: `Chu trình Krebs (Krebs cycle), còn gọi là chu trình axit citric hay chu trình TCA (tricarboxylic acid cycle), là chuỗi phản ứng hóa học trung tâm của chuyển hóa tế bào, oxy hóa acetyl-CoA thành CO₂ và tạo ra năng lượng dưới dạng ATP, NADH, và FADH₂. Hans Krebs, nhà sinh hóa người Đức-Anh, khám phá chu trình này năm 1937 và nhận giải Nobel Y học 1953.

Krebs làm việc tại Đại học Sheffield khi phát hiện ra chu trình 8 bước này xảy ra trong ty thể (mitochondria), "nhà máy năng lượng" của tế bào. Chu trình bắt đầu khi acetyl-CoA (từ phân giải glucose, acid béo, hoặc amino acid) kết hợp với oxaloacetate tạo thành citrate (6 carbon). Qua 8 phản ứng enzym-xúc tác, citrate được oxy hóa từng bước, giải phóng 2 CO₂, tạo ra 3 NADH, 1 FADH₂, và 1 GTP (tương đương ATP), cuối cùng tái tạo oxaloacetate để chu trình tiếp diễn.

Chu trình Krebs là "vòng xoay chuyển hóa" (metabolic hub) nơi các con đường phân giải carbohydrate, lipid, và protein giao nhau. Nó không chỉ tạo năng lượng mà còn cung cấp tiền chất cho tổng hợp sinh học: citrate để tổng hợp acid béo, α-ketoglutarate và oxaloacetate để tổng hợp amino acid, succinyl-CoA để tổng hợp heme (trong hemoglobin). NADH và FADH₂ sau đó truyền electron vào chuỗi truyền electron (electron transport chain) để tạo ATP qua phosphoryl hóa oxy hóa.

Một phân tử glucose qua glycolysis tạo 2 pyruvate → 2 acetyl-CoA → 2 vòng Krebs → 6 NADH + 2 FADH₂ + 2 GTP. Kết hợp với chuỗi truyền electron, tổng cộng thu được khoảng 30-32 ATP từ một phân tử glucose. Chu trình Krebs chỉ hoạt động trong điều kiện hiếu khí (có oxygen). Các rối loạn chu trình Krebs dẫn đến bệnh lý nghiêm trọng: bệnh ty thể, ung thư (một số ung thư có đột biến enzyme chu trình Krebs). Hiểu biết về chu trình Krebs là then chốt trong sinh hóa, sinh lý, dinh dưỡng, và y học.`,
      year: 1937,
      isBc: false,
      importanceLevel: 5,
      source: 'Hans Krebs',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: ukCountry ? {
        create: [{ countryId: ukCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 6. Nuôi cấy tế bào
  const cellCulture = await prisma.knowledgeEntry.create({
    data: {
      title: 'Kỹ thuật nuôi cấy tế bào',
      description: 'Nuôi tế bào sống ngoài cơ thể',
      content: `Kỹ thuật nuôi cấy tế bào (cell culture) là phương pháp nuôi dưỡng tế bào sống tách ra từ sinh vật đa bào trong môi trường nhân tạo, trong điều kiện kiểm soát nhiệt độ, độ ẩm, pH, và chất dinh dưỡng. Ross Granville Harrison, nhà phôi học người Mỹ, thực hiện nuôi cấy mô động vật đầu tiên năm 1907 khi nuôi sợi thần kinh ếch trong giọt lymph đông, quan sát thấy axon mọc ra - chứng minh lý thuyết neuron.

Alexis Carrel và Montrose Burrows (1910-1912) phát triển kỹ thuật nuôi cấy tế bào vô trùng, nuôi được tế bào tim gà sống liên tục trong nhiều năm (mặc dù sau này phát hiện có thể do vô tình bổ sung tế bào mới khi thay môi trường). George Otto Gey thành lập dòng tế bào bất tử đầu tiên - HeLa cells - năm 1951 từ ung thư cổ tử cung của Henrietta Lacks. Dòng tế bào HeLa vẫn đang được sử dụng rộng rãi trong nghiên cứu y sinh học toàn cầu cho đến ngày nay.

Nuôi cấy tế bào cần: (1) Môi trường dinh dưỡng chứa glucose, amino acid, vitamin, khoáng chất, serum (huyết thanh thai bò). (2) Điều kiện vô trùng nghiêm ngặt. (3) Nhiệt độ 37°C (cho tế bào người), 5% CO₂, độ ẩm cao. (4) Bình nuôi cấy (flask, dish, well plate). Tế bào bám dính (adherent cells) cần bề mặt để bám, tế bào lơ lửng (suspension cells) phát triển tự do trong môi trường.

Nuôi cấy tế bào cách mạng hóa sinh học và y học: (1) Nghiên cứu sinh lý tế bào, bệnh lý. (2) Phát triển vaccine (virus lại được nuôi trong tế bào nuôi cấy). (3) Sản xuất protein tái tổ hợp, kháng thể đơn dòng. (4) Sàng lọc thuốc, kiểm tra độc tính. (5) Liệu pháp tế bào gốc. (6) Da nhân tạo cho bệnh nhân bỏng. (7) Thụ tinh ống nghiệm (IVF). Ngày nay, nuôi cấy cơ quan 3D (organoids) và kỹ thuật mô (tissue engineering) đang phát triển để tạo ra các mô, cơ quan thay thế.`,
      year: 1907,
      isBc: false,
      importanceLevel: 5,
      source: 'Ross Harrison, Alexis Carrel, George Gey',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 7. RNA và vai trò của nó
  const rna = await prisma.knowledgeEntry.create({
    data: {
      title: 'Khám phá RNA và vai trò sinh học',
      description: 'Từ "DNA phụ" đến chìa khóa của sự sống',
      content: `RNA (ribonucleic acid) ban đầu được coi chỉ là "phiên bản phụ" của DNA, nhưng sau này được phát hiện đóng vai trò trung tâm trong biểu hiện gen và nhiều quá trình sinh học khác. Friedrich Miescher phân lập acid nucleic lần đầu năm 1869, nhưng phải đến những năm 1930-1950, các nhà sinh hóa mới phân biệt được DNA và RNA.

Phoebus Levene xác định RNA chứa ribose (đường 5 carbon) thay vì deoxyribose như DNA, và các base A, U, G, C (uracil thay vì thymine). Severo Ochoa (Nobel 1959) tổng hợp RNA in vitro lần đầu tiên. Francis Crick đề xuất "giả thuyết trình tự" (sequence hypothesis) và "giả thuyết adapter": thông tin di truyền chảy từ DNA → RNA → Protein, và RNA đóng vai trò trung gian.

Ba loại RNA chính được phát hiện: (1) mRNA (messenger RNA) - mang thông tin từ DNA đến ribosome để tổng hợp protein, được François Jacob và Jacques Monod khám phá (1961). (2) tRNA (transfer RNA) - "adapter" mang amino acid đến ribosome, cấu trúc hình lá tre, được Mahlon Hoagland và Paul Zamecnik phát hiện (1958). (3) rRNA (ribosomal RNA) - thành phần cấu trúc và xúc tác của ribosome.

Những năm 1980-2000 mang lại nhiều bất ngờ: Thomas Cech và Sidney Altman (Nobel 1989) phát hiện ribozyme - RNA có hoạt tính enzyme, phá vỡ dogma "chỉ protein mới là enzyme". Andrew Fire và Craig Mello (Nobel 2006) phát hiện RNA gây nhiễu (RNA interference - RNAi): RNA sợi đôi nhỏ (siRNA, miRNA) có thể tắt gen cụ thể. Katalin Karikó và Drew Weissman phát triển công nghệ mRNA vaccine, dẫn đến vaccine COVID-19 (Pfizer/BioNTech, Moderna).

RNA giờ được biết tham gia vào: splicing (cắt nối intron/exon), biểu sinh (epigenetics), điều hòa gen, bảo vệ chống virus, và có thể là phân tử di truyền nguyên thủy (RNA world hypothesis). RNA trị liệu (RNA therapeutics) đang trở thành lĩnh vực hot: mRNA vaccine, siRNA thuốc (patisiran cho bệnh amyloidosis), antisense oligonucleotides. RNA không còn là "phụ" mà là ngôi sao chính!`,
      year: 1961,
      isBc: false,
      importanceLevel: 5,
      source: 'Jacob, Monod, Cech, Altman, Fire, Mello',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 8. Hệ miễn dịch thích nghi
  const adaptiveImmunity = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hệ miễn dịch thích nghi',
      description: 'Kháng thể và tế bào lympho đặc hiệu',
      content: `Hệ miễn dịch thích nghi (adaptive immunity) hay hệ miễn dịch đặc hiệu là khả năng của cơ thể nhận biết và tiêu diệt các mầm bệnh cụ thể, đồng thời ghi nhớ chúng để phản ứng nhanh hơn, mạnh hơn khi gặp lại - cơ sở của vaccine và miễn dịch lâu dài. Emil von Behring và Shibasaburo Kitasato phát hiện kháng thể (antibodies) năm 1890 khi chứng minh huyết thanh từ động vật miễn dịch với bạch hầu có thể bảo vệ động vật khác - miễn dịch thụ động (passive immunity). Von Behring nhận Nobel Y học đầu tiên năm 1901.

Paul Ehrlich phát triển lý thuyết "side-chain" (1897) - tiền thân của lý thuyết kháng thể: tế bào có các "receptor" trên bề mặt, kháng nguyên kích thích sản xuất nhiều receptor hòa tan (kháng thể). Karl Landsteiner phát hiện nhóm máu ABO (1901) và yếu tố Rh, giải thích phản ứng truyền máu. Frank Macfarlane Burnet đề xuất thuyết tuyển chọn dòng (clonal selection theory, 1957): mỗi lympho cyte mang receptor đặc hiệu cho một kháng nguyên; khi gặp kháng nguyên, tế bào đó được kích hoạt, nhân lên thành dòng.

Hệ miễn dịch thích nghi gồm: (1) Miễn dịch thể dịch (humoral): tế bào B (B cells) sản xuất kháng thể (IgG, IgM, IgA, IgE, IgD) - protein hình chữ Y gắn vào kháng nguyên, đánh dấu để phá hủy. (2) Miễn dịch tế bào (cell-mediated): tế bào T (T cells) - T helper (CD4+) phối hợp phản ứng miễn dịch, T cytotoxic (CD8+) giết tế bào bị nhiễm virus hoặc ung thư. Cả B và T cells đều tạo ra tế bào nhớ (memory cells) sống lâu, cung cấp miễn dịch lâu dài.

Susumu Tonegawa (Nobel 1987) giải mã cơ chế đa dạng kháng thể: tái tổ hợp V(D)J - xáo trộn các đoạn gen tạo ra hàng tỷ kháng thể khác nhau từ số gen hữu hạn. Georges Köhler và César Milstein (Nobel 1984) phát triển kỹ thuật hybridoma tạo kháng thể đơn dòng (monoclonal antibodies) - công cụ vô giá trong chẩn đoán và điều trị. Hiểu biết về miễn dịch thích nghi là nền tảng của: vaccine, điều trị ung thư (checkpoint inhibitors), ghép tạng, điều trị tự miễn.`,
      year: 1890,
      isBc: false,
      importanceLevel: 5,
      source: 'von Behring, Kitasato, Ehrlich, Burnet, Tonegawa',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 9. Apoptosis - Cái chết tế bào theo chương trình
  const apoptosis = await prisma.knowledgeEntry.create({
    data: {
      title: 'Apoptosis - Cái chết tế bào theo chương trình',
      description: 'Tế bào tự sát có kiểm soát',
      content: `Apoptosis (từ tiếng Hy Lạp "apo" = xa, "ptosis" = rơi - như lá rơi) là quá trình cái chết tế bào theo chương trình (programmed cell death), một cơ chế cần thiết để duy trì cân bằng giữa sinh và tử tế bào trong cơ thể. John Kerr, Andrew Wyllie, và Alastair Currie lần đầu mô tả và đặt tên "apoptosis" năm 1972 để phân biệt với necrosis (hoại tử - cái chết tế bào do chấn thương).

Apoptosis có những đặc điểm hình thái đặc trưng: tế bào co lại, màng tế bào phình túi (blebbing), nhiễm sắc thể ngưng tụ, DNA phân mảnh, cuối cùng tế bào phân thành các "apoptotic bodies" được đại thực bào nuốt mà không gây viêm. Đây là quá trình "sạch sẽ", ngược với necrosis gây vỡ tế bào và viêm. Sydney Brenner, Robert Horvitz, và John Sulston (Nobel 2002) nghiên cứu apoptosis trong giun tròn C. elegans, xác định các gen điều khiển: ced-3, ced-4, ced-9.

Apoptosis xảy ra qua hai con đường chính: (1) Con đường ngoại sinh (extrinsic): receptor trên màng (như Fas) nhận tín hiệu chết từ bên ngoài. (2) Con đường nội sinh (intrinsic): ty thể phát hành cytochrome c khi bị stress, tổn thương DNA, thiếu yếu tố sống. Cả hai đều kích hoạt caspases - các enzyme protease cắt protein tế bào, thực thi cái chết. Protein Bcl-2 (từ lymphoma tế bào B) ức chế apoptosis; đột biến làm tế bào sống quá lâu dẫn đến ung thư.

Apoptosis là thiết yếu cho: (1) Phát triển phôi: loại bỏ màng giữa các ngón tay/chân, hình thành hệ thần kinh (chỉ 50% neuron sống sót). (2) Miễn dịch: loại bỏ lymphocyte tự miễn. (3) Loại bỏ tế bào bị nhiễm virus, tế bào đột biến. (4) Cân bằng số lượng tế bào. Rối loạn apoptosis gây bệnh: quá ít → ung thư, tự miễn; quá nhiều → thoái hóa thần kinh (Alzheimer, Parkinson), AIDS. Thuốc nhắm vào apoptosis (BH3 mimetics, TRAIL) đang được phát triển cho ung thư. Hiểu apoptosis thay đổi cách ta nhìn cái chết - không phải ngẫu nhiên mà là quá trình được thiết lập trong gen!`,
      year: 1972,
      isBc: false,
      importanceLevel: 4,
      source: 'Kerr, Wyllie, Currie, Horvitz',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 10. Microbiome - Vi sinh vật cộng sinh
  const microbiome = await prisma.knowledgeEntry.create({
    data: {
      title: 'Microbiome - Hệ vi sinh vật cộng sinh',
      description: 'Cộng đồng vi khuẩn sống trong cơ thể',
      content: `Microbiome là tổng thể các vi sinh vật (vi khuẩn, virus, nấm, archaea, protozoa) cùng với vật chất di truyền của chúng sống trong và trên cơ thể người - một "cơ quan" bị bỏ quên với khoảng 38-100 nghìn tỷ tế bào vi khuẩn, nhiều hơn số tế bào người (30 nghìn tỷ). Joshua Lederberg đặt thuật ngữ "microbiome" năm 2001 để chỉ cộng đồng sinh thái vi sinh vật cộng sinh này.

Dự án Human Microbiome Project (HMP, 2007-2016) của NIH đã lập bản đồ microbiome ở 18 vị trí trên cơ thể người khỏe mạnh. Ruột già chứa microbiome phong phú nhất với hơn 1000 loài vi khuẩn, tổng trọng lượng 1-2 kg. Các phylum chính: Bacteroidetes, Firmicutes, Actinobacteria, Proteobacteria. Mỗi người có "dấu vân tay" microbiome riêng biệt, ảnh hưởng bởi di truyền, chế độ ăn, môi trường, thuốc kháng sinh, cách sinh.

Microbiome đóng vai trò quan trọng: (1) Tiêu hóa: phân giải polysaccharide phức tạp (cellulose, inulin) mà người không tiêu được, tạo acid béo chuỗi ngắn (SCFA) - nguồn năng lượng cho tế bào ruột. (2) Tổng hợp vitamin K, B12, folate, biotin. (3) Huấn luyện hệ miễn dịch: 70% tế bào miễn dịch ở ruột. (4) Bảo vệ chống mầm bệnh (colonization resistance). (5) Ảnh hưởng đến não: trục ruột-não (gut-brain axis) qua dây thần kinh mê du, hormone, chất chuyển hóa.

Mất cân bằng microbiome (dysbiosis) liên quan đến nhiều bệnh: béo phì, đái tháo đường type 2, viêm ruột (IBD), hen suyễn, tự kỷ, trầm cảm, ung thư đại tràng. Ghép phân (fecal microbiota transplantation - FMT) hiệu quả cao điều trị nhiễm C. difficile tái phát. Probiotics, prebiotics, postbiotics đang được nghiên cứu như liệu pháp. Jeffrey Gordon (Washington University) tiên phong nghiên cứu microbiome và dinh dưỡng. Rob Knight (UC San Diego) phát triển công cụ phân tích microbiome. Lĩnh vực này đang bùng nổ, thay đổi cách ta hiểu sức khỏe - ta không phải cá thể mà là siêu sinh vật (superorganism)!`,
      year: 2001,
      isBc: false,
      importanceLevel: 5,
      source: 'Joshua Lederberg, Human Microbiome Project',
      categories: {
        create: [{ categoryId: biologyCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  console.log('✅ Additional biology seeding completed!');
  console.log('Created 10 new biology knowledge entries:');
  console.log('1. Phát hiện vi khuẩn (Antonie van Leeuwenhoek)');
  console.log('2. Phát minh vaccine (Edward Jenner)');
  console.log('3. Kháng sinh Streptomycin (Selman Waksman)');
  console.log('4. Bác bỏ thuyết phát sinh tự nhiên (Louis Pasteur)');
  console.log('5. Chu trình Krebs');
  console.log('6. Kỹ thuật nuôi cấy tế bào');
  console.log('7. Khám phá RNA và vai trò sinh học');
  console.log('8. Hệ miễn dịch thích nghi');
  console.log('9. Apoptosis - Cái chết tế bào theo chương trình');
  console.log('10. Microbiome - Hệ vi sinh vật cộng sinh');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
