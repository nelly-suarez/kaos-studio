const WORK_ASSET = "/assets/work";

export const caseDestinations = {
  ascalavera: "/work/ascalavera",
  "sensei-tech": "/work/sensei-tech",
};

export const featuredCases = [
  {
    id: "ascalavera",
    name: "Ascalavera",
    description: "Craft beer branding and packaging.",
    image: `${WORK_ASSET}/ascalavera-feature.jpg`,
    destination: caseDestinations.ascalavera,
  },
  {
    id: "sensei-tech",
    name: "Sensei Tech",
    description: "Social media content",
    image: `${WORK_ASSET}/sensei-feature.jpg`,
    destination: caseDestinations["sensei-tech"],
  },
];

export const galleryProjects = [
  {
    id: "dawn-dusk",
    name: "Dawn & Dusk",
    main: `${WORK_ASSET}/dawn-main.png`,
    mainAlt: "Dawn & Dusk yellow and purple tea packaging collection",
    additional: [
      { src: `${WORK_ASSET}/dawn-extra-1.png`, alt: "Dawn & Dusk purple package being opened" },
      { src: `${WORK_ASSET}/dawn-extra-2.png`, alt: "Dawn & Dusk lavender and black tea packages" },
    ],
    destination: null,
  },
  {
    id: "ariana-editorial",
    name: "Ariana Grande editorial",
    main: `${WORK_ASSET}/ariana-main.jpg`,
    mainAlt: "Pink Ariana Grande editorial publication",
    additional: [
      { src: `${WORK_ASSET}/ariana-extra-1.jpg`, alt: "Ariana Grande editorial spread collection" },
      { src: `${WORK_ASSET}/ariana-extra-2.jpg`, alt: "Ariana Grande Sabrina Carpenter editorial mockup" },
    ],
    destination: null,
  },
  {
    id: "estrella-devota",
    name: "Estrella Devota",
    main: `${WORK_ASSET}/estrella-main.png`,
    mainAlt: "Estrella Devota orange and yellow patterned packaging bags",
    additional: [
      { src: `${WORK_ASSET}/estrella-extra-1.png`, alt: "Estrella Devota orange packaging box" },
      { src: `${WORK_ASSET}/estrella-extra-2.png`, alt: "Estrella Devota business cards" },
    ],
    destination: null,
  },
  {
    id: "truen",
    name: "Truen apparel",
    main: `${WORK_ASSET}/truen-main.jpg`,
    mainAlt: "Person wearing a black Truen graphic shirt",
    additional: [
      { src: `${WORK_ASSET}/truen-extra-1.jpg`, alt: "Close detail of Truen printed fabric" },
      { src: `${WORK_ASSET}/truen-extra-2.jpg`, alt: "Close detail of Truen shirt artwork" },
    ],
    destination: null,
  },
  {
    id: "gastronomia-editorial",
    name: "Italian gastronomy editorial",
    main: `${WORK_ASSET}/gastronomia-main.jpg`,
    mainAlt: "Open Italian gastronomy magazine on a green surface",
    additional: [
      { src: `${WORK_ASSET}/gastronomia-extra-1.jpg`, alt: "Italian gastronomy magazine editorial spread" },
      { src: `${WORK_ASSET}/gastronomia-extra-2.jpg`, alt: "Italian gastronomy magazine recipe spread" },
    ],
    destination: null,
  },
];

export const brandLogos = [
  { id: "dawn", src: `${WORK_ASSET}/logo-dawn.png`, alt: "Dawn & Dusk" },
  { id: "sensei", src: `${WORK_ASSET}/logo-sensei.png`, alt: "Sensei" },
  { id: "third", src: `${WORK_ASSET}/logo-third.png`, alt: "Partner brand monogram" },
  { id: "ascalavera", src: `${WORK_ASSET}/logo-ascalavera.png`, alt: "Ascalavera" },
  { id: "payday", src: `${WORK_ASSET}/logo-payday.svg`, alt: "Payday" },
];
