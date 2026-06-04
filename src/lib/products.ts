export type FarmInfo = {
  producerEn?: string;
  producerAr?: string;
  farmEn?: string;
  farmAr?: string;
  regionEn?: string;
  regionAr?: string;
  altitude?: string;        // e.g. "1,800–2,000 masl" (not localized)
  varietyEn?: string;
  varietyAr?: string;
  processEn?: string;
  processAr?: string;
  scoreEn?: string;         // e.g. "89 / 100"
  scoreAr?: string;
};

export type OriginContent = {
  storyEn: string;
  storyAr: string;
  farm: FarmInfo;
  farmerNameEn?: string;
  farmerNameAr?: string;
  farmerBioEn?: string;
  farmerBioAr?: string;
  /** Real image paths — when provided they render; otherwise an elegant placeholder shows. */
  heroImage?: string;
  farmerImage?: string;
  gallery?: string[];
};

export type Product = {
  id: string;
  category: "beans" | "tools" | "subscription";
  nameEn: string;
  nameAr: string;
  originEn?: string;
  originAr?: string;
  roastEn?: string;
  roastAr?: string;
  notesEn?: string;
  notesAr?: string;
  descEn: string;
  descAr: string;
  weight?: string;
  price: number; // IQD
  image: string; // placeholder
  featured?: boolean;
  /** Rich origin storytelling for the dedicated coffee detail page. */
  origin?: OriginContent;
};

export const products: Product[] = [
  {
    id: "brazil-caxias-de-frutas",
    category: "beans",
    nameEn: "Brazil Caxias de Frutas",
    nameAr: "برازيل كاكسياس دي فروتاس",
    originEn: "Brazil",
    originAr: "البرازيل",
    roastEn: "Medium",
    roastAr: "متوسط",
    notesEn: "Complex Fruit · Intense Sweetness · Spicy Aroma · Roasted Nuts",
    notesAr: "فواكه معقدة · حلاوة مكثفة · رائحة بهارية · مكسرات محمصة",
    descEn: "A complex Brazilian natural with intense sweetness, a spicy aroma, and a rich roasted-nut finish.",
    descAr: "برازيلي طبيعي معقّد بحلاوة مكثفة ورائحة بهارية ونهاية من المكسرات المحمصة.",
    weight: "250g",
    price: 15000,
    image: "/coffee/brazil-caxias-de-frutas/hero.jpg",
    featured: true,
    origin: {
      storyEn:
        "Grown by smallholder farmers united under the Cocatrel cooperative, this coffee celebrates Brazilian producers' dedication to flavour. Hand-picked, meticulously sorted, and dried whole in static drying boxes with the cherry skin intact, the slow fermentation lets vibrant fruitiness seep into the beans — delivering notes of dark cherry, cacao nibs, caramel, milk chocolate, and roasted hazelnut.",
      storyAr:
        "تُزرع هذه القهوة على يد صغار المزارعين المنضوين تحت تعاونية كوكاتريل، وهي احتفاء بتفاني المنتجين البرازيليين في صناعة النكهة. تُقطف يدوياً وتُفرز بعناية وتُجفّف كاملةً في صناديق تجفيف ثابتة مع بقاء قشرة الكرز، فيتيح التخمير البطيء للنكهات الفاكهية أن تتسرب إلى الحبوب — لتمنح نكهات الكرز الداكن وحبيبات الكاكاو والكراميل وحليب الشوكولاتة والبندق المحمّص.",
      farm: {
        producerEn: "Cocatrel Coffee Cooperative",
        producerAr: "تعاونية كوكاتريل للقهوة",
        farmEn: "Smallholder farms",
        farmAr: "مزارع صغار الفلاحين",
        regionEn: "Minas Gerais, Brazil",
        regionAr: "ميناس جيرايس، البرازيل",
        altitude: "800–1,000 masl",
        varietyEn: "Topázio",
        varietyAr: "توبازيو",
        processEn: "Natural",
        processAr: "طبيعي",
        scoreEn: "84.5 / 100",
        scoreAr: "84.5 / 100",
      },
      farmerNameEn: "Cocatrel Cooperative",
      farmerNameAr: "تعاونية كوكاتريل",
      farmerBioEn:
        "A cooperative of smallholder Brazilian growers who hand-pick and naturally dry their cherries to craft layered, fruit-forward coffees.",
      farmerBioAr:
        "تعاونية من صغار المزارعين البرازيليين الذين يقطفون الكرز يدوياً ويجفّفونه طبيعياً لصناعة قهوة غنية بطبقات النكهة الفاكهية.",
      heroImage: "/coffee/brazil-caxias-de-frutas/hero.jpg",
      gallery: [
        "/coffee/brazil-caxias-de-frutas/g1.jpg",
        "/coffee/brazil-caxias-de-frutas/g2.jpg",
      ],
    },
  },
  {
    id: "colombia-el-turpial",
    category: "beans",
    nameEn: "Colombia El Turpial",
    nameAr: "كولومبيا إل تورپيال",
    originEn: "Colombia",
    originAr: "كولومبيا",
    roastEn: "Light",
    roastAr: "خفيف",
    notesEn: "Red Plum · Tangerine · Rose Wine · Rich · Creamy",
    notesAr: "برقوق أحمر · يوسفي · نبيذ وردي · غني · كريمي",
    descEn: "A bright, bold semi-washed SL-28 grown above 2,000 masl — tasting like a blend of Colombian and Kenyan coffee.",
    descAr: "قهوة SL-28 شبه مغسولة مشرقة وجريئة تُزرع فوق 2000 متر — بطعم يجمع بين القهوة الكولومبية والكينية.",
    weight: "150g",
    price: 40000,
    image: "/coffee/colombia-el-turpial/hero.jpg",
    origin: {
      storyEn:
        "Emerson Felipe Narváez is a 33-year-old second-generation producer from Cumbitara, Nariño, who chose a bold path: growing high-quality specialty coffee in a region long dominated by illegal crops. He started with just 3.5 hectares and almost no resources, working alone by hand and once paying 1.5 million pesos for a single kilo of Geisha seeds. His coffees soon placed 1st, 2nd and 3rd in the regional 'Mi Nariño' competition. This semi-washed SL-28 — a Kenyan variety from the Bourbon line — was picked fully ripe, floated, and fermented in two stages (48h anaerobic in cherry, then 96h after pulping). Processed above 2,000 masl where cool temperatures slow fermentation, the result is bright, bold and heavily fruity.",
      storyAr:
        "إيمرسون فيليبي نارفايز منتج قهوة في الثالثة والثلاثين من عمره، من الجيل الثاني في كومبيتارا بإقليم نارينيو، اختار طريقاً جريئاً: إنتاج قهوة مختصة عالية الجودة في منطقة طالما هيمنت عليها المحاصيل غير المشروعة. بدأ بـ 3.5 هكتار فقط وبلا موارد تقريباً، يعمل وحده بيديه، ودفع مرّة 1.5 مليون بيزو لكيلوغرام واحد من بذور الغيشا. سرعان ما حصلت قهوته على المراكز الأول والثاني والثالث في مسابقة «مي نارينيو» الإقليمية. هذه القهوة شبه المغسولة من صنف SL-28 — وهو صنف كيني من سلالة البوربون — قُطفت ناضجة تماماً، ثم خُمّرت على مرحلتين (48 ساعة لاهوائياً داخل الكرز، ثم 96 ساعة بعد التقشير). ولأنها تُعالج فوق 2000 متر حيث تُبطئ الحرارة المنخفضة التخمير، جاءت النتيجة مشرقة وجريئة وغنية بالفاكهة.",
      farm: {
        producerEn: "Emerson Narváez",
        producerAr: "إيمرسون نارفايز",
        farmEn: "Finca El Turpial",
        farmAr: "مزرعة إل تورپيال",
        regionEn: "Cumbitara, Nariño, Colombia",
        regionAr: "كومبيتارا، نارينيو، كولومبيا",
        altitude: "1,900–2,200 masl",
        varietyEn: "SL-28",
        varietyAr: "إس إل-28",
        processEn: "Semi-washed",
        processAr: "شبه مغسول",
        scoreEn: "89 / 100",
        scoreAr: "89 / 100",
      },
      farmerNameEn: "Emerson Narváez",
      farmerNameAr: "إيمرسون نارفايز",
      farmerBioEn:
        "A second-generation farmer reclaiming his land through specialty coffee, Emerson works exotic varieties by hand at over 2,000 masl — proof that quality and honesty can thrive anywhere.",
      farmerBioAr:
        "مزارع من الجيل الثاني يستعيد أرضه عبر القهوة المختصة، يعمل إيمرسون على أصناف نادرة بيديه على ارتفاع يتجاوز 2000 متر — دليل على أن الجودة والصدق يزدهران في أي مكان.",
      heroImage: "/coffee/colombia-el-turpial/hero.jpg",
      gallery: [
        "/coffee/colombia-el-turpial/g1.jpg",
        "/coffee/colombia-el-turpial/g2.jpg",
        "/coffee/colombia-el-turpial/g3.jpg",
      ],
    },
  },
  {
    id: "colombia-geisha-washed",
    category: "beans",
    nameEn: "Colombia Geisha Washed",
    nameAr: "كولومبيا غيشا المغسولة",
    originEn: "Colombia",
    originAr: "كولومبيا",
    roastEn: "Light",
    roastAr: "خفيف",
    notesEn: "Floral · Guanabana · Lemongrass · Strawberry",
    notesAr: "زهري · قشطة شوكية · عشب الليمون · فراولة",
    descEn: "A clean, floral washed Geisha from Wilder Lazo's La Dinastía farm — delicate and aromatic.",
    descAr: "قهوة غيشا مغسولة نظيفة وزهرية من مزرعة لا ديناستيا لوايلدر لازو — رقيقة وعطرة.",
    weight: "150g",
    price: 49000,
    image: "/coffee/colombia-geisha-washed/hero.jpg",
    origin: {
      storyEn:
        "Wilder Lazo is a veterinarian who turned to coffee in 2016 when prices fell and his father became ill, reviving the family farm La Dinastía with his brother. The trees are nurtured in nutrient-rich soil, and only fully ripe, exceptionally large cherries are harvested and floated in water tanks to remove impurities. This washed lot is clean and delicate, with floral aromatics, guanabana and lemongrass.",
      storyAr:
        "وايلدر لازو طبيب بيطري متخصص في تربية الماشية، تحوّل إلى زراعة القهوة عام 2016 حين انخفضت الأسعار ومرض والده، فأحيا مزرعة العائلة «لا ديناستيا» مع شقيقه. تُغذّى الأشجار في تربة غنية بالمغذيات، ولا يُقطف سوى الكرز الناضج تماماً وكبير الحجم الذي يُغمر في أحواض الماء لإزالة الشوائب. هذه القهوة المغسولة نظيفة ورقيقة، بنكهات زهرية وقشطة شوكية وعشب الليمون.",
      farm: {
        producerEn: "Wilder Lazo",
        producerAr: "وايلدر لازو",
        farmEn: "La Dinastía",
        farmAr: "لا ديناستيا",
        regionEn: "Colombia",
        regionAr: "كولومبيا",
        altitude: "1,550+ masl",
        varietyEn: "Geisha",
        varietyAr: "غيشا",
        processEn: "Washed",
        processAr: "مغسول",
        scoreEn: "90 / 100",
        scoreAr: "90 / 100",
      },
      farmerNameEn: "Wilder Lazo",
      farmerNameAr: "وايلدر لازو",
      farmerBioEn:
        "A veterinarian turned coffee grower who revived his family's farm, Wilder is known for meticulous Geisha processing.",
      farmerBioAr:
        "طبيب بيطري تحوّل إلى زراعة القهوة وأحيا مزرعة عائلته، يُعرف وايلدر بمعالجته الدقيقة لصنف الغيشا.",
      heroImage: "/coffee/colombia-geisha-washed/hero.jpg",
      gallery: [
        "/coffee/colombia-geisha-washed/g1.jpg",
        "/coffee/colombia-geisha-washed/g2.jpg",
        "/coffee/colombia-geisha-washed/g3.jpg",
      ],
    },
  },
  {
    id: "colombia-geisha-natural",
    category: "beans",
    nameEn: "Colombia Geisha Natural",
    nameAr: "كولومبيا غيشا الطبيعية",
    originEn: "Colombia",
    originAr: "كولومبيا",
    roastEn: "Light",
    roastAr: "خفيف",
    notesEn: "Strawberry · Lavender · Tropical · Wild",
    notesAr: "فراولة · لافندر · استوائية · طعم جامح",
    descEn: "A wild, fruit-forward natural Geisha from La Dinastía — bursting with strawberry and lavender.",
    descAr: "قهوة غيشا طبيعية جامحة وغنية بالفاكهة من لا ديناستيا — تنفجر بنكهات الفراولة واللافندر.",
    weight: "150g",
    price: 49000,
    image: "/coffee/colombia-geisha-natural/hero.jpg",
    origin: {
      storyEn:
        "Wilder Lazo is a veterinarian who turned to coffee in 2016 when prices fell and his father became ill, reviving the family farm La Dinastía with his brother. For this natural lot the cherries are fermented with the fruit intact, concentrating an intense, wild sweetness — strawberry, lavender and tropical fruit.",
      storyAr:
        "وايلدر لازو طبيب بيطري تحوّل إلى زراعة القهوة عام 2016 حين انخفضت الأسعار ومرض والده، فأحيا مزرعة العائلة «لا ديناستيا» مع شقيقه. في هذه القهوة الطبيعية يُخمّر الكرز مع بقاء الثمرة كاملة، مما يركّز حلاوة جامحة ومكثفة — فراولة ولافندر وفاكهة استوائية.",
      farm: {
        producerEn: "Wilder Lazo",
        producerAr: "وايلدر لازو",
        farmEn: "La Dinastía",
        farmAr: "لا ديناستيا",
        regionEn: "Colombia",
        regionAr: "كولومبيا",
        altitude: "1,550+ masl",
        varietyEn: "Geisha",
        varietyAr: "غيشا",
        processEn: "Natural",
        processAr: "طبيعي",
        scoreEn: "90 / 100",
        scoreAr: "90 / 100",
      },
      farmerNameEn: "Wilder Lazo",
      farmerNameAr: "وايلدر لازو",
      farmerBioEn:
        "A veterinarian turned coffee grower who revived his family's farm, Wilder is known for meticulous Geisha processing.",
      farmerBioAr:
        "طبيب بيطري تحوّل إلى زراعة القهوة وأحيا مزرعة عائلته، يُعرف وايلدر بمعالجته الدقيقة لصنف الغيشا.",
      heroImage: "/coffee/colombia-geisha-natural/hero.jpg",
      gallery: [
        "/coffee/colombia-geisha-natural/g1.jpg",
        "/coffee/colombia-geisha-natural/g2.jpg",
        "/coffee/colombia-geisha-natural/g3.jpg",
      ],
    },
  },
  {
    id: "colombia-la-maestra",
    category: "beans",
    nameEn: "Colombia La Maestra",
    nameAr: "كولومبيا لا مايسترا",
    originEn: "Colombia",
    originAr: "كولومبيا",
    roastEn: "Light-Medium",
    roastAr: "خفيف-متوسط",
    notesEn: "Apricot · Roses · Grape Juice",
    notesAr: "مشمش · ورد · عصير عنب",
    descEn: "A floral, fruit-forward washed Yellow Bourbon from a teacher and a master processor.",
    descAr: "قهوة بوربون صفراء مغسولة زهرية وغنية بالفاكهة من معلّمة ومعالج بارع.",
    weight: "150g",
    price: 33000,
    image: "/coffee/colombia-la-maestra/hero.jpg",
    origin: {
      storyEn:
        "Erika Yaguara is a teacher and coffee producer who turns her farm, Finca Experimental, into a testing ground for varieties, fermentations and drying methods. Her partner Jorge Rojas has worked in coffee since age 12 and is a key member of ASOPEP Planadas, an organic-certified association. For this lot they chose a medium-intensity washed process: yellow Bourbon cherries are floated, fermented 36 hours in cherry, pulped, then fermented another 36 hours before a quick wash. Jorge avoids any added agents, relying only on the coffee's natural microorganisms for a clean, terroir-driven, floral cup.",
      storyAr:
        "إيريكا ياغوارا معلّمة ومنتجة قهوة تحوّل مزرعتها «فينكا إكسبيريمنتال» إلى ميدان تجارب للأصناف وطرق التخمير والتجفيف. شريكها خورخي روخاس يعمل في القهوة منذ سن الثانية عشرة وهو عضو أساسي في جمعية «أسوبيب بلاناداس» المعتمدة عضوياً. لهذه الدفعة اختارا معالجة مغسولة متوسطة الكثافة: يُغمر كرز البوربون الأصفر، ويُخمّر 36 ساعة داخل الكرز، ثم يُقشّر ويُخمّر 36 ساعة أخرى قبل غسلٍ سريع. يتجنّب خورخي أي إضافات معتمداً فقط على الكائنات الدقيقة الطبيعية للقهوة، ليحصل على فنجان نظيف زهري يعبّر عن أرضه.",
      farm: {
        producerEn: "Erika Yaguara & Jorge Rojas",
        producerAr: "إيريكا ياغوارا وخورخي روخاس",
        farmEn: "Finca Experimental",
        farmAr: "فينكا إكسبيريمنتال",
        regionEn: "Planadas, Tolima, Colombia",
        regionAr: "بلاناداس، توليما، كولومبيا",
        altitude: "1,900+ masl",
        varietyEn: "Yellow Bourbon",
        varietyAr: "بوربون أصفر",
        processEn: "Washed",
        processAr: "مغسول",
        scoreEn: "87.5 / 100",
        scoreAr: "87.5 / 100",
      },
      farmerNameEn: "Erika Yaguara & Jorge Rojas",
      farmerNameAr: "إيريكا ياغوارا وخورخي روخاس",
      farmerBioEn:
        "A teacher and a lifelong coffee man, Erika and Jorge combine research and craft to produce clean, precise, terroir-driven coffees.",
      farmerBioAr:
        "معلّمة ورجل قهوة عريق، يجمع إيريكا وخورخي بين البحث والحرفة لإنتاج قهوة نظيفة ودقيقة تعبّر عن أرضها.",
      heroImage: "/coffee/colombia-la-maestra/hero.jpg",
      gallery: [
        "/coffee/colombia-la-maestra/g1.jpg",
        "/coffee/colombia-la-maestra/g2.jpg",
        "/coffee/colombia-la-maestra/g3.jpg",
      ],
    },
  },
  {
    id: "colombia-decaf",
    category: "beans",
    nameEn: "Colombia Swiss Water Decaf",
    nameAr: "كولومبيا منزوعة الكافيين (سويس ووتر)",
    originEn: "Colombia",
    originAr: "كولومبيا",
    roastEn: "Medium",
    roastAr: "متوسط",
    notesEn: "Balanced · Chocolate · Caramel · Smooth",
    notesAr: "متوازن · شوكولاتة · كراميل · ناعم",
    descEn: "A chemical-free decaf from Cauca, processed with the Swiss Water method — all the flavour, none of the buzz.",
    descAr: "قهوة منزوعة الكافيين خالية من المواد الكيميائية من كاوكا، بطريقة سويس ووتر — كل النكهة دون تأثير الكافيين.",
    weight: "250g",
    price: 20000,
    image: "",
    origin: {
      storyEn:
        "A naturally decaffeinated Colombian from the Cauca region, processed with the chemical-free Swiss Water method that gently removes caffeine using only water — preserving the coffee's natural sweetness and body. A clean, comforting cup you can enjoy any time of day.",
      storyAr:
        "قهوة كولومبية منزوعة الكافيين طبيعياً من منطقة كاوكا، مُعالجة بطريقة سويس ووتر الخالية من المواد الكيميائية التي تزيل الكافيين بلطف باستخدام الماء فقط — مع الحفاظ على حلاوة القهوة وقوامها الطبيعي. فنجان نظيف ومريح يمكنك الاستمتاع به في أي وقت من اليوم.",
      farm: {
        producerEn: "Swiss Water",
        producerAr: "سويس ووتر",
        regionEn: "Cauca, Colombia",
        regionAr: "كاوكا، كولومبيا",
        varietyEn: "Typica, Caturra",
        varietyAr: "تيبيكا، كاتورا",
        processEn: "Swiss Water Decaffeination",
        processAr: "إزالة الكافيين بطريقة سويس ووتر",
      },
    },
  },
  {
    id: "costarica-mystic-hills",
    category: "beans",
    nameEn: "Costa Rica Mystic Hills",
    nameAr: "كوستاريكا ميستيك هيلز",
    originEn: "Costa Rica",
    originAr: "كوستاريكا",
    roastEn: "Light-Medium",
    roastAr: "خفيف-متوسط",
    notesEn: "Orange · Peach · White Grape · Winey",
    notesAr: "برتقال · خوخ · عنب أبيض · نبيذي",
    descEn: "An anaerobic natural from one of Tarrazú's highest farms — sweet, tropical and winey.",
    descAr: "قهوة طبيعية لاهوائية من إحدى أعلى مزارع تاراسو — حلوة واستوائية ونبيذية.",
    weight: "250g",
    price: 33000,
    image: "/coffee/costarica-mystic-hills/hero.jpg",
    origin: {
      storyEn:
        "Mystic Hills is an 8-hectare estate at 2,100 masl in San Marcos de Tarrazú — one of the highest farms in the region. It belongs to Felipe Ospina, a coffee scientist researching how local microbes shape the cup, and protects 3.5 hectares of native forest. Planted only with heirloom hybrids, its 2025 harvest was the farm's first. The high altitude slowed ripening into June, producing dense, intensely sweet cherries. This natural lot was anaerobically fermented for 48 hours in bioreactors, then finished drying on African beds over 28 days.",
      storyAr:
        "ميستيك هيلز مزرعة مساحتها 8 هكتارات على ارتفاع 2100 متر في سان ماركوس دي تاراسو — من أعلى مزارع المنطقة. تعود ملكيتها إلى فيليبي أوسبينا، عالم قهوة يبحث في تأثير الميكروبات المحلية على نكهة الفنجان، وتحمي 3.5 هكتار من الغابة المحلية. مزروعة بأصناف موروثة هجينة فقط، وكان حصاد 2025 هو الأول للمزرعة. أبطأ الارتفاع العالي نضج الثمار حتى يونيو، فأنتج كرزاً كثيفاً وحلواً بشدة. خُمّرت هذه الدفعة الطبيعية لاهوائياً لمدة 48 ساعة في مفاعلات حيوية، ثم أُكمل تجفيفها على الأسرّة الأفريقية على مدى 28 يوماً.",
      farm: {
        producerEn: "Felipe Ospina",
        producerAr: "فيليبي أوسبينا",
        farmEn: "Mystic Hills",
        farmAr: "ميستيك هيلز",
        regionEn: "San Marcos de Tarrazú, Costa Rica",
        regionAr: "سان ماركوس دي تاراسو، كوستاريكا",
        altitude: "2,100 masl",
        varietyEn: "Catuaí (heirloom hybrids)",
        varietyAr: "كاتواي (هجين موروث)",
        processEn: "Anaerobic Natural",
        processAr: "طبيعي لاهوائي",
        scoreEn: "86 / 100",
        scoreAr: "86 / 100",
      },
      farmerNameEn: "Felipe Ospina",
      farmerNameAr: "فيليبي أوسبينا",
      farmerBioEn:
        "A coffee scientist studying how local microbes influence flavour, Felipe farms heirloom hybrids at extreme altitude while protecting native forest.",
      farmerBioAr:
        "عالم قهوة يدرس تأثير الميكروبات المحلية على النكهة، يزرع فيليبي أصنافاً موروثة هجينة على ارتفاعات شاهقة مع حماية الغابة المحلية.",
      heroImage: "/coffee/costarica-mystic-hills/hero.jpg",
      gallery: [
        "/coffee/costarica-mystic-hills/g1.jpg",
        "/coffee/costarica-mystic-hills/g2.jpg",
        "/coffee/costarica-mystic-hills/g3.jpg",
      ],
    },
  },
  {
    id: "ethiopia-guji",
    category: "beans",
    nameEn: "Ethiopia Guji",
    nameAr: "إثيوبيا غوجي",
    originEn: "Ethiopia",
    originAr: "إثيوبيا",
    roastEn: "Light",
    roastAr: "خفيف",
    notesEn: "Dried Fruit · Hazelnut · Caramel · Brown Sugar",
    notesAr: "فواكه مجففة · بندق · كراميل · سكر بني",
    descEn: "A natural-process Guji from the Uraga station — sweet, nutty and full of dried fruit.",
    descAr: "قهوة غوجي بمعالجة طبيعية من محطة أوراغا — حلوة وبطعم المكسرات وغنية بالفواكه المجففة.",
    weight: "250g",
    price: 19000,
    image: "/coffee/ethiopia-guji/hero.jpg",
    featured: true,
    origin: {
      storyEn:
        "Uraga washing station receives cherry from smallholders across Guji — a region once part of Yirgacheffe whose microclimate was distinct enough to earn its own name. Farming stays traditional: coffee is intercropped with food crops and is organic by default, with most work done by hand by family members. Uraga trains farmers in careful harvesting; ripe cherry is hand-sorted, pulped, fermented 48 hours, washed, soaked, then sun-dried on raised beds for about 18 days.",
      storyAr:
        "تستقبل محطة أوراغا للغسيل الكرز من صغار المزارعين في أنحاء غوجي — وهي منطقة كانت جزءاً من يرغاشيفي لكن مناخها المحلي تميّز بما يكفي لتنال اسمها الخاص. تبقى الزراعة تقليدية: تُزرع القهوة متداخلة مع المحاصيل الغذائية وهي عضوية بطبيعتها، ومعظم العمل يدوي تقوم به أفراد العائلة. تدرّب أوراغا المزارعين على القطف الدقيق؛ يُفرز الكرز الناضج يدوياً، ثم يُقشّر ويُخمّر 48 ساعة، ويُغسل ويُنقع، ثم يُجفّف تحت الشمس على أسرّة مرتفعة لنحو 18 يوماً.",
      farm: {
        producerEn: "Uraga Washing Station",
        producerAr: "محطة أوراغا للغسيل",
        farmEn: "Smallholder farms",
        farmAr: "مزارع صغيرة",
        regionEn: "Guji, Ethiopia",
        regionAr: "غوجي، إثيوبيا",
        altitude: "1,900–2,200 masl",
        varietyEn: "Heirloom",
        varietyAr: "أصناف موروثة",
        processEn: "Natural",
        processAr: "طبيعي",
        scoreEn: "84 / 100",
        scoreAr: "84 / 100",
      },
      farmerNameEn: "Uraga Growers",
      farmerNameAr: "مزارعو أوراغا",
      farmerBioEn:
        "Smallholder families across Guji intercrop organic, heirloom coffee and deliver ripe cherry to the Uraga station for careful washing and sun-drying.",
      farmerBioAr:
        "عائلات من صغار المزارعين في غوجي يزرعون قهوة عضوية موروثة بشكل متداخل ويسلّمون الكرز الناضج إلى محطة أوراغا للغسيل والتجفيف بعناية.",
      heroImage: "/coffee/ethiopia-guji/hero.jpg",
      gallery: [
        "/coffee/ethiopia-guji/g1.jpg",
        "/coffee/ethiopia-guji/g2.jpg",
        "/coffee/ethiopia-guji/g3.jpg",
      ],
    },
  },
  {
    id: "kenya-thiriku",
    category: "beans",
    nameEn: "Kenya Thiriku",
    nameAr: "كينيا ثيريكو",
    originEn: "Kenya",
    originAr: "كينيا",
    roastEn: "Light-Medium",
    roastAr: "خفيف-متوسط",
    notesEn: "Brown Sugar · Stone Fruit · Caramel · Dried Fruit",
    notesAr: "سكر بني · فواكه ذات نواة · كراميل · فواكه مجففة",
    descEn: "A precise washed Kenyan from the Thiriku cooperative in Nyeri — bright, layered and clean.",
    descAr: "قهوة كينية مغسولة بدقة من تعاونية ثيريكو في نيري — مشرقة ومتعددة الطبقات ونظيفة.",
    weight: "250g",
    price: 26000,
    image: "/coffee/kenya-thiriku/hero.jpg",
    featured: true,
    origin: {
      storyEn:
        "Nestled in the foothills of the Aberdares in Nyeri County, the Thiriku Farmers Cooperative Society — formed in 2000 — is a benchmark for Kenyan coffee, known for its precise washed process and focus on sustainability. Ripe cherries are hand-sorted and dried on over 130 raised tables using a single, water-efficient wet mill. Thiriku's coffees are celebrated for bright fruit, layered sweetness and a clean structure that reflects Nyeri's renowned terroir.",
      storyAr:
        "تقع جمعية ثيريكو التعاونية للمزارعين عند سفوح جبال أبرديرز في مقاطعة نيري، وقد تأسست عام 2000 لتصبح معياراً للقهوة الكينية، تُعرف بمعالجتها المغسولة الدقيقة وتركيزها على الاستدامة. يُفرز الكرز الناضج يدوياً ويُجفّف على أكثر من 130 طاولة مرتفعة باستخدام معمل رطب واحد موفّر للمياه. تشتهر قهوة ثيريكو بفاكهتها المشرقة وحلاوتها المتعددة الطبقات وبنيتها النظيفة التي تعكس أرض نيري الشهيرة.",
      farm: {
        producerEn: "Thiriku Farmers Cooperative Society",
        producerAr: "جمعية ثيريكو التعاونية للمزارعين",
        farmEn: "Thiriku",
        farmAr: "ثيريكو",
        regionEn: "Nyeri County, Kenya",
        regionAr: "مقاطعة نيري، كينيا",
        altitude: "1,700–1,800 masl",
        varietyEn: "SL28 & SL34",
        varietyAr: "إس إل28 و إس إل34",
        processEn: "Washed",
        processAr: "مغسول",
        scoreEn: "86 / 100",
        scoreAr: "86 / 100",
      },
      farmerNameEn: "Thiriku Cooperative",
      farmerNameAr: "تعاونية ثيريكو",
      farmerBioEn:
        "Formed in 2000 at the foothills of the Aberdares, the Thiriku cooperative is celebrated for meticulous washing and a commitment to quality and sustainability.",
      farmerBioAr:
        "تأسست تعاونية ثيريكو عام 2000 عند سفوح جبال أبرديرز، وتُعرف بغسلها الدقيق والتزامها بالجودة والاستدامة.",
      heroImage: "/coffee/kenya-thiriku/hero.jpg",
      gallery: [
        "/coffee/kenya-thiriku/g1.jpg",
        "/coffee/kenya-thiriku/g2.jpg",
        "/coffee/kenya-thiriku/g3.jpg",
      ],
    },
  },
  {
    id: "subscription-monthly",
    category: "subscription",
    nameEn: "Monthly Subscription — 250g",
    nameAr: "اشتراك شهري — ٢٥٠ غرام",
    descEn: "Receive a freshly roasted 250g bag of our featured bean every month. We pick the best so you don't have to.",
    descAr: "احصل على كيس ٢٥٠ غراماً من حبوبنا الأفضل طازجة التحميص كل شهر.",
    price: 20000,
    image: "/images/subscription.jpg",
  },
  {
    id: "subscription-biweekly",
    category: "subscription",
    nameEn: "Bi-Weekly Subscription — 250g",
    nameAr: "اشتراك كل أسبوعين — ٢٥٠ غرام",
    descEn: "For the serious coffee drinker. A freshly roasted 250g bag every two weeks.",
    descAr: "لعاشق القهوة الجاد. كيس ٢٥٠ غراماً طازج التحميص كل أسبوعين.",
    price: 18000,
    image: "/images/subscription.jpg",
  },
  {
    id: "v60-dripper",
    category: "tools",
    nameEn: "Hario V60 Dripper",
    nameAr: "مسفاة هاريو V60",
    descEn: "The industry standard pour-over dripper. Clean, bright, and precise.",
    descAr: "معيار الصناعة في الصبّ المباشر. نظيف، مشرق، ودقيق.",
    price: 25000,
    image: "/images/v60.jpg",
  },
  {
    id: "french-press",
    category: "tools",
    nameEn: "French Press 350ml",
    nameAr: "فرنش برس ٣٥٠ مل",
    descEn: "Classic full-immersion brewing for a rich, bodied cup.",
    descAr: "تحضير كلاسيكي بالنقع الكامل لفنجان غني وقوي.",
    price: 22000,
    image: "/images/french-press.jpg",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(cat: Product["category"]): Product[] {
  return products.filter((p) => p.category === cat);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatIQD(amount: number): string {
  return amount.toLocaleString("en-IQ") + " IQD";
}
