const privacyPage = { slug: "privacy", title: "Privacy Policy", description: "How EU PathFinder handles website enquiries, agreed service information, analytics and advertising choices, retention and privacy requests." };

const contactEmail = "info@eupathfinder.agency";
const whatsappNumber = "+14696268272";
const callNumber = "+12899143132";
const ceoEmail = "Eupathfinder@gmail.com";
const isValidContactNumber = (number) => /^\+1[2-9]\d{2}[2-9]\d{6}$/.test(number);
const whatsappLink = (number = whatsappNumber, message = "Hello EU Pathfinder, I would like guidance about working in Europe.") => {
  if (!isValidContactNumber(number)) throw new Error("Invalid contact number: " + number);
  return `https://wa.me/${number.slice(1)}?text=${encodeURIComponent(message)}`;
};

const countries = [
  { slug: "poland", name: "Poland", code: "pl", region: "Central & Eastern", landmark: "Wawel Castle, Krakow", intro: "A large Central European economy with a wide range of employers in industry, logistics and construction.", sectors: ["Manufacturing", "Logistics and warehousing", "Construction", "Food processing", "Agriculture"], colors: ["#dc143c", "#8e0f28"] },
  { slug: "uk", name: "United Kingdom", code: "gb", region: "Western", landmark: "Big Ben and Westminster, London", intro: "A major English-speaking job market with recurring demand in care, hospitality and skilled trades.", sectors: ["Health and social care", "Hospitality", "Skilled trades", "Logistics", "Food production"], colors: ["#012169", "#c8102e"] },
  { slug: "germany", name: "Germany", code: "de", region: "Western", landmark: "Brandenburg Gate, Berlin", intro: "Europe's largest economy, with structured pathways for skilled and semi-skilled workers.", sectors: ["Skilled trades", "Logistics", "Care and healthcare support", "Manufacturing", "Hospitality"], colors: ["#1a1a1a", "#dd0000"] },
  { slug: "austria", name: "Austria", code: "at", region: "Western", landmark: "Schönbrunn Palace, Vienna", intro: "A high-income Alpine economy with strong tourism, construction and manufacturing sectors.", sectors: ["Tourism and hospitality", "Construction", "Manufacturing", "Care services", "Agriculture"], colors: ["#ed2939", "#9c1824"] },
  { slug: "croatia", name: "Croatia", code: "hr", region: "Southern", landmark: "Dubrovnik City Walls", intro: "An Adriatic destination where tourism and construction create steady seasonal and year-round roles.", sectors: ["Tourism and hospitality", "Construction", "Shipbuilding", "Logistics", "Agriculture"], colors: ["#c8102e", "#171796"] },
  { slug: "slovakia", name: "Slovakia", code: "sk", region: "Central & Eastern", landmark: "Bratislava Castle", intro: "A manufacturing-led economy at the heart of Central Europe, known for automotive production.", sectors: ["Automotive manufacturing", "Logistics", "Construction", "Electronics assembly", "Hospitality"], colors: ["#0b4ea2", "#ee1c25"] },
  { slug: "portugal", name: "Portugal", code: "pt", region: "Southern", landmark: "Belém Tower, Lisbon", intro: "A welcoming Atlantic destination with demand in tourism, agriculture and construction.", sectors: ["Tourism and hospitality", "Agriculture", "Construction", "Logistics", "Care services"], colors: ["#046a38", "#da291c"] },
  { slug: "norway", name: "Norway", code: "no", region: "Northern", landmark: "Geirangerfjord", intro: "A high-wage Nordic economy with openings in seafood, construction and healthcare support.", sectors: ["Seafood and fisheries", "Construction", "Healthcare support", "Hospitality", "Transport"], colors: ["#ba0c2f", "#00205b"] },
  { slug: "switzerland", name: "Switzerland", code: "ch", region: "Western", landmark: "Matterhorn", intro: "A highly regulated, high-income market with roles in hospitality, construction and care.", sectors: ["Hospitality", "Construction", "Healthcare support", "Manufacturing", "Agriculture"], colors: ["#da291c", "#8f1a12"] },
  { slug: "belgium", name: "Belgium", code: "be", region: "Western", landmark: "Grand Place, Brussels", intro: "A central European hub with employers in logistics, construction and services.", sectors: ["Logistics", "Construction", "Healthcare support", "Hospitality", "Food processing"], colors: ["#1a1a1a", "#c8a400"] },
  { slug: "bulgaria", name: "Bulgaria", code: "bg", region: "Central & Eastern", landmark: "Rila Monastery", intro: "A growing Black Sea and Balkan economy with roles in manufacturing, customer services and tourism.", sectors: ["Manufacturing", "Customer service", "Construction", "Tourism and hospitality", "Logistics"], colors: ["#00966e", "#d62612"] },
  { slug: "cyprus", name: "Cyprus", code: "cy", region: "Southern", landmark: "Aphrodite's Rock, Petra tou Romiou", intro: "A Mediterranean island economy driven by tourism, construction and services.", sectors: ["Tourism and hospitality", "Construction", "Agriculture", "Care services", "Retail"], colors: ["#d57800", "#4e5b31"] },
  { slug: "czechia", name: "Czechia", code: "cz", region: "Central & Eastern", landmark: "Charles Bridge, Prague", intro: "An industrial Central European economy with strong automotive and logistics sectors.", sectors: ["Automotive manufacturing", "Logistics", "Construction", "Electronics", "Hospitality"], colors: ["#11457e", "#d7141a"] },
  { slug: "denmark", name: "Denmark", code: "dk", region: "Northern", landmark: "Nyhavn, Copenhagen", intro: "A Nordic welfare economy with demand in construction, agriculture and healthcare support.", sectors: ["Construction", "Agriculture", "Healthcare support", "Logistics", "Hospitality"], colors: ["#c8102e", "#7d0a1d"] },
  { slug: "estonia", name: "Estonia", code: "ee", region: "Northern", landmark: "Tallinn Old Town", intro: "A digitally minded Baltic economy with openings in manufacturing, logistics and services.", sectors: ["Manufacturing", "Logistics", "Construction", "Hospitality", "Technology services"], colors: ["#0072ce", "#0b2a4a"] },
  { slug: "finland", name: "Finland", code: "fi", region: "Northern", landmark: "Helsinki Cathedral", intro: "A Nordic economy with seasonal and year-round roles in forestry, construction and care.", sectors: ["Seasonal agriculture", "Construction", "Healthcare support", "Hospitality", "Forestry"], colors: ["#003580", "#0a1f4d"] },
  { slug: "france", name: "France", code: "fr", region: "Western", landmark: "Eiffel Tower, Paris", intro: "One of Europe's largest economies, with strong seasonal demand in hospitality and agriculture.", sectors: ["Hospitality", "Agriculture", "Construction", "Care services", "Logistics"], colors: ["#0055a4", "#ef4135"] },
  { slug: "serbia", name: "Serbia", code: "rs", region: "Central & Eastern", landmark: "Belgrade Fortress (Kalemegdan)", intro: "A fast-developing Balkan economy attracting manufacturing, construction and logistics employers.", sectors: ["Manufacturing", "Construction", "Logistics", "Hospitality", "Agriculture"], colors: ["#c6363c", "#0c4076"] },
  { slug: "moldova", name: "Moldova", code: "md", region: "Central & Eastern", landmark: "Orheiul Vechi Monastery Complex", intro: "A small Eastern European economy with roles in manufacturing, agriculture and construction.", sectors: ["Manufacturing", "Agriculture", "Construction", "Food processing", "Logistics"], colors: ["#0046ae", "#b8860b"] },
  { slug: "ukraine", name: "Ukraine", code: "ua", region: "Central & Eastern", landmark: "St. Sophia Cathedral, Kyiv", intro: "A large Eastern European country; opportunities depend heavily on current conditions and are reviewed case by case.", sectors: ["Manufacturing", "Construction", "Logistics", "Agriculture", "Services"], colors: ["#0057b7", "#b89b00"] },
  { slug: "greece", name: "Greece", code: "gr", region: "Southern", landmark: "Acropolis, Athens", intro: "A Mediterranean economy where tourism, agriculture and construction drive seasonal and long-term hiring.", sectors: ["Tourism and hospitality", "Agriculture", "Construction", "Shipping and logistics", "Care services"], colors: ["#0d5eaf", "#073a6b"] },
  { slug: "ireland", name: "Ireland", code: "ie", region: "Western", landmark: "Cliffs of Moher", intro: "An English-speaking economy with demand in healthcare, hospitality, construction and agri-food.", sectors: ["Healthcare support", "Hospitality", "Construction", "Agri-food", "Logistics"], colors: ["#169b62", "#0b5a3a"] },
  { slug: "romania", name: "Romania", code: "ro", region: "Central & Eastern", landmark: "Peleș Castle, Sinaia", intro: "A sizeable Eastern European market with roles in construction, manufacturing and logistics.", sectors: ["Construction", "Manufacturing", "Logistics", "Hospitality", "Agriculture"], colors: ["#002b7f", "#c9a400"] },
  { slug: "latvia", name: "Latvia", code: "lv", region: "Northern", landmark: "Riga House of the Blackheads", intro: "A Baltic economy with openings in logistics, timber, manufacturing and services.", sectors: ["Logistics and transport", "Manufacturing", "Timber and forestry", "Construction", "Hospitality"], colors: ["#9e3039", "#5e1b21"] },
  { slug: "lithuania", name: "Lithuania", code: "lt", region: "Northern", landmark: "Trakai Island Castle", intro: "A Baltic hub known for transport and logistics, with growing manufacturing and services.", sectors: ["Transport and logistics", "Manufacturing", "Construction", "Food processing", "Hospitality"], colors: ["#006a44", "#b8860b"] },
  { slug: "luxembourg", name: "Luxembourg", code: "lu", region: "Western", landmark: "Grund and Bock Casemates", intro: "A small, high-income economy with roles in hospitality, construction and care.", sectors: ["Hospitality", "Construction", "Healthcare support", "Cleaning and facility services", "Retail"], colors: ["#ed2939", "#00a1de"] },
  { slug: "netherlands", name: "Netherlands", code: "nl", region: "Western", landmark: "Windmills of Kinderdijk", intro: "A global logistics and horticulture hub with steady demand in warehousing and food production.", sectors: ["Logistics and warehousing", "Horticulture and agriculture", "Food processing", "Hospitality", "Construction"], colors: ["#ae1c28", "#21468b"] },
  { slug: "slovenia", name: "Slovenia", code: "si", region: "Southern", landmark: "Lake Bled", intro: "A compact Alpine economy with roles in manufacturing, transport, construction and tourism.", sectors: ["Manufacturing", "Transport", "Construction", "Tourism and hospitality", "Agriculture"], colors: ["#005da4", "#ed1c24"] },
  { slug: "spain", name: "Spain", code: "es", region: "Southern", landmark: "Sagrada Família, Barcelona", intro: "A large Mediterranean economy with strong seasonal demand in agriculture, tourism and care.", sectors: ["Agriculture", "Tourism and hospitality", "Construction", "Care services", "Logistics"], colors: ["#aa151b", "#f1bf00"] },
  { slug: "sweden", name: "Sweden", code: "se", region: "Northern", landmark: "Gamla Stan, Stockholm", intro: "A Nordic economy with openings in healthcare support, construction and hospitality.", sectors: ["Healthcare support", "Construction", "Hospitality", "Forestry and berry picking", "Logistics"], colors: ["#006aa7", "#fecc02"] },
  { slug: "russia", name: "Russia", code: "ru", region: "Central & Eastern", landmark: "St. Basil's Cathedral, Moscow", intro: "The largest country in the region; opportunities and rules change often and are confirmed case by case.", sectors: ["Construction", "Manufacturing", "Logistics", "Services", "Agriculture"], colors: ["#0039a6", "#d52b1e"] },
  { slug: "malta", name: "Malta", code: "mt", region: "Southern", landmark: "Valletta Grand Harbour", intro: "A small Mediterranean island economy with demand in hospitality, care and construction.", sectors: ["Hospitality", "Care services", "Construction", "Customer support", "Retail"], colors: ["#cf142b", "#7e0b1a"] },
  { slug: "belarus", name: "Belarus", code: "by", region: "Central & Eastern", landmark: "Mir Castle", intro: "An Eastern European economy with roles in manufacturing, construction and agriculture; confirmed case by case.", sectors: ["Manufacturing", "Construction", "Agriculture", "Logistics", "Services"], colors: ["#a30d25", "#00693e"] },
  { slug: "hungary", name: "Hungary", code: "hu", region: "Central & Eastern", landmark: "Hungarian Parliament Building, Budapest", intro: "A Central European manufacturing economy with strong automotive and logistics employers.", sectors: ["Automotive manufacturing", "Logistics", "Electronics assembly", "Hospitality", "Construction"], colors: ["#ce2939", "#477050"] },
  { slug: "italy", name: "Italy", code: "it", region: "Southern", landmark: "Colosseum, Rome", intro: "A large Mediterranean economy with demand in agriculture, hospitality, construction and care.", sectors: ["Agriculture", "Hospitality", "Construction", "Care services", "Manufacturing"], colors: ["#008c45", "#cd212a"] }
];

const workerMarkets = [
  { slug: "europe-jobs-from-pakistan", country: "Pakistan", audience: "Pakistani workers", titleAudience: "Pakistani Workers", seoHeading: "Jobs in Europe for Pakistani workers", seoTitle: "Jobs in Europe from Pakistan | EU Pathfinder", seoDescription: "Looking for jobs in Europe from Pakistan? Explore destinations and share your skills with EU Pathfinder to discuss support and current fees.", planningNote: "If you are applying from Pakistan, tell us about your work history and the kind of role you are seeking. Application procedures depend on the destination, employer and your circumstances.", seoRoles: ["Construction and skilled trades", "Transport and logistics", "Agriculture and food production", "Manufacturing", "Hospitality and support services"], seoFaq: "What jobs in Europe can Pakistani workers explore?" },
  { slug: "europe-jobs-from-india", country: "India", audience: "Indian workers", titleAudience: "Indian Workers", seoHeading: "Jobs in Europe for Indian workers", seoTitle: "Jobs in Europe from India | EU Pathfinder", seoDescription: "Looking for jobs in Europe from India? Explore destinations and share your skills with EU Pathfinder to discuss support and current fees.", planningNote: "If you are applying from India, tell us about your work history and the kind of role you are seeking. Application procedures depend on the destination, employer and your circumstances.", seoRoles: ["Manufacturing and production", "Construction and skilled trades", "Transport and logistics", "Agriculture and food production", "Hospitality and support services"], seoFaq: "What jobs in Europe can Indian workers explore?" },
  { slug: "europe-jobs-from-bangladesh", country: "Bangladesh", audience: "Bangladeshi workers", titleAudience: "Bangladeshi Workers", seoHeading: "Jobs in Europe for Bangladeshi workers", seoTitle: "Europe Jobs from Bangladesh: BMET Checks | EU Pathfinder", seoDescription: "Planning work in Europe from Bangladesh? Check agencies through OEP RAIMS, separate BMET clearance from destination rules and prepare your enquiry.", planningNote: "If you are applying from Bangladesh, tell us about your work history and the kind of role you are seeking. Application procedures depend on the destination, employer and your circumstances.", seoRoles: ["Construction and skilled trades", "Manufacturing and production", "Agriculture and food production", "Transport and logistics", "Hospitality and support services"], seoFaq: "What jobs in Europe can Bangladeshi workers explore?" },
  { slug: "europe-jobs-from-malaysia", country: "Malaysia", audience: "workers applying from Malaysia", titleAudience: "Workers Applying from Malaysia", seoTitle: "Jobs in Europe from Malaysia | EU Pathfinder", seoDescription: "Explore European work destinations from Malaysia. Share your skills and experience with EU Pathfinder and ask about support options and current fees.", planningNote: "If you are applying from Malaysia, tell us about your work history and the kind of role you are seeking. Your nationality and residence status may affect application procedures." },
  { slug: "europe-jobs-from-nepal", country: "Nepal", audience: "Nepali workers", titleAudience: "Nepali Workers", seoHeading: "Jobs in Europe for Nepali workers", seoTitle: "Jobs in Europe from Nepal | EU Pathfinder", seoDescription: "Looking for jobs in Europe from Nepal? Explore destinations and share your skills with EU Pathfinder to discuss support and current fees.", planningNote: "If you are applying from Nepal, tell us about your work history and the kind of role you are seeking. Application procedures depend on the destination, employer and your circumstances.", seoRoles: ["Hospitality and tourism", "Construction and skilled trades", "Agriculture and food production", "Manufacturing", "Transport and support services"], seoFaq: "What jobs in Europe can Nepali workers explore?" },
  { slug: "europe-jobs-from-saudi-arabia", country: "Saudi Arabia", audience: "South Asian and African workers living in Saudi Arabia", titleAudience: "Workers in Saudi Arabia", diaspora: true, seoTitle: "Europe Jobs from Saudi Arabia | EU Pathfinder", seoDescription: "European work guidance for Pakistani, Indian, Bangladeshi, Nepali and African workers in Saudi Arabia. Explore destinations and contact EU Pathfinder.", planningNote: "For Pakistani, Indian, Bangladeshi, Nepali and African workers living in Saudi Arabia, nationality and residence status may affect where an application can be made. We can discuss your work experience and destinations you are considering." },
  { slug: "europe-jobs-from-uae", country: "the UAE", audience: "South Asian and African workers living in the UAE", titleAudience: "Workers in the UAE", diaspora: true, seoTitle: "Europe Jobs from the UAE | EU Pathfinder", seoDescription: "European work guidance for Pakistani, Indian, Bangladeshi, Nepali and African workers in the UAE. Explore destinations and contact EU Pathfinder.", planningNote: "For Pakistani, Indian, Bangladeshi, Nepali and African workers living in the UAE, nationality and residence status may affect where an application can be made. We can discuss your work experience and destinations you are considering." },
  { slug: "europe-jobs-from-oman", country: "Oman", audience: "South Asian and African workers living in Oman", titleAudience: "Workers in Oman", diaspora: true, seoTitle: "Europe Jobs from Oman | EU Pathfinder", seoDescription: "European work guidance for Pakistani, Indian, Bangladeshi, Nepali and African workers in Oman. Explore destinations and contact EU Pathfinder.", planningNote: "For Pakistani, Indian, Bangladeshi, Nepali and African workers living in Oman, nationality and residence status may affect where an application can be made. We can discuss your work experience and destinations you are considering." },
  { slug: "europe-jobs-from-qatar", country: "Qatar", audience: "South Asian and African workers living in Qatar", titleAudience: "Workers in Qatar", diaspora: true, seoTitle: "Europe Jobs from Qatar | EU Pathfinder", seoDescription: "European work guidance for Pakistani, Indian, Bangladeshi, Nepali and African workers in Qatar. Explore destinations and contact EU Pathfinder.", planningNote: "For Pakistani, Indian, Bangladeshi, Nepali and African workers living in Qatar, nationality and residence status may affect where an application can be made. We can discuss your work experience and destinations you are considering." },
  { slug: "europe-jobs-from-kuwait", country: "Kuwait", audience: "South Asian and African workers living in Kuwait", titleAudience: "Workers in Kuwait", diaspora: true, seoTitle: "Europe Jobs from Kuwait | EU Pathfinder", seoDescription: "European work guidance for Pakistani, Indian, Bangladeshi, Nepali and African workers in Kuwait. Explore destinations and contact EU Pathfinder.", planningNote: "For Pakistani, Indian, Bangladeshi, Nepali and African workers living in Kuwait, nationality and residence status may affect where an application can be made. We can discuss your work experience and destinations you are considering." },
  { slug: "europe-jobs-from-bahrain", country: "Bahrain", audience: "South Asian and African workers living in Bahrain", titleAudience: "Workers in Bahrain", diaspora: true, seoTitle: "Europe Jobs from Bahrain | EU Pathfinder", seoDescription: "European work guidance for Pakistani, Indian, Bangladeshi, Nepali and African workers in Bahrain. Explore destinations and contact EU Pathfinder.", planningNote: "For Pakistani, Indian, Bangladeshi, Nepali and African workers living in Bahrain, nationality and residence status may affect where an application can be made. We can discuss your work experience and destinations you are considering." }
];

const guides = [
  {
    slug: "europe-hospitality-jobs",
    title: "Hospitality jobs in Europe: a practical guide for workers",
    description: "Explore hospitality roles, employer checks, work-permit basics and safer next steps for workers considering a hospitality job in Europe.",
    summary: "A clear starting point for hotel, restaurant, kitchen and seasonal hospitality roles — and the checks to make before applying.",
    image: "/travel-planning.svg",
    intro: "Hotels, restaurants, catering teams and tourism businesses employ people in many different roles. The job, employer and immigration route all matter: there is no single Europe-wide hospitality work visa.",
    sections: [
      {
        heading: "Roles and experience",
        paragraphs: [
          "Hospitality work can include hotel housekeeping, kitchen assistance, food preparation, waiting tables, reception, catering and seasonal resort work. Duties, language expectations, schedules and required experience vary by employer and destination.",
          "Read the job description carefully. Ask what the role involves each day, where it is based, what hours are expected, what pay and deductions apply, and whether accommodation is included or charged separately."
        ]
      },
      {
        heading: "How the work-permit route is decided",
        paragraphs: [
          "The destination country's authorities set its work and residence rules. Some routes require an employer to apply or sponsor a permit; seasonal work may have separate rules where that route exists. A job title alone does not establish that a permit is available.",
          "Before paying anyone, identify the destination, the legal employer and the specific role. Check the current process with the destination's official immigration service or embassy. EU Pathfinder cannot promise a vacancy, permit or visa decision."
        ]
      },
      {
        heading: "Check an offer before sharing documents",
        bullets: [
          "Get the employer's full legal name, work address, duties, pay, hours and written contract terms.",
          "Verify the employer independently using an official business register or its established contact details.",
          "Request a written list of service fees, refund terms and the exact work being provided before you agree.",
          "Do not send passport scans, bank details, card numbers or one-time codes in an initial enquiry.",
          "Be wary of guaranteed jobs, visas or permits, urgent payment demands, and offers with no verifiable employer."
        ]
      },
      {
        heading: "Prepare for a first conversation",
        paragraphs: [
          "A current CV, a summary of your work history and copies of relevant training certificates can help an adviser understand your goals. Share only what is needed for the discussion, and confirm how any documents will be handled before sending them.",
          "Your nationality and where you legally live may affect where you can apply. Ask the relevant embassy which application location and documents apply to your situation."
        ]
      }
    ],
    resources: [
      { label: "EU Immigration Portal", url: "https://immigration-portal.ec.europa.eu/" }
    ]
  },
  {
    slug: "europe-entry-level-seasonal-work-guide",
    title: "Europe entry-level and seasonal work: a visa guide",
    description: "A practical Europe unskilled jobs work visa guide: understand country-specific permits, employer checks and safe steps before applying.",
    summary: "What people mean by “unskilled work,” why permits are country-specific, and how to assess seasonal or entry-level offers.",
    image: "/family-airport.svg",
    intro: "People often search for an “unskilled work visa for Europe,” but Europe does not issue one universal permit for every entry-level job. Each destination sets its own rules, and the correct route depends on the role, employer and applicant.",
    sections: [
      {
        heading: "Start with a named job and country",
        paragraphs: [
          "Entry-level roles may be found in areas such as food production, agriculture, cleaning, warehousing, hospitality and seasonal tourism. Availability changes, and a sector list is not a job offer or proof that a permit route is open.",
          "Ask for the destination country, employer's legal name, job location, duties, pay, hours and contract before considering an application. Verify the employer and vacancy independently."
        ]
      },
      {
        heading: "There is no one-size-fits-all European work visa",
        paragraphs: [
          "Work authorization is handled under each destination's rules. Employer-sponsored permits and seasonal or temporary routes exist in some circumstances, but requirements and eligibility are not the same across countries.",
          "Use the destination government's official immigration pages and the relevant embassy or visa authority for current instructions. Do not rely on an agent's general claim that one visa covers Europe."
        ]
      },
      {
        heading: "A safer checklist before you pay",
        bullets: [
          "Confirm a real employer, a specific role and written terms.",
          "Check the employer's recruitment process and work-permit steps through official sources.",
          "Ask for itemized fees, the service agreement, refund terms and an invoice.",
          "Keep control of your passport and never share banking credentials or verification codes.",
          "Do not pay for a guaranteed job, permit or visa; final decisions belong to employers and authorities."
        ]
      },
      {
        heading: "Documents and application location",
        paragraphs: [
          "A passport, CV and proof of relevant experience can help with an initial discussion, but they are not a complete visa checklist. The authority may request different documents for the specific route.",
          "Your passport nationality and your legal country of residence can both matter. Before booking travel, confirm where you are permitted to lodge an application and what proof of residence is required."
        ]
      }
    ],
    resources: [
      { label: "EU Immigration Portal", url: "https://immigration-portal.ec.europa.eu/" }
    ]
  },
  {
  slug: "europe-work-guidance-from-africa",
  title: "Europe Work Guidance for African Applicants",
  description: "Europe work planning for Nigeria, Ghana, Kenya, Uganda, Tanzania, Ethiopia, Egypt and South Africa: employer checks, documents and costs.",
  summary: "Prepare a work enquiry from eight African countries, verify an employer and compare written terms before paying.",
  image: "/travel-planning.svg",
  background: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=960&q=70",
  intro: "Considering work in Europe from Nigeria, Ghana, Kenya, Uganda, Tanzania, Ethiopia, Egypt or South Africa? Start with your occupation, nationality, current residence and a specific destination. This guide helps prepare an enquiry; it does not advertise vacancies or confirm eligibility.",
  sections: [
    { heading: "Choose a destination and verify the employer", paragraphs: ["Compare the destination guides, identify the legal employer and exact role, and check the current route with the destination government or embassy. There is no single work-permit process for every European destination."], links: [{label: "Compare European destinations", url: "/#destinations"}] },
    { heading: "Nigeria: explain your employment history", paragraphs: ["List employment, self-employment and practical experience separately, including dates, duties and references you can verify. Ask the employer what evidence it accepts before paying for additional certificates."] },
    { heading: "Ghana: describe your trade and training", paragraphs: ["Explain the tasks you perform, equipment you use and training you have completed. A certificate and a job offer are different documents; confirm what qualifications the destination employer requires."] },
    { heading: "Kenya: check occupation requirements", paragraphs: ["Identify the exact occupation before comparing destinations. If a role requires professional recognition, ask the relevant destination authority about that process before assuming experience alone is sufficient."] },
    { heading: "Uganda: check the employer and intermediary separately", paragraphs: ["Request the employer name, workplace and written job terms. Verify independently who is providing each service, what is included and who receives each payment."] },
    { heading: "Tanzania: plan document language and consistency", paragraphs: ["Check names and dates across your CV and supporting records. Ask the destination authority whether translations or certification are needed before arranging them; requirements depend on the destination."] },
    { heading: "Ethiopia: explain differences in your records", paragraphs: ["Use consistent names and dates in your enquiry. If documents use different spellings, explain the difference and ask the receiving employer or authority how to document it. Do not alter official records yourself."] },
    { heading: "Egypt: compare the offer with total costs", paragraphs: ["Request salary, hours, deductions, accommodation arrangements and the work location in writing. Separate employer terms from adviser fees, travel and application costs when comparing a proposal."] },
    { heading: "South Africa: distinguish nationality and residence", paragraphs: ["Tell the adviser both your nationality and where you currently live. Residence in South Africa and holding a South African passport are different circumstances; verify the correct application location with the destination authority."] },
    { heading: "African nationals living in the Gulf", paragraphs: ["Make your current country of residence clear when enquiring. Do not assume that another person's route or application location applies to your circumstances."], links: [{label: "Planning from Gulf countries", url: "/guides/europe-work-guidance-from-gulf/"}] },
    { heading: "Make a destination comparison you can verify", bullets: ["Compare one or two destinations for your actual occupation, rather than assuming every European country has the same route.", "Record the named employer, workplace, qualifications requested, language expectations and official application source for each option.", "Keep adviser charges, official charges, travel and living costs separate. Ask who receives each payment and what the written refund terms cover.", "Check departure or recruitment requirements with your own country's competent authority. This guide does not replace a national clearance checklist."] },
    { heading: "Prepare evidence without oversharing", paragraphs: ["Create a CV with dates, duties, training and languages. Note which references or certificates you can obtain, but ask the employer or authority what is required before paying for new documents.", "For the first discussion, share a summary of your experience and current residence. Passport scans, bank details and payment credentials are not needed in an initial enquiry. Ask how any later document request will be handled before sending files."] },
    { heading: "Prepare your first enquiry", bullets: ["Share your nationality, current residence, occupation, experience and preferred destination.", "Ask for current rates, a written service scope and itemized costs.", "Do not include passport scans, payment credentials or sensitive documents in an initial message."], links: [{label: "Contact EU Pathfinder", url: "/#contact"}] }
  ],
  resources: [{label: "EU Immigration Portal", url: "https://immigration-portal.ec.europa.eu/index_en"}]
}, {
  slug: "europe-work-guidance-from-gulf",
  title: "Europe Work Guidance from Gulf Countries",
  description: "Plan a Europe work enquiry from Saudi Arabia, UAE, Qatar, Oman, Kuwait or Bahrain. Compare employer terms, document preparation and service costs.",
  summary: "A planning checklist for residents of the six Gulf countries, with direct links to each country guide.",
  image: "/travel-route.svg",
  background: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=960&q=70",
  intro: "Planning European work from Saudi Arabia, the United Arab Emirates, Qatar, Oman, Kuwait or Bahrain? Start with your nationality, current residence and occupation. This guide helps prepare questions without assuming a vacancy, appointment or application route is available.",
  sections: [
    { heading: "Nationality and current residence are separate", paragraphs: ["Workers from Pakistan, India, Nepal, Bangladesh and African countries can have different circumstances even when they work for the same Gulf employer. Share both nationality and residence when enquiring.", "Verify the application location and required residence evidence with the destination authority. A current Gulf residence permit should not be treated as permission to work in Europe."] },
    { heading: "Choose the country where you live", paragraphs: ["Use your current residence guide to prepare the enquiry, then compare European destinations. These guides do not confirm current vacancies or appointments."], links: [{label: "Saudi Arabia", url: "/europe-jobs-from-saudi-arabia/"}, {label: "United Arab Emirates (UAE)", url: "/europe-jobs-from-uae/"}, {label: "Qatar", url: "/europe-jobs-from-qatar/"}, {label: "Oman", url: "/europe-jobs-from-oman/"}, {label: "Kuwait", url: "/europe-jobs-from-kuwait/"}, {label: "Bahrain", url: "/europe-jobs-from-bahrain/"}] },
    { heading: "Prepare before making commitments", bullets: ["Record your job duties, dates, training and language skills accurately.", "Ask the destination employer what references and qualifications it requires.", "Check current employment and residence obligations with the relevant official services before arranging a move.", "Avoid resigning, booking travel or paying based only on an unverified message."] },
    { heading: "Separate employer terms from adviser fees", paragraphs: ["Ask for the employer, role, location, pay, hours, deductions and accommodation terms in writing. Separately request the service scope, current rates, third-party costs and cancellation terms.", "EU Pathfinder pricing is available by contacting the team. A consultation or quote is not a promise of a job, permit or visa."], links: [{label: "Ask about pricing", url: "/#pricing"}, {label: "Contact the team", url: "/#contact"}] },
    { heading: "Build a move checklist around your current residence", bullets: ["Check passport and residence-document expiry dates, and ask the destination authority whether it accepts applications from your current residence.", "Check notice, final settlement and residence or exit procedures with the appropriate official services for the Gulf country where you live. Do not assume the six countries have identical rules.", "Ask what happens if a residence document expires while a European application is pending.", "Request written employer terms and official approval requirements before resigning or buying non-refundable travel."] },
    { heading: "Compare take-home arrangements, not just a salary headline", paragraphs: ["Ask whether a quoted salary is gross or net, which deductions apply, and who pays for housing, transport, insurance and travel. Record working hours and overtime arrangements separately.", "Keep your relocation budget separate from adviser fees. Ask about payment timing and written cancellation or refund terms. Do not treat an estimated processing time as a guaranteed start date."] },
    { heading: "Planning from your country of origin", paragraphs: ["If you are comparing enquiries from home and from your current Gulf residence, use the relevant guide and make your residence clear."], links: [{label: "Pakistan", url: "/europe-jobs-from-pakistan/"}, {label: "India", url: "/europe-jobs-from-india/"}, {label: "Nepal", url: "/europe-jobs-from-nepal/"}, {label: "Bangladesh", url: "/europe-jobs-from-bangladesh/"}, {label: "African applicants", url: "/guides/europe-work-guidance-from-africa/"}] }
  ],
  resources: [{label: "EU Immigration Portal", url: "https://immigration-portal.ec.europa.eu/index_en"}]
  }
];

const publicationPages = [
  { slug:"services","title":"Guidance, Employer Matching and Relocation Services","description":"Explore EU PathFinder guidance, employer-matching and relocation support. Understand deliverables, your preparation and next steps. Contact us for pricing."},
  { slug:"insights","title":"Insights and Resources for Work in Europe","description":"Explore EU PathFinder articles about international hiring, work visas, residence permits, employer checks and preparation for life in Europe."},
  { slug:"gdpr","title":"GDPR Notice and Data Rights","description":"Read EU PathFinder’s GDPR notice, processing information and contact route for access, correction, deletion and other applicable privacy rights."},
  { slug:"refund-policy","title":"Refund and Cancellation Policy","description":"Read EU PathFinder’s cancellation and refund terms, how requests are assessed and how to contact the refund and customer support teams."},
  { slug:"insights/why-european-employers-look-for-international-workers","title":"Why European employers look for international workers","description":"Understand labour shortages without confusing a market trend with a confirmed job offer."},
  { slug:"insights/understanding-european-work-visas","title":"Understanding European work visas: a beginner’s guide","description":"Separate the job offer, work authorisation, visa and residence questions before applying."},
  { slug:"insights/industries-to-research-for-work-in-europe","title":"Industries to research for work in Europe","description":"Compare roles in construction, production, logistics, agriculture and hospitality against your experience."},
  { slug:"insights/common-mistakes-in-european-job-applications","title":"Common mistakes in European job applications","description":"Avoid incomplete records, unverified employers and promises of guaranteed outcomes."},
  { slug:"insights/how-transparent-recruitment-protects-workers-and-employers","title":"How transparent recruitment protects workers and employers","description":"Clear responsibilities, verifiable offers and written terms support more informed hiring decisions."},
  { slug:"insights/life-after-arrival-in-europe","title":"Life after arrival: preparing for work in Europe","description":"Plan for workplace expectations, language, accommodation and practical arrival questions."},
  { slug:"insights/construction-work-in-europe-preparation","title":"Preparing for construction work in Europe","description":"Explain your trade, training and practical experience before comparing a construction role."},
  { slug:"insights/residence-permits-for-foreign-employees","title":"Residence permits for foreign employees","description":"Questions about residence, permission to work, validity and renewal to check with the destination authority."},
  { slug:"insights/employer-matching-from-south-asia","title":"Employer matching from India, Bangladesh, Nepal and Pakistan","description":"Match the requirements of a role with an individual candidate’s skills and experience."},
  { slug:"insights/building-a-long-term-career-in-europe","title":"Building a long-term career in Europe","description":"Think beyond arrival: skills, communication, workplace performance and lawful status."}
];

const countryPhotos = {
  poland: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Wawel_%284%29.jpg/960px-Wawel_%284%29.jpg",
  uk: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Elizabeth_Tower_and_the_north_front_of_the_Palace_of_Westminster%2C_London.jpg/960px-Elizabeth_Tower_and_the_north_front_of_the_Palace_of_Westminster%2C_London.jpg",
  germany: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/960px-Brandenburger_Tor_abends.jpg",
  austria: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Wien_-_Schloss_Sch%C3%B6nbrunn.JPG/960px-Wien_-_Schloss_Sch%C3%B6nbrunn.JPG",
  croatia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Dubrovnik_s_24.jpg/960px-Dubrovnik_s_24.jpg",
  slovakia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Bratislava_-_Burg_%28b%29.JPG/960px-Bratislava_-_Burg_%28b%29.JPG",
  portugal: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Torre_Bel%C3%A9m_April_2009-4a.jpg/960px-Torre_Bel%C3%A9m_April_2009-4a.jpg",
  norway: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Geirangerfjord_.jpg/960px-Geirangerfjord_.jpg",
  switzerland: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Matterhorn_from_Domh%C3%BCtte_-_2.jpg/960px-Matterhorn_from_Domh%C3%BCtte_-_2.jpg",
  belgium: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Grand-Place%2C_Brussels_-_panorama%2C_June_2018.jpg/960px-Grand-Place%2C_Brussels_-_panorama%2C_June_2018.jpg",
  bulgaria: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Rila_Monastery%2C_August_2013.jpg/960px-Rila_Monastery%2C_August_2013.jpg",
  cyprus: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Roca_de_Afrodita%2C_Chipre%2C_2021-12-10%2C_DD_65.jpg/960px-Roca_de_Afrodita%2C_Chipre%2C_2021-12-10%2C_DD_65.jpg",
  czechia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Prague_07-2016_view_from_Lesser_Town_Tower_of_Charles_Bridge_img3.jpg/960px-Prague_07-2016_view_from_Lesser_Town_Tower_of_Charles_Bridge_img3.jpg",
  denmark: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/The_Nyhavn_Canal_3.jpg/960px-The_Nyhavn_Canal_3.jpg",
  estonia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Old_Town_of_Tallinn%2C_Tallinn%2C_Estonia_-_panoramio_%2858%29.jpg/960px-Old_Town_of_Tallinn%2C_Tallinn%2C_Estonia_-_panoramio_%2858%29.jpg",
  finland: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Kirkko3.png/960px-Kirkko3.png",
  france: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/960px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
  serbia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/P037152-661920_-_Belgrade_fortress_stand_at_the_downtown_of_Belgrade.jpg/960px-P037152-661920_-_Belgrade_fortress_stand_at_the_downtown_of_Belgrade.jpg",
  moldova: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Stanca_deasupra_Rautului_Butuceni.jpg/960px-Stanca_deasupra_Rautului_Butuceni.jpg",
  ukraine: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/80-391-0151_Kyiv_St.Sophia%27s_Cathedral_RB_18_2_%28cropped%29.jpg/960px-80-391-0151_Kyiv_St.Sophia%27s_Cathedral_RB_18_2_%28cropped%29.jpg",
  greece: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg/960px-1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg",
  ireland: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Cliffs-Of-Moher-OBriens-From-South.JPG/960px-Cliffs-Of-Moher-OBriens-From-South.JPG",
  romania: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/01_Chateau_Peles.jpg/960px-01_Chateau_Peles.jpg",
  latvia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/House_of_Blackheads_at_Dusk_3%2C_Riga%2C_Latvia_-_Diliff.jpg/960px-House_of_Blackheads_at_Dusk_3%2C_Riga%2C_Latvia_-_Diliff.jpg",
  lithuania: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Traku_pilis_by_Augustas_Didzgalvis.jpg/960px-Traku_pilis_by_Augustas_Didzgalvis.jpg",
  luxembourg: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Selig_Luxembourg_from_Paffendall.jpg/960px-Selig_Luxembourg_from_Paffendall.jpg",
  netherlands: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/KinderdijkMolens02.jpg/960px-KinderdijkMolens02.jpg",
  slovenia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Lake_Bled_from_the_Mountain.jpg/960px-Lake_Bled_from_the_Mountain.jpg",
  spain: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/SF_maig_2_cropped.jpg/960px-SF_maig_2_cropped.jpg",
  sweden: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Gamla_stan_September_2014_01.jpg/960px-Gamla_stan_September_2014_01.jpg",
  russia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Saint_Basil%27s_Cathedral_in_Moscow.jpg/960px-Saint_Basil%27s_Cathedral_in_Moscow.jpg",
  malta: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Prelucrare_3D_pentru_La_Valletta_Harbour.jpg/960px-Prelucrare_3D_pentru_La_Valletta_Harbour.jpg",
  belarus: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/%D0%9A%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81_%D0%9C%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B7%D0%B0%D0%BC%D0%BA%D0%B0.JPG/960px-%D0%9A%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81_%D0%9C%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B7%D0%B0%D0%BC%D0%BA%D0%B0.JPG",
  hungary: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Hungarian_Parliament_Building_from_across_the_Danube%2C_2025-01-11.jpg/960px-Hungarian_Parliament_Building_from_across_the_Danube%2C_2025-01-11.jpg",
  italy: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/960px-Colosseo_2020.jpg"
};

const processSteps = [
  ["Consultation and agreement", "We learn about your skills and goals, review your eligibility and agree on the service together."],
  ["Document collection and permit filing", "We help you gather and check your documents, then support the work permit application."],
  ["Work permit decision", "The authorities review the application. We keep you informed at each stage."],
  ["Embassy appointment", "We guide you through the embassy appointment and what to prepare."],
  ["Visa support and processing", "We explain the visa requirements and support you while the application is processed."],
  ["Visa decision and travel preparation", "Once the visa is issued, we help you prepare your travel and relocation checklist."],
  ["Arrival and settling in", "We help with accommodation and local registration so you can start your job with confidence."]
];

const services = [
  ["Visa appointment assistance", "Available for selected destinations, confirmed case by case."],
  ["Visa refusal review and re-application", "A careful review of the refusal letter and the options that follow."],
  ["Employment letter", "A letter from your future employer, issued on official letterhead."],
  ["Personal document checklist", "Tailored to your country of residence and your destination."],
  ["Interview preparation", "Common employer and embassy questions, explained clearly."],
  ["CV and cover letter", "Rewritten in a clear format that European employers expect."],
  ["Health insurance guidance", "Help choosing cover that meets visa requirements before you leave."],
  ["Airport and arrival support", "Airport pickup coordinated with your flight details."],
  ["Legal job-change support", "A review of your current permit and what a change of employer requires."]
];

const faqs = [
  ["How do I get started?", "Choose a destination and email us about your skills, experience and goals. Our team can explain the support available and outline possible next steps before you decide whether to proceed."],
  ["Which destinations are covered?", "The site currently has guidance for 35 European destinations. Open a destination page to review general information about sectors, common documents and the process. Availability and requirements depend on the country, role and employer."],
  ["What does the process involve?", "The site outlines a typical seven-stage process, from an initial consultation and document preparation through permit and visa applications, travel preparation and arrival support. The exact steps vary by destination and case; the relevant authorities make all permit and visa decisions."],
  ["What documents might I need?", "A valid passport, an updated CV, education or professional certificates, and evidence of work experience are common starting points. The destination authority and employer set the actual requirements, so confirm the current checklist for your case before arranging documents."],
  ["Can you guarantee a job, visa or work permit?", "No. Job offers, work permits and visas cannot be guaranteed by EU Pathfinder. Employers make hiring decisions, and government authorities decide permit and visa applications. Check official requirements and independently verify any employer and written job offer."],
  ["How much do your services cost?", "Fees depend on the destination, role and level of support. Contact us for current rates and a clear breakdown of service fees and any separate costs before you agree to proceed."],
  ["Can I apply from a Gulf country?", "Some destination authorities accept applications from people who legally reside in a Gulf country, but rules vary. Your nationality and residence status may affect where you can apply. Check the destination's official embassy or visa authority before making plans."],
  ["How can I check that a job offer is genuine?", "Ask for the employer's full legal name, the specific role and written terms. Verify the employer and vacancy independently, and confirm immigration requirements through official government sources. Do not rely on promises of guaranteed approval."],
  ["How do I ask about current fees or my situation?", "Email EU Pathfinder using the contact link on this site. Share only the information needed for an initial enquiry; do not send passport scans or other sensitive documents until you have confirmed how they will be handled."],
  ["How should I handle payment requests?", "Ask for written service terms, an itemized fee breakdown and an invoice before paying. Confirm the beneficiary and payment instructions through a contact method you independently verified. Do not pay anyone who promises a guaranteed job, permit or visa."],
  ["Should I send my passport or bank details by email?", "Do not send passport scans, bank logins, card details, passwords or one-time codes in an initial enquiry. First confirm who will receive any documents, why they are needed and how they will be handled."]
];

const documents = [
  "Valid passport",
  "Updated CV",
  "Educational and professional certificates",
  "Police clearance certificate",
  "Passport-size photographs",
  "Proof of previous work experience",
  "Medical documents, where required"
];

const workRoutes = [
  "Employer-sponsored work permits",
  "Seasonal or temporary work, where the destination offers it",
  "Skilled-worker and shortage-occupation routes, where they exist"
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[character]);

const getFlag = (country, size = 80) => `https://flagcdn.com/w${size}/${country.code}.png`;

const emailLink = (subject, body = "") =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

const fallbackImageSelector = ".flag, .destination-flag, .destination-photo, #featured-flag";
document.addEventListener("error", (event) => {
  if (event.target?.matches?.(fallbackImageSelector)) {
    event.target.hidden = true;
  }
}, true);
document.addEventListener("load", (event) => {
  if (event.target?.matches?.(fallbackImageSelector)) {
    event.target.hidden = false;
  }
}, true);

const workplacePhotos = {
  consultation: {
    url: "https://images.unsplash.com/photo-1672380135241-c024f7fbfa13",
    alt: "Two professionals greeting with a handshake across a desk",
    caption: "Professionals greeting across a desk"
  },
  agriculture: {
    url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    alt: "Farm workers carrying harvest crates through a field",
    caption: "Agriculture and seasonal harvests"
  },
  logistics: {
    url: "https://images.unsplash.com/photo-1759272548449-7b689a81c8fb",
    alt: "Two logistics workers in safety vests coordinating among cargo containers",
    caption: "Logistics crews coordinating a shipment"
  },
  transport: {
    url: "https://images.unsplash.com/photo-1574757974346-45bae947d89a",
    alt: "A transport worker beside a truck, speaking with its driver",
    caption: "Drivers and crews at work in transport"
  },
  teamPlanning: {
    url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    alt: "Colleagues reviewing a work plan together",
    caption: "",
    imageOnly: true
  },
  teamCollaboration: {
    url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
    alt: "Coworkers sharing ideas around a laptop",
    caption: "",
    imageOnly: true
  },
  construction: {
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    alt: "A construction site with workers in protective clothing",
    caption: "Construction and skilled trades"
  }
};

function workplacePhotoUrl(photo, width) {
  if (!photo.url.startsWith("https://images.unsplash.com/")) return photo.url;
  return `${photo.url}?auto=format&fit=crop&w=${width}&q=68`;
}

function sectionPhotoStyle(photo) {
  if (/^\/(?:index\.html)?$/.test(window.location.pathname)) {
    const photos = Object.values(workplacePhotos);
    const index = Math.max(0, photos.indexOf(photo));
    photo = { url: `/images/reference/${["travel", "europe-banner2", "europe-banner1", "planning"][index % 4]}.jpg` };
  }
  return `style="--section-photo:url('${escapeHtml(workplacePhotoUrl(photo, 1440))}');--section-photo-mobile:url('${escapeHtml(workplacePhotoUrl(photo, 640))}')"`;
}

function renderWorkplacePhoto(photo, sizes) {
  const photoBrand = photo.imageOnly
    ? ""
    : `
        <span class="people-photo-brand" aria-hidden="true">
          <span class="people-photo-brand-mark">
            <svg viewBox="0 0 40 40"><path d="M20 5 31 27l-11-6-11 6L20 5Z"></path><path class="brand-stem" d="M20 21v13"></path></svg>
          </span>
          <span>EU Pathfinder</span>
        </span>`;

  return `
    <figure class="people-photo">
      <div class="people-photo-frame">
        <img
          src="${escapeHtml(workplacePhotoUrl(photo, 720))}"
          srcset="${escapeHtml(workplacePhotoUrl(photo, 480))} 480w, ${escapeHtml(workplacePhotoUrl(photo, 900))} 900w"
          sizes="${sizes}"
          alt="${escapeHtml(photo.alt)}"
          width="900"
          height="600"
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
        >
        ${photoBrand}
      </div>
      ${photo.caption ? `<figcaption>${escapeHtml(photo.caption)}</figcaption>` : ""}
    </figure>`;
}

function renderPeoplePhotoSection(
  photos,
  heading = "People, planning, and work in motion",
  backdropPhoto = workplacePhotos.transport
) {
  const imageSizes = photos.length > 2
    ? "(max-width: 500px) calc(50vw - 22px), (max-width: 760px) calc(50vw - 28px), 25vw"
    : "(max-width: 500px) calc(50vw - 22px), (max-width: 760px) calc(50vw - 28px), 45vw";

  return `
    <section class="section people-photo-section photo-backed-section" ${sectionPhotoStyle(backdropPhoto)} aria-labelledby="people-photo-title">
      <div class="wrap">
        <div class="people-photo-heading">
          <h2 id="people-photo-title">${escapeHtml(heading)}</h2>
          <p>Talk through your goals with an adviser, then explore the kinds of workplaces that may fit your experience.</p>
        </div>
        <div class="people-photo-grid">
          ${photos.map((photo) => renderWorkplacePhoto(photo, imageSizes)).join("")}
        </div>
      </div>
    </section>`;
}


function pageVisualTheme() {
  const route = window.location.pathname.replace(/\/index\.html$/, "/").replace(/^\/+|\/+$/g, "");
  const routes = ["", ...publicationPages.map(p => p.slug), ...countries.map(c => c.slug), ...workerMarkets.map(m => m.slug), ...guides.map(g => `guides/${g.slug}`), "privacy"];
  const index = Math.max(0, routes.indexOf(route));
  const country = countries.find(c => c.slug === route);
  const extraPhotos = [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=960&q=70",
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=960&q=70",
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=960&q=70",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=960&q=70"
  ];
  const marketPhotos = [...Object.values(workplacePhotos).map(photo => workplacePhotoUrl(photo, 960)), "/images/reference/europe-banner2.jpg", "/images/reference/travel.jpg", "/images/reference/planning.jpg", extraPhotos[0]];
  const marketIndex = workerMarkets.findIndex(m => m.slug === route);
  const guideIndex = guides.findIndex(g => `guides/${g.slug}` === route);
  const articlePhoto = editorialContent.articles.find(a => `insights/${a.slug}` === route);
  const primary = route === "insights" ? editorialContent.photos.team.src : articlePhoto ? editorialContent.photos[articlePhoto.image].src : route === "gdpr" ? editorialContent.photos.logistics.src : route === "refund-policy" ? editorialContent.photos.family.src : route === "services" ? "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=960&q=68" : !route ? "/images/editorial/airport-family.jpg" : country ? countryPhotos[country.slug] : marketIndex >= 0 ? marketPhotos[marketIndex] : guideIndex >= 0 ? (guides[guideIndex].background || extraPhotos[guideIndex + 1]) : extraPhotos[3];
  const secondary = primary;
  return { route, index, primary, secondary };
}
function renderPageAtmosphere(content) {
  const theme = pageVisualTheme();
  return `<div class="page-theme" data-background-key="${escapeHtml(theme.route || "home")}" style="--page-photo:url('${escapeHtml(theme.primary)}');--page-photo-secondary:url('${escapeHtml(theme.secondary)}');--page-hue:${(theme.index * 19) % 65}deg;--page-position:${30 + theme.index % 5 * 10}%">
    <div class="page-photo-layer" aria-hidden="true"></div>
    <div class="page-identity-layer" aria-hidden="true"><div class="ambient-globe globe-host" data-globe-host><img class="globe-poster" src="/glass-globe-hero.svg" alt="" width="900" height="700" decoding="async"></div><div class="ambient-logo"><img src="/brand-emblem-3d.svg" alt="" width="240" height="260"><span>EU Pathfinder<small>AGENCY</small></span></div></div>
    <div class="page-content-layer">${content}${theme.route === "privacy" ? "" : `<aside class="advertisement wrap" aria-label="Advertisement"><h2>Advertisement</h2><p>Third-party advertising is separate from EU Pathfinder services.</p><div id="adsterra-slot" class="advertisement-slot"><p data-ad-status>Advertising is optional.</p><button type="button" data-ad-settings>Advertising preferences</button></div></aside>`}</div></div>`;
}

function renderEnquiryForm() {
  const pagePath = window.location.pathname.replace(/\/index\.html$/, "/");
  const context = pagePath.endsWith("/") ? pagePath : `${pagePath}/`;
  return `
    <form class="enquiry-form" action="/api/enquiry" method="post" data-enquiry-form aria-describedby="enquiry-privacy">
      <input type="hidden" name="context" value="${escapeHtml(context)}">
      <p class="enquiry-context">Enquiry page: ${escapeHtml(context)}</p>
      <div class="enquiry-fields">
        <label for="enquiry-name">
          <span>Your name</span>
          <input name="name" id="enquiry-name" type="text" autocomplete="name" minlength="2" maxlength="100" required>
        </label>
        <label for="enquiry-email">
          <span>Email address</span>
          <input name="email" id="enquiry-email" type="email" autocomplete="email" maxlength="254" required>
        </label>
        <label for="enquiry-nationality">
          <span>Nationality</span>
          <input name="nationality" id="enquiry-nationality" type="text"  maxlength="80" required>
        </label>
        <label class="enquiry-topic" for="enquiry-interest">
          <span>What would you like help with?</span>
          <select name="interest" id="enquiry-interest" required>
            <option value="">Choose a topic</option>
            <option>Hospitality work</option>
            <option>Seasonal or entry-level work</option>
            <option>Work-permit guidance</option>
            <option>Another question</option>
          </select>
        </label>
        <label class="enquiry-message" for="enquiry-message">
          <span>Message <small>Optional</small></span>
          <textarea name="message" id="enquiry-message" rows="3" maxlength="1200" placeholder="A short note about your experience or question"></textarea>
        </label>
      </div>
      <label class="enquiry-consent" for="enquiry-consent">
        <input name="consent" id="enquiry-consent" type="checkbox" required>
        <span>I agree to be contacted about this enquiry. Please do not include passport scans, payment details or other sensitive documents.</span>
      </label>
      <label class="enquiry-trap" aria-hidden="true" tabindex="-1" for="enquiry-website">
        Leave this field empty
        <input name="website" id="enquiry-website" type="text" tabindex="-1" autocomplete="off">
      </label>
      <div class="enquiry-submit-row">
        <button class="button button-gold enquiry-submit" type="submit">Send enquiry <span aria-hidden="true">↗</span></button>
        <p class="enquiry-status" data-form-status role="status" aria-live="polite" hidden></p>
      </div>
      <p class="enquiry-privacy" id="enquiry-privacy">We use your name, email, nationality, topic and optional message to respond to your enquiry. Submissions pass through Cloudflare Pages and Resend to <a href="mailto:${contactEmail}">${contactEmail}</a>. Do not include passport scans or payment details. <a href="/privacy/">Privacy information and data requests</a>.</p>
    </form>`;
}

function renderContactSection({
  title = "Tell us what you are planning",
  description = "Share a few details and an adviser can reply with the next steps. No job, permit or visa outcome is guaranteed.",
  id = "contact"
} = {}) {
  return `
    <section class="contact-section photo-backed-section" ${sectionPhotoStyle(workplacePhotos.consultation)} id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title">
      <div class="wrap contact-layout">
        <div class="contact-copy">
          <h2 id="${escapeHtml(id)}-title">${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)}</p>
          <div class="contact-options" aria-label="Call and WhatsApp contact options">
            <div class="contact-option">
              <span class="contact-option-label">WhatsApp</span>
              <a class="contact-number" href="${whatsappLink()}" target="_blank" rel="noopener noreferrer">${whatsappNumber}</a>
              <a class="contact-option-action" href="${whatsappLink()}" target="_blank" rel="noopener noreferrer">Start a conversation <span aria-hidden="true">↗</span></a>
            </div>
            <div class="contact-option">
              <span class="contact-option-label">Calls &amp; WhatsApp</span>
              <a class="contact-number" href="tel:${callNumber}">+1 289 914 3132</a>
              <div class="contact-option-actions"><a class="contact-option-action" href="tel:${callNumber}">Call us</a><span aria-hidden="true"> · </span><a class="contact-option-action" href="${whatsappLink(callNumber)}" target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
            </div>
          </div>
          <a class="contact-email" href="mailto:${contactEmail}">Email us at ${contactEmail}</a>
          <a class="contact-email ceo-contact" href="mailto:${ceoEmail}">CEO email: ${ceoEmail}</a>
          <figure class="contact-travel-art">
            <img src="/family-airport.svg" alt="Illustration of a family preparing to travel with generic, fictional travel documents." width="700" height="440" loading="lazy" decoding="async">
          </figure>
        </div>
        ${renderEnquiryForm()}
      </div>
    </section>`;
}

function renderGuideCards() {
  return `
    <section class="section guide-library photo-backed-section" ${sectionPhotoStyle(workplacePhotos.transport)} id="worker-guides" aria-labelledby="worker-guides-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="worker-guides-title">Useful guides for your next step</h2><p class="section-lead">Practical guidance on hospitality work, entry-level roles and checking an offer before you commit.</p></div>
        </div>
        <div class="guide-card-grid">
          ${guides.map((guide) => `
            <article class="guide-card">
              <a class="guide-card-image" href="/guides/${guide.slug}/" tabindex="-1" aria-hidden="true">
                <img src="${guide.image}" alt="" width="700" height="440" loading="lazy" decoding="async">
                <span>Worker guide</span>
              </a>
              <div class="guide-card-copy">
                <h3><a href="/guides/${guide.slug}/">${escapeHtml(guide.title)}</a></h3>
                <p>${escapeHtml(guide.summary)}</p>
                <a class="text-link" href="/guides/${guide.slug}/">Read the guide <span aria-hidden="true">↗</span></a>
              </div>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function guideSectionId(index) { return `guide-section-${index + 1}`; }
function renderGuidePage(guide) {
  return `
    <article class="guide-page">
      <header class="guide-hero" style="--hero-photo:url('${escapeHtml(workplacePhotoUrl(workplacePhotos.consultation, 1800))}')">
        <span class="hero-photo-backdrop" aria-hidden="true"></span>
        <div class="wrap guide-hero-layout">
          <div>
            <nav class="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#worker-guides">Worker guides</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(guide.title)}</span>
            </nav>
            <h1>${escapeHtml(guide.title)}</h1>
            <p class="guide-intro">${escapeHtml(guide.intro)}</p>
            <a class="button button-gold" href="/#contact">Ask a question <span aria-hidden="true">↗</span></a>
          </div>
          <figure class="guide-art">
            <img src="${guide.image}" alt="Travel planning with a route map and generic travel documents." width="700" height="440" fetchpriority="high">
          </figure>
        </div>
      </header>
      <div class="wrap guide-content-layout">
        <div class="guide-content">
          <nav class="guide-toc reading-card" aria-label="On this page">
            <h2>On this page</h2><ol>${guide.sections.map((section, index) => `<li><a href="#${guideSectionId(index)}">${escapeHtml(section.heading)}</a></li>`).join("")}<li><a href="#guide-preparation">Your preparation checklist</a></li><li><a href="#guide-resources-title">Official starting points</a></li></ol>
          </nav>
          ${guide.sections.map((section, index) => `
            <section id="${guideSectionId(index)}" class="guide-section photo-backed-section" ${sectionPhotoStyle(guide.slug === "europe-hospitality-jobs" ? workplacePhotos.logistics : workplacePhotos.agriculture)}>
              <h2>${escapeHtml(section.heading)}</h2>
              ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
              ${section.bullets ? `<ul class="check-list">${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
              ${section.links ? `<ul class="check-list">${section.links.map(link => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a></li>`).join("")}</ul>` : ""}
            </section>`).join("")}
          <section id="guide-preparation" class="guide-section reading-card" aria-labelledby="guide-preparation-title"><h2 id="guide-preparation-title">Your preparation checklist</h2><p>Use this before your first conversation. It is a planning aid, not a visa application checklist.</p><ul class="check-list"><li>Note your nationality, current residence and one or two destinations.</li><li>Summarise your occupation, experience, training and languages.</li><li>Write down questions about the employer, role, pay and total costs.</li><li>Identify the official authority for your destination and any departure requirements.</li><li>Request the service scope and current fees in writing. Keep sensitive documents out of your initial message.</li></ul><a class="text-link" href="/services/">See how our support is scoped</a></section>
          <section class="guide-resources photo-backed-section" ${sectionPhotoStyle(workplacePhotos.consultation)} aria-labelledby="guide-resources-title">
            <h2 id="guide-resources-title">Official starting points</h2>
            <p>Rules change and depend on the destination. Check current details directly with official sources.</p>
            <ul>${guide.resources.map((resource) => `<li><a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(resource.label)} <span aria-hidden="true">↗</span></a></li>`).join("")}</ul>
          </section>
          <p class="guide-disclaimer">This guide is general information, not legal advice, a job offer or a promise of a work permit or visa. Employers make hiring decisions; government authorities decide applications.</p>
        </div>
        <aside class="guide-aside">
          <h2>Before you pay</h2>
          <p>Get the employer, role, written terms and full fee breakdown in writing. Verify each independently.</p>
          <a href="/#candidate-review" class="text-link">See the opportunity checks <span aria-hidden="true">↗</span></a>
          <img src="/travel-route.svg" alt="" width="400" height="260" loading="lazy" decoding="async">
        </aside>
      </div>
      ${renderGuideCards()}
      ${renderContactSection({ title: "Have a question about your plans?" })}
    </article>`;
}

function getCountryWorkPhoto(country) {
  const sectors = country.sectors.join(" ").toLowerCase();
  if (/agriculture|horticulture|forestry|agri-food|food processing/.test(sectors)) {
    return workplacePhotos.agriculture;
  }
  if (/transport/.test(sectors)) return workplacePhotos.transport;
  if (/logistics|warehousing|shipping/.test(sectors)) return workplacePhotos.logistics;
  return workplacePhotos.construction;
}

function renderCountryChip(country, selected = false) {
  return `
    <button class="hero-chip" type="button" data-feature="${country.slug}" aria-pressed="${selected}">
      <img class="flag" src="${getFlag(country, 40)}" alt="" width="27" height="20" loading="lazy">
      <span>${escapeHtml(country.name)}</span>
    </button>`;
}

function renderDestinationCard(country) {
  return `
    <a
      class="destination-card"
      href="/${country.slug}/"
      data-region="${escapeHtml(country.region)}"
      data-search="${escapeHtml(`${country.name} ${country.code} ${country.slug === "uk" ? "UK Britain Great Britain" : ""} ${country.region} ${country.landmark}`.toLowerCase())}"
      style="--country-a:${country.colors[0]};--country-b:${country.colors[1]}"
    >
      <span class="destination-art" aria-hidden="true">
        ${countryPhotos[country.slug] ? `<img class="destination-photo" src="${countryPhotos[country.slug].replace("/960px-", "/330px-")}" srcset="${countryPhotos[country.slug].replace("/960px-", "/330px-")} 330w, ${countryPhotos[country.slug]} 960w" sizes="(max-width:600px) 90vw, (max-width:1000px) 45vw, 280px" width="960" height="640" alt="" loading="lazy" decoding="async">` : ""}
        <img class="destination-flag" src="${getFlag(country, 160)}" alt="" width="80" height="60" loading="lazy" decoding="async">
        <span class="destination-region">${escapeHtml(country.region)}</span>
      </span>
      <span class="destination-card-copy">
        <span class="destination-name">
          <img class="flag" src="${getFlag(country, 40)}" alt="" width="27" height="20" loading="lazy">
          <span>${escapeHtml(country.name)}</span>
        </span>
        <span class="destination-landmark">${escapeHtml(country.landmark)}</span>
      </span>
    </a>`;
}

function renderProcessSteps(compact = false) {
  const className = compact ? "country-steps" : "process-list";
  const tagName = compact ? "ol" : "div";
  return `
    <${tagName} class="${className}">
      ${processSteps.map(([title, detail], index) => compact
        ? `<li><h3>${escapeHtml(title)}</h3><p>${escapeHtml(detail)}</p></li>`
        : `<article class="process-step"><span class="process-number">${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(detail)}</p></article>`
      ).join("")}
    </${tagName}>`;
}

function renderFaqs() {
  return `
    <div class="faq-list">
      ${faqs.map(([question, answer]) => `
        <details class="faq-item">
          <summary>${escapeHtml(question)}</summary>
          <div class="faq-answer"><p>${escapeHtml(answer)}</p></div>
        </details>`).join("")}
    </div>`;
}

function renderBankDetails(compact = false) {
  return `
    <section class="bank-transfer${compact ? " bank-transfer-compact" : ""}" aria-labelledby="bank-transfer-title">
      <h3 id="bank-transfer-title">Before making a payment</h3>
      <p class="bank-payment-note">Request written service terms, an itemized fee breakdown and an invoice before paying. Confirm the beneficiary and payment instructions through a contact method you independently verified. Never pay based on an unsolicited message or a promise of a guaranteed job, work permit or visa.</p>
    </section>`;
}

function renderClientStart() {
  const audiences = [
    {name: "Workers", title: "Plan your next step in Europe", intro: "Discuss your experience, destination and questions about employer matching, documents or relocation.", items: ["Nationality and current country", "Occupation, experience and training", "Preferred destination and main question"], action: "Discuss my work plans", message: "Hello EU Pathfinder, I am a worker seeking guidance.\nNationality: \nCurrent country: \nOccupation and experience: \nPreferred destination: \nMy question: "},
    {name: "Employers", title: "Discuss your workforce needs", intro: "Tell us about your business and roles to discuss candidate requirements and employer-matching support.", items: ["Company website and work location", "Roles, skills and number of workers", "Proposed pay, hours and start date"], action: "Discuss workforce needs", message: "Hello EU Pathfinder, I represent an employer and would like to discuss employer-matching support.\nCompany name and website: \nWork location: \nRoles and number of workers: \nProposed pay, hours and start date: \nMy question: "}
  ];
  return `<section class="section client-start wrap" id="start-here" aria-labelledby="client-start-title"><h2 id="client-start-title">Workers and employers: start here</h2><p class="section-lead">Tell us what you need so we can discuss the relevant support, scope and current pricing.</p><div class="client-start-grid">${audiences.map(a=>`<article class="reading-card"><p class="eyebrow">For ${a.name.toLowerCase()}</p><h3>${a.title}</h3><p>${a.intro}</p><ul class="check-list">${a.items.map(i=>`<li>${i}</li>`).join("")}</ul><a class="button button-gold" href="${whatsappLink(whatsappNumber,a.message)}" target="_blank" rel="noopener noreferrer">${a.action}</a><a class="text-link" href="${emailLink(a.name + ' enquiry',a.message)}">Prefer email? Send an enquiry</a></article>`).join("")}</div><p class="client-start-note">Opening WhatsApp or email prepares a message for you to review and send. Share a short summary only; keep passport scans and sensitive documents out of your first enquiry. Recruitment or placement requires a separate written agreement. Jobs and visas are not guaranteed.</p><a class="text-link" href="/services/">What support is included?</a></section>`;
}

function renderHome() {
  const featured = countries[0];
  const heroPhoto = "/images/editorial/airport-family.jpg";
  return `
    <section class="home-hero" style="--hero-photo:url('${escapeHtml(heroPhoto)}');--hero-photo-mobile:url('/images/editorial/airport-family.jpg')" aria-labelledby="home-title">
      <span class="hero-photo-backdrop" aria-hidden="true"></span>
      <div class="wrap hero-inner">
        <figure class="hero-travel-art">
          <img src="glass-globe-hero.svg" alt="A luminous 3D glass globe with a glowing route from South Asia to Europe and a floating compass." width="900" height="700" fetchpriority="high">
          <figcaption>A luminous route toward Europe</figcaption>
        </figure>
        <div class="hero-copy">
          <p class="eyebrow">EU PathFinder Agency</p><h1 id="home-title">Genuine opportunities in Europe,<span>guidance for every step</span></h1>
          <p class="hero-intro">At <strong>EU PathFinder Agency</strong>, we help workers from <strong>India, Bangladesh, Nepal, and Pakistan</strong> find genuine job opportunities across Europe.</p><p class="hero-supporting">From work visa and residence permit guidance to employer matching and relocation support, we’re with you at every step of your journey. By connecting qualified candidates with European employers facing labour shortages, we create opportunities that benefit both workers and businesses.</p><p class="hero-scope">Guidance and employer-matching support. Recruitment or placement only under a separate written agreement.</p>
          <div class="hero-actions">
            <a class="button button-gold" href="/#start-here">Workers &amp; employers: start here</a>
            <a class="button hero-secondary" href="${whatsappLink()}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5a12 12 0 0 0-10.3 18.2L4 28l6.5-1.7A12 12 0 1 0 16 3.5Zm0 21.8a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.8 1 1-3.7-.3-.4A9.7 9.7 0 1 1 16 25.3Zm5.3-7.3c-.3-.2-1.7-.9-2-.9s-.5-.2-.7.2c-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.2-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z"></path></svg>
              Chat on WhatsApp
            </a>
          </div>
          <a
            class="featured-place"
            id="featured-destination"
            href="/${featured.slug}/"
            style="--country-a:${featured.colors[0]};--country-b:${featured.colors[1]}"
          >
            <span class="featured-flag"><img id="featured-flag" src="${getFlag(featured, 80)}" alt="" width="36" height="27"></span>
            <span class="featured-copy"><strong id="featured-name">${escapeHtml(featured.name)}</strong><span id="featured-landmark">${escapeHtml(featured.landmark)}</span></span>
            <span class="featured-arrow" aria-hidden="true">↗</span>
          </a>
          <div role="group" class="hero-chips" aria-label="Select a destination to preview">
            ${countries.map((country) => renderCountryChip(country, country.slug === featured.slug)).join("")}
          </div>
        </div>
      </div>
    </section>

    ${renderClientStart()}
    <section class="proof-strip photo-backed-section" ${sectionPhotoStyle(workplacePhotos.consultation)} aria-label="How EU Pathfinder supports you">
      <div class="proof-item"><span class="proof-icon" aria-hidden="true">✓</span><div><strong>Practical document guidance</strong><p>We explain common document steps and what to confirm for your situation.</p></div></div>
      <div class="proof-item"><span class="proof-icon" aria-hidden="true">↗</span><div><strong>A clear, step-by-step process</strong><p>You always know what happens next, from first review through arrival.</p></div></div>
      <div class="proof-item"><span class="proof-icon" aria-hidden="true">↗</span><div><strong>Direct email support</strong><p>Send your questions to our team and we will reply with next steps.</p></div></div>
    </section>


    ${renderPeoplePhotoSection([
      workplacePhotos.consultation,
      workplacePhotos.agriculture,
      workplacePhotos.logistics,
      workplacePhotos.transport,
      workplacePhotos.teamPlanning,
      workplacePhotos.teamCollaboration
    ], "A human conversation. A clearer path to work.", workplacePhotos.construction)}

    <section class="section destinations-section photo-backed-section" ${sectionPhotoStyle(workplacePhotos.logistics)} id="destinations" aria-labelledby="destinations-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="destinations-title">Choose your destination</h2><p class="section-lead">Browse 35 European destinations. Work authorization and application rules vary by country; each guide provides general information and a way to ask us about current vacancies.</p></div>
        </div>
        <div class="destination-controls">
          <div class="region-filters" role="group" aria-label="Filter countries by region">
            <button class="filter-button" type="button" data-filter="All" aria-pressed="true">All</button>
            <button class="filter-button" type="button" data-filter="Western" aria-pressed="false">Western</button>
            <button class="filter-button" type="button" data-filter="Northern" aria-pressed="false">Northern</button>
            <button class="filter-button" type="button" data-filter="Southern" aria-pressed="false">Southern</button>
            <button class="filter-button" type="button" data-filter="Central & Eastern" aria-pressed="false">Central &amp; Eastern</button>
          </div>
          <label class="destination-search" for="country-search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>
            <span class="sr-only">Search countries</span>
            <input id="country-search" type="search" placeholder="Search countries" autocomplete="off">
          </label>
        </div>
        <div class="destination-results-bar">
          <p class="results-count" id="results-count" aria-live="polite"></p>
          <button class="clear-destination-filters" id="clear-destination-filters" type="button" hidden>Clear filters</button>
        </div>
        <div class="destination-grid" id="destination-grid">
          ${countries.map(renderDestinationCard).join("")}
        </div>
        <p class="empty-results" id="empty-results" hidden>No destinations match that search. Try another country or region.</p>
      </div>
    </section>


    <section class="section other-destinations photo-backed-section" ${sectionPhotoStyle(workplacePhotos.agriculture)} id="worker-markets" aria-labelledby="worker-markets-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="worker-markets-title">Looking for work in Europe from South Asia, Africa or the Gulf?</h2><p class="section-lead">Explore guidance for applicants in Pakistan, India, Bangladesh and Nepal, and for South Asian and African workers living in Saudi Arabia, the UAE, Oman, Qatar, Kuwait and Bahrain. Share your experience with EU Pathfinder to discuss support and current fees. Our Africa guide covers Nigeria, Ghana, Kenya, Uganda, Tanzania, Ethiopia, Egypt and South Africa.</p>
        <nav class="regional-links" aria-label="Regional work guides"><a href="/guides/europe-work-guidance-from-africa/">Europe work guidance from Africa</a><a href="/guides/europe-work-guidance-from-gulf/">Europe work guidance from the Gulf</a></nav></div>
        </div>
        <div class="destination-pills">
          ${workerMarkets.map((market) => `<a class="destination-pill" href="/${market.slug}/"><span>Europe work guidance: ${escapeHtml(market.country)}</span></a>`).join("")}
        </div>
      </div>
    </section>

    ${renderGuideCards()}


    <section class="section process-section photo-backed-section" ${sectionPhotoStyle(workplacePhotos.consultation)} id="how" aria-labelledby="process-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="process-title">How we may support your next steps</h2><p class="section-lead">The process depends on the destination, role and your circumstances. We explain the service scope before you decide whether to proceed.</p></div>
        </div>
        ${renderProcessSteps()}
      </div>
    </section>

    <section class="section services-section photo-backed-section" ${sectionPhotoStyle(workplacePhotos.construction)} id="services" aria-labelledby="services-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="services-title">Support beyond the core process</h2><p class="section-lead">Add the help you need, when you need it.</p><a class="text-link" href="/services/">Explore services and what to prepare <span aria-hidden="true">↗</span></a></div>
        </div>
        <div class="services-grid">
          ${services.map(([title, detail]) => `<article class="service-item"><span class="service-symbol" aria-hidden="true">+</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(detail)}</p></div></article>`).join("")}
        </div>
      </div>
    </section>

    <section class="pricing-section photo-backed-section" ${sectionPhotoStyle(workplacePhotos.logistics)} id="pricing" aria-labelledby="pricing-title">
      <div class="wrap pricing-layout">
        <div><h2 id="pricing-title">Fees and pricing</h2><p>Fees vary by destination, role and the level of support you need. Email us for current rates and an itemized breakdown before you agree to a service.</p></div>
        <a class="button button-gold" href="${emailLink("Ask about EU Pathfinder fees")}">Ask about pricing <span aria-hidden="true">↗</span></a>
      </div>
      <div class="wrap">${renderBankDetails()}</div>
    </section>

    <section class="section candidate-review photo-backed-section" ${sectionPhotoStyle(workplacePhotos.transport)} id="candidate-review" aria-labelledby="candidate-review-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="candidate-review-title">Review an opportunity before you commit</h2><p class="section-lead">A few independent checks can help you make a more informed decision about a job, an intermediary and the next step.</p></div>
        </div>
        <ul class="review-checks">
          <li><strong>Confirm the employer and role</strong><p>Get the employer's full legal name, work location, job duties, pay and written terms. Look up the employer independently.</p></li>
          <li><strong>Check the rules with official sources</strong><p>Use the destination country's government or embassy website to verify current work-permit, visa and application requirements.</p></li>
          <li><strong>Understand every fee first</strong><p>Ask for a written service scope, itemized charges, refund terms and invoice before agreeing to a service or making a payment.</p></li>
          <li><strong>Protect your personal information</strong><p>Do not send passport scans, bank credentials, card details, passwords or one-time codes in an initial chat. Confirm how documents will be handled before sharing them.</p></li>
          <li><strong>Verify credentials with the issuer</strong><p>Ask for the issuing authority, registration or certificate number, scope and expiry date, then confirm the record directly with the issuing body.</p></li>
        </ul>
        <p class="review-note">EU Pathfinder cannot guarantee a job offer, work permit or visa. Employers make hiring decisions; government authorities decide applications.</p>
      </div>
    </section>

    <section class="section faq-section photo-backed-section" ${sectionPhotoStyle(workplacePhotos.agriculture)} id="faq" aria-labelledby="faq-title">
      <div class="wrap">
        <div class="section-heading"><div><h2 id="faq-title">Questions before you start</h2></div></div>
        ${renderFaqs()}
      </div>
    </section>


    ${renderContactSection({
      title: "Speak with the EU Pathfinder team",
      description: "Tell us your nationality, how to reach you and what kind of work guidance you need. We will reply with the next steps."
    })}`;
}

function renderDestinationPills(currentSlug) {
  return countries
    .filter((country) => country.slug !== currentSlug)
    .map((country) => `
      <a class="destination-pill" href="/${country.slug}/">
        <img class="flag" src="${getFlag(country, 40)}" alt="" width="27" height="20" loading="lazy">
        <span>${escapeHtml(country.name)}</span>
      </a>`)
    .join("");
}

function renderVacancySearchSection(country) {
  const photo = getCountryWorkPhoto(country);
  const vacancyEmail = emailLink(`Ask about current vacancies in ${country.name}`, `Hello EU Pathfinder, please tell me about current vacancies in ${country.name}.`);

  return `
    <section class="section vacancy-section photo-backed-section" ${sectionPhotoStyle(photo)} aria-labelledby="vacancies-title">
      <div class="wrap vacancy-layout">
        <figure class="vacancy-photo">
          <img src="${escapeHtml(workplacePhotoUrl(photo, 1000))}" alt="${escapeHtml(photo.alt)}" width="1000" height="700" loading="lazy" decoding="async">
        </figure>
        <div class="vacancy-copy">
          <h2 id="vacancies-title">Ask about current vacancies in ${escapeHtml(country.name)}</h2>
          <p>Email EU Pathfinder to ask about current vacancies in ${escapeHtml(country.name)}. Our team will share the opportunities available and explain role details and next steps directly.</p>
          <a class="button button-gold" href="${vacancyEmail}">Email us about vacancies <span aria-hidden="true">↗</span></a>
          <p class="vacancy-disclaimer">Availability and eligibility depend on the role and can change. Ask for the employer, written job terms and any fees before making a decision or payment.</p>
        </div>
      </div>
    </section>`;
}

function renderCountryPage(country) {
  const contactMessage = `Hello EU Pathfinder, I would like information about working in ${country.name}, including current fees.`;
  const contactUrl = emailLink(`Work in ${country.name}`, contactMessage);
  const countryPhoto = countryPhotos[country.slug]
    ? `url('${escapeHtml(countryPhotos[country.slug])}')`
    : "none";
  const heroPhoto = `url('${escapeHtml(workplacePhotoUrl(getCountryWorkPhoto(country), 1200))}')`;

  return `
    <section class="country-hero" style="--country-a:${country.colors[0]};--country-b:${country.colors[1]};--country-photo:${countryPhoto};--hero-photo:${heroPhoto};--hero-photo-mobile:url('${escapeHtml(workplacePhotoUrl(getCountryWorkPhoto(country), 640))}')" aria-labelledby="country-title">
      <span class="hero-photo-backdrop" aria-hidden="true"></span>
      <div class="wrap">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#destinations">Destinations</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(country.name)}</span>
        </nav>
        <div class="country-title">
          <img class="flag" src="${getFlag(country, 80)}" alt="" width="54" height="39">
          <h1 id="country-title">Work in ${escapeHtml(country.name)}</h1>
        </div>
        <p class="country-intro">${escapeHtml(country.intro)}</p>
        <p class="country-landmark">${escapeHtml(country.landmark)}</p>
        <a class="button button-gold" href="${contactUrl}">
          Email us about ${escapeHtml(country.name)}
        </a>
      </div>
    </section>

    ${renderPeoplePhotoSection([
      workplacePhotos.consultation,
      getCountryWorkPhoto(country)
    ], `People and work in ${country.name}`, getCountryWorkPhoto(country))}

    <section class="section photo-backed-section" ${sectionPhotoStyle(getCountryWorkPhoto(country))} aria-label="Work and relocation information for ${escapeHtml(country.name)}">
      <div class="wrap country-content">
        <div class="country-main">
          <h2>Work routes</h2>
          <p>Routes depend on ${escapeHtml(country.name)}'s current rules, which we confirm with you at consultation. Commonly, these include:</p>
          <ul class="check-list">${workRoutes.map((route) => `<li>${escapeHtml(route)}</li>`).join("")}</ul>

          <h2>Sectors with regular hiring</h2>
          <ul class="sector-tags">${country.sectors.map((sector) => `<li>${escapeHtml(sector)}</li>`).join("")}</ul>
          <p class="content-note">Demand changes with the season and with employers. We confirm what is available for your profile when you contact us.</p>

          <h2>Commonly requested documents</h2>
          <ul class="check-list">${documents.map((document) => `<li>${escapeHtml(document)}</li>`).join("")}</ul>
          <p class="content-note">Exact requirements differ by role and by embassy. We provide a personal checklist once your case is reviewed.</p>

          <h2>How the process works</h2>
          ${renderProcessSteps(true)}
        </div>
        <aside class="country-sidebar">
          <div class="side-card">
            <h2>Fees and pricing for ${escapeHtml(country.name)}</h2>
            <p>For current rates and an itemized breakdown, email our team before agreeing to a service.</p>
            <a class="button button-gold" href="${contactUrl}">Email us about work in ${escapeHtml(country.name)}</a>
            ${renderBankDetails(true)}
          </div>
        </aside>
      </div>
    </section>

    ${renderVacancySearchSection(country)}


    <section class="section other-destinations photo-backed-section" ${sectionPhotoStyle(getCountryWorkPhoto(country))}>
      <div class="wrap">
        <h2>Other destinations</h2>
        <p>Explore another destination to see its typical sectors, commonly requested documents and process information.</p>
        <div class="destination-pills">${renderDestinationPills(country.slug)}</div>
      </div>
    </section>

    ${renderGuideCards()}
    ${renderContactSection({ title: `Ask about work in ${country.name}` })}`;
}

function renderServicesPage() {
  const support = [
    { title: "Consultation and planning", output: "Discuss your work history, goals and destinations, and identify questions to resolve before you proceed.", input: "A summary of your occupation, experience, nationality, current residence and preferred destinations.", next: "Ask which support fits your situation and request its scope and current fees in writing." },
    { title: "Document preparation guidance", output: "Discuss the documents relevant to your proposed route and the preparation support available. Confirm any review or translation arrangements in your agreement.", input: "An accurate CV and a list of records you already hold. Send copies only when requested through an agreed method.", next: "Check the receiving employer or authority's current checklist before arranging certificates, translations or medical checks." },
    { title: "Work-permit and visa process guidance", output: "Discuss the steps, responsibilities and preparation involved in the destination's application process. The agreed scope determines what assistance is included.", input: "The destination, any named employer or offer, and accurate information about your circumstances.", next: "Confirm who submits each application, which charges are separate and which official authority makes the decision." },
    { title: "Travel and relocation planning", output: "Discuss practical preparation for travel, accommodation and arrival. Confirm which arrangements, if any, the team will assist with before paying.", input: "Your destination, expected dates, household needs and any approvals already received.", next: "Check the required approvals before booking non-refundable travel, and confirm third-party costs and responsibilities." }
  ];
  return `<article class="services-page"><header class="guide-hero"><div class="wrap services-intro"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Services</span></nav><p class="eyebrow">Support with a clear next step</p><h1>Plan your move with clarity.</h1><p class="guide-intro">Understand the support you are discussing, what you need to prepare and what happens next. Your written agreement defines the services included in your case.</p><a class="button button-gold" href="#services-contact">Contact us for current pricing <span aria-hidden="true">↗</span></a></div></header>
  <div class="wrap services-body"><section aria-labelledby="support-options-title"><div class="section-heading"><h2 id="support-options-title">Choose the support you need</h2><p>Start with your situation. Confirm the scope before committing.</p></div><div class="service-detail-grid">${support.map((item,index)=>`<section class="service-detail reading-card"><span class="service-number" aria-hidden="true">0${index+1}</span><h3>${escapeHtml(item.title)}</h3><dl><dt>Support to discuss</dt><dd>${escapeHtml(item.output)}</dd><dt>What you provide</dt><dd>${escapeHtml(item.input)}</dd><dt>Your next step</dt><dd>${escapeHtml(item.next)}</dd></dl></section>`).join("")}</div></section>
  <section class="reading-card service-agreement" aria-labelledby="service-agreement-title"><h2 id="service-agreement-title">Know what you are agreeing to</h2><ul class="check-list"><li>Request the deliverables, responsibilities and communication arrangements in writing.</li><li>Separate service fees from government charges, translations, travel and other third-party costs.</li><li>Ask about payment stages, cancellation and refund terms before paying.</li><li>Employers decide hiring; authorities decide permits, visas and appointments. No outcome is guaranteed.</li></ul><p><strong>Contact us for current pricing.</strong> Rates depend on the destination and agreed support. A discussion or quote is not a job offer.</p></section>
  <section class="reading-card" aria-labelledby="service-start-title"><h2 id="service-start-title">Start with a short introduction</h2><p>Tell us where you live, your nationality, your occupation and the destinations you are exploring. We can discuss support options and fees before you decide whether to proceed.</p><p>Do not send passport scans, payment details or sensitive records in your first message.</p><nav class="regional-links" aria-label="Prepare for your enquiry"><a href="/guides/europe-work-guidance-from-africa/">Africa planning guide</a><a href="/guides/europe-work-guidance-from-gulf/">Gulf planning guide</a></nav></section></div>
  ${renderContactSection({id:"services-contact",title:"Contact us for current pricing"})}</article>`;
}

function renderOriginChecks(market) {
  const checks = {
    "Pakistan": { name: "Bureau of Emigration & Overseas Employment", url: "https://beoe.gov.pk/list-of-oeps", text: "If a Pakistan-based intermediary is involved, ask for its exact legal name and OEP licence number, then compare these with BEOE's records. Check the current licence status and the named employer separately. A registration entry does not by itself validate a particular European offer.", question: "Which departure or Protector formalities apply to my nationality, current residence and specific employment route? Confirm with BEOE before arranging travel." },
    "India": { name: "Ministry of External Affairs: intending emigrants", url: "https://www.mea.gov.in/issues-of-intending-emigrants.htm", text: "India's Ministry of External Affairs directs applicants to eMigrate to check recruiting-agent registration and advises contacting the foreign employer independently to verify an offer. Ask for the agent's registered name and compare the offer with the employer's own contact details.", question: "Does my passport category, destination and current residence require any emigration formalities? Ask the competent Indian authority; do not assume another worker's clearance process applies." },
    "Nepal": { name: "Department of Foreign Employment notices", url: "https://dofe.gov.np/pages/public-important/", text: "Use Nepal's Department of Foreign Employment notices as a starting point for questions about labour approval and intermediaries. Keep your destination's work-permit process separate from departure requirements in Nepal.", question: "Which current notices and labour-approval steps apply to my employer, destination and place of residence? Ask the authority before paying for documents or travel." },
    "Bangladesh": { name: "OEP RAIMS recruiting-agency register", url: "https://raims.oep.gov.bd/agencies", text: "Use the official OEP RAIMS register to compare an agency's exact name, RL licence number, licence status and validity date. Keep a record of what you checked and when. A listing is not confirmation that the agency has a specific European vacancy.", question: "Which BMET registration, clearance or pre-departure steps apply to this particular route? Use the Overseas Employment Platform and ask BMET directly instead of relying on a forwarded message." },
    "Saudi Arabia": { name: "Saudi HRSD contract-management information", url: "https://www.hrsd.gov.sa/en/ministry-services/services/إدارة-العقود", text: "For workers currently in Saudi Arabia, keep a copy of the current employment terms and review HRSD's information about contract management through Qiwa. Your existing Saudi employment arrangements and a prospective European job offer are separate matters.", question: "What must I confirm about my current contract, residence and departure arrangements before accepting a start date abroad? Check with the relevant Saudi authority as well as the destination embassy." },
    "the UAE": { name: "UAE government: labour and visa fraud checks", url: "https://u.ae/en/information-and-services/visa-and-emirates-id/tips-to-avoid-labour-and-visa-fraud", text: "If you currently work in the UAE, keep your existing contract and residence records available. The UAE government's fraud guidance explains official channels for checking UAE offers. Those checks concern UAE employment; they do not approve a European offer or visa.", question: "Which UAE employment or residence obligations must I resolve, and will the destination accept an application from my current UAE residence? Confirm each question with the responsible authority." },
    "Oman": { name: "Oman Ministry of Labour", url: "https://www.mol.gov.om/", text: "Oman's Ministry of Labour provides worker and employment services. If you live in Oman, identify the service relevant to your current employment before planning a move. Keep your existing contract, residence-document dates and proposed European employer details separate.", question: "Which Oman employment steps and residence arrangements apply before a move, and where can I lodge the destination application? Obtain answers before resigning or booking non-refundable travel." },
    "Qatar": { name: "Qatar government: workforce management", url: "https://hukoomi.gov.qa/en/topics/workforce-management", text: "Qatar's government workforce information directs workers to the Ministry of Labour for employment matters. If you are applying while living in Qatar, identify your current contract and residence circumstances rather than treating all Gulf residents as one application category.", question: "Which current Qatar employment or residence procedures affect my proposed departure date? Check separately whether the destination embassy accepts applications from my residence category." },
    "Kuwait": { name: "Kuwait Public Authority for Manpower", url: "https://www.manpower.gov.kw/", text: "For workers living in Kuwait, the Public Authority for Manpower is an official starting point for employment questions. Review your current employment circumstances and check any residence or departure questions with the responsible authority. A Kuwait work status does not establish European work eligibility.", question: "What must I confirm about my existing employment and departure arrangements before planning a European start date? Ask the relevant authorities instead of relying on another worker's experience." },
    "Bahrain": { name: "Bahrain LMRA expatriate-employee guide", url: "https://www.lmra.gov.bh/files/cms/shared/employee-guide/lmra-expatriate-guide-english.pdf", text: "Bahrain's Labour Market Regulatory Authority publishes an expatriate-employee guide and directs workers to its Expatriate Portal. Use official information to clarify your current Bahrain employment circumstances before committing to a move abroad.", question: "Which Bahrain employment and residence steps apply to me, and what evidence of residence does the European destination request? Check both sides of the move before making commitments." }
  };
  const local = checks[market.country];
  if (!local) return "";
  return `<section class="reading-card" id="origin-checks" aria-labelledby="origin-checks-title"><h2 id="origin-checks-title">Official checks for workers in ${escapeHtml(market.country)}</h2><p>${escapeHtml(local.text)}</p><p><a href="${escapeHtml(local.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(local.name)}</a></p><h3>A question to resolve before you commit</h3><p>${escapeHtml(local.question)}</p><p class="content-note">These independent resources do not imply affiliation, licensing or endorsement of EU Pathfinder. Authorities determine which requirements apply; this is general preparation guidance.</p></section>`;
}

function renderBangladeshPlanning() {
  return `<section aria-labelledby="bangladesh-route-title" class="reading-card">
    <h2 id="bangladesh-route-title">A Bangladesh-to-Europe planning worksheet</h2>
    <p>Keep three checks separate: the Bangladesh intermediary, the overseas employer and the destination's work authorization. An RL number, an offer letter and a visa decision answer different questions. None should be used as a substitute for the others.</p>
    <h3>1. Record the agency identity before discussing payment</h3>
    <p>Ask for the registered business name and RL licence number. The <a href="https://raims.oep.gov.bd/agencies" target="_blank" rel="noopener noreferrer">official OEP RAIMS register</a> displays agency names, licence status and validity dates. Compare these details with the person or business asking you to pay. If details differ, resolve the discrepancy with the authority before proceeding. Do not infer a relationship with EU Pathfinder from an unrelated agency's licence.</p>
    <h3>2. Make a separate record for the European employer</h3>
    <p>Write down the employer's legal name, workplace, contact details, role and written offer reference. Contact the employer through a channel you find independently. Ask which authority handles the proposed work route, who files the application and which documents the employer will provide. A letter showing an agency's name alone is not enough to establish those details.</p>
    <h3>3. Check Bangladesh departure preparation independently</h3>
    <p>The <a href="https://www.oep.gov.bd/" target="_blank" rel="noopener noreferrer">Bangladesh Overseas Employment Platform</a> provides migrant, recruiting-agency and emigration-clearance services. Ask BMET which registration, clearance and pre-departure steps apply to your circumstances. If you already live abroad, explain that residence as well as your Bangladeshi nationality. Do not assume the process is identical to departing from Bangladesh.</p>
    <h3>4. Prepare a cost sheet you can compare</h3>
    <ul class="check-list"><li>List the Bangladesh intermediary, adviser and European employer separately, with the responsibility of each.</li><li>Record each proposed charge, recipient, due date and written refund condition. Keep official charges separate from commercial service fees.</li><li>Ask the destination authority whether translation, certification or other evidence is needed before buying those services.</li><li>Record who confirms the start date and what happens if a decision is delayed. Avoid non-refundable travel based only on a message.</li></ul>
    <p>For EU destinations, start with the <a href="https://immigration-portal.ec.europa.eu/index_en" target="_blank" rel="noopener noreferrer">EU Immigration Portal</a> and follow the destination's official instructions. For the UK or other non-EU destinations, use that country's own immigration authority. This worksheet is not a vacancy notice, a complete application checklist or a statement that any route is open to you.</p>
    <p>For an initial EU Pathfinder enquiry, send a short summary of your occupation, experience, nationality, current residence and preferred destination. <strong>Contact us for current pricing.</strong> Keep passport scans, bank details and verification codes out of the first message.</p>
    <nav class="regional-links" aria-label="Related preparation from Bangladesh"><a href="/services/">Understand the service scope</a><a href="/guides/europe-work-guidance-from-gulf/">If you currently live in a Gulf country</a><a href="#market-contact">Ask about your next preparation step</a></nav>
  </section>`;
}

function renderPriorityPlanning(market) {
  const nepal = market.country === "Nepal";
  if (!nepal && market.country !== "Bangladesh") return "";
  if (market.country === "Bangladesh") return renderBangladeshPlanning();
  const official = nepal
    ? '<a href="https://dofe.gov.np/pages/public-important/" target="_blank" rel="noopener noreferrer">Nepal Department of Foreign Employment notices</a>'
    : '<a href="https://www.oep.gov.bd/" target="_blank" rel="noopener noreferrer">Bangladesh Overseas Employment Platform (BMET)</a>';
  return `<section aria-labelledby="local-planning-title">
    <h2 id="local-planning-title">Plan your next steps from ${escapeHtml(market.country)}</h2>
    <p>${nepal ? "Check current Department of Foreign Employment notices about labour approval and licensed intermediaries alongside the destination country's requirements. Ask which steps apply to your own route before paying or arranging departure." : "Use Bangladesh's official Overseas Employment Platform to check its agency and migrant services and emigration-clearance information. Ask BMET which steps apply to your circumstances; a European visa process and departure clearance are separate checks."}</p>
    <p>${official}. For European Union destinations, also consult the <a href="https://immigration-portal.ec.europa.eu/index_en" target="_blank" rel="noopener noreferrer">EU Immigration Portal</a> and the destination authority. For other European countries, use their own government immigration service.</p>
    <h2>Build a useful work profile</h2>
    <ul class="check-list">
      <li>${nepal ? "For hospitality work, describe actual duties, guest-facing experience and languages; for construction, list your trade, equipment and safety training." : "For manufacturing or construction, describe production tasks, machines or tools, safety training and the dates of each role."}</li>
      <li>Include your current residence, occupation, years of experience and preferred destination. Distinguish qualifications from practical experience.</li>
      <li>Prepare a clear CV and a list of available references. Ask what evidence is needed before ordering translations, medical checks or certificates.</li>
    </ul>
    <h2>Compare the complete cost before deciding</h2>
    <p>Ask for separate amounts for adviser services, official application charges, translations, certification, travel and any accommodation deposit. Confirm who receives each payment, when it is due, what is refundable and what happens if the employer withdraws or an application is refused. EU Pathfinder rates are available on request; there is no fixed price quoted on this page.</p>
    <h2>Questions to ask about an offer</h2>
    <ul class="check-list"><li>Who is the legal employer, and can I contact it independently?</li><li>What are the work location, duties, gross pay, hours, deductions and accommodation terms?</li><li>Which authority decides the work authorization, and which application steps must I complete myself?</li><li>Which charges are due before a decision, and what do the written cancellation terms say?</li></ul>
    <p>Keep copies of written terms and receipts. An adviser message or payment receipt is not a job offer or government approval. Do not send passport scans or financial details in your first enquiry.</p>
    <a class="text-link" href="#market-contact">Discuss your ${escapeHtml(market.country)} work profile and request current fees</a>
  </section>`;
}

function renderWorkerMarketPage(market) {
  const contactMessage = `Hello EU Pathfinder, I am looking for information about legal work in Europe from ${market.country}. Please share the current destinations, requirements and fees.`;
  const contactUrl = emailLink(`Work guidance from ${market.country}`, contactMessage);
  const marketIndex = workerMarkets.findIndex(({ slug }) => slug === market.slug);
  const workerPhoto = [
    workplacePhotos.agriculture,
    workplacePhotos.logistics,
    workplacePhotos.transport,
    workplacePhotos.construction
  ][marketIndex % 4];
  const heroPhoto = `url('${escapeHtml(workplacePhotoUrl(workerPhoto, 1200))}')`;
  const audienceIntro = market.diaspora
    ? `If you are from Pakistan, India, Bangladesh, Nepal or an African country and live or work in ${market.country}, tell us about your occupation and the European destinations you are considering.`
    : `If you are applying from ${market.country}, tell us about your occupation and the European destinations you are considering.`;

  return `
    <section class="country-hero worker-hero" style="--country-a:#0b2a57;--country-b:#0c356c;--country-photo:none;--hero-photo:${heroPhoto};--hero-photo-mobile:url('${escapeHtml(workplacePhotoUrl(workerPhoto, 640))}')" aria-labelledby="worker-market-title">
      <span class="hero-photo-backdrop" aria-hidden="true"></span>
      <img class="worker-travel-art" src="/family-airport.svg" alt="Illustration of a family preparing to travel with generic, fictional travel documents." width="700" height="440" fetchpriority="high">
      <div class="wrap">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#worker-markets">For workers</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(market.country)}</span>
        </nav>
        <h1 id="worker-market-title">${escapeHtml(market.seoHeading || `European work guidance for ${market.audience}`)}</h1>
        <p class="country-intro">${market.seoHeading ? `Looking for jobs in Europe from ${escapeHtml(market.country)}?` : `Planning to work in Europe from ${escapeHtml(market.country)}?`} Explore destinations, share your work experience and contact EU Pathfinder to discuss support options and current fees.</p>
        <a class="button button-gold" href="/#destinations">Explore European destinations</a>
      </div>
    </section>

    ${renderPeoplePhotoSection([
      workplacePhotos.consultation,
      workerPhoto
    ], "Plan with care. Explore work with confidence.", workerPhoto)}

    <section class="section photo-backed-section" ${sectionPhotoStyle(workerPhoto)} aria-label="European work guidance for applicants in ${escapeHtml(market.country)}">
      <div class="wrap country-content">
        <div class="country-main">
          <h2>Explore Europe work options from ${escapeHtml(market.country)}</h2>
          ${market.country !== "Malaysia" ? `<nav class="regional-links" aria-label="On this preparation page"><a href="#origin-checks">Official checks in ${escapeHtml(market.country)}</a>${market.country === "Bangladesh" ? '<a href="#bangladesh-route-title">Bangladesh planning worksheet</a>' : ""}<a href="#market-contact">Discuss your preparation</a></nav>` : ""}
          <p>${audienceIntro} We welcome enquiries from labourers and workers with experience in construction, logistics, transport, agriculture, hospitality, cleaning, manufacturing and other fields. We can discuss your profile, support options and current fees; this is not a job offer or a promise of a vacancy.</p>
          <p>Work-permit rules are set by each destination country. The available route depends on the role, employer, your experience and the rules in force when you apply. Review our destination guides and contact EU Pathfinder to discuss your next steps.</p>
          ${market.seoRoles ? `
          <h2>European job areas to discuss from ${escapeHtml(market.country)}</h2>
          <p>Workers looking for jobs in Europe from ${escapeHtml(market.country)} can tell us about relevant experience in areas such as:</p>
          <ul class="sector-tags">${market.seoRoles.map((role) => `<li>${escapeHtml(role)}</li>`).join("")}</ul>
          <p class="content-note">These are examples of work experience to discuss, not advertised vacancies. Roles, employer requirements and work authorization depend on the specific destination and current circumstances.</p>
          ` : ""}
          <ul class="check-list">
            <li>Compare destinations and the sectors described in each country guide.</li>
            <li>Check that an opportunity names a verifiable employer and a specific role.</li>
            <li>Ask for the full service fees and written terms before agreeing or paying.</li>
            <li>Contact EU Pathfinder to discuss your work background and the support options available.</li>
          </ul>

          <nav class="regional-links" aria-label="Related regional guides"><a href="/guides/europe-work-guidance-from-africa/">African applicant planning guide</a><a href="/guides/europe-work-guidance-from-gulf/">Gulf resident planning guide</a></nav>
          <h2>Applying from ${escapeHtml(market.country)}</h2>
          <p>Your nationality and your current country of residence can both matter. If you live in a different country from the one that issued your passport, check with the destination country's embassy or official visa service where you are allowed to submit an application. Do this before making travel plans or paying anyone.</p>
          <p>${escapeHtml(market.planningNote)}</p>
          ${market.seoHeading ? `
          <h2>How to enquire about jobs in Europe from ${escapeHtml(market.country)}</h2>
          <p>To help us understand your enquiry, include your nationality, where you currently live, your occupation and work experience, the type of role you are seeking, and any European destinations you have in mind. Do not send passport scans, bank details or other sensitive documents in an initial enquiry.</p>
          <a class="text-link" href="#market-contact">Contact EU Pathfinder about work from ${escapeHtml(market.country)} <span aria-hidden="true">↗</span></a>
          ` : ""}

          ${renderOriginChecks(market)}
          ${renderPriorityPlanning(market)}
          <h2>How EU Pathfinder can help you plan</h2>
          <p>We can discuss your work history and goals, review the documents you provide, and explain the support options and fees before you decide whether to proceed. The steps below are a general overview; the process differs by country and case.</p>
          ${renderProcessSteps(true)}

          <h2>Check an opportunity before you commit</h2>
          <p>A genuine recruitment process should identify the employer, role, pay, location and written terms. Verify these details independently and be cautious of anyone promising a guaranteed job, visa or work permit.</p>

          <h2>Documents to prepare for an initial discussion</h2>
          <p>These are useful starting documents, not a country-specific visa checklist. An employer or authority may request different items.</p>
          <ul class="check-list">${documents.map((document) => `<li>${escapeHtml(document)}</li>`).join("")}</ul>

          <h2>Frequently asked questions</h2>
          ${market.seoFaq ? `
          <details class="faq-item">
            <summary>${escapeHtml(market.seoFaq)}</summary>
            <div class="faq-answer"><p>Possible roles depend on your skills and experience, the employer and the destination's current rules. Contact EU Pathfinder to discuss your background and the destinations you are considering. This page does not advertise a vacancy or guarantee a job offer.</p></div>
          </details>
          ` : ""}
          <details class="faq-item">
            <summary>Can I apply for European work from ${escapeHtml(market.country)}?</summary>
            <div class="faq-answer"><p>That depends on the destination, role, employer and current immigration rules. Review the country guide and verify the official requirements for your situation before making a decision.</p></div>
          </details>
          <details class="faq-item">
            <summary>Can EU Pathfinder guarantee a job, visa or work permit?</summary>
            <div class="faq-answer"><p>No. Employers make hiring decisions, and work-permit and visa decisions belong to the relevant authorities. Be cautious of anyone promising guaranteed approval.</p></div>
          </details>
          <details class="faq-item">
            <summary>How can I check the fees before I start?</summary>
            <div class="faq-answer"><p>Ask us for the current service scope, full fee breakdown and written terms before agreeing to any service.</p></div>
          </details>
        </div>
        <aside class="country-sidebar">
          <div class="side-card">
            <h2>Ask about working in Europe from ${escapeHtml(market.country)}</h2>
            <p>Tell us your experience and the destinations you are considering. We will explain what can be discussed and share current fees before you decide.</p>
              <a class="button button-gold" href="${contactUrl}">Email our team</a>
            <p class="side-email"><a href="mailto:${contactEmail}">${contactEmail}</a></p>
            ${renderBankDetails(true)}
          </div>
        </aside>
      </div>
    </section>

    ${renderGuideCards()}
    ${renderContactSection({
      title: `Start a conversation from ${market.country}`,
      description: "Share your nationality, where you currently live, work experience and the kind of role you are exploring. We can discuss support options and current fees. No job, permit or visa outcome is guaranteed.",
      id: "market-contact"
    })}

    <section class="section other-destinations photo-backed-section" ${sectionPhotoStyle(workerPhoto)} aria-labelledby="market-destinations-title">
      <div class="wrap">
        <h2 id="market-destinations-title">Explore European work destinations</h2>
        <p>Read the country guides for typical sectors, general work-route information and documents to discuss.</p>
        <div class="destination-pills">${renderDestinationPills("")}</div>
      </div>
    </section>`;
}

function renderNotFound() {
  return `
    <section class="not-found wrap photo-backed-section" ${sectionPhotoStyle(workplacePhotos.consultation)}>
      <h1>We couldn't find that destination.</h1>
      <p>Choose from our 35 destination guides to explore typical sectors, documents and next steps.</p>
      <a class="button button-gold" href="/#destinations">Browse destinations</a>
    </section>`;
}

function updatePageMetadata(country, market, guide, publication) {
  const title = publication
    ? `${publication.title} | EU Pathfinder`
    : guide
      ? `${guide.title} | EU Pathfinder`
    : market
      ? market.seoTitle
      : country
        ? `Jobs and Work Permits in ${country.name} | EU Pathfinder`
        : "Europe Work Guidance: South Asia, Africa & Gulf | EU Pathfinder";
  const description = publication
    ? publication.description
    : guide
      ? guide.description
    : market
      ? market.seoDescription
      : country
        ? `${country.intro} Explore work routes, common hiring sectors, documents and support for ${country.name}.`
        : "Europe work guidance for Pakistan, India, Nepal, Bangladesh and African applicants, plus workers in Saudi Arabia, UAE, Qatar, Oman, Kuwait and Bahrain.";
  const canonicalPath = publication
    ? publication.slug
    : guide
      ? `guides/${guide.slug}`
    : market
      ? market.slug
      : country?.slug;

  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute("content", description);
  document.querySelector('link[rel="canonical"]').setAttribute(
    "href",
    `https://eupathfinder.agency${canonicalPath ? `/${canonicalPath}/` : "/"}`
  );
}

function setupHomeInteractions() {
  const search = document.querySelector("#country-search");
  const cards = [...document.querySelectorAll(".destination-card")];
  const count = document.querySelector("#results-count");
  const clearFilters = document.querySelector("#clear-destination-filters");
  const empty = document.querySelector("#empty-results");
  const filters = [...document.querySelectorAll(".filter-button")];
  const chips = [...document.querySelectorAll(".hero-chip")];
  const featured = document.querySelector("#featured-destination");
  let activeRegion = "All";

  const filterCountries = () => {
    const term = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const matchesRegion = activeRegion === "All" || card.dataset.region === activeRegion;
      const matchesTerm = !term || (term.length <= 2 ? card.dataset.search.split(/\s+/).includes(term) : card.dataset.search.includes(term));
      const isVisible = matchesRegion && matchesTerm;
      card.hidden = !isVisible;
      if (isVisible) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? "destination" : "destinations"}`;
    empty.hidden = visible !== 0;
    clearFilters.hidden = activeRegion === "All" && !term;
  };

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      activeRegion = filter.dataset.filter;
      filters.forEach((item) => item.setAttribute("aria-pressed", String(item === filter)));
      filterCountries();
    });
  });
  search.addEventListener("input", filterCountries);
  clearFilters.addEventListener("click", () => {
    search.value = "";
    activeRegion = "All";
    filters.forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.filter === "All")));
    filterCountries();
    search.focus();
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const country = countries.find((item) => item.slug === chip.dataset.feature);
      if (!country) return;
      chips.forEach((item) => item.setAttribute("aria-pressed", String(item === chip)));
      document.querySelector("#featured-flag").src = getFlag(country);
      document.querySelector("#featured-name").textContent = country.name;
      document.querySelector("#featured-landmark").textContent = country.landmark;
      featured.href = `/${country.slug}/`;
      featured.style.setProperty("--country-a", country.colors[0]);
      featured.style.setProperty("--country-b", country.colors[1]);
    });
  });

  filterCountries();
}

function setupEnquiryForms() {
  document.querySelectorAll("[data-enquiry-form]").forEach((form) => {
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      button.disabled = true;
      form.setAttribute("aria-busy", "true");
      status.hidden = false;
      status.dataset.state = "pending";
      status.textContent = "Sending your enquiry…";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Your enquiry could not be sent. Please try again or email us directly.");
        }
        form.reset();
        window.euAnalytics?.recordEnquirySuccess();
        status.dataset.state = "success";
        status.textContent = "Thanks — your enquiry has been sent. The team will reply using the contact details you provided.";
      } catch (error) {
        status.dataset.state = "error";
        status.textContent = error instanceof Error
          ? error.message
          : "We couldn't send your enquiry. Please try again or email info@eupathfinder.agency.";
      } finally {
        button.disabled = false;
        form.removeAttribute("aria-busy");
      }
    });
  });
}

function getAssistantReply(question) {
  const text = question.trim().toLocaleLowerCase();
  const matches = (pattern) => pattern.test(text);
  const answer = (message, link) => ({ message, link });
  const faqAnswer = (title) => faqs.find(([question]) => question === title)[1];


  if (matches(/\b(price|pricing|fee|fees|cost|costs|payment|pay)\b/)) {
    return answer(faqAnswer("How much do your services cost?"));
  }
  if (matches(/\b(guarantee|guaranteed|approval|approved)\b/)) {
    return answer(faqAnswer("Can you guarantee a job, visa or work permit?"));
  }
  if (matches(/\b(which countries|what countries|destinations|countries do you|countries can you)\b/)) {
    return answer(faqAnswer("Which destinations are covered?"), { href: "/#destinations", label: "Browse destinations" });
  }
  if (matches(/\b(whatsapp|phone|telephone|call|contact|human|adviser|advisor)\b/)) {
    return answer(
      `WhatsApp us on ${whatsappNumber}, or call or WhatsApp ${callNumber}. Email ${contactEmail}; CEO enquiries can be sent to ${ceoEmail}.`,
      { href: whatsappLink(), label: "Chat with our team on WhatsApp" }
    );
  }
  if (matches(/\b(get started|start|begin|apply|application process)\b/)) {
    return answer(faqAnswer("How do I get started?"), { href: whatsappLink(), label: "Chat with our team on WhatsApp" });
  }
  if (matches(/\b(full cost|full costs|before i commit|before committing|hidden cost|hidden fee)\b/)) {
    return answer(faqAnswer("How much do your services cost?"));
  }
  if (matches(/\b(document|documents|paperwork|checklist)\b/)) {
    return answer(
      `Commonly requested documents include: ${documents.join(", ")}. Exact requirements vary by destination, role and embassy; an adviser can prepare a personal checklist after reviewing your case.`
    );
  }
  if (matches(/\b(service|services|help with|support|offer)\b/)) {
    return answer(
      `Our support can include ${services.map(([title]) => title.toLocaleLowerCase()).join(", ")}. Availability is confirmed case by case. Contact an adviser to discuss what applies to you.`
    );
  }

  const country = countries.find((item) => {
    const aliases = item.slug === "uk" ? ["uk", "britain", "united kingdom"] : [item.name.toLocaleLowerCase()];
    return aliases.some((alias) => new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text));
  });
  if (country) {
    return answer(
      `${country.intro} The guide lists typical sectors such as ${country.sectors.join(", ")}. Current openings and eligibility are confirmed case by case; this guide is general information, not a visa decision.`,
      { href: `/${country.slug}/`, label: `Read the ${country.name} guide` }
    );
  }

  if (matches(/\b(visa|work permit|work route|immigration|eligibility)\b/)) {
    return answer(
      `Work routes depend on the destination's current rules. Common routes may include employer-sponsored permits, seasonal or temporary work where available, and skilled-worker routes where they exist. Check the destination's official guidance; an adviser can discuss your situation.`
    );
  }

  return answer(
    "I can answer questions about destinations, common documents, services and getting started using information on this website. I don't have enough information to answer that confidently, so please ask an adviser for a case-specific reply."
  );
}

function setupWebsiteAssistant() {
  if (!document.body || typeof document.createElement !== "function") return;
  const originalLauncher = document.querySelector(".floating-chat");
  if (!originalLauncher) return;

  const launcher = document.createElement("button");
  launcher.className = "floating-chat assistant-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Ask EU Pathfinder assistant");
  launcher.setAttribute("aria-expanded", "false");
  launcher.setAttribute("aria-controls", "website-assistant-panel");
  launcher.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4.75A2.75 2.75 0 0 1 6.75 2h10.5A2.75 2.75 0 0 1 20 4.75v8.5A2.75 2.75 0 0 1 17.25 16H11l-4.8 4.1c-.6.5-1.5.08-1.5-.7V16.2A2.75 2.75 0 0 1 4 13.25v-8.5Zm4 2.5a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Zm0 4a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H8Z"></path></svg>
    <span>Ask our assistant</span>`;

  const panel = document.createElement("section");
  panel.id = "website-assistant-panel";
  panel.className = "assistant-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "assistant-title");
  panel.hidden = true;
  panel.innerHTML = `
    <header class="assistant-header">
      <div>
        <h2 id="assistant-title">EU Pathfinder assistant</h2>
        <p>Quick answers from our website</p>
      </div>
      <button class="assistant-close" type="button" aria-label="Close assistant">×</button>
    </header>
    <div class="assistant-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
    <div class="assistant-quick-prompts" role="group" aria-label="Suggested questions">
      <button type="button" data-assistant-question="How much do your services cost?">Fees</button>
      <button type="button" data-assistant-question="Can you guarantee a visa or work permit?">Visa guarantees</button>
      <button type="button" data-assistant-question="Which countries can you help with?">Destinations</button>
    </div>
    <form class="assistant-form">
      <label class="sr-only" for="assistant-question">Ask a question</label>
      <input id="assistant-question" name="question" type="text" maxlength="400" autocomplete="off" placeholder="Type your question" required>
      <button class="assistant-send" type="submit">Send</button>
    </form>
    <p class="assistant-note">Answers use this website's information, not legal or visa advice. Please don't enter passport or payment details.</p>
    <a class="assistant-contact" href="${emailLink("Ask EU Pathfinder a question")}">Email our team</a>`;

  document.body.append(launcher);
  document.body.append(panel);

  const hero = document.querySelector(".home-hero");
  if (hero && typeof IntersectionObserver === "function") {
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (panel.hidden) launcher.hidden = entry.isIntersecting;
    });
    heroObserver.observe(hero);
  }

  const messages = panel.querySelector(".assistant-messages");
  const input = panel.querySelector("#assistant-question");
  const addMessage = (message, sender, link) => {
    const item = document.createElement("div");
    item.className = `assistant-message assistant-message-${sender}`;
    const text = document.createElement("p");
    text.textContent = message;
    item.append(text);
    if (link) {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (link.href.startsWith("https://")) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }
      item.append(anchor);
    }
    messages.append(item);
    messages.scrollTop = messages.scrollHeight;
  };
  const submitQuestion = (question) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    addMessage(cleanQuestion, "user");
    const reply = getAssistantReply(cleanQuestion);
    addMessage(reply.message, "bot", reply.link);
  };
  const closePanel = () => {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  };

  addMessage("Hello! Ask me about destinations, documents, services or how to get started. For individual advice, email our team at info@eupathfinder.agency.", "bot");
  launcher.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    launcher.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) input.focus();
  });
  panel.querySelector(".assistant-close").addEventListener("click", closePanel);
  panel.querySelector(".assistant-form").addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuestion(input.value);
    input.value = "";
    input.focus();
  });
  panel.querySelectorAll("[data-assistant-question]").forEach((button) => {
    button.addEventListener("click", () => submitQuestion(button.dataset.assistantQuestion));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) closePanel();
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();

function decodePath(value) { try { return decodeURIComponent(value); } catch { return value; } }
const pathname = decodePath(window.location.pathname)
  .replace(/(?:^|\/)index\.html$/i, "")
  .replace(/^\/+|\/+$/g, "");
const path = window.location.protocol === "file:"
  ? ""
  : pathname.split("/").pop();
const currentCountry = countries.find((country) => country.slug === pathname);
const currentWorkerMarket = workerMarkets.find((market) => market.slug === pathname);
const currentGuide = guides.find((guide) => `guides/${guide.slug}` === pathname);
const currentPublication = publicationPages.find(page => page.slug === pathname);
const main = document.querySelector("#main");

if (!main.dataset.prerendered) {
  if (!path) {
    main.innerHTML = renderHome();
  } else if (pathname === "privacy") {
    main.innerHTML = renderPrivacyPage();
  } else if (currentPublication) {
    main.innerHTML = renderEditorialPublication(currentPublication);
  } else if (currentCountry) {
    main.innerHTML = renderCountryPage(currentCountry);
  } else if (currentWorkerMarket) {
    main.innerHTML = renderWorkerMarketPage(currentWorkerMarket);
  } else if (currentGuide) {
    main.innerHTML = renderGuidePage(currentGuide);
  } else {
    main.innerHTML = renderNotFound();
  }
}

if (!main.dataset.prerendered) main.innerHTML = renderPageAtmosphere(main.innerHTML);

if (!path) {
  updatePageMetadata(null);
  setupHomeInteractions();
} else if (pathname === "privacy") {
  updatePageMetadata(null, null, null, privacyPage);
} else if (currentPublication) {
  updatePageMetadata(null, null, null, currentPublication);
} else if (currentCountry) {
  updatePageMetadata(currentCountry);
} else if (currentWorkerMarket) {
  updatePageMetadata(null, currentWorkerMarket);
} else if (currentGuide) {
  updatePageMetadata(null, null, currentGuide);
} else {
  updatePageMetadata(null);
}

setupWebsiteAssistant();
setupEnquiryForms();
setupInsightFilters();
document.querySelectorAll(fallbackImageSelector).forEach((image) => {
  if (image.complete && image.naturalWidth === 0) image.hidden = true;
});

function renderPrivacyPage() { return renderPolicyPage("privacy"); }
