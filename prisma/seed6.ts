import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding additional philosophy knowledge...');

  // Get existing categories and countries
  const philosophyCategory = await prisma.category.findUnique({
    where: { name: 'Triết học' }
  });

  const countries = await prisma.country.findMany();
  const greeceCountry = countries.find(c => c.name === 'Hy Lạp');
  const chinaCountry = countries.find(c => c.name === 'Trung Quốc');
  const ukCountry = countries.find(c => c.name === 'Anh');
  const germanyCountry = countries.find(c => c.name === 'Đức');

  if (!philosophyCategory) {
    throw new Error('Philosophy category not found. Please run seed.ts first.');
  }

  // 10 New Philosophy Knowledge Entries

  // 1. Chủ nghĩa khắc kỷ (Stoicism)
  const stoicism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chủ nghĩa khắc kỷ (Stoicism)',
      description: 'Chấp nhận số phận, kiểm soát nội tâm',
      content: `Chủ nghĩa khắc kỷ (Stoicism) là trường phái triết học Hy Lạp-La Mã nhấn mạnh đức hạnh, lý trí, và việc chấp nhận những gì không thể thay đổi. Được thành lập bởi Zeno of Citium (khoảng 300 TCN) tại Athens, ông giảng dạy tại Stoa Poikile (Hành lang được vẽ) - do đó tên gọi "Stoicism". Triết học khắc kỷ sau này phát triển mạnh ở La Mã với các nhà tư tưởng vĩ đại như Seneca, Epictetus, và hoàng đế Marcus Aurelius.

Nguyên lý cốt lõi của Stoicism: (1) Phân biệt giữa những gì trong tầm kiểm soát (suy nghĩ, thái độ, hành động của ta) và ngoài tầm kiểm soát (sự kiện bên ngoài, hành động người khác, quá khứ). (2) Chỉ tập trung vào những gì ta kiểm soát được, chấp nhận bình thản những gì không kiểm soát được - "amor fati" (yêu số phận). (3) Sống theo đức hạnh (arete): trí tuệ, dũng cảm, công bằng, tiết chế - đây là điều duy nhất thực sự tốt.

Epictetus (50-135), một nô lệ sau này được giải phóng, viết: "Con người không bị làm phiền bởi sự vật, mà bởi quan điểm họ có về sự vật đó." Đây là tiền thân của liệu pháp nhận thức hành vi (CBT) hiện đại. Marcus Aurelius (121-180), hoàng đế La Mã, viết "Suy tư" (Meditations) - nhật ký cá nhân về thực hành Stoicism trong nghịch cảnh. Ông viết: "Bạn có quyền lực trên tâm trí mình, không phải các sự kiện bên ngoài. Nhận ra điều này, bạn sẽ tìm thấy sức mạnh."

Stoicism không phải là vô cảm hay thụ động. Đó là về việc duy trì sự bình an nội tâm (ataraxia) và hành động có đức hạnh bất chấp hoàn cảnh. Các kỹ thuật thực hành: negative visualization (tưởng tượng mất đi những gì quý trọng để trân trọng hiện tại), premeditatio malorum (chuẩn bị tinh thần cho khó khăn), view from above (nhìn vấn đề từ góc độ vũ trụ). Stoicism ảnh hưởng đến Kitô giáo sớm, triết học Phục hưng, và đang trải qua sự phục hưng trong thế kỷ 21 như công cụ thực hành sống ý nghĩa và kiên cường.`,
      year: 300,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Zeno of Citium, Seneca, Epictetus, Marcus Aurelius',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: greeceCountry ? {
        create: [{ countryId: greeceCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 2. Chủ nghĩa Epicurus
  const epicureanism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chủ nghĩa khoái lạc Epicurus',
      description: 'Hạnh phúc qua giản dị và trí tuệ',
      content: `Chủ nghĩa khoái lạc Epicurus (Epicureanism) do Epicurus of Samos (341-270 TCN) sáng lập, thường bị hiểu sai là "ăn uống trác táng". Thực ra, Epicurus dạy rằng hạnh phúc (eudaimonia) đạt được qua việc tối thiểu hóa đau khổ và sống giản dị, trí tuệ, bao quanh bởi bạn bè. Ông thành lập "Vườn" (The Garden) ở Athens khoảng 307 TCN - một cộng đồng triết học cấp tiến chấp nhận phụ nữ và nô lệ.

Epicurus phân biệt ba loại khoái lạc: (1) Tự nhiên và cần thiết (thức ăn, nước, nơi trú ẩn, tình bạn) - nên theo đuổi. (2) Tự nhiên nhưng không cần thiết (thức ăn ngon, quần áo đẹp) - có thể thưởng thức tiết độ. (3) Không tự nhiên và không cần thiết (quyền lực, danh vọng, của cải) - nên tránh vì gây đau khổ nhiều hơn khoái lạc. Ông viết: "Không làm cho dạ dày đầy mà làm cho nó không đói mới khó."

Epicurus cũng cố gắng giải phóng con người khỏi nỗi sợ hai điều: thần linh và cái chết. Ông theo chủ nghĩa nguyên tử (atomism) của Democritus: vũ trụ chỉ là nguyên tử và khoảng trống, các thần tồn tại nhưng không quan tâm đến con người. Về cái chết, ông nói: "Khi ta còn sống, cái chết chưa đến; khi cái chết đến, ta không còn nữa. Vậy tại sao sợ cái không bao giờ gặp mặt?" Cái chết chỉ là sự tan rã của các nguyên tử, không có linh hồn bất tử, không có trừng phạt sau khi chết.

Thi sĩ La Mã Lucretius bảo tồn triết học Epicurus trong "De Rerum Natura" (Về Bản chất của sự vật, 50 TCN). Epicureanism ảnh hưởng đến chủ nghĩa hữu dụng (utilitarianism) của Jeremy Bentham và John Stuart Mill: "greatest happiness principle". Các ý tưởng Epicurus về an ninh và tình bạn vẫn còn nguyên giá trị: "Trong tất cả những gì trí tuệ chuẩn bị cho hạnh phúc cả đời, quan trọng nhất là tình bạn." Epicureanism dạy ta rằng hạnh phúc không đến từ tiêu thụ nhiều mà từ việc cần ít và trân trọng những khoảnh khắc giản dị.`,
      year: 307,
      isBc: true,
      approximateDate: true,
      importanceLevel: 4,
      source: 'Epicurus, Lucretius',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: greeceCountry ? {
        create: [{ countryId: greeceCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 3. Kinh nghiệm luận Hume
  const humeEmpiricism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Kinh nghiệm luận Hume',
      description: 'Vấn đề quy nạp và hoài nghi về nhân quả',
      content: `David Hume (1711-1776), triết gia Scotland, là một trong những người hoài nghi (skeptic) vĩ đại nhất trong lịch sử triết học. Tác phẩm chính "A Treatise of Human Nature" (1739-40) và "An Enquiry Concerning Human Understanding" (1748) thách thức nền tảng của tri thức con người. Hume theo chủ nghĩa kinh nghiệm luận (empiricism): mọi tri thức đều từ kinh nghiệm giác quan, không có ý niệm bẩm sinh.

Hume phân biệt hai loại tri thức: (1) Relations of Ideas (quan hệ giữa các ý niệm): chân lý tất nhiên, không phụ thuộc kinh nghiệm (toán học, logic). Ví dụ: "2+2=4", "tam giác có 3 góc". (2) Matters of Fact (vấn đề thực tế): phụ thuộc kinh nghiệm, không chắc chắn tuyệt đối. Ví dụ: "mặt trời mọc ngày mai". Vấn đề quy nạp (problem of induction): chúng ta không thể chứng minh logic rằng tương lai giống quá khứ, chỉ vì mặt trời đã mọc hàng ngàn lần không đảm bảo nó sẽ mọc ngày mai!

Thách thức lớn nhất của Hume là về nhân quả (causation): khi ta nói "A gây ra B", ta thực sự chỉ quan sát "A xảy ra rồi B xảy ra". Ta không bao giờ "nhìn thấy" lực nhân quả, chỉ thấy mối tương quan thường xuyên (constant conjunction). Nhân quả chỉ là thói quen tâm lý (custom/habit), không phải sự thật khách quan. Điều này làm rung chuyển nền tảng khoa học! Nếu không có nhân quả khách quan, làm sao có định luật tự nhiên?

Kant thừa nhận Hume đã "đánh thức ông khỏi giấc ngủ giáo điều" (dogmatic slumber), dẫn đến "Critique of Pure Reason". Hume cũng hoài nghi về tôn giáo: ông phê phán các lập luận về sự tồn tại của Thượng đế (đặc biệt là argument from design trong "Dialogues Concerning Natural Religion"). Về đạo đức, Hume nói lý trí là "nô lệ của tình cảm" - đạo đức không dựa trên lý trí mà trên cảm xúc đạo đức (moral sentiments). Triết học Hume ảnh hưởng sâu sắc đến thực chứng luận (positivism), triết học khoa học, và chủ nghĩa hoài nghi hiện đại.`,
      year: 1748,
      isBc: false,
      importanceLevel: 5,
      source: 'David Hume - An Enquiry Concerning Human Understanding',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: ukCountry ? {
        create: [{ countryId: ukCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 4. Chủ nghĩa hữu dụng (Utilitarianism)
  const utilitarianism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chủ nghĩa hữu dụng (Utilitarianism)',
      description: 'Hành động đúng là hành động tối đa hóa hạnh phúc',
      content: `Chủ nghĩa hữu dụng (Utilitarianism) là lý thuyết đạo đức kết quả luận (consequentialist): đánh giá hành động dựa trên hậu quả của nó, cụ thể là mức độ nó mang lại hạnh phúc hay giảm đau khổ. Jeremy Bentham (1748-1832) là người sáng lập hiện đại với tác phẩm "An Introduction to the Principles of Morals and Legislation" (1789), phát biểu nguyên tắc hữu dụng: "Hành động đúng là hành động mang lại hạnh phúc lớn nhất cho số lượng người lớn nhất" (the greatest happiness of the greatest number).

Bentham là người thực chứng cực đoan: ông tin hạnh phúc có thể đo lường được qua "hedonic calculus" (phép tính khoái lạc), xem xét 7 yếu tố: cường độ, thời gian, chắc chắn, gần hay xa, sinh sản (gây ra thêm khoái lạc), thuần khiết (không lẫn đau khổ), phạm vi (số người ảnh hưởng). Bentham coi tất cả khoái lạc đều ngang nhau về chất: "Pushpin (trò chơi) cũng tốt như poetry (thơ) nếu mang lại khoái lạc như nhau."

John Stuart Mill (1806-1873) cải tiến utilitarianism trong "Utilitarianism" (1863). Mill phân biệt khoái lạc cao cấp (trí tuệ, thẩm mỹ, đạo đức) và thấp cấp (thể xác). Ông viết câu nổi tiếng: "Thà là Socrates bất mãn còn hơn là lợn hài lòng; thà là người ngốc bất mãn còn hơn người khôn hài lòng." Mill cũng mở rộng utilitarianism sang quyền tự do cá nhân trong "On Liberty": xã hội chỉ can thiệp khi hành động gây hại người khác (harm principle).

Utilitarianism gây tranh cãi vì có thể biện minh hành động phi đạo đức nếu kết quả tốt (ví dụ: tra tấn một người để cứu nhiều người). Peter Singer phát triển "preference utilitarianism" hiện đại, áp dụng vào đạo đức động vật (giải phóng động vật), từ thiện hiệu quả (effective altruism), và đạo đức sinh học. Utilitarianism ảnh hưởng sâu rộng đến kinh tế học phúc lợi, chính sách công, y tế công cộng (cost-benefit analysis), và AI ethics (maximizing utility functions).`,
      year: 1789,
      isBc: false,
      importanceLevel: 5,
      source: 'Jeremy Bentham, John Stuart Mill',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: ukCountry ? {
        create: [{ countryId: ukCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 5. Chủ nghĩa thực dụng (Pragmatism)
  const pragmatism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Chủ nghĩa thực dụng (Pragmatism)',
      description: 'Chân lý là cái có tác dụng',
      content: `Chủ nghĩa thực dụng (Pragmatism) là trường phái triết học độc đáo của Mỹ, coi chân lý không phải là phản ánh thực tại khách quan mà là "cái có tác dụng" (what works) trong thực tiễn. Charles Sanders Peirce (1839-1914) đặt nền móng với bài "How to Make Our Ideas Clear" (1878), phát biểu nguyên lý pragmatic: "Xem xét những hiệu quả thực tiễn mà chúng ta nghĩ đối tượng của khái niệm có thể mang lại. Khái niệm về những hiệu quả đó chính là toàn bộ khái niệm của chúng ta về đối tượng."

William James (1842-1910) phổ biến pragmatism đại chúng qua "Pragmatism: A New Name for Some Old Ways of Thinking" (1907). James coi chân lý là "cash value" - giá trị tiền mặt của ý niệm: một niềm tin là đúng nếu nó có ích, giải quyết vấn đề, dẫn đến hậu quả mong muốn trong cuộc sống. Ông viết: "Chân lý là cái xảy ra với một ý tưởng. Nó trở thành đúng, được làm cho đúng bởi các sự kiện." Điều này không có nghĩa chủ quan tuỳ tiện - chân lý phải phù hợp với kinh nghiệm và các niềm tin khác.

John Dewey (1859-1952) phát triển "instrumentalism" - một dạng pragmatism coi tư duy là công cụ (instrument) để giải quyết vấn đề. Dewey áp dụng vào giáo dục: học tập phải thực tiễn, dựa trên kinh nghiệm, giải quyết vấn đề thực (learning by doing). Ông ảnh hưởng sâu rộng đến hệ thống giáo dục tiến bộ. Dewey cũng áp dụng pragmatism vào dân chủ, coi nó không chỉ là hình thức chính trị mà là lối sống hợp tác thử nghiệm.

Pragmatism bị phê phán là tương đối hóa chân lý, nhưng các nhà pragmatism phản bác rằng họ chỉ nhấn mạnh chân lý luôn trong bối cảnh thực tiễn, không tách rời kinh nghiệm con người. Richard Rorty (1931-2007) phục hưng pragmatism trong thế kỷ 20 với "neo-pragmatism", phê phán triết học nền tảng luận (foundationalism) và bảo vệ chân lý như sự đồng thuận xã hội. Pragmatism ảnh hưởng đến triết học khoa học, giáo dục, luật pháp, và nghiên cứu hành động (action research).`,
      year: 1878,
      isBc: false,
      importanceLevel: 4,
      source: 'Peirce, William James, John Dewey',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 6. Triết học ngôn ngữ Wittgenstein
  const wittgenstein = await prisma.knowledgeEntry.create({
    data: {
      title: 'Triết học ngôn ngữ Wittgenstein',
      description: 'Ý nghĩa là cách sử dụng',
      content: `Ludwig Wittgenstein (1889-1951) là một trong những triết gia có ảnh hưởng nhất thế kỷ 20, với hai thời kỳ triết học hoàn toàn khác nhau. Wittgenstein sớm viết "Tractatus Logico-Philosophicus" (1921), tác phẩm duy nhất xuất bản khi còn sống. Ông cho rằng ngôn ngữ là "bức tranh" (picture) thực tại: cấu trúc logic của mệnh đề phản ánh cấu trúc logic của thế giới. "Giới hạn của ngôn ngữ là giới hạn của thế giới." Về những gì không nói được (đạo đức, thẩm mỹ, siêu hình), ta phải im lặng: "Whereof one cannot speak, thereof one must be silent."

Sau Tractatus, Wittgenstein cho rằng mình đã giải quyết xong triết học, bỏ academia làm giáo viên tiểu học! Nhưng những năm 1930s, ông nhận ra Tractatus sai lầm. Wittgenstein muộn trong "Philosophical Investigations" (xuất bản sau khi mất, 1953) bác bỏ lý thuyết ý nghĩa như bức tranh. Thay vào đó, ý nghĩa là cách sử dụng (meaning is use): "Ý nghĩa của một từ là cách sử dụng của nó trong ngôn ngữ."

Wittgenstein giới thiệu khái niệm "trò chơi ngôn ngữ" (language games): ngôn ngữ giống như trò chơi, có luật chơi khác nhau tùy bối cảnh. Cùng một từ có ý nghĩa khác nhau trong các "trò chơi" khác nhau (khoa học, tôn giáo, đạo đức, hàng ngày). Không có "bản chất" chung của ngôn ngữ, chỉ có "tương tự gia đình" (family resemblances) giữa các cách sử dụng. Nhiều vấn đề triết học phát sinh từ lạm dụng ngôn ngữ - dùng từ ngoài "trò chơi" nguyên thủy của nó.

Wittgenstein cũng phê phán "ngôn ngữ riêng tư" (private language): không thể có ngôn ngữ chỉ một người hiểu, vì ý nghĩa cần tiêu chuẩn công cộng để kiểm tra đúng sai. Điều này có hệ quả sâu xa cho triết học tâm trí. Triết học Wittgenstein ảnh hưởng đến triết học ngôn ngữ thông thường (ordinary language philosophy), triết học tâm trí, epistemology, và thậm chí AI và ngôn ngữ học. J.L. Austin, Gilbert Ryle, P.F. Strawson đều chịu ảnh hưởng. Wittgenstein dạy triết học không phải khám phá chân lý mà là "liệu pháp" (therapy) - làm sáng tỏ sự lẫn lộn khái niệm.`,
      year: 1953,
      isBc: false,
      importanceLevel: 5,
      source: 'Ludwig Wittgenstein - Philosophical Investigations',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 7. Đạo gia Lão Tử
  const taoism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Đạo gia Lão Tử',
      description: 'Đạo khả đạo, phi thường đạo',
      content: `Lão Tử (老子, khoảng thế kỷ 6-4 TCN), được coi là tác giả "Đạo Đức Kinh" (道德經, Tao Te Ching), là nền tảng của Đạo giáo (Taoism/Daoism), một trong ba trụ cột triết học Trung Quốc cùng với Nho giáo và Phật giáo. Lão Tử có thể là nhân vật lịch sử hoặc huyền thoại; "Lão Tử" có nghĩa "Ông già" hay "Thầy già". Đạo Đức Kinh chỉ có 5,000 chữ Hán, là một trong những tác phẩm được dịch nhiều nhất thế giới.

"Đạo" (Tao/Dao, 道) là khái niệm trung tâm: nguyên lý cơ bản, nguồn gốc và quy luật vận hành của vũ trụ, nhưng không thể định nghĩa hay nói ra. Câu mở đầu nổi tiếng: "道可道，非常道" - "Đạo khả đạo, phi thường đạo" (Con đường có thể nói ra không phải con đường thường hằng). Đạo tương tự như "Logos" Hy Lạp hay "Brahman" Ấn Độ, nhưng nhấn mạnh tính tự nhiên, tự phát (ziran, 自然).

Triết học Đạo gia ủng hộ "vô vi" (wu wei, 無為) - không hành động cưỡng ép, thuận theo tự nhiên, như nước chảy theo địa hình. "Đạo thường vô vi mà vô bất vi" - Đạo không làm gì cả nhưng không có gì không được làm. Lão Tử coi tính mềm yếu thắng cứng mạnh: "Thiên hạ mềm yếu không gì bằng nước, mà công kích cứng mạnh không gì thắng được nước." Ông tôn vinh khiêm tốn, giản dị, ít dục vọng: "Tri túc bất nhục, tri chỉ bất đãi" (Biết đủ không nhục, biết dừng không nguy).

Trang Tử (莊子, 369-286 TCN) phát triển Đạo gia với triết học tương đối luận và tự do tinh thần trong "Trang Tử". Ông kể câu chuyện nổi tiếng: mơ mình là bướm, tỉnh dậy không biết ta là người mơ thấy bướm hay bướm đang mơ thấy người. Đạo giáo ảnh hưởng sâu sắc đến văn hóa Trung Quốc (thơ, hội họa, võ thuật, y học), Phật giáo Thiền (Zen), và gần đây ảnh hưởng đến phương Tây qua sách "Tao of Pooh", mindfulness, và triết học môi trường (deep ecology). Đạo gia dạy sống hài hòa với tự nhiên, chấp nhận vô thường, và tìm kiếm sự giản dị.`,
      year: 400,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Lão Tử - Đạo Đức Kinh, Trang Tử',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: chinaCountry ? {
        create: [{ countryId: chinaCountry.id, isPrimary: true }]
      } : undefined
    }
  });

  // 8. Triết học phân tích
  const analyticPhilosophy = await prisma.knowledgeEntry.create({
    data: {
      title: 'Triết học phân tích',
      description: 'Làm rõ ngôn ngữ và logic',
      content: `Triết học phân tích (Analytic Philosophy) là truyền thống triết học thống trị ở thế giới Anh-Mỹ trong thế kỷ 20-21, nhấn mạnh sự rõ ràng, chính xác, logic trong lập luận, và phân tích ngôn ngữ. Gottlob Frege (1848-1925) được coi là cha đẻ với công trình logic toán học trong "Begriffsschrift" (1879) và "Foundations of Arithmetic" (1884), phân biệt giữa sense (ý nghĩa) và reference (chỉ thị) của từ ngữ.

Bertrand Russell (1872-1970) và Alfred North Whitehead viết "Principia Mathematica" (1910-13), cố gắng xây dựng toán học từ logic - dự án logicism. Russell phát triển lý thuyết mô tả (theory of descriptions) để giải quyết các câu như "The present King of France is bald" (vua Pháp hiện tại hói đầu) - khi không có vua Pháp! Russell phân tích câu này thành: "Có một và chỉ một cái x là vua Pháp hiện tại, và x hói" - đây là sai vì tiền đề không đúng, không phải vô nghĩa.

Nhóm Vienna Circle (1920s-30s) gồm Moritz Schlick, Rudolf Carnap, phát triển chủ nghĩa thực chứng logic (logical positivism): chỉ có hai loại mệnh đề có ý nghĩa - (1) phân tích (tautology, như toán và logic) và (2) tổng hợp có thể kiểm chứng bằng kinh nghiệm. Mọi mệnh đề khác (siêu hình, đạo đức, thần học) đều vô nghĩa! Nguyên lý kiểm chứng (verification principle) này quá cực đoan và cuối cùng bị phê phán ngay cả bởi các thành viên nhóm.

W.V.O. Quine (1908-2000) phê phán phân biệt phân tích/tổng hợp trong "Two Dogmas of Empiricism" (1951). Saul Kripke phát triển ngữ nghĩa thế giới khả hữu (possible worlds semantics) và phân biệt cần thiết/ngẫu nhiên với tiên nghiệm/hậu nghiệm trong "Naming and Necessity" (1980). Triết học phân tích ngày nay bao gồm nhiều phong cách, từ logic chính thống đến triết học ngôn ngữ thông thường, triết học tâm trí, epistemology, siêu hình phân tích. Nó đối lập với triết học lục địa (Continental philosophy) của Pháp-Đức.`,
      year: 1879,
      isBc: false,
      importanceLevel: 4,
      source: 'Frege, Russell, Vienna Circle, Quine',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 9. Nữ quyền Simone de Beauvoir
  const feminism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Nữ quyền hiện sinh Simone de Beauvoir',
      description: 'Người ta không sinh ra là phụ nữ, mà trở thành phụ nữ',
      content: `Simone de Beauvoir (1908-1986), triết gia và nhà văn Pháp, là một trong những người tiên phong của lý thuyết nữ quyền (feminism) hiện đại với tác phẩm bất hủ "Giới tính thứ hai" (Le Deuxième Sexe, The Second Sex, 1949). Đây là phân tích triết học toàn diện đầu tiên về áp bức phụ nữ, kết hợp chủ nghĩa hiện sinh, Mác, và phân tích xã hội học.

Câu nói nổi tiếng nhất của Beauvoir: "On ne naît pas femme, on le devient" - "Người ta không sinh ra là phụ nữ, mà trở thành phụ nữ." Ông bà không được định nghĩa bởi sinh học mà bởi xã hội. Xã hội phụ hệ đã xây dựng "phụ nữ" như "Cái Khác" (the Other), như phủ định của nam giới (người đàn ông = chủ thể, phụ nữ = đối tượng). Beauvoir phê phán "bí ẩn vĩnh cửu của nữ tính" (eternal feminine mystique) - quan niệm phụ nữ có "bản chất" cố định, khi thực ra đó chỉ là kết cấu xã hội (social construction).

Beauvoir phân tích cách xã hội hạn chế tự do của phụ nữ từ thời thơ ấu: cô bé được dạy phải thụ động, dịu dàng, vâng lời, trong khi con trai được khuyến khích chủ động, khám phá. Phụ nữ bị đẩy vào vai trò vợ-mẹ-quản gia, không được theo đuổi dự án cá nhân (existential project). Hôn nhân truyền thống biến phụ nữ thành "vật sở hữu" của chồng. Beauvoir ủng hộ quyền kinh tế độc lập, giáo dục, tránh thai, phá thai - điều kiện cho tự do.

Beauvoir sống cuộc đời của lý thuyết: cô không kết hôn, duy trì mối quan hệ "tự do" với Jean-Paul Sartre suốt 50 năm (mặc dù có tranh cãi về bình đẳng thực sự trong mối quan hệ này), theo đuổi sự nghiệp triết học và văn chương độc lập. "The Second Sex" bị cấm ở nhiều nước, Vatican đưa vào Index sách cấm. Nhưng nó trở thành kinh điển của phong trào nữ quyền làn sóng thứ hai (1960-80s), ảnh hưởng đến Betty Friedan, Gloria Steinem, Judith Butler. Beauvoir dạy rằng giải phóng phụ nữ không chỉ là quyền bình đẳng pháp lý mà là biến đổi sâu xa cấu trúc xã hội và ý thức.`,
      year: 1949,
      isBc: false,
      importanceLevel: 5,
      source: 'Simone de Beauvoir - The Second Sex',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  // 10. Chánh niệm Phật giáo
  const buddhism = await prisma.knowledgeEntry.create({
    data: {
      title: 'Triết học Phật giáo về Khổ đau và Giải thoát',
      description: 'Tứ diệu đế và Bát chánh đạo',
      content: `Siddhartha Gautama (563-483 TCN), sau này được gọi là Phật (Buddha - người giác ngộ), thành lập Phật giáo sau khi đạt được giác ngộ (enlightenment) dưới cây bồ đề tại Bodh Gaya, Ấn Độ. Khác với tôn giáo có thần, Phật giáo là hệ thống triết học và thực hành tâm linh tập trung vào hiểu và chấm dứt khổ đau (dukkha).

Nền tảng của Phật giáo là Tứ diệu đế (Four Noble Truths): (1) Khổ đế (Dukkha): Cuộc sống đầy khổ đau - sinh, già, bệnh, chết, xa cái thương, gần cái ghét, không được cái muốn. (2) Tập đế (Samudaya): Nguyên nhân của khổ là khát ái (tanha/tṛṣṇā) - ham muốn, chấp thủ, vô minh về bản chất thực tại. (3) Diệt đế (Nirodha): Có thể chấm dứt khổ bằng cách diệt khát ái - đạt Niết-bàn (Nirvana). (4) Đạo đế (Magga): Con đường dẫn đến chấm dứt khổ là Bát chánh đạo (Noble Eightfold Path).

Bát chánh đạo gồm: Chánh kiến (hiểu đúng), Chánh tư duy, Chánh ngữ, Chánh nghiệp, Chánh mạng, Chánh tinh tấn, Chánh niệm (mindfulness), Chánh định (thiền định). Chánh niệm (sati) là nhận thức tỉnh giác về hiện tại - hơi thở, cảm giác, suy nghĩ, cảm xúc - mà không phán xét. Đây là cốt lõi của thiền Phật giáo và trị liệu dựa trên chánh niệm (MBSR, MBCT) hiện đại.

Phật giáo dạy ba pháp ấn (trilakshana): (1) Vô thường (anicca): mọi thứ luôn thay đổi. (2) Vô ngã (anatta): không có "tự ngã" bất biến - cái ta chỉ là tập hợp tạm thời của năm uẩn (sắc, thọ, tưởng, hành, thức). (3) Khổ (dukkha): do vô thường và chấp thủ, có khổ đau. Niết-bàn không phải "thiên đàng" mà là trạng thái chấm dứt tham, sân, si - tự do hoàn toàn.

Phật giáo lan rộng khắp Á châu với nhiều truyền thống: Theravada (Nam tông), Mahayana (Bắc tông, bao gồm Thiền/Zen, Tịnh độ), Vajrayana (Tây Tạng). Trong thế kỷ 20-21, Phật giáo ảnh hưởng mạnh đến phương Tây qua thiền chánh niệm, tâm lý học (mindfulness-based therapy), triết học (phenomenology, ethics), và văn hóa đại chúng. Dalai Lama thứ 14 đối化話 với khoa học về ý thức, cảm xúc, hạnh phúc. Phật giáo cung cấp con đường thực tiễn để sống bình an trong thế giới vô thường.`,
      year: 528,
      isBc: true,
      approximateDate: true,
      importanceLevel: 5,
      source: 'Siddhartha Gautama (Buddha)',
      categories: {
        create: [{ categoryId: philosophyCategory.id, isPrimary: true }]
      },
      countries: {
        create: []
      }
    }
  });

  console.log('✅ Additional philosophy seeding completed!');
  console.log('Created 10 new philosophy knowledge entries:');
  console.log('1. Chủ nghĩa khắc kỷ (Stoicism)');
  console.log('2. Chủ nghĩa khoái lạc Epicurus');
  console.log('3. Kinh nghiệm luận Hume');
  console.log('4. Chủ nghĩa hữu dụng (Utilitarianism)');
  console.log('5. Chủ nghĩa thực dụng (Pragmatism)');
  console.log('6. Triết học ngôn ngữ Wittgenstein');
  console.log('7. Đạo gia Lão Tử');
  console.log('8. Triết học phân tích');
  console.log('9. Nữ quyền hiện sinh Simone de Beauvoir');
  console.log('10. Triết học Phật giáo về Khổ đau và Giải thoát');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
