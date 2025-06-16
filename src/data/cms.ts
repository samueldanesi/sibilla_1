// Mock CMS data structure simulating a remote API

export interface ProductData {
  id: string;
  title: string;
  subtitle: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  images: {
    hero: string;
    instruction1: string;
    instruction2: string;
  };
  specifications: {
    volume: number;
    format: number;
    serving: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface RecipeData {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: Array<{
    name: string;
    amount: string;
  }>;
  instructions: string[];
  difficulty: "easy" | "medium" | "hard";
  time: number; // minutes
}

export interface CMSData {
  product: ProductData;
  recipes: RecipeData[];
  instructions: Array<{
    step: number;
    title: string;
    description: string;
    image: string;
  }>;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API function
export const fetchCMSData = async (
  language: string = "en",
): Promise<CMSData> => {
  await delay(800); // Simulate network delay

  // Dynamic content based on language
  const translations = {
    en: {
      productDescription:
        "A shining drink experience based on dry Italian sparkling wine.",
      hugoDescription:
        "A refreshing twist on the classic Hugo cocktail, enhanced with Sibilla's sparkling magic and fresh mint leaves.",
      spritzDescription:
        "Italian aperitivo perfection. Sibilla meets Aperol in this vibrant, effervescent cocktail that embodies the spirit of Italian summers.",
      sbagliatoDescription:
        "A sophisticated reinterpretation of the Negroni Sbagliato, where Sibilla replaces traditional prosecco for an elevated experience.",
      sojuFizzDescription:
        "East meets West in this innovative cocktail that combines Korean soju with Italian Sibilla for a unique cross-cultural experience.",
    },
    it: {
      productDescription:
        "Un'esperienza di bevanda scintillante basata su spumante italiano secco.",
      hugoDescription:
        "Una rivisitazione rinfrescante del classico cocktail Hugo, arricchita dalla magia frizzante di Sibilla e foglie di menta fresca.",
      spritzDescription:
        "Perfezione dell'aperitivo italiano. Sibilla incontra Aperol in questo cocktail vibrante ed effervescente che incarna lo spirito delle estati italiane.",
      sbagliatoDescription:
        "Una reinterpretazione sofisticata del Negroni Sbagliato, dove Sibilla sostituisce il prosecco tradizionale per un'esperienza elevata.",
      sojuFizzDescription:
        "L'Oriente incontra l'Occidente in questo cocktail innovativo che combina il soju coreano con l'italiano Sibilla per un'esperienza interculturale unica.",
    },
    ko: {
      productDescription:
        "드라이 이탈리안 스파클링 와인을 기반으로 한 빛나는 음료 경험.",
      hugoDescription:
        "클래식 휴고 칵테일의 상쾌한 변형으로, 시빌라의 스파클링 마법과 신선한 민트 잎으로 강화��었습니다.",
      spritzDescription:
        "이탈리안 아페리티보의 완벽함. 시빌라와 아페롤이 만나 이탈리아 여름의 정신을 구현하는 생생하고 거품이 나는 칵테일입니다.",
      sbagliatoDescription:
        "네���로니 스바글리아토의 세련된 재해석으로, 시빌라가 전통적인 프로세코를 대체��여 향상된 경험을 제공합니다.",
      sojuFizzDescription:
        "동양과 서양이 만나는 혁신적인 칵테일로, 한국 소주와 이탈리아 시빌라를 결합하여 독특한 문화 간 경험을 만들어냅니다.",
    },
  };

  const content =
    translations[language as keyof typeof translations] || translations.en;

  const data: CMSData = {
    product: {
      id: "sibilla-sparkling-wine",
      title: "SIBILLA",
      subtitle: "Premium Italian Sparkling Wine",
      heroTitle: "IT'S GOING TO HAPPEN",
      heroSubtitle: "Shake it. Share it. Enjoy it.",
      description: content.productDescription,
      images: {
        hero: "https://cdn.builder.io/api/v1/assets/068663b3092b4939934abff927b6d1c8/whatsapp-image-2025-06-13-at-09.40.01-modificata-67db10?format=webp&width=800",
        instruction1:
          "https://cdn.builder.io/api/v1/assets/068663b3092b4939934abff927b6d1c8/whatsapp-image-2025-06-13-at-09.40.01-modificata-67db10?format=webp&width=800",
        instruction2:
          "https://cdn.builder.io/api/v1/assets/068663b3092b4939934abff927b6d1c8/whatsapp-image-2025-06-13-at-09.40.01-modificata-67db10?format=webp&width=800",
      },
      specifications: {
        volume: 10,
        format: 75,
        serving: "6-8",
      },
      colors: {
        primary: "#FDFDF2",
        secondary: "#FCF5F2",
        accent: "#000000",
      },
    },
    recipes: [
      {
        id: "hugo-sibilla",
        title: "HUGO",
        image:
          "https://images.pexels.com/photos/639146/pexels-photo-639146.jpeg",
        description: content.hugoDescription,
        ingredients: [
          { name: "Sibilla Sparkling Wine", amount: "100ml" },
          { name: "Elderflower syrup", amount: "20ml" },
          { name: "Fresh mint leaves", amount: "6-8" },
          { name: "Lime wedge", amount: "1" },
          { name: "Soda water", amount: "50ml" },
        ],
        instructions: [
          "Muddle mint leaves gently in glass",
          "Add elderflower syrup and lime",
          "Fill with ice cubes",
          "Pour Sibilla and top with soda water",
          "Stir gently and garnish with mint",
        ],
        difficulty: "easy",
        time: 5,
      },
      {
        id: "spritz-sibilla",
        title: "SPRITZ",
        image:
          "https://images.pexels.com/photos/12711548/pexels-photo-12711548.jpeg",
        description: content.spritzDescription,
        ingredients: [
          { name: "Sibilla Sparkling Wine", amount: "90ml" },
          { name: "Aperol", amount: "60ml" },
          { name: "Soda water", amount: "30ml" },
          { name: "Orange slice", amount: "1" },
          { name: "Ice cubes", amount: "4-5" },
        ],
        instructions: [
          "Fill wine glass with ice",
          "Add Aperol first",
          "Pour Sibilla sparkling wine",
          "Top with soda water",
          "Garnish with orange slice",
        ],
        difficulty: "easy",
        time: 3,
      },
      {
        id: "sbagliato-sibilla",
        title: "SBAGLIATO",
        image:
          "https://images.pexels.com/photos/14432038/pexels-photo-14432038.jpeg",
        description: content.sbagliatoDescription,
        ingredients: [
          { name: "Sibilla Sparkling Wine", amount: "90ml" },
          { name: "Campari", amount: "30ml" },
          { name: "Sweet Vermouth", amount: "30ml" },
          { name: "Orange peel", amount: "1" },
          { name: "Ice cubes", amount: "3-4" },
        ],
        instructions: [
          "Add Campari and vermouth to glass",
          "Fill with ice cubes",
          "Top with Sibilla sparkling wine",
          "Stir gently",
          "Express orange peel oils and garnish",
        ],
        difficulty: "medium",
        time: 4,
      },
      {
        id: "soju-fizz",
        title: "SOJU FIZZ",
        image:
          "https://images.pexels.com/photos/4975373/pexels-photo-4975373.jpeg",
        description: content.sojuFizzDescription,
        ingredients: [
          { name: "Sibilla Sparkling Wine", amount: "80ml" },
          { name: "Soju", amount: "40ml" },
          { name: "Yuzu juice", amount: "15ml" },
          { name: "Simple syrup", amount: "10ml" },
          { name: "Cucumber slice", amount: "2" },
        ],
        instructions: [
          "Muddle cucumber slices lightly",
          "Add soju, yuzu juice, and syrup",
          "Fill with ice",
          "Top with Sibilla sparkling wine",
          "Garnish with cucumber wheel",
        ],
        difficulty: "medium",
        time: 6,
      },
    ],
    instructions: [
      {
        step: 1,
        title: "Turn it upside down.",
        description:
          "Gently invert the bottle to prepare for the magical transformation.",
        image:
          "https://cdn.builder.io/api/v1/assets/068663b3092b4939934abff927b6d1c8/whatsapp-image-2025-06-13-at-09.40.01-modificata-67db10?format=webp&width=800",
      },
      {
        step: 2,
        title: "Shake it.",
        description: "'till the glitter's throughout the wine",
        image:
          "https://cdn.builder.io/api/v1/assets/068663b3092b4939934abff927b6d1c8/whatsapp-image-2025-06-13-at-09.40.01-modificata-67db10?format=webp&width=800",
      },
    ],
  };

  return data;
};

// Mock function to simulate CMS updates
export const updateProductData = async (
  productId: string,
  updates: Partial<ProductData>,
): Promise<ProductData> => {
  await delay(500);
  // Simulate update response
  const currentData = await fetchCMSData();
  return { ...currentData.product, ...updates };
};
