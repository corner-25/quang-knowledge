import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding additional geography knowledge...');

  // Get existing categories and countries
  const geographyCategory = await prisma.category.findUnique({
    where: { name: 'Địa lý' }
  });

  if (!geographyCategory) {
    throw new Error('Geography category not found. Please run seed.ts first.');
  }

  const greeceCountry = await prisma.country.findUnique({ where: { name: 'Hy Lạp' } });
  const chinaCountry = await prisma.country.findUnique({ where: { name: 'Trung Quốc' } });
  const usaCountry = await prisma.country.findUnique({ where: { name: 'Hoa Kỳ' } });
  const ukCountry = await prisma.country.findUnique({ where: { name: 'Anh' } });
  const germanyCountry = await prisma.country.findUnique({ where: { name: 'Đức' } });

  // Create 10 new geography knowledge entries

  const tectonic = await prisma.knowledgeEntry.create({
    data: {
      title: 'Thuyết kiến tạo mảng',
      description: 'Lý thuyết về sự chuyển động của các mảng thạch quyển',
      content: `Thuyết kiến tạo mảng (Plate Tectonics) là lý thuyết địa chất giải thích cấu trúc và chuyển động của lớp vỏ Trái Đất. Lý thuyết này được phát triển vào những năm 1960, dựa trên học thuyết trôi dạt lục địa của Alfred Wegener (1912) và các bằng chứng từ địa chất biển sâu. Thuyết kiến tạo mảng cho rằng lớp thạch quyển của Trái Đất được chia thành 7-8 mảng lớn và nhiều mảng nhỏ hơn, chuyển động trên lớp quyển mềm bên dưới với tốc độ vài centimét mỗi năm.

Các mảng kiến tạo tương tác với nhau theo ba cách chính: ranh giới phân kỳ (divergent boundaries) nơi các mảng tách ra khỏi nhau tạo thành vỏ đại dương mới như ở sống núi giữa Đại Tây Dương; ranh giới hội tụ (convergent boundaries) nơi các mảng va chạm vào nhau tạo thành núi non như dãy Himalaya hoặc gây ra hiện tượng hút chìm (subduction) như ở rãnh Mariana; và ranh giới chuyển dạng (transform boundaries) nơi các mảng trượt ngang qua nhau như đứt gãy San Andreas ở California. Những tương tác này giải thích phần lớn các hoạt động địa chất như động đất, núi lửa, và sự hình thành núi non.

Thuyết kiến tạo mảng đã cách mạng hóa khoa học Trái Đất, cung cấp khuôn khổ thống nhất để hiểu về địa chất, địa lý, và lịch sử Trái Đất. Lý thuyết này giải thích tại sao các đại dương và lục địa có hình dạng như hiện nay, tại sao các hóa thạch tương tự được tìm thấy ở các lục địa xa nhau, và tại sao hoạt động địa chất tập trung ở một số khu vực nhất định. Nó cũng giúp dự đoán rủi ro động đất và núi lửa, quan trọng cho việc lập kế hoạch đô thị và giảm thiểu thảm họa.

Nghiên cứu hiện đại sử dụng GPS và vệ tinh để đo chính xác sự chuyển động của các mảng, xác nhận lý thuyết với độ chính xác cao. Dữ liệu này không chỉ giúp hiểu rõ hơn về quá khứ địa chất mà còn dự đoán sự thay đổi trong tương lai của bề mặt Trái Đất, từ sự hình thành các siêu lục địa mới đến sự tiến hóa của các lưu vực đại dương.`,
      year: 1960,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Harry Hess, J. Tuzo Wilson, Alfred Wegener',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  const glaciers = await prisma.knowledgeEntry.create({
    data: {
      title: 'Kỷ băng hà',
      description: 'Các thời kỳ băng giá bao phủ Trái Đất',
      content: `Kỷ băng hà (Ice Ages) là các thời kỳ kéo dài trong lịch sử Trái Đất khi nhiệt độ toàn cầu giảm đáng kể, dẫn đến sự mở rộng của các tảng băng lục địa và băng hà. Kỷ băng hà gần đây nhất, được gọi là Kỷ băng hà Pleistocene, bắt đầu khoảng 2.6 triệu năm trước và kết thúc khoảng 11,700 năm trước. Trong thời kỳ này, băng đã bao phủ khoảng 30% bề mặt Trái Đất, so với khoảng 10% hiện nay. Các nhà khoa học như Louis Agassiz vào thế kỷ 19 đã đi tiên phong trong việc nhận diện bằng chứng về các kỷ băng hà cổ đại.

Nguyên nhân của kỷ băng hà rất phức tạp và liên quan đến nhiều yếu tố. Chu kỳ Milankovitch, được đặt theo tên nhà khoa học Serbia Milutin Milanković, mô tả những thay đổi tuần hoàn trong quỹ đạo Trái Đất quanh Mặt Trời, độ nghiêng của trục Trái Đất, và sự tiến động của trục. Những chu kỳ này, với thời gian từ 23,000 đến 100,000 năm, ảnh hưởng đến lượng bức xạ mặt trời mà Trái Đất nhận được, gây ra các thay đổi khí hậu dài hạn. Ngoài ra, các yếu tố như nồng độ khí CO2 trong khí quyển, dòng hải lưu, và hoạt động núi lửa cũng đóng vai trò quan trọng.

Các kỷ băng hà đã có tác động sâu rộng đến địa lý và sự sống trên Trái Đất. Băng hà đã chạm khắc các thung lũng hình chữ U, hồ băng hà, và các moraine (đống đá do băng hà để lại). Mực nước biển đã hạ xuống đến 120 mét so với hiện nay, tạo ra các cầu đất như Bering Land Bridge, cho phép con người và động vật di cư giữa các lục địa. Các loài sinh vật phải thích nghi hoặc di cư để tồn tại, dẫn đến sự tiến hóa của nhiều loài mới bao gồm voi ma mút lông dài và sư tử hang động.

Hiểu về kỷ băng hà cung cấp bối cảnh quan trọng cho biến đổi khí hậu hiện nay. Bằng cách nghiên cứu lõi băng từ Greenland và Antarctica, các nhà khoa học có thể tái tạo khí hậu quá khứ và hiểu cách hệ thống khí hậu Trái Đất phản ứng với các thay đổi. Dữ liệu này cho thấy rằng biến đổi khí hậu do con người gây ra hiện nay đang xảy ra với tốc độ chưa từng có, nhanh hơn nhiều so với các chu kỳ tự nhiên.`,
      year: 11700,
      isBc: true,
      approximateDate: true,
      importanceLevel: 4,
      source: 'Louis Agassiz, Milutin Milanković',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const monsoon = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hệ thống gió mùa',
      description: 'Gió mùa và ảnh hưởng của nó đến khí hậu châu Á',
      content: `Hệ thống gió mùa (Monsoon System) là một trong những hiện tượng khí hậu quan trọng nhất trên Trái Đất, đặc biệt ảnh hưởng đến Nam Á, Đông Nam Á, và Đông Á. Thuật ngữ "monsoon" có nguồn gốc từ từ tiếng Ả Rập "mawsim" có nghĩa là mùa. Gió mùa được đặc trưng bởi sự đảo chiều theo mùa của gió thịnh hành, mang theo sự thay đổi mạnh mẽ về lượng mưa. Vào mùa hè, gió mùa thổi từ đại dương vào lục địa, mang theo độ ẩm và mưa lớn; vào mùa đông, gió thổi từ lục địa ra biển, tạo ra thời tiết khô ráo.

Cơ chế của gió mùa liên quan đến sự khác biệt nhiệt độ giữa đất liền và đại dương. Trong mùa hè Bắc Bán cầu, lục địa châu Á nóng lên nhanh hơn Ấn Độ Dương, tạo ra vùng áp suất thấp trên đất liền. Không khí ẩm từ đại dương được hút vào để lấp đầy khoảng trống này, mang theo mưa phong phú. Sự hiện diện của dãy Himalaya cũng đóng vai trò quan trọng, ngăn chặn không khí lạnh từ phía bắc và tạo điều kiện cho gió mùa phát triển. Edmund Halley vào thế kỷ 17 đã đưa ra một trong những giải thích khoa học đầu tiên về cơ chế gió mùa.

Gió mùa có ảnh hưởng sâu rộng đến đời sống hàng tỷ người ở châu Á. Nông nghiệp, đặc biệt là trồng lúa, phụ thuộc cao vào lượng mưa mùa mùa. Ở Ấn Độ, khoảng 70% lượng mưa hàng năm đến từ gió mùa mùa hè, nuôi sống hơn một tỷ người. Tuy nhiên, sự biến đổi của gió mùa cũng có thể gây ra lũ lụt tàn phá hoặc hạn hán nghiêm trọng. Lũ lụt năm 2010 ở Pakistan, một trong những thảm họa tự nhiên tồi tệ nhất lịch sử, là kết quả của mưa gió mùa cực đoan.

Biến đổi khí hậu đang ảnh hưởng đến hành vi của gió mùa. Nghiên cứu cho thấy rằng mưa gió mùa đang trở nên bất thường hơn, với các đợt mưa cực đoan tăng lên trong khi tổng thời gian mùa mưa có thể rút ngắn. Hiểu và dự đoán gió mùa là ưu tiên hàng đầu cho nghiên cứu khí hậu, với các mô hình máy tính phức tạp và mạng lưới quan sát toàn cầu được sử dụng để cải thiện dự báo và giúp các quốc gia chuẩn bị tốt hơn cho những thay đổi.`,
      year: 1686,
      isBc: false,
      approximateDate: true,
      importanceLevel: 4,
      source: 'Edmund Halley',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: ukCountry ? {
        create: [{ countryId: ukCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  const desertification = await prisma.knowledgeEntry.create({
    data: {
      title: 'Hiện tượng sa mạc hóa',
      description: 'Quá trình suy thoái đất và mở rộng của sa mạc',
      content: `Hiện tượng sa mạc hóa (Desertification) là quá trình suy thoái đất ở các khu vực khô hạn, bán khô hạn, và bán ẩm khô, chủ yếu do hoạt động của con người và biến đổi khí hậu. Thuật ngữ này được đặt ra bởi nhà lâm học người Pháp André Aubréville vào năm 1949 khi ông quan sát sự suy thoái rừng nhiệt đới ở Tây Phi. Sa mạc hóa không đơn thuần là sự mở rộng của sa mạc hiện có, mà là sự mất đi năng suất sinh học của đất do mất lớp phủ thực vật, xói mòn đất, và mất độ ẩm.

Nguyên nhân chính của sa mạc hóa bao gồm chăn thả quá mức (overgrazing), nông nghiệp không bền vững, phá rừng, và quản lý nước kém. Khi thảm thực vật bị loại bỏ, đất trở nên dễ bị xói mòn bởi gió và nước. Chu kỳ phản hồi âm phát triển: ít thực vật dẫn đến ít mưa (do ít bay hơi), dẫn đến ít thực vật hơn nữa. Sahel ở Châu Phi, một dải đất nằm phía nam sa mạc Sahara, là một trong những khu vực bị ảnh hưởng nặng nề nhất, với hạn hán tàn khốc vào những năm 1970-1980 gây ra nạn đói cho hàng triệu người.

Sa mạc hóa ảnh hưởng đến khoảng 1 tỷ người ở hơn 100 quốc gia, đặc biệt ở Châu Phi, Trung Đông, và Trung Á. Nó đe dọa an ninh lương thực, làm tăng nghèo đói, và buộc người dân di cư. Liên Hợp Quốc ước tính rằng 12 triệu hecta đất bị mất mỗi năm do sa mạc hóa và hạn hán. Great Green Wall, một sáng kiến tham vọng của Liên minh Châu Phi khởi động năm 2007, nhằm trồng một "bức tường" cây xanh dài 8,000 km ngang qua Sahel để chống lại sa mạc hóa.

Chiến lược chống sa mạc hóa bao gồm quản lý đất bền vững, phục hồi thảm thực vật, quản lý nước tốt hơn, và phát triển sinh kế thay thế cho cộng đồng địa phương. Công nghệ như viễn thám vệ tinh giúp theo dõi sự thay đổi của lớp phủ đất và xác định các khu vực nguy cơ cao. Nghiên cứu cũng khám phá các kỹ thuật mới như sử dụng biochar (than sinh học) để cải thiện độ giữ nước của đất và sử dụng các loài cây bản địa chịu hạn.`,
      year: 1949,
      isBc: false,
      approximateDate: true,
      importanceLevel: 4,
      source: 'André Aubréville',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const oceancurrents = await prisma.knowledgeEntry.create({
    data: {
      title: 'Dòng hải lưu toàn cầu',
      description: 'Hệ thống tuần hoàn đại dương và ảnh hưởng khí hậu',
      content: `Dòng hải lưu toàn cầu (Global Ocean Currents), còn được gọi là "băng chuyền đại dương" (ocean conveyor belt) hoặc tuần hoàn nhiệt muối (thermohaline circulation), là một hệ thống liên kết các dòng nước khổng lồ di chuyển qua tất cả các đại dương trên Trái Đất. Hệ thống này được điều khiển bởi sự khác biệt về nhiệt độ (thermo-) và độ mặn (haline) của nước biển. Benjamin Franklin đã tạo ra một trong những bản đồ đầu tiên về dòng Gulf Stream vào năm 1770, sau khi ngư dân cá voi chia sẻ kiến thức của họ về dòng chảy này.

Dòng hải lưu hoạt động thông qua quá trình phức tạp. Ở vùng cực, nước lạnh và mặn (do hình thành băng đẩy muối ra ngoài) trở nên đặc hơn và chìm xuống đáy đại dương, tạo ra "nước sâu" (deep water). Nước này sau đó chảy về phía xích đạo ở tầng sâu, trong khi nước ấm hơn từ nhiệt đới di chuyển về phía cực ở bề mặt để thay thế. Quá trình này tạo ra một vòng tuần hoàn toàn cầu mất khoảng 1,000 năm để hoàn thành một chu kỳ đầy đủ.

Dòng hải lưu đóng vai trò quan trọng trong việc điều hòa khí hậu Trái Đất. Chúng vận chuyển nhiệt từ xích đạo đến các vùng cực, giúp làm ấm các khu vực như Bắc Âu. Gulf Stream mang nước ấm từ Vùng Vịnh Mexico đến Bắc Đại Tây Dương, làm cho khí hậu Anh và Na Uy ấm hơn nhiều so với các khu vực khác ở cùng vĩ độ. Nếu không có Gulf Stream, nhiệt độ trung bình ở Tây Âu có thể giảm 5-10°C. Dòng hải lưu cũng phân phối chất dinh dưỡng, oxy, và sinh vật biển, hỗ trợ các hệ sinh thái đại dương.

Biến đổi khí hậu đe dọa làm gián đoạn hệ thống dòng hải lưu. Sự tan băng ở Greenland và Arctic đang thêm nước ngọt vào Bắc Đại Tây Dương, có thể làm giảm sự hình thành nước sâu và làm chậm AMOC (Atlantic Meridional Overturning Circulation), một phần quan trọng của băng chuyền đại dương. Nghiên cứu cho thấy AMOC đã yếu đi khoảng 15% kể từ giữa thế kỷ 20. Sự sụp đổ của AMOC có thể gây ra hậu quả thảm khốc, bao gồm giảm nhiệt độ ở Bắc Âu, thay đổi mô hình mưa toàn cầu, và ảnh hưởng đến nghề cá.`,
      year: 1770,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Benjamin Franklin, Henry Stommel',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  const karst = await prisma.knowledgeEntry.create({
    data: {
      title: 'Địa hình karst',
      description: 'Cảnh quan đá vôi và các hang động',
      content: `Địa hình karst là một kiểu địa hình đặc biệt hình thành do sự hòa tan của các loại đá có thể hòa tan như đá vôi, đá thạch cao, và đá dolomite. Thuật ngữ "karst" có nguồn gốc từ vùng Karst ở Slovenia, nơi địa hình này được nghiên cứu chi tiết đầu tiên vào thế kỷ 19. Các đặc điểm tiêu biểu của địa hình karst bao gồm hang động, hố sụt (sinkholes), dòng nước ngầm, núi đá vôi nhọn, và thung lũng khô. Jovan Cvijić, nhà địa lý người Serbia, được coi là người đặt nền móng cho nghiên cứu khoa học về địa hình karst vào cuối thế kỷ 19.

Quá trình hình thành karst bắt đầu khi nước mưa, vốn hơi có tính axit do hấp thụ CO2 từ khí quyển, thấm vào các khe nứt trong đá vôi. Khi nước axit này hòa tan đá vôi (CaCO3), nó tạo ra canxi bicarbonat tan trong nước. Qua hàng nghìn năm, quá trình này mở rộng các khe nứt thành các kênh và hang động lớn. Stalactites (nhũ đá treo từ trần) và stalagmites (măng đá mọc từ sàn) hình thành khi nước giàu khoáng chất nhỏ giọt và để lại canxi carbonat. Vịnh Hạ Long ở Việt Nam và Guilin ở Trung Quốc là những ví dụ nổi tiếng của địa hình karst tháp (tower karst).

Địa hình karst chiếm khoảng 10-20% bề mặt đất liền của Trái Đất và là nguồn nước ngầm quan trọng cho hàng trăm triệu người. Tuy nhiên, hệ thống karst rất dễ bị ô nhiễm vì nước có thể di chuyển nhanh qua các kênh lớn mà không được lọc như trong đất thông thường. Các hố sụt có thể xuất hiện đột ngột khi trần của hang động ngầm sụp đổ, gây nguy hiểm cho cơ sở hạ tầng. Ví dụ nổi tiếng là hố sụt Xiaozhai Tiankeng ở Trung Quốc, sâu 662 mét và rộng 626 mét.

Địa hình karst cũng có giá trị khoa học và văn hóa to lớn. Hang động karst chứa đựng hồ sơ khí hậu quý giá trong các stalagmite, giúp các nhà khoa học tái tạo khí hậu quá khứ qua hàng trăm nghìn năm. Nhiều hang động karst chứa nghệ thuật hang động cổ đại và hóa thạch quan trọng. Mammoth Cave ở Kentucky, Hoa Kỳ, là hệ thống hang động dài nhất thế giới với hơn 650 km đường hầm được khám phá. Bảo vệ địa hình karst là quan trọng không chỉ cho tài nguyên nước mà còn cho đa dạng sinh học độc đáo trong các hang động.`,
      year: 1893,
      isBc: false,
      approximateDate: true,
      importanceLevel: 3,
      source: 'Jovan Cvijić',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const urbanization = await prisma.knowledgeEntry.create({
    data: {
      title: 'Đô thị hóa toàn cầu',
      description: 'Quá trình tăng trưởng và mở rộng đô thị',
      content: `Đô thị hóa (Urbanization) là quá trình tập trung dân số trong các khu vực đô thị và sự chuyển đổi từ xã hội nông thôn sang xã hội đô thị. Cách mạng Công nghiệp ở thế kỷ 18-19 đã khởi đầu đợt đô thị hóa đại quy mô đầu tiên, khi mọi người di cư từ nông thôn đến thành phố để tìm việc làm trong các nhà máy. Năm 1800, chỉ khoảng 3% dân số thế giới sống ở thành phố; đến năm 2007, lần đầu tiên trong lịch sử, hơn một nửa dân số thế giới sống ở khu vực đô thị. Liên Hợp Quốc dự đoán rằng tỷ lệ này sẽ tăng lên 68% vào năm 2050.

Đô thị hóa diễn ra với tốc độ khác nhau trên khắp thế giới. Châu Âu và Bắc Mỹ đã đô thị hóa vào thế kỷ 19-20, trong khi Châu Á và Châu Phi đang trải qua đô thị hóa nhanh chóng hiện nay. Megacity (siêu đô thị) - các thành phố với dân số trên 10 triệu người - đã tăng từ 2 năm 1950 (New York và Tokyo) lên 33 năm 2018. Tokyo vẫn là vùng đô thị lớn nhất thế giới với khoảng 37 triệu người, tiếp theo là Delhi và Shanghai. Hầu hết các megacity mới đang xuất hiện ở các nước đang phát triển.

Đô thị hóa mang lại cả cơ hội và thách thức. Về mặt tích cực, các thành phố là động lực kinh tế, đổi mới, và văn hóa. Chúng tạo ra việc làm, cung cấp dịch vụ giáo dục và y tế tốt hơn, và có hiệu quả năng lượng cao hơn trên đầu người. Tuy nhiên, đô thị hóa nhanh chóng cũng tạo ra các vấn đề như ùn tắc giao thông, ô nhiễm không khí và nước, thiếu nhà ở giá rẻ, và sự phát triển của khu ổ chuột. Ở nhiều thành phố đang phát triển, cơ sở hạ tầng không theo kịp tốc độ tăng dân số, dẫn đến điều kiện sống kém.

Quy hoạch đô thị bền vững là quan trọng để quản lý đô thị hóa. Các khái niệm như "smart cities" (thành phố thông minh) sử dụng công nghệ để cải thiện hiệu quả dịch vụ, "green cities" (thành phố xanh) tập trung vào không gian xanh và tính bền vững môi trường, và "compact cities" (thành phố gọn gàng) nhấn mạnh phát triển mật độ cao gần giao thông công cộng. Các thành phố như Copenhagen (xe đạp), Singapore (quản lý nước), và Curitiba, Brazil (giao thông công cộng) được ca ngợi vì các giải pháp đô thị sáng tạo của họ. Với hơn hai phần ba dân số thế giới dự kiến sống ở thành phố vào giữa thế kỷ này, việc tạo ra các thành phố bền vững và sống động là một trong những thách thức quan trọng nhất của nhân loại.`,
      year: 1800,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'United Nations Habitat',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  const watershed = await prisma.knowledgeEntry.create({
    data: {
      title: 'Lưu vực sông',
      description: 'Hệ thống thoát nước và quản lý tài nguyên nước',
      content: `Lưu vực sông (Watershed hoặc Drainage Basin) là một khu vực đất mà tất cả nước mưa và nước chảy từ đó tập trung vào một điểm chung, thường là một con sông, hồ, hoặc đại dương. Khái niệm lưu vực sông là cơ bản trong địa lý tự nhiên và quản lý tài nguyên nước. Ranh giới lưu vực, được gọi là đường phân nước (watershed divide), thường chạy dọc theo các đỉnh núi và đồi. John Wesley Powell, nhà thám hiểm và địa chất học người Mỹ, đã nhận ra tầm quan trọng của lưu vực sông trong quản lý tài nguyên ở miền Tây nước Mỹ vào cuối thế kỷ 19.

Lưu vực sông hoạt động như một hệ thống tích hợp. Nước mưa rơi xuống lưu vực sẽ chảy qua mạng lưới các dòng suối nhỏ (tributaries) hợp nhất thành sông lớn hơn, cuối cùng đổ ra biển. Quá trình này không chỉ vận chuyển nước mà còn trầm tích, chất dinh dưỡng, và các chất ô nhiễm. Lưu vực Amazon là lưu vực sông lớn nhất thế giới về diện tích (khoảng 7 triệu km²) và lưu lượng nước, thoát khoảng 20% tổng lượng nước ngọt chảy vào đại dương toàn cầu.

Quản lý lưu vực sông là quan trọng cho an ninh nước, nông nghiệp, và môi trường. Cách tiếp cận quản lý lưu vực tích hợp (Integrated Watershed Management) nhận ra rằng các hoạt động ở thượng nguồn ảnh hưởng đến chất lượng và số lượng nước ở hạ lưu. Phá rừng, đô thị hóa, và nông nghiệp trong lưu vực có thể làm tăng dòng chảy, xói mòn, và ô nhiễm. Ví dụ, sự suy thoái của Vùng Vịnh Mexico "dead zone" (vùng chết) được gây ra chủ yếu bởi phân bón từ nông nghiệp trong lưu vực sông Mississippi chảy ra vịnh.

Nhiều lưu vực sông lớn trên thế giới đang đối mặt với áp lực nghiêm trọng. Sông Colorado ở Mỹ hiếm khi còn chảy ra biển do các đập và việc khai thác nước quá mức. Sông Mekong ở Đông Nam Á, hỗ trợ hơn 60 triệu người, đang bị đe dọa bởi các đập thủy điện và biến đổi khí hậu. Các công cụ mới như viễn thám vệ tinh và mô hình thủy văn giúp các nhà quản lý theo dõi tình trạng lưu vực và đưa ra quyết định sáng suốt hơn. Hợp tác xuyên biên giới cũng quan trọng cho các lưu vực quốc tế như Danube (19 quốc gia) và Nile (11 quốc gia).`,
      year: 1890,
      isBc: false,
      approximateDate: true,
      importanceLevel: 4,
      source: 'John Wesley Powell',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  const coral = await prisma.knowledgeEntry.create({
    data: {
      title: 'Rạn san hô',
      description: 'Hệ sinh thái biển đa dạng và dễ bị tổn thương',
      content: `Rạn san hô (Coral Reefs) là những hệ sinh thái biển phức tạp được xây dựng bởi các sinh vật nhỏ bé gọi là san hô (coral polyps). San hô thuộc ngành Cnidaria, có quan hệ họ hàng với sứa và hải quỳ. Chúng tiết ra carbonate canxi để tạo thành bộ xương ngoài cứng, và qua hàng nghìn năm, các bộ xương này tích tụ thành cấu trúc rạn san hô khổng lồ. Great Barrier Reef ở Australia, dài hơn 2,300 km, là cấu trúc sinh học lớn nhất trên Trái Đất, có thể nhìn thấy từ không gian. Charles Darwin đã nghiên cứu và phân loại rạn san hô thành ba loại chính: rạn rìa (fringing reefs), rạn đảo (barrier reefs), và rạn vành khăn (atolls) trong cuốn sách năm 1842.

Rạn san hô phụ thuộc vào mối quan hệ cộng sinh với tảo zooxanthellae, các tảo đơn bào sống trong mô san hô. Tảo này thực hiện quá trình quang hợp, cung cấp đến 90% năng lượng cho san hô thông qua đường và các chất dinh dưỡng, trong khi san hô cung cấp cho tảo nơi trú ẩn và các chất cần cho quang hợp. Mối quan hệ tinh tế này chỉ hoạt động trong điều kiện môi trường cụ thể: nước ấm (23-29°C), trong, nông (dưới 70m để ánh sáng thấu qua), và độ mặn bình thường. Đây là lý do tại sao rạn san hô tập trung ở vùng nhiệt đới.

Mặc dù chỉ chiếm khoảng 0.1% diện tích đại dương, rạn san hô hỗ trợ khoảng 25% tất cả các loài sinh vật biển, khiến chúng được mệnh danh là "rừng mưa nhiệt đới của biển cả". Chúng cung cấp nơi ẩn náu, sinh sản, và kiếm ăn cho hàng nghìn loài cá, giáp xác, và động vật biển khác. Rạn san hô cũng có giá trị kinh tế và xã hội to lớn: chúng bảo vệ bờ biển khỏi xói mòn và sóng thần, hỗ trợ nghề cá (ước tính 500 triệu người phụ thuộc vào rạn san hô), thu hút du lịch (giá trị hàng tỷ đô la), và là nguồn hóa chất y tế tiềm năng.

Tuy nhiien, rạn san hô đang đối mặt với mối đe dọa nghiêm trọng. Biến đổi khí hậu gây ra hiện tượng tẩy trắng san hô (coral bleaching): khi nước quá ấm, san hô đuổi tảo cộng sinh ra ngoài, mất màu sắc và nguồn dinh dưỡng chính. Nếu tình trạng kéo dài, san hô sẽ chết. Các đợt tẩy trắng hàng loạt đã xảy ra ngày càng thường xuyên, với các sự kiện lớn vào 1998, 2010, 2016, và 2020. Axit hóa đại dương (do CO2 hòa tan trong nước biển) làm khó khăn cho san hô xây dựng bộ xương. Các mối đe dọa khác bao gồm ô nhiễm, đánh bắt cá quá mức, phát triển ven biển, và thiệt hại vật lý. Các nhà khoa học ước tính rằng hơn 50% rạn san hô thế giới đã mất kể từ năm 1950, và nếu xu hướng hiện tại tiếp tục, 90% có thể bị mất vào năm 2050. Các nỗ lực bảo tồn bao gồm thiết lập khu bảo tồn biển, phục hồi rạn san hô (trồng và cấy ghép san hô), và phát triển các giống san hô chịu nhiệt tốt hơn thông qua chọn lọc và kỹ thuật di truyền.`,
      year: 1842,
      isBc: false,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Charles Darwin',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: ukCountry ? {
        create: [{ countryId: ukCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  const soilerosion = await prisma.knowledgeEntry.create({
    data: {
      title: 'Xói mòn đất',
      description: 'Mất lớp đất mặt và ảnh hưởng đến nông nghiệp',
      content: `Xói mòn đất (Soil Erosion) là quá trình tự nhiên mà lớp đất mặt bị loại bỏ bởi gió, nước, hoặc băng. Mặc dù xói mòn là quá trình tự nhiên diễn ra qua hàng triệu năm và đã định hình nhiều cảnh quan Trái Đất, hoạt động của con người đã đẩy nhanh tốc độ xói mòn lên mức báo động. Hugh Hammond Bennett, được coi là "cha đẻ của bảo tồn đất" ở Hoa Kỳ, đã cảnh báo về nguy cơ xói mòn đất vào những năm 1930 sau khi chứng kiến Dust Bowl - thảm họa môi trường tàn khốc khi gió thổi bay hàng triệu tấn đất mặt từ Great Plains.

Xói mòn đất xảy ra theo nhiều hình thức. Xói mòn bề mặt (sheet erosion) xảy ra khi lớp đất mỏng được loại bỏ đồng đều trên một khu vực rộng; xói mòn rãnh (rill erosion) tạo ra các rãnh nhỏ; xói mòn khe (gully erosion) tạo ra các khe sâu lớn hơn; và xói mòn do gió (wind erosion) di chuyển các hạt đất khô. Tốc độ xói mòn phụ thuộc vào nhiều yếu tố: độ dốc của địa hình, lượng và cường độ mưa, loại đất, thảm thực vật che phủ, và cách sử dụng đất. Đất trồng trọt, đặc biệt là đất được cày xới và để trống giữa các vụ mùa, dễ bị xói mòn hơn nhiều so với đất có thảm thực vật tự nhiên.

Hậu quả của xói mòn đất rất nghiêm trọng. Về mặt nông nghiệp, mất lớp đất mặt giàu chất dinh dưỡng làm giảm năng suất cây trồng và buộc nông dân phải sử dụng nhiều phân bón hơn. Ước tính toàn cầu, khoảng 24 tỷ tấn đất màu mỡ bị mất mỗi năm. Ở nhiều nơi, đất đang bị xói mòn nhanh hơn nhiều so với tốc độ hình thành tự nhiên (mất hàng trăm đến hàng nghìn năm để hình thành vài centimét đất). Xói mòn cũng gây ra các vấn đề môi trường khác: trầm tích làm bồi lấp sông, hồ, và hồ chứa; làm giảm chất lượng nước; và phá hủy môi trường sống thủy sinh. Các chất dinh dưỡng và thuốc trừ sâu gắn với các hạt đất bị xói mòn có thể gây ô nhiễm nguồn nước.

Nhiều kỹ thuật đã được phát triển để chống xói mòn đất. Canh tác theo đường đồng mức (contour farming) gieo trồng theo các đường cong của địa hình thay vì lên xuống dốc; cây trồng xen canh và luân canh giúp duy trì lớp phủ thực vật; trồng cây chắn gió giảm xói mòn do gió; hệ thống ruộng bậc thang trên sườn đồi; và canh tác không cày (no-till farming) giữ cặn cây trong đất để bảo vệ bề mặt. Ở cấp độ chính sách, nhiều quốc gia đã thực hiện các chương trình bảo tồn đất, thanh toán cho các dịch vụ hệ sinh thái, và khuyến khích các thực hành nông nghiệp bền vững. Quản lý xói mòn đất hiệu quả là quan trọng cho an ninh lương thực toàn cầu và tính bền vững môi trường.`,
      year: 1935,
      isBc: false,
      approximateDate: true,
      importanceLevel: 4,
      source: 'Hugh Hammond Bennett',
      categories: {
        create: [{ categoryId: geographyCategory.id, isPrimary: true }]
      },
      countries: usaCountry ? {
        create: [{ countryId: usaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  console.log('✅ Additional geography seeding completed!');
  console.log('Created 10 new geography knowledge entries:');
  console.log('1. Thuyết kiến tạo mảng');
  console.log('2. Kỷ băng hà');
  console.log('3. Hệ thống gió mùa');
  console.log('4. Hiện tượng sa mạc hóa');
  console.log('5. Dòng hải lưu toàn cầu');
  console.log('6. Địa hình karst');
  console.log('7. Đô thị hóa toàn cầu');
  console.log('8. Lưu vực sông');
  console.log('9. Rạn san hô');
  console.log('10. Xói mòn đất');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
