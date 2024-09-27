import { people01,people02,people03,facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star  } from "../assets";



export const navLinks = [
  {
    id: "home",
    title: "Ana Sayfa",
  },
  {
    id: "about",
    title: "Hakkımızda",
  },
  {
    id: "accidents",
    title: "Kazalar",
  },
  {
    id: "contact",
    title: "İletişim",
  }
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Kazaların Analizi",
    content:
      "Elazığ'da meydana gelen trafik kazalarını analiz ederek, kazaların nedenlerini ve önlenmesi için alınabilecek önlemleri inceleyip paylaşıyoruz.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "Misyonumuz",
    content:
      "Misyonumuz, Elazığ'da trafik kazalarını en aza indirmek, sürücüleri güvenli sürüş konusunda bilgilendirmek ve toplumumuzdaki trafik güvenliği kültürünü geliştirmektir. Bilinçli sürücüler, güvenli bir trafik ortamının anahtarıdır.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Vizyonumuz",
    content:
      "Elazığ'da trafik kazalarının azalmasıyla birlikte, sürücülerin trafik kurallarına saygılı, dikkatli ve empatik bir şekilde hareket ettiği bir toplum yaratmaktır. Herkesin güvenli bir şekilde evine dönebildiği bir şehirde yaşamak için çaba gösteriyoruz.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Kullanılan teknolojiler:   Node.js, React.js, MongoDb, Express.js",
    name: "Miray Tepe",
    title: "Backend & Frontend & Veri Tabanı",
    img: people01,
    github: "https://github.com/mirayTepe",
  },
  {
    id: "feedback-2",
    content:
      "Kullanılan Teknolojiler:   React.js, Node.js, HTML, CSS",
    name: "Şeyma Karabulut",
    title: "Scrum Master & Frontend",
    img: people03,
    github: "https://github.com/Seymayazilim",
  },
  {
    id: "feedback-3",
    content:
      "Kullanılan Teknolojiler:    MongoDB",
    name: "Faysal Elbeg",
    title: "Veri Tabanı & Chatcpt Eklentisi",
    img: people02,
    github: "https://github.com/Faysal2000",
  },
];


export const stats = [
  {
    id: "stats-1",
    title: "Son Kazalar",
    value: "25",
  },
  {
    id: "stats-2",
    title: "Ölü Sayısı",
    value: "3",
  },
  {
    id: "stats-3",
    title: "Yaralı Sayısı",
    value: "10",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];