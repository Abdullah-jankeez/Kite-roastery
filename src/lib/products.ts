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
