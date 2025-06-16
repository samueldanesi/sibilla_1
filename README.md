#  Sibilla Drinks - Premium React Experience

Una ricreazione premium del sito https://sibilladrinks.pages.dev/ completamente ridisegnata in React con architettura modulare, CMS dinamico e animazioni di livello enterprise.

##  Obiettivi della Challenge Completati

###  1. Ricreazione in React

- **Architettura modulare** con componenti riutilizabili
- **TypeScript** per type safety completa
- **Struttura di progetto scalabile** e maintainable

###  2. Simulazione CMS Remoto

- **Mock API** per dati prodotto (`src/data/cms.ts`)
- **Recupero dinamico** di tutti i contenuti
- **Gestione loading states** e error handling
- **TypeScript interfaces** per type safety dei dati

###  3. Animazioni Premium Migliorate

- **Framer Motion** per animazioni fluide e performanti
- **GSAP** per effetti avanzati e timeline complesse
- **Intersection Observer** per reveal animations
- **Micro-interazioni** su hover e click
- **Parallax scrolling** e smooth transitions

###  4. Supporto Multilingua Dinamico

- **react-i18next** per internazionalizzazione completa
- **Traduzioni complete** IT/EN
- **Language detection** automatico
- **Gestione dinamica** di tutti i testi

##  Architettura del Progetto

```
src/
├── components/           # Componenti riutilizabili
│   ├── ui/              # UI primitives (shadcn/ui)
│   ├── AgeVerificationOverlay.tsx
│   ├── MobileRedirectOverlay.tsx
│   ├── FixedHeader.tsx
│   ├── NavigationMenu.tsx
│   ├── HeroSection.tsx
│   ├── InstructionsSection.tsx
│   ├── DescriptionSection.tsx
│   ├── CocktailsSection.tsx
│   ├── CocktailCard.tsx
│   ├── ShareButton.tsx
│   ├── Footer.tsx
│   └── PremiumLoader.tsx
├── data/                # CMS mock e API
│   └── cms.ts
├── i18n/               # Internazionalizzazione
│   └── index.ts
├── pages/              # Route components
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript definitions
```

##  Funzionalità Premium Implementate

###  Animazioni Avanzate

- **Staggered animations** per reveal progressivi
- **Parallax effects** con scroll-triggered animations
- **Floating elements** con physics-based motion
- **Glitter effects** animati per effetto sparkle
- **Hover micro-interactions** su tutti gli elementi interattivi
- **Loading animations** con progress indicators

###  User Experience Ottimizzata

- **Age verification** flow completo
- **Mobile redirect** per esperienza ottimale
- **Smooth scrolling** navigation
- **Share functionality** con Web Share API
- **Responsive design** pixel-perfect
- **Performance ottimizzata** con lazy loading

###  CMS Integration

```typescript
// Esempio di utilizzo CMS
const data = await fetchCMSData("en");
console.log(data.product.title); // "SIBILLA"
console.log(data.recipes[0].ingredients); // Array di ingredienti
```

###  Multilingua Avanzato

```typescript
// Esempio di traduzione dinamica
const { t, i18n } = useTranslation();
t("hero.title"); // "IT'S GOING TO HAPPEN" / "STA PER SUCCEDERE"
i18n.changeLanguage("it"); // Cambio lingua dinamico
```

## Design System

### Colori

- **Primary**: `#FDFDF2` (cream-50)
- **Secondary**: `#FCF5F2` (cream-100)
- **Accent**: `#000000` (brand-black)
- **Text**: `#FFFFFF` (brand-white)

### Typography

- **Hero**: 560px Lausanne UltraLight
- **Display**: 60px Bold
- **Large**: 40px Medium
- **Body**: 16px Regular

### Animazioni

- **Durata**: 0.3s - 2s per diversi tipi
- **Easing**: `power3.out`, `spring`, `easeInOut`
- **Stagger**: 0.1s - 0.3s per elementi multipli

## Tecnologie Utilizzate

### Core

- **React 18** con TypeScript
- **Vite** per build e dev server
- **TailwindCSS** per styling sistemico

### Animazioni

- **Framer Motion** (motion, AnimatePresence, scroll-triggered)
- **GSAP** (timeline, stagger, advanced effects)
- **React Intersection Observer** (reveal animations)

### Internazionalizzazione

- **react-i18next** (traduzioni)
- **i18next-browser-languagedetector** (detection)

### State Management

- **React hooks** (useState, useEffect, custom hooks)
- **Context API** per state globale se necessario


### Installazione

```bash
npm install
```

### Sviluppo

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Type Check

```bash
npm run typecheck
``


##  Note Tecniche

### Ottimizzazioni Implementate

- **Code splitting** automatico con Vite
- **Lazy loading** delle immagini
- **Debounced animations** per performance
- **Memoization** dei componenti costosi

### Accessibilità

- **Semantic HTML** structure
- **ARIA labels** su elementi interattivi
- **Keyboard navigation** supportata
- **Screen reader** friendly

### SEO

- **Meta tags** dinamici
- **Structured data** per prodotti
- **Open Graph** tags per social sharing

---
