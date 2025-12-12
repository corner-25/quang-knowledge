import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding additional chemistry knowledge...');

  // Get existing categories and countries
  const chemistryCategory = await prisma.category.findUnique({
    where: { name: 'Hóa học' }
  });

  const countries = await prisma.country.findMany();
  const ukCountry = countries.find(c => c.name === 'Anh');
  const germanyCountry = countries.find(c => c.name === 'Đức');
  const usaCountry = countries.find(c => c.name === 'Hoa Kỳ');

  if (!chemistryCategory) {
    throw new Error('Chemistry category not found. Please run seed.ts first.');
  }

  // 10 New Chemistry Knowledge Entries

  // 1. Định luật khí lý tưởng
  const idealGasLaw = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định luật khí lý tưởng',
      description: 'PV = nRT - Mối quan hệ giữa áp suất, thể tích và nhiệt độ',
      content: `Định luật khí lý tưởng (Ideal Gas Law) là một trong những phương trình cơ bản nhất của hóa học và vật lý, biểu diễn mối quan hệ giữa áp suất (P), thể tích (V), nhiệt độ (T) và số mol (n) của khí: PV = nRT, trong đó R là hằng số khí lý tưởng (8.314 J/(mol·K)). Định luật này là tổng hợp của nhiều định luật riêng lẻ được phát hiện trong thế kỷ 17-19.

Robert Boyle (1662) phát hiện định luật Boyle: ở nhiệt độ không đổi, áp suất và thể tích của khí tỷ lệ nghịch (P ∝ 1/V). Jacques Charles (1780s) và Joseph Gay-Lussac (1802) phát hiện định luật Charles: ở áp suất không đổi, thể tích tỷ lệ thuận với nhiệt độ tuyệt đối (V ∝ T). Amedeo Avogadro (1811) đề xuất giả thuyết Avogadro: ở cùng nhiệt độ và áp suất, thể tích bằng nhau của các khí chứa cùng số phân tử (V ∝ n).

Émile Clapeyron kết hợp các định luật này thành dạng PV = nRT năm 1834. Định luật khí lý tưởng dựa trên các giả định: (1) Phân tử khí có kích thước không đáng kể so với khoảng cách giữa chúng. (2) Không có lực tương tác giữa các phân tử. (3) Va chạm giữa các phân tử là hoàn toàn đàn hồi. (4) Năng lượng động trung bình tỷ lệ với nhiệt độ tuyệt đối. Khí thực tế chỉ gần như lý tưởng ở áp suất thấp và nhiệt độ cao.

Định luật khí lý tưởng có ý nghĩa sâu sắc: nó kết nối thế giới vĩ mô (P, V, T có thể đo được) với thế giới vi mô (phân tử), là cầu nối đến thuyết động học phân tử và cơ học thống kê của Boltzmann và Maxwell. Ứng dụng rộng rãi: tính toán phản ứng hóa học trong pha khí, thiết kế động cơ nhiệt, bình khí nén, bóng bay, dự báo thời tiết, hô hấp phổi, và các quá trình công nghiệp. Phương trình Van der Waals và các phương trình trạng thái khác mở rộng để mô tả khí thực tế chính xác hơn.`,
      year: 1834,
      isBc: false,
      importanceLevel: 5,
      source: 'Boyle, Charles, Gay-Lussac, Avogadro, Clapeyron',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 2. Thuyết axit-base Brønsted-Lowry
  const bronstedLowry = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết axit-base Brønsted-Lowry',
      description: 'Axit là chất cho proton, base là chất nhận proton',
      content: `Thuyết axit-base Brønsted-Lowry, được Johannes Brønsted (Đan Mạch) và Thomas Lowry (Anh) đề xuất độc lập năm 1923, định nghĩa axit là chất có khả năng cho proton (H⁺) và base là chất có khả năng nhận proton. Định nghĩa này rộng hơn và linh hoạt hơn thuyết axit-base Arrhenius cũ (1884) chỉ áp dụng cho dung dịch nước.

Theo Brønsted-Lowry, phản ứng axit-base luôn liên quan đến việc chuyển proton từ axit sang base. Ví dụ: HCl + H₂O → H₃O⁺ + Cl⁻, trong đó HCl là axit (cho H⁺), H₂O là base (nhận H⁺ tạo thành H₃O⁺). Quan trọng là một chất có thể đóng vai trò axit trong phản ứng này nhưng là base trong phản ứng khác - tính lưỡng tính (amphoteric). Nước là ví dụ điển hình: với HCl nó là base, với NH₃ nó là axit.

Thuyết này giới thiệu khái niệm "cặp axit-base liên hợp" (conjugate acid-base pair): khi axit cho đi proton, nó trở thành base liên hợp; khi base nhận proton, nó trở thành axit liên hợp. Ví dụ: HCl/Cl⁻, NH₄⁺/NH₃, H₂O/OH⁻. Cặp liên hợp mạnh-yếu ngược nhau: axit mạnh có base liên hợp yếu và ngược lại. Điều này giải thích tại sao HCl (axit mạnh) có Cl⁻ (base rất yếu).

Thuyết Brønsted-Lowry áp dụng cho cả pha khí và dung môi không phải nước, mở rộng phạm vi nghiên cứu hóa học axit-base. Nó là nền tảng để hiểu: pH và pOH, đệm hóa học (buffer), chuẩn độ, phản ứng trung hòa, phản ứng thủy phân muối, và các quá trình sinh học như vận chuyển CO₂ trong máu. Tuy nhiên, thuyết này không giải thích được các axit-base Lewis (không liên quan đến proton) - một lý thuyết tổng quát hơn do Gilbert Lewis đề xuất cùng năm 1923.`,
      year: 1923,
      isBc: false,
      importanceLevel: 4,
      source: 'Johannes Brønsted, Thomas Lowry',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: ukCountry ? {
        create: [{ countryId: ukCountry.id, isPrimary: false }]
      } : undefined
    }
  });

  // 3. Phản ứng tổng hợp Haber-Bosch
  const haberBosch = await prisma.knowledgeEntry.create({
    data: {
      title: 'Quá trình Haber-Bosch',
      description: 'Tổng hợp ammonia từ nitrogen và hydrogen',
      content: `Quá trình Haber-Bosch tổng hợp ammonia (NH₃) từ nitrogen (N₂) và hydrogen (H₂) trong khí quyển là một trong những phát minh hóa học quan trọng nhất mọi thời đại, được coi là phát minh "nuôi sống nửa dân số thế giới". Fritz Haber phát triển phương pháp tổng hợp này trong phòng thí nghiệm năm 1909, và Carl Bosch đã quy mô hóa thành công trong công nghiệp năm 1913 tại BASF, Đức.

Phản ứng: N₂ + 3H₂ ⇌ 2NH₃ + nhiệt. Mặc dù đơn giản về mặt phương trình, nhưng liên kết ba N≡N trong phân tử nitrogen cực kỳ bền vững, khiến phản ứng rất khó xảy ra ở điều kiện thường. Haber tìm ra điều kiện tối ưu: nhiệt độ khoảng 400-500°C, áp suất cao 150-250 atm, và quan trọng nhất là sử dụng xúc tác sắt (Fe) pha tạp với K₂O, CaO, Al₂O₃. Bosch thiết kế lò phản ứng công nghiệp chịu được áp suất và nhiệt độ cực cao.

Trước Haber-Bosch, nguồn nitrogen cố định chủ yếu từ phân động vật và muối diêm tiêu (sodium nitrate) từ Chile - nguồn tài nguyên hạn chế và đắt đỏ. Ammonia tổng hợp cung cấp nguồn nitrogen dồi dào cho phân bón, cách mạng hóa nông nghiệp và cho phép dân số thế giới tăng từ 1.6 tỷ (1900) lên 8 tỷ (2024). Ước tính nửa nitrogen trong cơ thể con người ngày nay đến từ quá trình Haber-Bosch!

Tuy nhiên, phát minh này cũng có mặt tối: Haber làm việc cho Đức trong Thế chiến I, phát triển vũ khí hóa học (khí chlorine, khí mù tạt), được gọi là "cha đẻ của chiến tranh hóa học". Vợ ông, nhà hóa học Clara Immerwahr, phản đối và tự sát năm 1915. Haber nhận Nobel Hóa học 1918 (gây tranh cãi lớn). Bosch nhận Nobel 1931. Ngày nay, quá trình Haber-Bosch tiêu thụ khoảng 1-2% năng lượng toàn cầu và góp phần đáng kể vào phát thải CO₂, thúc đẩy nghiên cứu các phương pháp tổng hợp ammonia xanh hơn.`,
      year: 1909,
      isBc: false,
      importanceLevel: 5,
      source: 'Fritz Haber, Carl Bosch',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: germanyCountry ? {
        create: [{ countryId: germanyCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 4. Cơ chế phản ứng dây chuyền
  const chainReaction = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phản ứng dây chuyền gốc tự do',
      description: 'Cơ chế phản ứng lan truyền qua gốc tự do',
      content: `Phản ứng dây chuyền gốc tự do (Free Radical Chain Reaction) là loại phản ứng hóa học trong đó các gốc tự do (free radicals) - các phân tử hoặc nguyên tử có electron độc thân - được tạo ra và tái tạo liên tục, duy trì chuỗi phản ứng có thể tiếp diễn hàng nghìn lần. Cơ chế này được Moses Gomberg phát hiện đầu tiên năm 1900 khi tổng hợp gốc triphenylmethyl, và được phát triển toàn diện bởi Walther Nernst và các nhà hóa học khác trong thập niên 1910-1920s.

Phản ứng dây chuyền điển hình gồm ba giai đoạn: (1) Khởi đầu (Initiation): năng lượng (nhiệt, ánh sáng UV) phá vỡ liên kết tạo gốc tự do ban đầu. Ví dụ: Cl₂ → 2Cl·. (2) Lan truyền (Propagation): gốc tự do phản ứng với phân tử, tạo sản phẩm và gốc tự do mới. Ví dụ: Cl· + CH₄ → HCl + CH₃·, sau đó CH₃· + Cl₂ → CH₃Cl + Cl·. Gốc Cl· được tái tạo, chu kỳ lặp lại. (3) Kết thúc (Termination): hai gốc tự do kết hợp làm dừng chuỗi. Ví dụ: Cl· + Cl· → Cl₂.

Một gốc tự do có thể gây ra hàng ngàn phản ứng lan truyền trước khi bị kết thúc, giải thích tại sao lượng nhỏ chất khởi đầu có thể tạo ra lượng lớn sản phẩm. Đây là cơ chế của nhiều quá trình quan trọng: đốt cháy nhiên liệu (cháy), cracking dầu mỏ, tổng hợp polymer (PE, PVC, PP, PS), phản ứng halogen hóa alkane, và cả quá trình già hóa trong sinh học.

Hermann Staudinger (Nobel 1953) áp dụng cơ chế gốc tự do để giải thích trùng hợp polymer. Paul Flory (Nobel 1974) phát triển lý thuyết động học phản ứng dây chuyền. Trong khí quyển, phản ứng dây chuyền gốc tự do (đặc biệt là gốc OH·, Cl·) đóng vai trò then chốt trong hóa học khí quyển, phá hủy tầng ozone (gốc Cl· từ CFC), và tạo ra smog quang hóa. Chất chống oxy hóa (antioxidants) trong thực phẩm và cơ thể hoạt động bằng cách "bắt" gốc tự do, ngăn chặn phản ứng dây chuyền gây hại.`,
      year: 1900,
      isBc: false,
      importanceLevel: 4,
      source: 'Moses Gomberg, Walther Nernst, Hermann Staudinger',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 5. Sắc ký (Chromatography)
  const chromatography = await prisma.knowledgeEntry.create({
    data: {
      title: 'Kỹ thuật sắc ký',
      description: 'Phương pháp tách các chất trong hỗn hợp',
      content: `Sắc ký (Chromatography, từ tiếng Hy Lạp "chroma" = màu và "graphein" = viết) là kỹ thuật phân tích và tinh chế để tách các thành phần trong hỗn hợp dựa trên sự khác biệt trong phân bố của chúng giữa hai pha: pha tĩnh (stationary phase) và pha động (mobile phase). Mikhail Tsvet, nhà thực vật học người Nga, phát minh ra sắc ký cột (column chromatography) năm 1901 khi tách các sắc tố thực vật (chlorophyll, carotenoid) bằng cách cho dung dịch chiết qua cột chứa bột calcium carbonate.

Nguyên lý hoạt động: hỗn hợp được hòa tan trong pha động (chất lỏng hoặc khí), sau đó đi qua pha tĩnh (chất rắn hoặc chất lỏng bất động). Các thành phần khác nhau tương tác với pha tĩnh với mức độ khác nhau - chất tương tác mạnh di chuyển chậm hơn, chất tương tác yếu di chuyển nhanh hơn, dẫn đến sự tách biệt. Các yếu tố ảnh hưởng: độ phân cực, kích thước phân tử, điện tích, và tương tác phân tử cụ thể.

Từ phát minh của Tsvet, sắc ký đã phát triển thành nhiều kỹ thuật: (1) Sắc ký giấy (paper chromatography) - đơn giản, dùng trong giáo dục. (2) Sắc ký lớp mỏng TLC (thin-layer chromatography) - nhanh, giá rẻ. (3) Sắc ký khí GC (gas chromatography) - phân tích chất dễ bay hơi. (4) Sắc ký lỏng hiệu năng cao HPLC (high-performance liquid chromatography) - mạnh mẽ nhất, phân tích phân tử lớn. (5) Sắc ký trao đổi ion - tách protein, DNA.

Archer Martin và Richard Synge phát triển sắc ký phân bố (partition chromatography) và nhận Nobel Hóa học 1952. Ngày nay, sắc ký không thể thiếu trong: hóa học phân tích (xác định thành phần hỗn hợp), công nghiệp dược (tinh chế thuốc, kiểm tra chất lượng), pháp y (phát hiện ma túy, độc chất), môi trường (phân tích chất ô nhiễm), thực phẩm (phụ gia, dư lượng thuốc trừ sâu), sinh học phân tử (tinh chế protein, DNA, RNA), và thậm chí trong điều tra tội phạm (phân tích mực viết, chất nổ).`,
      year: 1901,
      isBc: false,
      importanceLevel: 5,
      source: 'Mikhail Tsvet, Archer Martin, Richard Synge',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 6. Polymer và Macromolecule
  const polymers = await prisma.knowledgeEntry.create({
    data: {
      title: 'Khái niệm Polymer và Đại phân tử',
      description: 'Chuỗi dài các đơn vị lặp lại tạo nên vật liệu mới',
      content: `Polymer (polyme, đại phân tử) là phân tử khổng lồ được tạo thành từ hàng nghìn đến hàng triệu đơn vị nhỏ gọi là monomer liên kết với nhau thành chuỗi dài. Khái niệm polymer cách mạng hóa hóa học và tạo ra ngành công nghiệp polymer trị giá hàng nghìn tỷ USD. Hermann Staudinger là người tiên phong chứng minh sự tồn tại của đại phân tử, đối lập với quan điểm thời đó cho rằng vật liệu như cao su, protein, cellulose chỉ là tập hợp các phân tử nhỏ gắn kết yếu.

Năm 1920, Staudinger công bố lý thuyết đại phân tử (macromolecular theory), khẳng định rằng cao su thiên nhiên là chuỗi dài các đơn vị isoprene (C₅H₈) liên kết bằng liên kết cộng hóa trị thực sự, với khối lượng phân tử lên đến hàng triệu Dalton. Ông gặp phải sự phản đối gay gắt từ các hóa học gia hàng đầu như Emil Fischer và Heinrich Wieland. Phải mất hơn 10 năm và nhiều bằng chứng thực nghiệm, cộng đồng khoa học mới chấp nhận lý thuyết của ông. Staudinger nhận giải Nobel Hóa học 1953.

Khám phá này mở ra kỷ nguyên polymer tổng hợp. Leo Baekeland tạo ra Bakelite (1907) - plastic tổng hợp đầu tiên. Wallace Carothers phát minh Nylon (1935) tại DuPont - polymer tổng hợp đầu tiên có ý nghĩa thương mại lớn, cách mạng hóa ngành dệt may. Sau đó là polyethylene (PE), polyvinyl chloride (PVC), polystyrene (PS), polypropylene (PP), Teflon (PTFE), và hàng trăm polymer khác.

Polymer hiện diện khắp nơi trong cuộc sống: nhựa (bao bì, chai lọ, đồ chơi), vải sợi tổng hợp (nylon, polyester), cao su (lốp xe, găng tay), sơn, keo dán, composite (sợi carbon, fiberglass), màng mỏng, và ngay cả trong cơ thể (protein là polymer của amino acid, DNA là polymer của nucleotide, cellulose trong thực vật). Tuy nhiên, ô nhiễm plastic từ polymer không phân hủy đã trở thành vấn đề môi trường toàn cầu, thúc đẩy nghiên cứu về polymer sinh học phân hủy và tái chế.`,
      year: 1920,
      isBc: false,
      importanceLevel: 5,
      source: 'Hermann Staudinger, Wallace Carothers',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: germanyCountry ? {
        create: [{ countryId: germanyCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 7. Quang phổ học (Spectroscopy)
  const spectroscopy = await prisma.knowledgeEntry.create({
    data: {
      title: 'Quang phổ học',
      description: 'Nghiên cứu vật chất qua tương tác với ánh sáng',
      content: `Quang phổ học (Spectroscopy) là khoa học về tương tác giữa vật chất và bức xạ điện từ (ánh sáng), là một trong những công cụ mạnh nhất để nghiên cứu cấu trúc nguyên tử, phân tử và tính chất hóa học. Isaac Newton đặt nền móng năm 1666 khi phân tách ánh sáng trắng thành quang phổ màu qua lăng kính, chứng minh ánh sáng trắng là hỗn hợp của nhiều màu.

Joseph von Fraunhofer (1814) phát hiện các vạch tối trong quang phổ Mặt Trời (vạch Fraunhofer), mở đường cho quang phổ hấp thụ (absorption spectroscopy). Robert Bunsen và Gustav Kirchhoff (1859) phát triển quang phổ kế (spectroscope) và thiết lập rằng mỗi nguyên tố hóa học có "dấu vân tay quang phổ" độc nhất - tập hợp các vạch phát xạ hoặc hấp thụ ở bước sóng đặc trưng. Họ sử dụng kỹ thuật này phát hiện hai nguyên tố mới: cesium (1860) và rubidium (1861).

Quang phổ học trở thành công cụ phân tích định tính và định lượng vô cùng mạnh. Các loại quang phổ chính: (1) Quang phổ UV-Vis: nghiên cứu chuyển electron, xác định nồng độ dung dịch. (2) Quang phổ hồng ngoại IR: nhận biết nhóm chức hữu cơ qua dao động phân tử. (3) Quang phổ NMR (Nuclear Magnetic Resonance): xác định cấu trúc phân tử chi tiết nhất, cơ sở của MRI y học. (4) Quang phổ khối MS (Mass Spectrometry): xác định khối lượng phân tử và cấu trúc. (5) Quang phổ Raman: bổ sung cho IR.

Quang phổ học cho phép phân tích mẫu không phá hủy, với độ nhạy cực cao (ppb-ppt), nhanh chóng, và cần lượng mẫu rất nhỏ. Ứng dụng: xác định cấu trúc hợp chất hữu cơ mới, kiểm soát chất lượng dược phẩm, phát hiện chất ô nhiễm, thiên văn học (xác định thành phần sao và thiên hà), pháp y, nghiên cứu protein và DNA, thậm chí phát hiện hành tinh ngoài hệ Mặt Trời. Không có quang phổ học, hóa học hiện đại sẽ không thể tồn tại.`,
      year: 1814,
      isBc: false,
      importanceLevel: 5,
      source: 'Fraunhofer, Bunsen, Kirchhoff',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: germanyCountry ? {
        create: [{ countryId: germanyCountry.id, isPrimary: false }]
      } : undefined
    }
  });

  // 8. Enzyme và Xúc tác sinh học
  const enzymes = await prisma.knowledgeEntry.create({
    data: {
      title: 'Enzyme và Xúc tác sinh học',
      description: 'Protein xúc tác phản ứng hóa học trong sinh vật',
      content: `Enzyme là protein có chức năng xúc tác (tăng tốc) các phản ứng hóa học trong cơ thể sống, là cơ sở của mọi quá trình sinh hóa. Anselme Payen và Jean-François Persoz phát hiện enzyme đầu tiên - diastase (amylase) - năm 1833 từ malt, có khả năng phân giải tinh bột thành đường. Thuật ngữ "enzyme" được Wilhelm Kühne đặt ra năm 1877 (từ tiếng Hy Lạp "en zyme" = trong men).

Eduard Buchner (Nobel 1907) chứng minh năm 1897 rằng quá trình lên men rượu có thể xảy ra ngoài tế bào sống, chỉ cần chiết xuất từ nấm men - enzyme. Điều này bác bỏ thuyết "sinh lực" (vitalism) cho rằng các quá trình sinh học cần "lực sống" bí ẩn. James Sumner (Nobel 1946) kết tinh urease năm 1926 và chứng minh enzyme là protein - một khám phá gây tranh cãi khi đó vì người ta không tin protein có thể có hoạt tính xúc tác.

Enzyme có độ đặc hiệu cao: mỗi enzyme chỉ xúc tác một hoặc vài phản ứng cụ thể với chất nền (substrate) cụ thể. Emil Fischer (1894) đề xuất mô hình "chìa khóa-ổ khóa" (lock-and-key): enzyme có "túi hoạt động" (active site) hình dạng bổ sung chính xác với chất nền. Daniel Koshland sau này cải tiến thành mô hình "induced fit": enzyme thay đổi hình dạng khi gắn chất nền. Enzyme làm giảm năng lượng hoạt hóa (activation energy), cho phép phản ứng xảy ra ở nhiệt độ cơ thể (37°C) thay vì cần nhiệt độ cao.

Enzyme tăng tốc phản ứng lên hàng triệu đến hàng nghìn tỷ lần! Ví dụ: carbonic anhydrase xúc tác CO₂ + H₂O ⇌ HCO₃⁻ + H⁺ với tốc độ 10⁶ phản ứng/giây/enzyme. Không có enzyme, các phản ứng cần thiết cho sự sống sẽ quá chậm. Enzyme được ứng dụng rộng rãi: công nghiệp thực phẩm (amylase, protease, lipase), giặt giũ (enzyme tẩy vết bẩn), sản xuất sinh nhiên liệu, tổng hợp dược phẩm, chẩn đoán y học, và công nghệ sinh học. Nhiều thuốc hoạt động bằng cách ức chế enzyme cụ thể (ví dụ: aspirin ức chế COX, penicillin ức chế enzyme tổng hợp thành tế bào vi khuẩn).`,
      year: 1833,
      isBc: false,
      importanceLevel: 5,
      source: 'Payen, Persoz, Buchner, Sumner',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 9. Điện hóa học và Pin
  const electrochemistry = await prisma.knowledgeEntry.create({
    data: {
      title: 'Điện hóa học và Pin điện',
      description: 'Chuyển đổi năng lượng hóa học thành điện năng',
      content: `Điện hóa học (Electrochemistry) là ngành hóa học nghiên cứu quá trình chuyển đổi giữa năng lượng hóa học và năng lượng điện thông qua các phản ứng oxy hóa-khử (redox). Alessandro Volta phát minh pin điện hóa đầu tiên (Voltaic pile) năm 1800 - một chồng các đĩa kẽm và đồng xen kẽ với vải ngâm muối, tạo ra dòng điện liên tục đầu tiên trong lịch sử. Đây là nguồn điện ổn định đầu tiên, mở ra kỷ nguyên điện học.

Humphry Davy sử dụng pin Volta để điện phân và phát hiện nhiều nguyên tố mới: sodium, potassium (1807), calcium, magnesium, barium (1808). Michael Faraday (1834) phát hiện hai định luật điện phân Faraday: (1) Khối lượng chất giải phóng ở điện cực tỷ lệ thuận với điện lượng qua dung dịch. (2) Với cùng điện lượng, khối lượng các chất giải phóng tỷ lệ với đương lượng hóa học. Những định luật này thiết lập mối liên hệ định lượng giữa điện và hóa học.

Walther Nernst (Nobel 1920) phát triển phương trình Nernst (1889) mô tả điện thế pin phụ thuộc vào nồng độ: E = E° - (RT/nF)lnQ. Điều này cho phép tính toán chính xác điện thế pin trong mọi điều kiện. Gilbert Lewis và Merle Randall phát triển khái niệm điện thế khử chuẩn (E°), tạo nên dãy điện hóa - công cụ dự đoán chiều phản ứng redox và thiết kế pin.

Pin điện hóa cách mạng hóa cuộc sống: pin sơ cấp (alkaline, lithium coin cells), pin thứ cấp có thể sạc lại (lead-acid, NiMH, Li-ion), pin nhiên liệu (fuel cells). John Goodenough, Stanley Whittingham, Akira Yoshino nhận Nobel Hóa học 2019 cho phát triển pin lithium-ion - nền tảng của điện thoại thông minh, laptop, xe điện. Ứng dụng khác: mạ điện, làm sạch kim loại, sản xuất hóa chất (điện phân nước muối tạo Cl₂, NaOH), chống ăn mòn (cực hy sinh), và cảm biến điện hóa (đo pH, đo glucose trong máu).`,
      year: 1800,
      isBc: false,
      importanceLevel: 5,
      source: 'Alessandro Volta, Faraday, Nernst',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 10. Hóa học lượng tử
  const quantumChemistry = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hóa học lượng tử',
      description: 'Áp dụng cơ học lượng tử vào hóa học',
      content: `Hóa học lượng tử (Quantum Chemistry) là ngành ứng dụng cơ học lượng tử để giải thích và dự đoán cấu trúc, tính chất của nguyên tử và phân tử. Nó giải đáp câu hỏi cơ bản nhất của hóa học: tại sao các nguyên tử liên kết với nhau? Tại sao phân tử có hình dạng nhất định? Tại sao một số phản ứng xảy ra nhanh còn một số chậm?

Erwin Schrödinger (1926) đặt nền móng với phương trình Schrödinger: Ĥψ = Eψ, mô tả trạng thái lượng tử của hệ. Năm 1927, Walter Heitler và Fritz London áp dụng cơ học lượng tử giải thích lần đầu tiên liên kết cộng hóa trị trong phân tử H₂ - sự chồng chập (overlap) các orbital nguyên tử tạo orbital phân tử. Linus Pauling phát triển lý thuyết liên kết hóa trị (Valence Bond Theory) với khái niệm lai hóa (hybridization) và cộng hưởng (resonance), nhận Nobel Hóa học 1954.

Robert Mulliken phát triển lý thuyết orbital phân tử (Molecular Orbital Theory), giải thích tốt hơn các phân tử phức tạp và từ tính, nhận Nobel 1966. John Pople phát triển phần mềm Gaussian - chương trình tính toán hóa học lượng tử đầu tiên, nhận Nobel 1998. Walter Kohn phát triển lý thuyết phiếm hàm mật độ (Density Functional Theory - DFT), phương pháp hiệu quả nhất tính toán cấu trúc điện tử, cũng nhận Nobel 1998.

Hóa học lượng tử cho phép: (1) Tính toán cấu trúc phân tử, năng lượng, độ bền. (2) Dự đoán phản ứng hóa học, cơ chế phản ứng. (3) Giải thích phổ (UV-Vis, IR, NMR). (4) Thiết kế thuốc mới (drug design) bằng mô phỏng tương tác phân tử. (5) Nghiên cứu xúc tác, vật liệu mới. Hóa học lượng tử biến hóa học từ khoa học thực nghiệm sang khoa học dự đoán. Ngày nay, không có nghiên cứu hóa học nào không sử dụng phần mềm hóa học lượng tử. Với máy tính lượng tử đang phát triển, hóa học lượng tử hứa hẹn bước tiến mới, mô phỏng chính xác các hệ phức tạp mà máy tính cổ điển không làm được.`,
      year: 1927,
      isBc: false,
      importanceLevel: 5,
      source: 'Schrödinger, Heitler, London, Pauling, Mulliken, Pople, Kohn',
      categories: {
        create: [{ categoryId: chemistryCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  console.log('✅ Additional chemistry seeding completed!');
  console.log('Created 10 new chemistry knowledge entries:');
  console.log('1. Định luật khí lý tưởng');
  console.log('2. Thuyết axit-base Brønsted-Lowry');
  console.log('3. Quá trình Haber-Bosch');
  console.log('4. Phản ứng dây chuyền gốc tự do');
  console.log('5. Kỹ thuật sắc ký');
  console.log('6. Khái niệm Polymer và Đại phân tử');
  console.log('7. Quang phổ học');
  console.log('8. Enzyme và Xúc tác sinh học');
  console.log('9. Điện hóa học và Pin điện');
  console.log('10. Hóa học lượng tử');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
