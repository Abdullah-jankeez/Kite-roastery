export type FarmInfo = {
  farmEn: string;
  farmAr: string;
  regionEn: string;
  regionAr: string;
  altitude: string;        // e.g. "1,800–2,000 masl"
  varietyEn: string;
  varietyAr: string;
  processEn: string;
  processAr: string;
  producerEn: string;
  producerAr: string;
  harvestEn: string;
  harvestAr: string;
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
    id: "brazil-caixa-de-frutas",
    category: "beans",
    nameEn: "Brazil Caixa de Frutas",
    nameAr: "برازيل كايشا دي فروتاس",
    originEn: "Brazil",
    originAr: "البرازيل",
    roastEn: "Medium",
    roastAr: "متوسط",
    notesEn: "Complex · Intense Sweetness · Spicy Aroma · Roasted Nuts",
    notesAr: "معقد · حلاوة مكثفة · رائحة بهارية · مكسرات محمصة",
    descEn: "A complex Brazilian natural with intense sweetness, a spicy aroma, and a rich roasted nut finish.",
    descAr: "برازيلي طبيعي معقد بحلاوة مكثفة ورائحة بهارية ونكهة مكسرات محمصة غنية.",
    weight: "250g",
    price: 15000,
    image: "/images/brazil-caixa.jpg",
    featured: true,
    origin: {
      storyEn:
        "“Caixa de Frutas” means “box of fruits” — a nod to the layered sweetness this lot develops on the drying patios. Grown in the rolling hills of Minas Gerais, the cherries are left to dry whole in the sun, concentrating sugars that give the cup its signature depth.",
      storyAr:
        "تعني «كايشا دي فروتاس» «صندوق الفواكه» — إشارة إلى الحلاوة المتعددة الطبقات التي يطوّرها هذا المحصول على منصات التجفيف. تُزرع في تلال ميناس جيرايس، وتُترك الكرز ليجف كاملاً تحت الشمس، مما يركّز السكريات التي تمنح الفنجان عمقه المميز.",
      farm: {
        farmEn: "Fazenda Santa Rita",
        farmAr: "مزرعة سانتا ريتا",
        regionEn: "Minas Gerais, Brazil",
        regionAr: "ميناس جيرايس، البرازيل",
        altitude: "1,100–1,300 masl",
        varietyEn: "Yellow Catuaí, Mundo Novo",
        varietyAr: "كاتواي الأصفر، موندو نوفو",
        processEn: "Natural (sun-dried)",
        processAr: "طبيعي (مجفف بالشمس)",
        producerEn: "Família Pereira",
        producerAr: "عائلة بيريرا",
        harvestEn: "May – August",
        harvestAr: "مايو – أغسطس",
      },
      farmerNameEn: "João Pereira",
      farmerNameAr: "جواو بيريرا",
      farmerBioEn:
        "A third-generation coffee grower, João manages the patios by hand, turning the cherries every few hours to ensure an even, slow dry.",
      farmerBioAr:
        "مزارع قهوة من الجيل الثالث، يدير جواو منصات التجفيف يدوياً، ويقلّب الكرز كل بضع ساعات لضمان تجفيف بطيء ومتساوٍ.",
    },
  },
  {
    id: "guatemala-alta",
    category: "beans",
    nameEn: "Guatemala Alta",
    nameAr: "غواتيمالا ألتا",
    originEn: "Guatemala",
    originAr: "غواتيمالا",
    roastEn: "Medium Dark",
    roastAr: "متوسط غامق",
    notesEn: "Chocolate · Caramel · Well Balanced · Heavy Body",
    notesAr: "شوكولاتة · كراميل · متوازن · جسم ثقيل",
    descEn: "A beautifully balanced Guatemalan with rich chocolate and caramel notes and a satisfyingly heavy body.",
    descAr: "غواتيمالي متوازن بشكل رائع مع نكهات شوكولاتة وكراميل غنية وجسم ثقيل مرضٍ.",
    weight: "250g",
    price: 17000,
    image: "/images/guatemala-alta.jpg",
    featured: true,
    origin: {
      storyEn:
        "High in the volcanic highlands, cool nights slow the cherries' growth and build the dense, sweet body this coffee is known for. Washed and dried on raised beds, it delivers the classic chocolate-and-caramel profile that makes Guatemalan coffee a roaster's favourite.",
      storyAr:
        "في المرتفعات البركانية العالية، تبطئ الليالي الباردة نمو الكرز وتبني الجسم الكثيف والحلو الذي تشتهر به هذه القهوة. تُغسل وتُجفف على أسرّة مرتفعة، لتقدّم نكهة الشوكولاتة والكراميل الكلاسيكية.",
      farm: {
        farmEn: "Finca La Esperanza",
        farmAr: "مزرعة لا إسبيرانزا",
        regionEn: "Huehuetenango, Guatemala",
        regionAr: "هويهويتينانغو، غواتيمالا",
        altitude: "1,600–1,900 masl",
        varietyEn: "Bourbon, Caturra",
        varietyAr: "بوربون، كاتورا",
        processEn: "Fully washed",
        processAr: "مغسول بالكامل",
        producerEn: "Smallholder cooperative",
        producerAr: "تعاونية صغار المزارعين",
        harvestEn: "January – March",
        harvestAr: "يناير – مارس",
      },
      farmerNameEn: "La Esperanza Cooperative",
      farmerNameAr: "تعاونية لا إسبيرانزا",
      farmerBioEn:
        "Over 80 smallholder families pool their harvest at a shared washing station, combining tradition with careful modern processing.",
      farmerBioAr:
        "أكثر من ٨٠ عائلة من صغار المزارعين يجمعون محصولهم في محطة غسيل مشتركة، يمزجون التقاليد بالمعالجة الحديثة الدقيقة.",
    },
  },
  {
    id: "ethiopia-yirgacheffe",
    category: "beans",
    nameEn: "Ethiopia Yirgacheffe",
    nameAr: "إثيوبيا يرغاشيفي",
    originEn: "Ethiopia",
    originAr: "إثيوبيا",
    roastEn: "Light",
    roastAr: "خفيف",
    notesEn: "Jasmine · Bergamot · Lemon · Silky Body",
    notesAr: "ياسمين · بيرغاموت · ليمون · جسم حريري",
    descEn: "The classic Ethiopian washed. Floral and bright with a delicate, silky mouthfeel.",
    descAr: "الإثيوبي الكلاسيكي المغسول. زهري ومشرق مع نكهة حريرية رقيقة.",
    weight: "250g",
    price: 18000,
    image: "/images/ethiopia.jpg",
    featured: true,
    origin: {
      storyEn:
        "Yirgacheffe is the birthplace of coffee, and this washed lot shows why. Heirloom varieties native to the region — passed down through generations of wild forest coffee — give an unmistakable jasmine aroma and bright citrus lift.",
      storyAr:
        "يرغاشيفي هي مهد القهوة، وهذا المحصول المغسول يُظهر السبب. الأصناف الموروثة الأصلية في المنطقة — المتوارثة عبر أجيال من قهوة الغابات البرية — تمنح رائحة ياسمين لا تُخطئ وإشراقة حمضيات.",
      farm: {
        farmEn: "Kochere washing station",
        farmAr: "محطة كوتشيري للغسيل",
        regionEn: "Yirgacheffe, Ethiopia",
        regionAr: "يرغاشيفي، إثيوبيا",
        altitude: "1,900–2,200 masl",
        varietyEn: "Indigenous Heirloom",
        varietyAr: "أصناف موروثة محلية",
        processEn: "Fully washed",
        processAr: "مغسول بالكامل",
        producerEn: "Local smallholders",
        producerAr: "صغار المزارعين المحليين",
        harvestEn: "November – January",
        harvestAr: "نوفمبر – يناير",
      },
      farmerNameEn: "Kochere Growers",
      farmerNameAr: "مزارعو كوتشيري",
      farmerBioEn:
        "Hundreds of family plots deliver ripe cherries daily to the Kochere station, where they are hand-sorted before washing.",
      farmerBioAr:
        "مئات من قطع الأراضي العائلية تسلّم الكرز الناضج يومياً إلى محطة كوتشيري، حيث يُفرز يدوياً قبل الغسيل.",
    },
  },
  {
    id: "colombia-huila",
    category: "beans",
    nameEn: "Colombia Huila",
    nameAr: "كولومبيا هويلا",
    originEn: "Colombia",
    originAr: "كولومبيا",
    roastEn: "Medium",
    roastAr: "متوسط",
    notesEn: "Red Apple · Brown Sugar · Bright Acidity",
    notesAr: "تفاح أحمر · سكر بني · حموضة منعشة",
    descEn: "A crowd-pleasing Colombian from the Huila region with sweet red apple and brown sugar notes.",
    descAr: "كولومبي من منطقة هويلا بنكهات تفاح أحمر حلو وسكر بني.",
    weight: "250g",
    price: 16000,
    image: "/images/colombia.jpg",
    origin: {
      storyEn:
        "Huila's steep, sun-drenched slopes and rich volcanic soil produce some of Colombia's most balanced coffees. Hand-picked and carefully washed, this lot is sweet, clean, and endlessly drinkable.",
      storyAr:
        "منحدرات هويلا الحادة المشمسة وتربتها البركانية الغنية تنتج بعضاً من أكثر قهوات كولومبيا توازناً. يُقطف يدوياً ويُغسل بعناية، وهذا المحصول حلو ونظيف وسهل الشرب.",
      farm: {
        farmEn: "Finca El Mirador",
        farmAr: "مزرعة إل ميرادور",
        regionEn: "Huila, Colombia",
        regionAr: "هويلا، كولومبيا",
        altitude: "1,500–1,750 masl",
        varietyEn: "Castillo, Colombia",
        varietyAr: "كاستيلو، كولومبيا",
        processEn: "Fully washed",
        processAr: "مغسول بالكامل",
        producerEn: "Don Hernán Muñoz",
        producerAr: "دون هيرنان مونيوز",
        harvestEn: "April – June",
        harvestAr: "أبريل – يونيو",
      },
      farmerNameEn: "Hernán Muñoz",
      farmerNameAr: "هيرنان مونيوز",
      farmerBioEn:
        "Hernán farms two hectares with his family, depulping and fermenting each day's pick the same evening to lock in clarity.",
      farmerBioAr:
        "يزرع هيرنان هكتارين مع عائلته، يقشّر ويخمّر قطاف كل يوم في المساء نفسه للحفاظ على نقاء النكهة.",
    },
  },
  {
    id: "kenya-aa",
    category: "beans",
    nameEn: "Kenya AA",
    nameAr: "كينيا AA",
    originEn: "Kenya",
    originAr: "كينيا",
    roastEn: "Light-Medium",
    roastAr: "خفيف-متوسط",
    notesEn: "Blackcurrant · Tomato · Wine-like",
    notesAr: "كشمش أسود · طماطم · نكهة نبيذية",
    descEn: "Kenyans are unlike anything else. Bold, wine-like, and unforgettable.",
    descAr: "القهوة الكينية لا مثيل لها. جريئة، بنكهة نبيذية، لا تُنسى.",
    weight: "250g",
    price: 19000,
    image: "/images/kenya.jpg",
    origin: {
      storyEn:
        "“AA” is Kenya's top grade — the largest, densest beans. Grown on red volcanic soil and processed with Kenya's meticulous double-fermentation washing, this cup is intense, juicy, and famously wine-like.",
      storyAr:
        "«AA» هي أعلى درجة في كينيا — أكبر الحبوب وأكثرها كثافة. تُزرع على تربة بركانية حمراء وتُعالج بغسيل التخمير المزدوج الدقيق، لتقدّم فنجاناً مكثفاً وعصيرياً بنكهة نبيذية مشهورة.",
      farm: {
        farmEn: "Nyeri smallholder factory",
        farmAr: "مصنع نيري لصغار المزارعين",
        regionEn: "Nyeri County, Kenya",
        regionAr: "مقاطعة نيري، كينيا",
        altitude: "1,700–1,920 masl",
        varietyEn: "SL28, SL34, Ruiru 11",
        varietyAr: "SL28، SL34، رويرو ١١",
        processEn: "Washed (double fermentation)",
        processAr: "مغسول (تخمير مزدوج)",
        producerEn: "Nyeri cooperative society",
        producerAr: "جمعية نيري التعاونية",
        harvestEn: "October – December",
        harvestAr: "أكتوبر – ديسمبر",
      },
      farmerNameEn: "Nyeri Cooperative",
      farmerNameAr: "تعاونية نيري",
      farmerBioEn:
        "Members deliver cherries to a shared “factory” (washing station) where Kenya's signature clean, bright profile is built through careful soaking and grading.",
      farmerBioAr:
        "يسلّم الأعضاء الكرز إلى «مصنع» مشترك (محطة غسيل) حيث تُبنى نكهة كينيا النظيفة المشرقة عبر النقع والتصنيف الدقيق.",
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
