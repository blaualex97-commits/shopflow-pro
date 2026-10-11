const products = [
  {
    id: 1,
    slug: "nova-x-pro-smartphone",
    title: "Nova X Pro Smartphone",
    brand: "Nova",
    category: "electronics",
    subcategory: "smartphones",

    price: 4299,
    oldPrice: 4899,
    stock: 18,

    rating: 4.9,
    reviews: 428,
    featured: true,
    badge: "BESTSELLER",

    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85",

    gallery: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=85",
    ],

    description: {
      en: "Flagship smartphone with premium OLED display, advanced camera system and all-day battery life.",
      ro: "Smartphone flagship cu ecran OLED premium, sistem foto avansat și autonomie pentru întreaga zi.",
    },

    tags: [
      "phone",
      "smartphone",
      "telefon",
      "mobile",
      "oled",
      "camera",
      "5g",
    ],

    specs: {
      display: '6.7" OLED',
      storage: "256 GB",
      memory: "12 GB RAM",
      connectivity: "5G",
      warranty: "24 months",
    },

    offers: [
      {
        id: "nova-techpoint",
        seller: "TechPoint",
        price: 4299,
        oldPrice: 4899,
        stock: 18,
        rating: 4.9,
        reviews: 2184,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 1,
          label: {
            en: "Delivery tomorrow",
            ro: "Livrare mâine",
          },
        },
        shipping: 0,
      },
      {
        id: "nova-digitalhub",
        seller: "DigitalHub",
        price: 4349,
        oldPrice: 4799,
        stock: 7,
        rating: 4.8,
        reviews: 1042,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 0,
      },
      {
        id: "nova-gadgetzone",
        seller: "GadgetZone",
        price: 4199,
        oldPrice: 4699,
        stock: 0,
        rating: 4.6,
        reviews: 761,
        verified: true,
        delivery: null,
        shipping: 19.99,
      },
    ],
  },

  {
    id: 2,
    slug: "pulse-anc-headphones",
    title: "Pulse ANC Headphones",
    brand: "Pulse",
    category: "electronics",
    subcategory: "audio",

    price: 899,
    oldPrice: 1099,
    stock: 31,

    rating: 4.8,
    reviews: 316,
    featured: true,
    badge: "PRICE DROP",

    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",

    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85",
    ],

    description: {
      en: "Wireless over-ear headphones with active noise cancellation and immersive spatial audio.",
      ro: "Căști wireless over-ear cu anulare activă a zgomotului și sunet spațial captivant.",
    },

    tags: [
      "headphones",
      "audio",
      "casti",
      "wireless",
      "bluetooth",
      "anc",
      "music",
    ],

    specs: {
      connection: "Bluetooth 5.3",
      battery: "40 hours",
      noiseCancellation: "Active ANC",
      charging: "USB-C",
      warranty: "24 months",
    },

    offers: [
      {
        id: "pulse-technova",
        seller: "TechNova",
        price: 899,
        oldPrice: 1099,
        stock: 14,
        rating: 4.9,
        reviews: 2531,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 1,
          label: {
            en: "Delivery tomorrow",
            ro: "Livrare mâine",
          },
        },
        shipping: 0,
      },
      {
        id: "pulse-digitalhub",
        seller: "DigitalHub",
        price: 929,
        oldPrice: 999,
        stock: 3,
        rating: 4.7,
        reviews: 1042,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 0,
      },
      {
        id: "pulse-electropoint",
        seller: "ElectroPoint",
        price: 879,
        oldPrice: 949,
        stock: 0,
        rating: 4.8,
        reviews: 783,
        verified: true,
        delivery: null,
        shipping: 0,
      },
    ],
  },

  {
    id: 3,
    slug: "aerobook-ultra-14",
    title: "AeroBook Ultra 14",
    brand: "Aero",
    category: "electronics",
    subcategory: "laptops",

    price: 5999,
    oldPrice: 6599,
    stock: 9,

    rating: 4.9,
    reviews: 185,
    featured: true,
    badge: "AI PICK",

    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "Powerful ultrabook designed for productivity, development and creative workflows.",
      ro: "Ultrabook performant creat pentru productivitate, programare și proiecte creative.",
    },

    tags: [
      "laptop",
      "notebook",
      "ultrabook",
      "computer",
      "developer",
      "work",
      "programming",
    ],

    specs: {
      display: '14" 2.8K OLED',
      processor: "Aero X9 Pro",
      memory: "32 GB RAM",
      storage: "1 TB SSD",
      battery: "18 hours",
    },

    offers: [
      {
        id: "aero-techpoint",
        seller: "TechPoint",
        price: 5999,
        oldPrice: 6599,
        stock: 9,
        rating: 4.9,
        reviews: 2184,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 0,
      },
      {
        id: "aero-computerhub",
        seller: "ComputerHub",
        price: 6099,
        oldPrice: 6699,
        stock: 4,
        rating: 4.8,
        reviews: 1653,
        verified: true,
        delivery: {
          minDays: 2,
          maxDays: 3,
          label: {
            en: "Delivery in 2–3 days",
            ro: "Livrare în 2–3 zile",
          },
        },
        shipping: 0,
      },
    ],
  },

  {
    id: 4,
    slug: "phantom-rgb-gaming-setup",
    title: "Phantom RGB Gaming Setup",
    brand: "Phantom",
    category: "gaming",
    subcategory: "peripherals",

    price: 749,
    oldPrice: 929,
    stock: 25,

    rating: 4.7,
    reviews: 264,
    featured: true,
    badge: "GAMING",

    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "RGB gaming peripherals engineered for speed, precision and immersive gameplay.",
      ro: "Periferice gaming RGB concepute pentru viteză, precizie și experiențe captivante.",
    },

    tags: [
      "gaming",
      "pc",
      "rgb",
      "keyboard",
      "mouse",
      "setup",
      "esports",
    ],

    specs: {
      keyboard: "Mechanical RGB",
      mouse: "16000 DPI",
      connection: "USB / Wireless",
      lighting: "ARGB",
      warranty: "24 months",
    },

    offers: [
      {
        id: "phantom-gamezone",
        seller: "GameZone",
        price: 749,
        oldPrice: 929,
        stock: 25,
        rating: 4.8,
        reviews: 3276,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 1,
          label: {
            en: "Delivery tomorrow",
            ro: "Livrare mâine",
          },
        },
        shipping: 0,
      },
      {
        id: "phantom-playhub",
        seller: "PlayHub",
        price: 779,
        oldPrice: 949,
        stock: 8,
        rating: 4.7,
        reviews: 1844,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 14.99,
      },
    ],
  },

  {
    id: 5,
    slug: "velocity-urban-sneakers",
    title: "Velocity Urban Sneakers",
    brand: "Velocity",
    category: "fashion",
    subcategory: "shoes",

    price: 449,
    oldPrice: 549,
    stock: 42,

    rating: 4.6,
    reviews: 194,
    featured: true,
    badge: "NEW",

    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "Lightweight urban sneakers combining everyday comfort with modern streetwear design.",
      ro: "Sneakers urbani ușori care combină confortul zilnic cu designul modern streetwear.",
    },

    tags: [
      "shoes",
      "sneakers",
      "fashion",
      "incaltaminte",
      "streetwear",
      "sport",
    ],

    specs: {
      material: "Breathable textile",
      sole: "Cushioned rubber",
      fit: "Regular",
      style: "Urban",
      warranty: "12 months",
    },

    offers: [
      {
        id: "velocity-stylehub",
        seller: "StyleHub",
        price: 449,
        oldPrice: 549,
        stock: 42,
        rating: 4.7,
        reviews: 1240,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 0,
      },
      {
        id: "velocity-urbanstore",
        seller: "UrbanStore",
        price: 469,
        oldPrice: 569,
        stock: 11,
        rating: 4.6,
        reviews: 928,
        verified: true,
        delivery: {
          minDays: 2,
          maxDays: 3,
          label: {
            en: "Delivery in 2–3 days",
            ro: "Livrare în 2–3 zile",
          },
        },
        shipping: 15.99,
      },
    ],
  },

  {
    id: 6,
    slug: "chronos-smart-watch",
    title: "Chronos Smart Watch",
    brand: "Chronos",
    category: "sport",
    subcategory: "wearables",

    price: 1299,
    oldPrice: 1499,
    stock: 16,

    rating: 4.8,
    reviews: 351,
    featured: true,
    badge: "SMART",

    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "Advanced smartwatch with health monitoring, GPS, workouts and smart notifications.",
      ro: "Smartwatch avansat cu monitorizare sănătate, GPS, antrenamente și notificări inteligente.",
    },

    tags: [
      "watch",
      "smartwatch",
      "ceas",
      "fitness",
      "gps",
      "health",
      "sport",
    ],

    specs: {
      display: '1.9" AMOLED',
      gps: "Dual-band GPS",
      battery: "7 days",
      waterResistance: "5 ATM",
      sensors: "HR / SpO2 / Sleep",
    },

    offers: [
      {
        id: "chronos-fitmarket",
        seller: "FitMarket",
        price: 1299,
        oldPrice: 1499,
        stock: 16,
        rating: 4.9,
        reviews: 1184,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 0,
      },
    ],
  },

  {
    id: 7,
    slug: "barista-pro-coffee-system",
    title: "Barista Pro Coffee System",
    brand: "Barista",
    category: "home",
    subcategory: "coffee",

    price: 1699,
    oldPrice: 1999,
    stock: 13,

    rating: 4.9,
    reviews: 223,
    featured: false,
    badge: "TOP RATED",

    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "Premium coffee machine for espresso, cappuccino and café-style drinks at home.",
      ro: "Espressor premium pentru espresso, cappuccino și băuturi ca la cafenea.",
    },

    tags: [
      "coffee",
      "espresso",
      "cafea",
      "home",
      "kitchen",
      "appliance",
    ],

    specs: {
      pressure: "15 bar",
      milkSystem: "Automatic",
      waterTank: "1.8 L",
      grinder: "Integrated",
      warranty: "24 months",
    },

    offers: [
      {
        id: "barista-homeplus",
        seller: "HomePlus",
        price: 1699,
        oldPrice: 1999,
        stock: 13,
        rating: 4.8,
        reviews: 1679,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 0,
      },
    ],
  },

  {
    id: 8,
    slug: "pureskin-daily-essentials",
    title: "PureSkin Daily Essentials",
    brand: "PureSkin",
    category: "beauty",
    subcategory: "skincare",

    price: 289,
    oldPrice: 349,
    stock: 37,

    rating: 4.7,
    reviews: 147,
    featured: false,
    badge: "POPULAR",

    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "Daily skincare essentials created for hydration, protection and a healthy-looking complexion.",
      ro: "Produse esențiale pentru hidratare, protecție și un aspect sănătos al pielii.",
    },

    tags: [
      "beauty",
      "skin",
      "skincare",
      "cosmetics",
      "ingrijire",
      "serum",
    ],

    specs: {
      skinType: "All skin types",
      routine: "Daily",
      crueltyFree: "Yes",
      dermatologicallyTested: "Yes",
      setItems: "4 products",
    },

    offers: [
      {
        id: "pureskin-beautybox",
        seller: "BeautyBox",
        price: 289,
        oldPrice: 349,
        stock: 37,
        rating: 4.8,
        reviews: 944,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 0,
      },
    ],
  },

  {
    id: 9,
    slug: "roadeye-4k-dash-camera",
    title: "RoadEye 4K Dash Camera",
    brand: "RoadEye",
    category: "auto",
    subcategory: "dashcams",

    price: 649,
    oldPrice: 799,
    stock: 21,

    rating: 4.6,
    reviews: 112,
    featured: false,
    badge: "4K",

    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "Compact 4K driving camera with night recording and intelligent incident detection.",
      ro: "Cameră auto compactă 4K cu filmare nocturnă și detectare inteligentă a incidentelor.",
    },

    tags: [
      "car",
      "auto",
      "camera",
      "dashcam",
      "4k",
      "driving",
      "masina",
    ],

    specs: {
      resolution: "4K UHD",
      viewingAngle: "160°",
      nightVision: "Yes",
      gps: "Built-in",
      storage: "MicroSD up to 256 GB",
    },

    offers: [
      {
        id: "roadeye-autotech",
        seller: "AutoTech",
        price: 649,
        oldPrice: 799,
        stock: 21,
        rating: 4.7,
        reviews: 721,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 0,
      },
    ],
  },

  {
    id: 10,
    slug: "minimal-everyday-jacket",
    title: "Minimal Everyday Jacket",
    brand: "Northline",
    category: "fashion",
    subcategory: "jackets",

    price: 599,
    oldPrice: 699,
    stock: 28,

    rating: 4.5,
    reviews: 87,
    featured: false,
    badge: "STYLE",

    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "Versatile premium jacket designed for everyday comfort and modern urban styling.",
      ro: "Geacă premium versatilă, creată pentru confort zilnic și stil urban modern.",
    },

    tags: [
      "fashion",
      "jacket",
      "clothes",
      "geaca",
      "haine",
      "urban",
    ],

    specs: {
      material: "Premium cotton blend",
      fit: "Regular",
      season: "Spring / Autumn",
      care: "Machine washable",
      style: "Minimal",
    },

    offers: [
      {
        id: "northline-stylehub",
        seller: "StyleHub",
        price: 599,
        oldPrice: 699,
        stock: 28,
        rating: 4.7,
        reviews: 1240,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 0,
      },
    ],
  },

  {
    id: 11,
    slug: "smart-air-fryer-xl",
    title: "Smart Air Fryer XL",
    brand: "HomeCore",
    category: "home",
    subcategory: "kitchen",

    price: 699,
    oldPrice: 849,
    stock: 34,

    rating: 4.8,
    reviews: 402,
    featured: false,
    badge: "HOT DEAL",

    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "Large smart air fryer with multiple cooking modes and digital temperature control.",
      ro: "Air fryer inteligent cu capacitate mare, multiple programe și control digital al temperaturii.",
    },

    tags: [
      "air fryer",
      "kitchen",
      "home",
      "cooking",
      "bucatarie",
      "appliance",
    ],

    specs: {
      capacity: "7.5 L",
      power: "1800 W",
      programs: "12",
      control: "Digital",
      temperature: "40–200°C",
    },

    offers: [
      {
        id: "homecore-homeplus",
        seller: "HomePlus",
        price: 699,
        oldPrice: 849,
        stock: 34,
        rating: 4.8,
        reviews: 1679,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 1,
          label: {
            en: "Delivery tomorrow",
            ro: "Livrare mâine",
          },
        },
        shipping: 0,
      },
    ],
  },

  {
    id: 12,
    slug: "build-better-software",
    title: "Build Better Software",
    brand: "TechPress",
    category: "books",
    subcategory: "technology",

    price: 149,
    oldPrice: 179,
    stock: 53,

    rating: 4.9,
    reviews: 96,
    featured: false,
    badge: "LEARNING",

    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85",

    description: {
      en: "A practical guide to writing cleaner code and building maintainable modern applications.",
      ro: "Un ghid practic pentru cod mai curat și aplicații moderne ușor de întreținut.",
    },

    tags: [
      "book",
      "books",
      "software",
      "programming",
      "coding",
      "carte",
      "learning",
    ],

    specs: {
      language: "English",
      pages: "420",
      format: "Paperback",
      publisher: "TechPress",
      topic: "Software development",
    },

    offers: [
      {
        id: "techpress-bookhub",
        seller: "BookHub",
        price: 149,
        oldPrice: 179,
        stock: 53,
        rating: 4.9,
        reviews: 2140,
        verified: true,
        delivery: {
          minDays: 1,
          maxDays: 2,
          label: {
            en: "Delivery in 1–2 days",
            ro: "Livrare în 1–2 zile",
          },
        },
        shipping: 9.99,
      },
    ],
  },
];

export default products;