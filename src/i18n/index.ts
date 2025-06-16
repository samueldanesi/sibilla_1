import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      // Brand
      brand: {
        name: "SIBILLA",
      },

      // Navigation
      nav: {
        howToEnjoy: "How to enjoy?",
        whatIsThis: "What's this?",
        cocktails: "Cocktails",
        language: "Language",
      },

      // Age verification
      ageVerification: {
        question: "Are you of legal age for drinking?",
        yes: "Yes, I am.",
        no: "No, I'm not.",
      },

      // Mobile redirect
      mobileRedirect: {
        title: "Use your smartphone for the best experience.",
        subtitle: "Scan the following QR code:",
      },

      // Hero section
      hero: {
        sideTextLeft: "Shining cocktail experience.",
        sideTextRight: "Made in Italy",
        title: "IT'S GOING TO HAPPEN",
        subtitle: "Shake it. Share it. Enjoy it.",
      },

      // Instructions
      instructions: {
        title: "How to enjoy?",
        quote:
          "The magic happens when you shake it and watch the sparkles dance.",
        step1: {
          title: "Turn it upside down.",
          description:
            "Gently invert the bottle to prepare for the magical transformation.",
        },
        step2: {
          title: "Shake it.",
          description: "'till the glitter's throughout the wine",
        },
      },

      // Product description
      description: {
        title: "What's this thing btw?",
        mainText:
          "A shining drink experience based on dry Italian sparkling wine.",
        specs: {
          volume: "Volume [%]",
          format: "Format [cl]",
          serving: "Serving [°C]",
        },
        perfectExperience: {
          title: "The Perfect Sparkling Experience",
          paragraph1:
            "Crafted in the heart of Italy, Sibilla represents the perfect balance between tradition and innovation. Our unique formula creates a mesmerizing glittering effect that transforms every glass into a celebration.",
          paragraph2:
            "Best served chilled at 6-8°C, Sibilla is not just a drink—it's an experience that brings people together through its enchanting visual appeal and exceptional taste.",
        },
      },

      // Cocktails
      cocktails: {
        title: "What can you do?",
        ingredients: "Ingredients",
        tryRecipe: "Try this recipe",
        scrollHint: "← Scroll to explore more cocktails →",
        difficulty: {
          easy: "Easy",
          medium: "Medium",
          hard: "Hard",
        },
        time: "{{time}} min",
      },

      // Footer
      footer: {
        tagline: "Shake it. Share it. Enjoy it.",
        description:
          "Experience the magic of Italian sparkling wine with our unique glittering effect. Every bottle tells a story of tradition, innovation, and celebration.",
        socials: "Socials:",
        instagram: "Instagram",
        facebook: "Facebook",
        businessInquiries: "Business inquiries:",
        headquarter: "Headquarter:",
        email: "info@sibilladrinks.com",
        location: "Milan, Italy",
        copyright: "SIBILLA DRINKS® ©2022",
        backToTop: "Back to top",
      },

      // Share
      share: {
        button: "Share",
        title: "Sibilla Drinks",
        text: "Experience the shining cocktail sensation from Italy",
        copied: "Copied!",
        copyLink: "Copy Link",
      },

      // Loading
      loading: {
        text: "Loading magical experience...",
      },

      // Error
      error: {
        title: "Something went wrong",
        subtitle: "Please try again later",
        retry: "Retry",
      },
    },
  },
  it: {
    translation: {
      // Brand
      brand: {
        name: "SIBILLA",
      },

      // Navigation
      nav: {
        howToEnjoy: "Come gustarlo?",
        whatIsThis: "Cos'è questo?",
        cocktails: "Cocktail",
        language: "Lingua",
      },

      // Age verification
      ageVerification: {
        question: "Hai l'età legale per bere?",
        yes: "Sì, ce l'ho.",
        no: "No, non ce l'ho.",
      },

      // Mobile redirect
      mobileRedirect: {
        title: "Usa il tuo smartphone per la migliore esperienza.",
        subtitle: "Scansiona il seguente codice QR:",
      },

      // Hero section
      hero: {
        sideTextLeft: "Esperienza cocktail scintillante.",
        sideTextRight: "Made in Italy",
        title: "STA PER SUCCEDERE",
        subtitle: "Scuotilo. Condividilo. Gustalo.",
      },

      // Instructions
      instructions: {
        title: "Come gustarlo?",
        quote: "La magia accade quando lo scuoti e guardi i glitter danzare.",
        step1: {
          title: "Giralo a testa in giù.",
          description:
            "Capovolgi delicatamente la bottiglia per preparare la trasformazione magica.",
        },
        step2: {
          title: "Scuotilo.",
          description: "finché i glitter non si diffondono nel vino",
        },
      },

      // Product description
      description: {
        title: "Cos'è questa cosa?",
        mainText:
          "Un'esperienza di bevanda scintillante basata su spumante italiano secco.",
        specs: {
          volume: "Volume [%]",
          format: "Formato [cl]",
          serving: "Servizio [°C]",
        },
        perfectExperience: {
          title: "L'Esperienza Spumantistica Perfetta",
          paragraph1:
            "Creato nel cuore d'Italia, Sibilla rappresenta il perfetto equilibrio tra tradizione e innovazione. La nostra formula unica crea un affascinante effetto scintillante che trasforma ogni bicchiere in una celebrazione.",
          paragraph2:
            "Servito meglio freddo a 6-8°C, Sibilla non è solo una bevanda—è un'esperienza che unisce le persone attraverso il suo fascino visivo incantevole e il gusto eccezionale.",
        },
      },

      // Cocktails
      cocktails: {
        title: "Cosa puoi fare?",
        ingredients: "Ingredienti",
        tryRecipe: "Prova questa ricetta",
        scrollHint: "← Scorri per esplorare più cocktail →",
        difficulty: {
          easy: "Facile",
          medium: "Medio",
          hard: "Difficile",
        },
        time: "{{time}} min",
      },

      // Footer
      footer: {
        tagline: "Scuotilo. Condividilo. Gustalo.",
        description:
          "Vivi la magia dello spumante italiano con il nostro esclusivo effetto scintillante. Ogni bottiglia racconta una storia di tradizione, innovazione e celebrazione.",
        socials: "Social:",
        instagram: "Instagram",
        facebook: "Facebook",
        businessInquiries: "Richieste commerciali:",
        headquarter: "Sede centrale:",
        email: "info@sibilladrinks.com",
        location: "Milano, Italia",
        copyright: "SIBILLA DRINKS® ©2022",
        backToTop: "Torna su",
      },

      // Share
      share: {
        button: "Condividi",
        title: "Sibilla Drinks",
        text: "Vivi l'esperienza del cocktail scintillante dall'Italia",
        copied: "Copiato!",
        copyLink: "Copia Link",
      },

      // Loading
      loading: {
        text: "Caricamento esperienza magica...",
      },

      // Error
      error: {
        title: "Qualcosa è andato storto",
        subtitle: "Riprova più tardi",
        retry: "Riprova",
      },
    },
  },
  ko: {
    translation: {
      // Brand
      brand: {
        name: "SIBILLA",
      },

      // Navigation
      nav: {
        howToEnjoy: "즐기는 방법은?",
        whatIsThis: "이게 뭐야?",
        cocktails: "칵테일",
        language: "언어",
      },

      // Age verification
      ageVerification: {
        question: "음주 가능한 연령입니까?",
        yes: "네, 그렇습니다.",
        no: "아니요, 아닙니다.",
      },

      // Mobile redirect
      mobileRedirect: {
        title: "최고의 경험을 위해 스마트폰을 사용하세요.",
        subtitle: "다음 QR 코드를 스캔하세요:",
      },

      // Hero section
      hero: {
        sideTextLeft: "빛나는 칵테일 경험.",
        sideTextRight: "Made in Italy",
        title: "곧 일어날 일이야",
        subtitle: "흔들어. 공유해. 즐겨.",
      },

      // Instructions
      instructions: {
        title: "즐기는 방법은?",
        quote: "흔들고 글리터가 춤추는 것을 보면 마법이 일어납니다.",
        step1: {
          title: "거꾸로 뒤집어.",
          description: "마법 같은 변화를 위해 병을 부드럽게 뒤집으세요.",
        },
        step2: {
          title: "흔들어.",
          description: "글리터가 와인 전체에 퍼질 때까지",
        },
      },

      // Product description
      description: {
        title: "이게 뭔데?",
        mainText:
          "드라이 이탈리안 스파클링 와인을 기반으로 한 빛나는 음료 경험.",
        specs: {
          volume: "볼륨 [%]",
          format: "포맷 [cl]",
          serving: "서빙 [°C]",
        },
        perfectExperience: {
          title: "완벽한 스파클링 경험",
          paragraph1:
            "이탈리아의 심장부에서 제작된 Sibilla는 전통과 혁신 사이의 완벽한 균형을 나타냅니다. 우리의 독특한 공식은 모든 잔을 축하로 변화시키는 매혹적인 글리터 효과를 만듭니다.",
          paragraph2:
            "6-8°C로 차갑게 서빙하는 것이 가장 좋으며, Sibilla는 단순한 음료가 아닙니다—매혹적인 시각적 매력과 뛰어난 맛을 통해 사람들을 하나로 모으는 경험입니다.",
        },
      },

      // Cocktails
      cocktails: {
        title: "뭘 할 수 있어?",
        ingredients: "재료",
        tryRecipe: "이 레시피를 시도해보세요",
        scrollHint: "← 더 많은 칵테일을 탐색하려면 스크롤하세요 →",
        difficulty: {
          easy: "쉬움",
          medium: "보통",
          hard: "어려움",
        },
        time: "{{time}}분",
      },

      // Footer
      footer: {
        tagline: "흔들어. 공유해. 즐겨.",
        description:
          "독특한 글리터 효과로 이탈리안 스파클링 와인의 마법을 경험하세요. 모든 병은 전통, 혁신, 그리고 축하의 이야기를 담고 있습니다.",
        socials: "소셜:",
        instagram: "인스타그램",
        facebook: "페이스북",
        businessInquiries: "비즈니스 문의:",
        headquarter: "본사:",
        email: "info@sibilladrinks.com",
        location: "밀라노, 이탈리아",
        copyright: "SIBILLA DRINKS® ©2022",
        backToTop: "맨 위로",
      },

      // Share
      share: {
        button: "공유",
        title: "시빌라 드링크",
        text: "이탈리아의 빛나는 칵테일 센세이션을 경험하세요",
        copied: "복���됨!",
        copyLink: "링크 복사",
      },

      // Loading
      loading: {
        text: "마법 같은 경험을 로딩 중...",
      },

      // Error
      error: {
        title: "문제가 발생했습니다",
        subtitle: "나중에 다시 시도해주세요",
        retry: "다시 시도",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
