import type { Artist, Release, NewsItem, SiteSettings } from "../types";

export const DEFAULT_SETTINGS: SiteSettings = {
  heroTitle: "YOUR MUSIC\nEVERYWHERE",
  heroSubtitle: "Лейбл и цифровая дистрибуция — в одном месте",
  aboutText:
    "NIGHTVOLT — независимый лейбл и цифровой дистрибьютор, основанный в 2025 году командой музыкантов и профессионалов индустрии. Мы верим, что каждый артист заслуживает профессиональных инструментов, честных условий и настоящей поддержки.",
  email: "hello@nightvolt.com",
  telegram: "https://t.me/nightvolt",
  instagram: "https://instagram.com/nightvolt",
  youtube: "https://youtube.com/@nightvolt",
};

export const DEFAULT_ARTISTS: Artist[] = [
  {
    id: "a1",
    name: "LUNA GREY",
    role: "Артист",
    genre: "Alternative R&B",
    bio: "Вокалистка и автор, соединяющая интимный R&B с кинематографичными аранжировками. Дебютный EP собрал более 2 млн прослушиваний за первый месяц.",
    image:
      "https://images.pexels.com/photos/7586661/pexels-photo-7586661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    spotify: "https://open.spotify.com",
    instagram: "https://instagram.com",
    featured: true,
    createdAt: "2025-03-12",
  },
  {
    id: "a2",
    name: "KAIRO",
    role: "Артист / Продюсер",
    genre: "Electronic / Hip-Hop",
    bio: "Продюсер нового поколения. Минималистичный бит, живые текстуры и голос, который невозможно спутать. Релизы в ротации крупных плейлистов.",
    image:
      "https://images.pexels.com/photos/32085445/pexels-photo-32085445.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    spotify: "https://open.spotify.com",
    instagram: "https://instagram.com",
    featured: true,
    createdAt: "2025-04-02",
  },
  {
    id: "a3",
    name: "MIRA SOL",
    role: "Артист",
    genre: "Indie Pop",
    bio: "Автор песен с редким мелодическим чутьём. Её треки — это дневник, превращённый в радиоформат: честно, легко и цепко.",
    image:
      "https://images.pexels.com/photos/8197366/pexels-photo-8197366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    spotify: "https://open.spotify.com",
    instagram: "https://instagram.com",
    featured: true,
    createdAt: "2025-05-18",
  },
  {
    id: "a4",
    name: "NOVA REED",
    role: "Артист",
    genre: "Indie Rock",
    bio: "Гитара, текст и характер. NOVA REED строит звук на живых инструментах и честных историях — без лишнего глянца.",
    image:
      "https://images.pexels.com/photos/14037568/pexels-photo-14037568.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    spotify: "https://open.spotify.com",
    featured: false,
    createdAt: "2025-06-01",
  },
  {
    id: "a5",
    name: "ELLIOT VANE",
    role: "Саунд-продюсер",
    genre: "Electronic",
    bio: "Саунд-дизайнер и битмейкер. Работает на стыке клубной электроники и атмосферного даунтемпо. Регулярный коллаборатор ростера NIGHTVOLT.",
    image:
      "https://images.pexels.com/photos/35306377/pexels-photo-35306377.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    spotify: "https://open.spotify.com",
    featured: false,
    createdAt: "2025-07-09",
  },
  {
    id: "a6",
    name: "ASH & IVY",
    role: "Дуэт",
    genre: "Soul / Jazz",
    bio: "Вокальный дуэт с джазовым бэкграундом. Тёплый саунд, живые сессии и песни, которые хочется слушать ночью в наушниках.",
    image:
      "https://images.pexels.com/photos/32085449/pexels-photo-32085449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    spotify: "https://open.spotify.com",
    featured: true,
    createdAt: "2025-08-21",
  },
];

export const DEFAULT_RELEASES: Release[] = [
  {
    id: "r1",
    title: "Midnight Protocol",
    artistId: "a2",
    artistName: "KAIRO",
    cover:
      "https://images.pexels.com/photos/13312404/pexels-photo-13312404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "2026-02-14",
    type: "album",
    featured: true,
  },
  {
    id: "r2",
    title: "Soft Static",
    artistId: "a1",
    artistName: "LUNA GREY",
    cover:
      "https://images.pexels.com/photos/13327044/pexels-photo-13327044.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "2026-01-28",
    type: "ep",
    featured: true,
  },
  {
    id: "r3",
    title: "Glass Garden",
    artistId: "a3",
    artistName: "MIRA SOL",
    cover:
      "https://images.pexels.com/photos/13312405/pexels-photo-13312405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "2025-12-05",
    type: "single",
    featured: true,
  },
  {
    id: "r4",
    title: "Low Flame",
    artistId: "a6",
    artistName: "ASH & IVY",
    cover:
      "https://images.pexels.com/photos/25034239/pexels-photo-25034239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "2025-11-18",
    type: "ep",
    featured: false,
  },
  {
    id: "r5",
    title: "Signal Lost",
    artistId: "a5",
    artistName: "ELLIOT VANE",
    cover:
      "https://images.pexels.com/photos/13312406/pexels-photo-13312406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "2025-10-30",
    type: "single",
    featured: false,
  },
  {
    id: "r6",
    title: "Broken Compass",
    artistId: "a4",
    artistName: "NOVA REED",
    cover:
      "https://images.pexels.com/photos/13327045/pexels-photo-13327045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "2025-09-12",
    type: "album",
    featured: false,
  },
];

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "Как выпустить альбом в 2026 году и не потерять права",
    excerpt:
      "Пошаговый разбор: от мастеринга и метаданных до регистрации прав и стратегии релиза.",
    content:
      "Выпуск альбома — это не только загрузка файлов. В материале разбираем полный цикл: подготовка мастеров, ISRC/UPC, выбор площадок, пре-сейв кампании, права и роялти. NIGHTVOLT помогает пройти этот путь без лишней бюрократии.",
    image:
      "https://images.pexels.com/photos/13312404/pexels-photo-13312404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "2026-02-10",
    category: "Гайд",
  },
  {
    id: "n2",
    title: "Отчёт индустрии: что важно артисту в 2026",
    excerpt:
      "Ключевые метрики, тренды потребления и как независимым артистам расти без большого бюджета.",
    content:
      "Мы собрали ключевые цифры года: рост short-form discovery, значение owned-аудитории и роль честной дистрибуции. Коротко — о том, на что стоит смотреть артисту прямо сейчас.",
    image:
      "https://images.pexels.com/photos/13327044/pexels-photo-13327044.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "2026-01-22",
    category: "Индустрия",
  },
  {
    id: "n3",
    title: "От иллюзий к системе: метрики, которые реально работают",
    excerpt:
      "Какие показатели действительно важны при продвижении релиза — и какие можно игнорировать.",
    content:
      "Стримы — не единственная метрика. Разбираем save rate, playlist conversion, listener retention и то, как NIGHTVOLT помогает читать аналитику без шума.",
    image:
      "https://images.pexels.com/photos/13312405/pexels-photo-13312405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "2026-01-08",
    category: "Аналитика",
  },
];

export const PLATFORMS = [
  "Spotify",
  "Apple Music",
  "YouTube Music",
  "Яндекс Музыка",
  "VK Музыка",
  "Deezer",
  "Tidal",
  "Amazon Music",
  "Boom",
  "SoundCloud",
  "TikTok",
  "Instagram",
  "Anghami",
  "Pandora",
  "iHeartRadio",
  "Audiomack",
];

export const PARTNERS = [
  { name: "Believe", letter: "B" },
  { name: "Soyuz Music", letter: "S" },
  { name: "Gamma", letter: "G" },
  { name: "Effective", letter: "E" },
  { name: "Velvet", letter: "V" },
  { name: "Osuma", letter: "O" },
  { name: "Coloz", letter: "C" },
  { name: "Rocket", letter: "R" },
];

export const FAQ_ITEMS = [
  {
    q: "С чего начинается сотрудничество и какие юридические аспекты важно учесть?",
    a: "Мы начинаем с короткой заявки и созвона. Далее — договор, в котором прозрачно зафиксированы права, сроки, процент и зона ответственности. Без скрытых пунктов и серых схем.",
  },
  {
    q: "Чем отличаются авторские права от смежных?",
    a: "Авторские права защищают музыку и текст как произведение. Смежные — запись исполнения (мастер-запись). Мы помогаем корректно оформить оба слоя, чтобы выплаты приходили вам, а не «в никуда».",
  },
  {
    q: "Что такое правоподтверждающие документы?",
    a: "Это документы, подтверждающие, что вы вправе распоряжаться треком: договор с соавторами, лицензии на сэмплы, согласие лейбла и т.д. Они нужны для защиты релиза и корректных выплат.",
  },
  {
    q: "Можно ли загрузить релиз через другую платформу, а роялти собирать через NIGHTVOLT?",
    a: "Как правило, один релиз — один дистрибьютор на площадках. Мы можем перенести каталог и выстроить единую систему учёта, чтобы всё было в одном окне.",
  },
  {
    q: "Как быстро музыка появляется на площадках?",
    a: "В среднем от 24 до 72 часов на основные платформы при корректно заполненных метаданных. Для крупных редакционных плейлистов рекомендуем закладывать 2–4 недели на пре-сейв и питчинг.",
  },
  {
    q: "Как часто и на основании каких документов производятся выплаты?",
    a: "Выплаты — по отчётным периодам площадок, прозрачный кабинет и детализация по трекам. Минимальный порог и график фиксируются в договоре. Без сюрпризов.",
  },
  {
    q: "Какой процент роялти остаётся артисту?",
    a: "На дистрибуции — до 80% роялти артисту (за вычетом комиссии площадок). На лейбл-сделках условия индивидуальны и всегда обсуждаются до подписания.",
  },
  {
    q: "Вы работаете только с определёнными жанрами?",
    a: "Нет. Нам важен уровень материала, ясность намерений и готовность работать системно. Жанр — вторичен.",
  },
];

export const SERVICES = [
  {
    id: "dist",
    title: "Дистрибуция",
    desc: "Доставка музыки на 60+ площадок по миру. Быстро, прозрачно, с полным контролем метаданных и выплат.",
    points: ["60+ платформ", "До 80% роялти", "ISRC / UPC", "Выплаты без задержек"],
  },
  {
    id: "label",
    title: "Лейбл",
    desc: "Полный цикл работы с артистом: стратегия релиза, A&R, продвижение, партнёрства и развитие карьеры.",
    points: ["A&R и стратегия", "Маркетинг релиза", "Плейлисты и медиа", "Долгосрочный рост"],
  },
  {
    id: "promo",
    title: "Продвижение",
    desc: "Таргетированные кампании, работа с плейлистами, контент и performance-маркетинг под ваши цели.",
    points: ["Плейлист-питчинг", "Контент-поддержка", "Рекламные кампании", "Аналитика роста"],
  },
  {
    id: "rights",
    title: "Права и защита",
    desc: "Помогаем оформить права, защитить каталог и выстроить прозрачную модель монетизации.",
    points: ["Оформление прав", "Content ID", "Защита каталога", "Юридическая ясность"],
  },
];

export const STATS = [
  { value: "60+", label: "Площадок" },
  { value: "80%", label: "Роялти артисту" },
  { value: "24/7", label: "Поддержка" },
  { value: "2025", label: "Год основания" },
];
