import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding additional physics knowledge...');

  // Get existing categories and countries
  const physicsCategory = await prisma.category.findUnique({
    where: { name: 'Vật lý' }
  });

  const countries = await prisma.country.findMany();
  const greeceCountry = countries.find(c => c.name === 'Hy Lạp');
  const ukCountry = countries.find(c => c.name === 'Anh');
  const germanyCountry = countries.find(c => c.name === 'Đức');
  const usaCountry = countries.find(c => c.name === 'Hoa Kỳ');

  if (!physicsCategory) {
    throw new Error('Physics category not found. Please run seed.ts first.');
  }

  // 10 New Physics Knowledge Entries

  // 1. Định luật Kepler về chuyển động hành tinh
  const keplerLaws = await prisma.knowledgeEntry.create({
    data: {
      title: 'Ba định luật Kepler về chuyển động hành tinh',
      description: 'Quỹ đạo hành tinh là ellipse',
      content: `Ba định luật Kepler về chuyển động hành tinh là nền tảng của thiên văn học hiện đại, được Johannes Kepler (1571-1630) phát hiện dựa trên dữ liệu quan sát tỉ mỉ của thầy ông, Tycho Brahe. Kepler dành 25 năm cuộc đời phân tích dữ liệu về chuyển động của Sao Hỏa để đưa ra ba định luật cách mạng này.

Định luật thứ nhất (1609): "Quỹ đạo của mỗi hành tinh là một ellipse, với Mặt Trời nằm tại một trong hai tiêu điểm." Điều này phá vỡ niềm tin 2000 năm của Aristotle và Ptolemy rằng quỹ đạo thiên thể phải là hình tròn hoàn hảo. Định luật thứ hai (1609): "Đường nối Mặt Trời và hành tinh quét qua những diện tích bằng nhau trong những khoảng thời gian bằng nhau" - nghĩa là hành tinh di chuyển nhanh hơn khi gần Mặt Trời và chậm hơn khi xa.

Định luật thứ ba (1619): "Bình phương chu kỳ quỹ đạo của hành tinh tỷ lệ thuận với lập phương bán trục lớn của quỹ đạo" (T² ∝ a³). Định luật này cho phép tính toán khoảng cách tương đối giữa các hành tinh và Mặt Trời. Kepler tin rằng vũ trụ được thiết kế theo các nguyên lý toán học hài hòa, và ông đã tìm thấy "âm nhạc của các thiên cầu" trong các tỷ lệ số học.

Isaac Newton sau này chứng minh rằng ba định luật Kepler là hệ quả trực tiếp của định luật vạn vật hấp dẫn và các định luật chuyển động của ông. Định luật Kepler không chỉ áp dụng cho các hành tinh quay quanh Mặt Trời mà còn cho vệ tinh nhân tạo, mặt trăng quay quanh hành tinh, các ngôi sao đôi, và ngay cả các hành tinh ngoài hệ Mặt Trời (exoplanets). Các định luật này là công cụ thiết yếu cho việc thiết kế quỹ đạo vệ tinh, tàu vũ trụ, và khám phá không gian.`,
      year: 1619,
      isBc: false,
      importanceLevel: 5,
      source: 'Johannes Kepler - Harmonices Mundi',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: germanyCountry ? {
        create: [{ countryId: germanyCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 2. Định luật Coulomb về điện tích
  const coulombLaw = await prisma.knowledgeEntry.create({
    data: {
      title: 'Định luật Coulomb về lực điện',
      description: 'Lực giữa hai điện tích',
      content: `Định luật Coulomb, được Charles-Augustin de Coulomb phát hiện năm 1785, mô tả lực tương tác giữa hai điện tích điểm: "Lực giữa hai điện tích tỷ lệ thuận với tích độ lớn của chúng và tỷ lệ nghịch với bình phương khoảng cách giữa chúng", biểu diễn bằng công thức F = k(q₁q₂)/r². Định luật này có dạng toán học giống hệt định luật vạn vật hấp dẫn của Newton, nhưng áp dụng cho điện tích thay vì khối lượng.

Coulomb sử dụng cân xoắn (torsion balance) - một thiết bị cực kỳ nhạy do ông tự chế tạo - để đo lực điện giữa các quả cầu tích điện. Thí nghiệm của ông cho thấy lực điện có thể hút (giữa điện tích trái dấu) hoặc đẩy (giữa điện tích cùng dấu), khác với lực hấp dẫn chỉ có tính hút. Hằng số Coulomb k ≈ 9×10⁹ N⋅m²/C² cho thấy lực điện mạnh hơn lực hấp dẫn rất nhiều.

Định luật Coulomb là nền tảng của điện từ học cổ điển. Nó giải thích tại sao nguyên tử và phân tử liên kết với nhau (lực điện giữa electron và hạt nhân), tại sao vật chất có cấu trúc ổn định, và tại sao chúng ta có thể "chạm" vào đồ vật (thực chất là lực đẩy điện giữa các electron). Từ định luật Coulomb, người ta phát triển khái niệm điện trường - không gian xung quanh điện tích bị "bẻ cong" và tác dụng lực lên điện tích khác.

Định luật Coulomb kết hợp với các định luật khác của điện từ học (như định luật Gauss, định luật Ampère) tạo nên phương trình Maxwell - bộ phương trình hoàn chỉnh mô tả điện và từ. Ứng dụng: tụ điện, màng lọc tĩnh điện, máy in laser, màn hình cảm ứng, công nghệ ion, và hiểu cấu trúc phân tử trong hóa học và sinh học.`,
      year: 1785,
      isBc: false,
      importanceLevel: 5,
      source: 'Charles-Augustin de Coulomb',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 3. Hiệu ứng quang điện
  const photoelectricEffect = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hiệu ứng quang điện',
      description: 'Ánh sáng giải phóng electron khỏi kim loại',
      content: `Hiệu ứng quang điện (Photoelectric Effect) là hiện tượng electron được giải phóng khỏi bề mặt kim loại khi bị chiếu sáng, được Heinrich Hertz phát hiện lần đầu năm 1887. Tuy nhiên, Hertz không giải thích được hiện tượng này. Các thí nghiệm sau đó của Philipp Lenard (1902) cho thấy những kết quả kỳ lạ mâu thuẫn với lý thuyết sóng cổ điển về ánh sáng.

Bí ẩn là: (1) Electron chỉ bị giải phóng nếu tần số ánh sáng vượt qua một ngưỡng nhất định, bất kể cường độ sáng mạnh đến đâu. (2) Năng lượng của electron phụ thuộc vào tần số ánh sáng, không phụ thuộc vào cường độ. (3) Electron được phát ra ngay lập tức, không có độ trễ. Điều này hoàn toàn trái ngược với dự đoán của lý thuyết sóng: nếu ánh sáng là sóng, cường độ cao hơn nên tạo ra electron năng lượng cao hơn.

Albert Einstein giải thích hiệu ứng quang điện năm 1905 (cùng năm với thuyết tương đối hẹp!) bằng cách áp dụng ý tưởng lượng tử của Max Planck. Einstein đề xuất ánh sáng không chỉ lan truyền như sóng mà còn tồn tại dưới dạng các "gói năng lượng" rời rạc gọi là photon, mỗi photon mang năng lượng E = hf (h là hằng số Planck, f là tần số). Một photon va chạm với một electron, truyền toàn bộ năng lượng cho nó. Công thức Einstein: KE_max = hf - φ (φ là công thoát).

Giải thích này cực kỳ cách mạng: nó chứng minh ánh sáng có tính chất hạt, không chỉ sóng - khái niệm "lưỡng tính sóng-hạt" của ánh sáng. Einstein nhận giải Nobel Vật lý 1921 cho công trình này (không phải cho tương đối!). Hiệu ứng quang điện là nền tảng cho: tế bào quang điện, camera kỹ thuật số, pin mặt trời, ống nhân quang (photomultiplier), và cả cơ học lượng tử hiện đại.`,
      year: 1905,
      isBc: false,
      importanceLevel: 5,
      source: 'Albert Einstein - On a Heuristic Viewpoint Concerning the Production and Transformation of Light',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: germanyCountry ? {
        create: [{ countryId: germanyCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 4. Nguyên lý bất định Heisenberg
  const uncertaintyPrinciple = await prisma.knowledgeEntry.create({
    data: {
      title: 'Nguyên lý bất định Heisenberg',
      description: 'Không thể đồng thời đo chính xác vị trí và động lượng',
      content: `Nguyên lý bất định (Uncertainty Principle) của Werner Heisenberg, công bố năm 1927, là một trong những khám phá sâu sắc và gây tranh cãi nhất của cơ học lượng tử. Nguyên lý này phát biểu rằng: "Không thể đồng thời xác định chính xác cả vị trí và động lượng của một hạt", được biểu diễn bằng bất đẳng thức: Δx · Δp ≥ ℏ/2 (ℏ là hằng số Planck rút gọn). Tương tự, không thể đồng thời đo chính xác năng lượng và thời gian: ΔE · Δt ≥ ℏ/2.

Điều quan trọng là đây KHÔNG phải do hạn chế của thiết bị đo hay kỹ thuật thực nghiệm. Đây là giới hạn cơ bản của tự nhiên! Heisenberg chứng minh rằng bản thân hành động đo lường (ví dụ dùng photon để "nhìn" electron) sẽ làm nhiễu loạn hệ thống. Nhưng sâu xa hơn, nguyên lý bất định phản ánh bản chất sóng-hạt của vật chất: một hạt không phải là "viên bi nhỏ" có vị trí và vận tốc xác định, mà là một "hàm sóng" lan tỏa trong không gian.

Nguyên lý này đã gây chấn động cộng đồng vật lý. Einstein không hài lòng, nói câu nổi tiếng "Thượng Đế không chơi xúc xắc" (God does not play dice), và dành 30 năm cố gắng chứng minh cơ học lượng tử không hoàn chỉnh. Heisenberg và Niels Bohr phản bác rằng đây là bản chất của thực tại, không phải thiếu sót của lý thuyết. Các thí nghiệm sau này đã xác nhận Heisenberg đúng.

Nguyên lý bất định có hậu quả sâu xa: (1) Electron không "rơi" vào hạt nhân vì bất định vị trí ngăn chúng ở quá gần. (2) Chân không lượng tử không thực sự "trống rỗng" mà liên tục sinh ra các cặp hạt-phản hạt ảo. (3) Hạt có thể xuyên qua rào cản năng lượng (quantum tunneling) - hiện tượng này giải thích phân rã alpha, hoạt động của kính hiển vi hiệu ứng xuyên hầm, và là cơ chế cho phản ứng nhiệt hạch trong Mặt Trời. Nguyên lý bất định là nền tảng triết học của cơ học lượng tử và thách thức quan niệm tất định luận về vũ trụ.`,
      year: 1927,
      isBc: false,
      importanceLevel: 5,
      source: 'Werner Heisenberg',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: germanyCountry ? {
        create: [{ countryId: germanyCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 5. Siêu dẫn
  const superconductivity = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hiện tượng siêu dẫn',
      description: 'Vật liệu có điện trở bằng không ở nhiệt độ thấp',
      content: `Siêu dẫn (Superconductivity) là hiện tượng kỳ diệu khi một số vật liệu mất hoàn toàn điện trở khi được làm lạnh xuống dưới nhiệt độ tới hạn (critical temperature). Heike Kamerlingh Onnes phát hiện siêu dẫn năm 1911 tại Leiden, Hà Lan, khi ông làm lạnh thủy ngân xuống 4.2 Kelvin (-269°C) và thấy điện trở đột ngột giảm về không. Đây là một trong những khám phá bất ngờ nhất trong vật lý.

Vật liệu siêu dẫn có hai tính chất kỳ diệu: (1) Điện trở bằng không: dòng điện có thể chạy mãi mãi trong vòng siêu dẫn không cần nguồn năng lượng. (2) Hiệu ứng Meissner (1933): siêu dẫn đẩy từ trường ra ngoài hoàn toàn, khiến nam châm có thể "lơ lửng" trên vật siêu dẫn. Walther Meissner phát hiện rằng siêu dẫn không chỉ là "dẫn điện hoàn hảo" mà là một pha vật chất hoàn toàn mới.

Phải mất 46 năm (đến 1957) các nhà vật lý John Bardeen, Leon Cooper, và Robert Schrieffer mới đưa ra lý thuyết BCS giải thích siêu dẫn. Theo BCS, ở nhiệt độ thấp, các electron tạo thành "cặp Cooper" thông qua tương tác với mạng tinh thể. Các cặp này hành xử như boson và ngưng tụ vào cùng trạng thái lượng tử, di chuyển đồng bộ không va chạm với mạng tinh thể - do đó không có điện trở. Ba ông nhận Nobel 1972 cho thành tựu này.

Năm 1986, Georg Bednorz và Alex Müller phát hiện vật liệu siêu dẫn nhiệt độ cao (high-temperature superconductors) - gốm ceramic siêu dẫn ở 35K, sau này tìm được vật liệu siêu dẫn ở 138K. Điều này mở ra hy vọng về siêu dẫn ở nhiệt độ phòng. Ứng dụng siêu dẫn: MRI trong y học, nam châm khổng lồ của Large Hadron Collider, tàu đệm từ (maglev), cáp truyền tải điện không tổn hao, máy tính lượng tử, và SQUID (thiết bị đo từ trường cực nhạy).`,
      year: 1911,
      isBc: false,
      importanceLevel: 5,
      source: 'Heike Kamerlingh Onnes, BCS Theory',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 6. Bức xạ Hawking
  const hawkingRadiation = await prisma.knowledgeEntry.create({
    data: {
      title: 'Bức xạ Hawking',
      description: 'Lỗ đen phát ra bức xạ và bay hơi',
      content: `Bức xạ Hawking (Hawking Radiation) là một trong những dự đoán lý thuyết sâu sắc nhất của vật lý hiện đại, được Stephen Hawking phát hiện năm 1974. Trước đó, người ta tin rằng lỗ đen (black hole) là "đen tuyệt đối" - không gì có thể thoát ra, kể cả ánh sáng. Nhưng Hawking chứng minh rằng khi áp dụng cơ học lượng tử vào lỗ đen, chúng thực sự phát ra bức xạ và từ từ "bay hơi" (evaporate)!

Cơ chế hoạt động dựa trên hiệu ứng lượng tử gần chân trời sự kiện (event horizon) của lỗ đen. Theo nguyên lý bất định Heisenberg, chân không lượng tử liên tục tạo ra các cặp hạt-phản hạt ảo. Thường thì chúng sinh ra và hủy nhau ngay lập tức. Nhưng gần lỗ đen, một hạt có thể rơi vào lỗ đen trong khi hạt kia thoát ra ngoài. Hạt thoát ra trở thành bức xạ Hawking - từ bên ngoài nhìn vào, lỗ đen như đang phát ra bức xạ.

Nhiệt độ bức xạ Hawking tỷ lệ nghịch với khối lượng lỗ đen: T ∝ 1/M. Lỗ đen khổng lồ (như ở trung tâm thiên hà) có nhiệt độ cực thấp (~10⁻¹⁷ K), nhỏ hơn nhiều so với bức xạ nền vũ trụ (2.7K), nên không thể quan sát được. Nhưng lỗ đen nhỏ (nếu tồn tại) sẽ nóng và phát sáng mạnh, cuối cùng phát nổ trong một vụ nổ gamma. Một lỗ đen có khối lượng bằng núi sẽ bay hơi hết trong khoảng 10¹⁰ năm.

Bức xạ Hawking kết nối ba lĩnh vực vĩ đại của vật lý: thuyết tương đối rộng (lỗ đen), cơ học lượng tử (hiệu ứng lượng tử), và nhiệt động lực học (entropy lỗ đen). Nó dẫn đến "nghịch lý thông tin lỗ đen" (black hole information paradox): nếu lỗ đen bay hơi, thông tin của vật chất rơi vào đi đâu? Câu hỏi này vẫn là một trong những bí ẩn lớn nhất của vật lý lý thuyết, liên quan đến việc xây dựng lý thuyết lượng tử hóa hấp dẫn (quantum gravity) - Thánh chén của vật lý hiện đại.`,
      year: 1974,
      isBc: false,
      importanceLevel: 5,
      source: 'Stephen Hawking',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: ukCountry ? {
        create: [{ countryId: ukCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 7. Laser
  const laser = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát minh Laser',
      description: 'Ánh sáng khuếch đại bằng phát xạ kích thích',
      content: `LASER (Light Amplification by Stimulated Emission of Radiation - Khuếch đại ánh sáng bằng phát xạ kích thích) là một trong những phát minh quan trọng nhất thế kỷ 20. Nền tảng lý thuyết được Albert Einstein đặt ra năm 1917 khi ông dự đoán "phát xạ kích thích" (stimulated emission): một photon có thể kích thích nguyên tử ở trạng thái kích thích phát ra một photon thứ hai giống hệt (cùng tần số, pha, và hướng).

Charles Townes và các đồng nghiệp chế tạo MASER (Microwave Amplification by Stimulated Emission of Radiation) đầu tiên năm 1954 - phiên bản vi sóng của laser. Theodore Maiman tại Hughes Research Laboratories chế tạo laser đầu tiên ngày 16 tháng 5 năm 1960, sử dụng tinh thể ruby. Khi ánh sáng flash lamp kích thích các nguyên tử chromium trong ruby, chúng phát ra chùm ánh sáng đỏ đơn sắc, kết hợp (coherent) và song song hoàn hảo.

Laser có những tính chất độc đáo: (1) Đơn sắc: chỉ một bước sóng duy nhất. (2) Kết hợp: các sóng ánh sáng đồng pha. (3) Định hướng: chùm song song, hầu như không phân kỳ. (4) Cường độ cao: có thể tập trung năng lượng vào một điểm cực nhỏ. Ban đầu laser được gọi là "giải pháp đang tìm vấn đề", nhưng nhanh chóng tìm thấy vô số ứng dụng.

Ngày nay laser có mặt khắp nơi: đọc/ghi CD, DVD, Blu-ray; truyền dữ liệu qua cáp quang Internet; mã vạch siêu thị; máy in laser; phẫu thuật mắt LASIK; cắt/hàn kim loại trong công nghiệp; đo khoảng cách (LIDAR, laser rangefinder); nghiên cứu khoa học (quang phổ, làm lạnh nguyên tử, nhiệt hạch quán tính); vũ khí laser; và thậm chí nghệ thuật (laser show). Laser đã cách mạng hóa y học, viễn thông, sản xuất, và nghiên cứu. Townes, Basov và Prokhorov nhận Nobel Vật lý 1964 cho công trình về laser và maser.`,
      year: 1960,
      isBc: false,
      importanceLevel: 5,
      source: 'Theodore Maiman, Charles Townes',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 8. Thuyết Big Bang
  const bigBang = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết Big Bang',
      description: 'Vũ trụ bắt đầu từ một điểm nóng và đặc',
      content: `Thuyết Big Bang (Big Bang Theory) là mô hình khoa học được chấp nhận rộng rãi nhất về nguồn gốc và tiến hóa của vũ trụ. Theo thuyết này, vũ trụ bắt đầu từ một trạng thái cực nóng và cực đặc khoảng 13.8 tỷ năm trước, sau đó giãn nở và làm lạnh để tạo ra vũ trụ như chúng ta thấy ngày nay.

Georges Lemaître, một linh mục và nhà vật lý người Bỉ, đề xuất ý tưởng này lần đầu năm 1927, gọi là "giả thuyết nguyên tử nguyên thủy" (primeval atom hypothesis). Ông dựa trên nghiệm của phương trình trường Einstein và quan sát của Edwin Hubble (1929) rằng các thiên hà xa đang lùi xa chúng ta - vũ trụ đang giãn nở! Nếu tua ngược thời gian, vũ trụ phải từng rất nhỏ và nóng.

Bằng chứng quyết định cho Big Bang là phát hiện Bức xạ nền vũ trụ (Cosmic Microwave Background - CMB) năm 1964 bởi Arno Penzias và Robert Wilson. Đây là "dư âm" của vụ nổ Big Bang - bức xạ từ thời vũ trụ mới 380,000 tuổi, khi đủ nguội để photon tách ra khỏi vật chất. CMB có nhiệt độ 2.725K và đồng nhất gần như hoàn hảo trong mọi hướng, đúng như dự đoán. Penzias và Wilson nhận Nobel 1978.

Các bằng chứng khác: (1) Tỷ lệ nguyên tố nhẹ (H, He, Li) khớp với dự đoán từ nucleosynthesis trong 3 phút đầu. (2) Sự phân bố cấu trúc lớn của vũ trụ. (3) Quan sát sự tiến hóa của thiên hà theo thời gian. Thuyết Big Bang kết hợp với lý thuyết lạm phát vũ trụ (cosmic inflation) và năng lượng tối, vật chất tối tạo nên mô hình Lambda-CDM - "mô hình chuẩn" của vũ trụ học. Tuy nhiên vẫn còn nhiều bí ẩn: điều gì xảy ra trước Big Bang? Tại sao có Big Bang? Số phận cuối cùng của vũ trụ?`,
      year: 1927,
      isBc: false,
      importanceLevel: 5,
      source: 'Georges Lemaître, Edwin Hubble, Penzias & Wilson',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 9. Transistor
  const transistor = await prisma.knowledgeEntry.create({
    data: {
      title: 'Phát minh Transistor',
      description: 'Thiết bị bán dẫn khuếch đại và chuyển mạch',
      content: `Transistor là một trong những phát minh quan trọng nhất mọi thời đại, là nền tảng của cách mạng điện tử và thời đại thông tin. Transistor đầu tiên được phát minh bởi John Bardeen, Walter Brattain, và William Shockley tại Bell Labs ngày 16 tháng 12 năm 1947. Ba ông nhận giải Nobel Vật lý 1956 cho phát minh này. Transistor là thiết bị bán dẫn có thể khuếch đại tín hiệu điện hoặc hoạt động như công tắc điện tử.

Trước transistor, các thiết bị điện tử sử dụng đèn chân không (vacuum tubes) - cồng kềnh, tốn điện, nóng, dễ hỏng. Transistor nhỏ gọn hơn, tiêu thụ ít điện hơn, không nóng, và bền hơn hàng nghìn lần. Ban đầu làm từ germanium, sau này chuyển sang silicon - nguyên liệu phong phú và dễ tinh chế. Transistor hoạt động dựa trên việc kiểm soát dòng điện bằng điện áp đặt vào cực gate (với transistor hiệu ứng trường FET) hoặc cực base (với transistor lưỡng cực BJT).

Transistor đã mở đường cho miniaturization (thu nhỏ hóa). Năm 1958, Jack Kilby phát minh mạch tích hợp (IC) - tích hợp nhiều transistor trên một chip silicon duy nhất. Định luật Moore (1965) dự đoán số lượng transistor trên chip tăng gấp đôi mỗi 2 năm - điều này đã đúng trong hơn 50 năm! Ngày nay, một chip vi xử lý hiện đại chứa hàng tỷ transistor, mỗi cái chỉ vài nanometer.

Transistor là "nguyên tử" của thời đại kỹ thuật số. Mọi thiết bị điện tử đều chứa transistor: điện thoại, máy tính, TV, ô tô, máy bay, vệ tinh, thiết bị y tế. Internet, smartphone, AI, tất cả đều không thể tồn tại nếu không có transistor. Ước tính hơn 13 sextillion (13×10²¹) transistor đã được sản xuất đến nay - nhiều hơn tất cả các hạt gạo, kiến, hay lá cây trên Trái Đất! Transistor thực sự đã thay đổi văn minh nhân loại.`,
      year: 1947,
      isBc: false,
      importanceLevel: 5,
      source: 'Bardeen, Brattain, Shockley - Bell Labs',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 10. Hiệu ứng Doppler
  const dopplerEffect = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hiệu ứng Doppler',
      description: 'Thay đổi tần số do chuyển động tương đối',
      content: `Hiệu ứng Doppler (Doppler Effect) là hiện tượng thay đổi tần số (hay bước sóng) của sóng do chuyển động tương đối giữa nguồn phát sóng và người quan sát, được Christian Doppler phát hiện năm 1842. Ví dụ kinh điển: khi xe cứu thương chạy lại gần, tiếng còi nghe cao hơn bình thường, và khi chạy xa, tiếng nghe thấp hơn. Điều này xảy ra vì sóng âm bị "nén" khi nguồn tiến lại gần và "giãn" khi nguồn lùi xa.

Doppler lần đầu phát biểu hiệu ứng này trong bài giảng "Über das farbige Licht der Doppelsterne" (Về ánh sáng màu của các sao đôi) tại Prague. Ông dự đoán rằng màu sắc của ngôi sao phụ thuộc vào chuyển động của nó: sao tiến lại gần sẽ chuyển dịch xanh (blueshift), sao lùi xa sẽ chuyển dịch đỏ (redshift). Buys Ballot thực nghiệm xác minh hiệu ứng Doppler cho âm thanh năm 1845 bằng cách dùng kèn trumpet trên tàu hỏa đang chạy!

Công thức Doppler cho sóng: f' = f × (v ± v_observer)/(v ∓ v_source), trong đó v là vận tốc sóng. Đối với ánh sáng trong tương đối hẹp, công thức phức tạp hơn và dẫn đến hiệu ứng Doppler tương đối tính: f' = f × √[(1-β)/(1+β)] với β = v/c. Edwin Hubble sử dụng hiệu ứng Doppler năm 1929 để phát hiện ra vũ trụ đang giãn nở - các thiên hà xa có redshift, nghĩa là đang lùi xa ta.

Ứng dụng hiệu ứng Doppler vô cùng rộng rãi: (1) Thiên văn học: đo vận tốc ngôi sao, phát hiện hành tinh ngoài hệ Mặt Trời, chứng minh vũ trụ giãn nở. (2) Y học: siêu âm Doppler đo lưu lượng máu, tim thai. (3) Radar: đo tốc độ xe (súng bắn tốc độ cảnh sát), dự báo thời tiết (Doppler radar). (4) Vệ tinh GPS: hiệu chỉnh tín hiệu. (5) Quân sự: dò tìm tàu ngầm, tên lửa. Hiệu ứng Doppler là cầu nối giữa sóng cổ điển và vũ trụ học hiện đại.`,
      year: 1842,
      isBc: false,
      importanceLevel: 5,
      source: 'Christian Doppler',
      categories: {
        create: [{ categoryId: physicsCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  console.log('✅ Additional physics seeding completed!');
  console.log('Created 10 new physics knowledge entries:');
  console.log('1. Ba định luật Kepler về chuyển động hành tinh');
  console.log('2. Định luật Coulomb về lực điện');
  console.log('3. Hiệu ứng quang điện');
  console.log('4. Nguyên lý bất định Heisenberg');
  console.log('5. Hiện tượng siêu dẫn');
  console.log('6. Bức xạ Hawking');
  console.log('7. Phát minh Laser');
  console.log('8. Thuyết Big Bang');
  console.log('9. Phát minh Transistor');
  console.log('10. Hiệu ứng Doppler');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
