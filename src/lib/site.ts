import heroCommunity from "@/assets/hero-community.jpg";
import workEducation from "@/assets/work-education.jpg";
import workFood from "@/assets/work-food.jpg";
import workHealth from "@/assets/work-health.jpg";
import workEnvironment from "@/assets/work-environment.jpg";
import workAnimal from "@/assets/work-animal.jpg";
import workLivelihood from "@/assets/work-livelihood.jpg";
import workDisaster from "@/assets/work-disaster.jpg";
import students from "@/assets/students.jpg";
import hands from "@/assets/hands.jpg";

export const images = {
  heroCommunity,
  students,
  hands,
};

export const heroSlides = [
  {
    title: "Serving humanity.",
    accent: "Empowering communities.",
    body:
      "Trinetra Foundation works across twelve areas of human, animal and environmental welfare — from learning centres and health camps to livelihoods, relief and reforestation.",
    image: heroCommunity,
    imageAlt: "Volunteers working with families in a rural Bihar community",
  },
  {
    title: "Education that",
    accent: "opens every door.",
    body:
      "Learning centres, libraries, digital literacy and scholarships so that no capable student is stopped by circumstance.",
    image: workEducation,
    imageAlt: "Children learning at a community learning centre",
  },
  {
    title: "No family should",
    accent: "sleep hungry.",
    body:
      "Community kitchens, dry ration kits and relief camps organised with local verification so food reaches the households that need it most.",
    image: workFood,
    imageAlt: "Volunteers distributing cooked meals to families",
  },
  {
    title: "Health care within",
    accent: "everyone's reach.",
    body:
      "Health camps, medical aid and preventive care so access to treatment never depends on income.",
    image: workHealth,
    imageAlt: "Doctors attending patients at a community health camp",
  },
  {
    title: "Greener land,",
    accent: "kinder to all life.",
    body:
      "Afforestation, water conservation, waste reduction and animal welfare as core commitments, not add-ons.",
    image: workEnvironment,
    imageAlt: "Volunteers planting saplings during a plantation drive",
  },
];

export const org = {
  name: "TRINETRA FOUNDATION",
  shortName: "Trinetra Foundation",
  url: "https://trinetrafoundation.in",
  tagline: "Serving Humanity. Empowering Communities. Creating Sustainable Change.",
  cin: "U88900BR2026NPL084393",
  phone: "7562891937",
  email: "trinetrafoundationofficially@gmail.com",
  address: "TV Centre, Block Road, Forbesganj (Araria) 854318",
  state: "Bihar, India",
};

export type WorkArea = {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  image: string;
  focus: string[];
};

export const workAreas: WorkArea[] = [
  {
    slug: "food-and-nutrition",
    index: "01",
    title: "Food & Nutrition",
    short: "Food distribution, community kitchens and relief camps.",
    description:
      "Hunger is the most immediate form of deprivation. We work on food distribution drives, community kitchens, relief camps and the responsible redistribution of surplus edible food so that no family in our reach sleeps hungry.",
    image: workFood,
    focus: [
      "Community kitchens and cooked-meal drives",
      "Dry ration kits for vulnerable households",
      "Redistribution of surplus edible food",
      "Nutrition awareness for mothers and children",
    ],
  },
  {
    slug: "education-and-literacy",
    index: "02",
    title: "Education & Literacy",
    short: "Schools, libraries, digital learning and scholarships.",
    description:
      "Education is the most reliable route out of poverty. Our work spans learning centres, libraries, digital education, scholarships and vocational and technical training for learners of every age.",
    image: workEducation,
    focus: [
      "Learning centres and community libraries",
      "Digital literacy and computer access",
      "Scholarships and learning material support",
      "Vocational and technical education",
    ],
  },
  {
    slug: "student-empowerment",
    index: "03",
    title: "Student Empowerment",
    short: "Counselling, internships, research and career support.",
    description:
      "A student's journey does not end with a degree. We support higher-education counselling, scholarships, internships, training, research and career guidance so capable students are not stopped by circumstance.",
    image: students,
    focus: [
      "Higher-education and admission counselling",
      "Scholarship and financial-aid guidance",
      "Internship and industry exposure support",
      "Research mentorship and career placement help",
    ],
  },
  {
    slug: "healthcare",
    index: "04",
    title: "Healthcare",
    short: "Health camps, medical aid and preventive care.",
    description:
      "Access to care should not depend on income. We organise health camps, medical aid, preventive healthcare, sanitation and nutrition support, and help families reach treatment they would otherwise go without.",
    image: workHealth,
    focus: [
      "General and specialist health camps",
      "Medical aid and treatment access support",
      "Preventive health and sanitation awareness",
      "Maternal and child health support",
    ],
  },
  {
    slug: "livelihood",
    index: "05",
    title: "Livelihood & Self-Employment",
    short: "Skills, small enterprise and income generation.",
    description:
      "Dignified work changes a household permanently. We support small businesses, carts and shops, skill building and income-generating opportunities, with a particular focus on women and young adults.",
    image: workLivelihood,
    focus: [
      "Support for carts, shops and micro-enterprise",
      "Skill training linked to local demand",
      "Self-help groups and women's enterprise",
      "Market linkage and basic financial literacy",
    ],
  },
  {
    slug: "animal-welfare",
    index: "06",
    title: "Animal Welfare",
    short: "Gaushalas, veterinary camps, rescue and rehabilitation.",
    description:
      "Compassion cannot be selective. Our animal welfare work includes gaushalas, animal care, veterinary camps, rescue and rehabilitation, vaccination and animal birth control initiatives.",
    image: workAnimal,
    focus: [
      "Gaushala and shelter support",
      "Veterinary camps and vaccination drives",
      "Rescue and rehabilitation of injured animals",
      "Animal birth control initiatives",
    ],
  },
  {
    slug: "environment",
    index: "07",
    title: "Environment",
    short: "Afforestation, water, waste and clean energy.",
    description:
      "Social development and environmental responsibility belong together. We work on afforestation, biodiversity, water harvesting, waste management, plastic reduction, renewable energy and sustainable agriculture.",
    image: workEnvironment,
    focus: [
      "Tree plantation and biodiversity protection",
      "Rainwater harvesting and water conservation",
      "Waste management and plastic reduction",
      "Renewable energy and sustainable farming",
    ],
  },
  {
    slug: "disaster-relief",
    index: "08",
    title: "Disaster Relief",
    short: "Emergency response for floods, drought and crises.",
    description:
      "When disaster strikes, speed and coordination decide outcomes. We respond to floods, droughts, earthquakes, pandemics, fires and accidents with relief material, coordination support and rehabilitation.",
    image: workDisaster,
    focus: [
      "Emergency relief kits and shelter support",
      "Flood and drought response",
      "Pandemic and public-health emergency support",
      "Post-disaster rehabilitation",
    ],
  },
  {
    slug: "rural-and-community-development",
    index: "09",
    title: "Rural & Community Development",
    short: "Infrastructure, sanitation, water and women's empowerment.",
    description:
      "Strong communities are built on basics that work. We support community infrastructure, sanitation, drinking water, skill development and women's empowerment in rural and semi-urban areas.",
    image: heroCommunity,
    focus: [
      "Drinking water and sanitation access",
      "Community infrastructure improvement",
      "Skill development for rural youth",
      "Women's empowerment and self-reliance",
    ],
  },
  {
    slug: "human-rights",
    index: "10",
    title: "Human Rights & Social Justice",
    short: "Rights awareness, legal aid and counselling.",
    description:
      "Awareness is protection. We work on rights awareness, legal aid, counselling, research and structured support for vulnerable and marginalised communities.",
    image: hands,
    focus: [
      "Rights and entitlement awareness drives",
      "Legal aid guidance and referrals",
      "Counselling and social support",
      "Research on vulnerability and exclusion",
    ],
  },
  {
    slug: "culture-and-sports",
    index: "11",
    title: "Culture & Sports",
    short: "Heritage, crafts, performing arts and sport.",
    description:
      "Culture and sport build confidence and belonging. We support art, heritage, traditional crafts, music, dance, theatre, literature and sporting opportunity for young people.",
    image: workEducation,
    focus: [
      "Traditional crafts and artisan support",
      "Music, dance, theatre and literature",
      "Heritage awareness programmes",
      "Grassroots sports and youth participation",
    ],
  },
  {
    slug: "research-and-innovation",
    index: "12",
    title: "Research & Innovation",
    short: "Research, innovation hubs and knowledge sharing.",
    description:
      "Better evidence produces better programmes. We support research, innovation hubs, knowledge sharing, workshops, conferences and applied social-development research.",
    image: students,
    focus: [
      "Applied social-development research",
      "Innovation and knowledge-sharing hubs",
      "Workshops, seminars and conferences",
      "Documentation and programme evaluation",
    ],
  },
];

export const values = [
  {
    title: "Compassion",
    body: "Every individual deserves dignity, care and opportunity — without conditions.",
  },
  {
    title: "Empowerment",
    body: "Education, skills and livelihood opportunities create change that lasts.",
  },
  {
    title: "Sustainability",
    body: "Social development must go hand in hand with environmental responsibility.",
  },
  {
    title: "Dignity & Rights",
    body: "We promote equality, awareness and the human rights of every community.",
  },
];

export const volunteerInterests = [
  "Education",
  "Food Distribution",
  "Healthcare",
  "Environment",
  "Animal Welfare",
  "Disaster Relief",
  "Digital / Technology",
  "Fundraising",
];

export const partnershipTypes = [
  "Corporate Partnership",
  "Academic Partnership",
  "Healthcare Partnership",
  "Government Collaboration",
  "NGO Collaboration",
  "Community Partnership",
];

export const donationTiers = [500, 1000, 2500, 5000, 10000];