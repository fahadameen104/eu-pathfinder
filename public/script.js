const contactEmail = "info@eupathfinder.agency";
const whatsappNumber = "14696268272";

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
  { slug: "europe-jobs-from-pakistan", country: "Pakistan", audience: "Pakistani workers", titleAudience: "Pakistani Workers", planningNote: "If you are applying from Pakistan, first match your skills and work history to a real role in a named European destination. Check the destination's official immigration and embassy guidance for the current process before paying an intermediary." },
  { slug: "europe-jobs-from-india", country: "India", audience: "Indian workers", titleAudience: "Indian Workers", planningNote: "If you live in India, distinguish the employer's recruitment process from the destination country's work-permit and visa process. Verify the named employer, role and application instructions independently." },
  { slug: "europe-jobs-from-bangladesh", country: "Bangladesh", audience: "Bangladeshi workers", titleAudience: "Bangladeshi Workers", planningNote: "For applicants in Bangladesh, keep copies of your passport, CV and experience records ready for an initial discussion. A document checklist is only a starting point; the destination authority sets the actual requirements." },
  { slug: "europe-jobs-from-malaysia", country: "Malaysia", audience: "workers applying from Malaysia", titleAudience: "Workers Applying from Malaysia", planningNote: "If you are a Malaysian citizen or live in Malaysia as a foreign national, your passport nationality and current legal residence may affect where you can submit a visa application. Confirm the rules with the destination's official authority." },
  { slug: "europe-jobs-from-nepal", country: "Nepal", audience: "Nepali workers", titleAudience: "Nepali Workers", planningNote: "Applicants in Nepal should evaluate each vacancy against their actual qualifications and experience. Confirm that the employer and role are genuine, and check current work-visa instructions through official sources." },
  { slug: "europe-jobs-from-saudi-arabia", country: "Saudi Arabia", audience: "South Asian workers living in Saudi Arabia", titleAudience: "Workers in Saudi Arabia", planningNote: "If you are a South Asian national living in Saudi Arabia, check both your current residence status and the European destination's rules on where non-citizens may apply. Residence in Saudi Arabia does not itself grant permission to work in Europe." },
  { slug: "europe-jobs-from-uae", country: "the UAE", audience: "South Asian workers living in the UAE", titleAudience: "Workers in the UAE", planningNote: "If you are a South Asian national living in the UAE, verify whether the European destination accepts applications from residents with your nationality and status. A UAE residence permit is not a European work permit." },
  { slug: "europe-jobs-from-oman", country: "Oman", audience: "South Asian workers living in Oman", titleAudience: "Workers in Oman", planningNote: "If you are a South Asian national based in Oman, confirm where you are eligible to submit the destination country's visa application and which residence documents are required. Check with the official embassy or visa authority." },
  { slug: "europe-jobs-from-qatar", country: "Qatar", audience: "South Asian workers living in Qatar", titleAudience: "Workers in Qatar", planningNote: "If you are a South Asian national living in Qatar, check whether the European destination processes applications from residents in Qatar and what proof of residence it requires. Procedures can differ between destinations." },
  { slug: "europe-jobs-from-kuwait", country: "Kuwait", audience: "South Asian workers living in Kuwait", titleAudience: "Workers in Kuwait", planningNote: "If you are a South Asian national resident in Kuwait, verify the destination's rules for applying from Kuwait before making travel or appointment plans. Your nationality and valid local residence status may both matter." },
  { slug: "europe-jobs-from-bahrain", country: "Bahrain", audience: "South Asian workers living in Bahrain", titleAudience: "Workers in Bahrain", planningNote: "If you are a South Asian national living in Bahrain, check the destination country's official process for applicants residing there, including any residence-validity requirements, before paying fees or booking travel." }
];

const countryPhotos = {
  poland: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Wawel_%284%29.jpg/1280px-Wawel_%284%29.jpg",
  uk: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Elizabeth_Tower_and_the_north_front_of_the_Palace_of_Westminster%2C_London.jpg/1280px-Elizabeth_Tower_and_the_north_front_of_the_Palace_of_Westminster%2C_London.jpg",
  germany: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/1280px-Brandenburger_Tor_abends.jpg",
  austria: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Wien_-_Schloss_Sch%C3%B6nbrunn.JPG/1280px-Wien_-_Schloss_Sch%C3%B6nbrunn.JPG",
  croatia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Dubrovnik_s_24.jpg/1280px-Dubrovnik_s_24.jpg",
  slovakia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Bratislava_-_Burg_%28b%29.JPG/1280px-Bratislava_-_Burg_%28b%29.JPG",
  portugal: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Torre_Bel%C3%A9m_April_2009-4a.jpg/1280px-Torre_Bel%C3%A9m_April_2009-4a.jpg",
  norway: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Geirangerfjord_.jpg/1280px-Geirangerfjord_.jpg",
  switzerland: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Matterhorn_from_Domh%C3%BCtte_-_2.jpg/1280px-Matterhorn_from_Domh%C3%BCtte_-_2.jpg",
  belgium: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Grand-Place%2C_Brussels_-_panorama%2C_June_2018.jpg/1280px-Grand-Place%2C_Brussels_-_panorama%2C_June_2018.jpg",
  bulgaria: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Rila_Monastery%2C_August_2013.jpg/1280px-Rila_Monastery%2C_August_2013.jpg",
  cyprus: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Roca_de_Afrodita%2C_Chipre%2C_2021-12-10%2C_DD_65.jpg/1280px-Roca_de_Afrodita%2C_Chipre%2C_2021-12-10%2C_DD_65.jpg",
  czechia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Prague_07-2016_view_from_Lesser_Town_Tower_of_Charles_Bridge_img3.jpg/1280px-Prague_07-2016_view_from_Lesser_Town_Tower_of_Charles_Bridge_img3.jpg",
  denmark: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/The_Nyhavn_Canal_3.jpg/1280px-The_Nyhavn_Canal_3.jpg",
  estonia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Old_Town_of_Tallinn%2C_Tallinn%2C_Estonia_-_panoramio_%2858%29.jpg/1280px-Old_Town_of_Tallinn%2C_Tallinn%2C_Estonia_-_panoramio_%2858%29.jpg",
  finland: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Kirkko3.png/1280px-Kirkko3.png",
  france: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1280px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
  serbia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/P037152-661920_-_Belgrade_fortress_stand_at_the_downtown_of_Belgrade.jpg/1280px-P037152-661920_-_Belgrade_fortress_stand_at_the_downtown_of_Belgrade.jpg",
  ukraine: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/80-391-0151_Kyiv_St.Sophia%27s_Cathedral_RB_18_2_%28cropped%29.jpg/1280px-80-391-0151_Kyiv_St.Sophia%27s_Cathedral_RB_18_2_%28cropped%29.jpg",
  greece: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg/1280px-1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg",
  ireland: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Cliffs-Of-Moher-OBriens-From-South.JPG/1280px-Cliffs-Of-Moher-OBriens-From-South.JPG",
  romania: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/01_Chateau_Peles.jpg/1280px-01_Chateau_Peles.jpg",
  lithuania: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Traku_pilis_by_Augustas_Didzgalvis.jpg/1280px-Traku_pilis_by_Augustas_Didzgalvis.jpg",
  netherlands: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/KinderdijkMolens02.jpg/1280px-KinderdijkMolens02.jpg",
  slovenia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Lake_Bled_from_the_Mountain.jpg/1280px-Lake_Bled_from_the_Mountain.jpg",
  spain: "https://upload.wikimedia.org/wikipedia/commons/e/ef/SF_maig_2_cropped.jpg",
  russia: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Saint_Basil%27s_Cathedral_in_Moscow.jpg/1280px-Saint_Basil%27s_Cathedral_in_Moscow.jpg",
  malta: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Prelucrare_3D_pentru_La_Valletta_Harbour.jpg/1280px-Prelucrare_3D_pentru_La_Valletta_Harbour.jpg",
  belarus: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/%D0%9A%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81_%D0%9C%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B7%D0%B0%D0%BC%D0%BA%D0%B0.JPG/1280px-%D0%9A%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81_%D0%9C%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B7%D0%B0%D0%BC%D0%BA%D0%B0.JPG",
  hungary: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Hungarian_Parliament_Building_from_across_the_Danube%2C_2025-01-11.jpg/1280px-Hungarian_Parliament_Building_from_across_the_Danube%2C_2025-01-11.jpg",
  italy: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg"
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
  ["How much do your services cost?", "Fees depend on the destination, the type of role and the support you need. Please contact us on WhatsApp and an adviser will share current information with you directly."],
  ["Can you guarantee a visa or work permit?", "No one can. Visa and permit decisions are made by the relevant authorities. We prepare your case carefully and guide you through every step."],
  ["Which countries can you help with?", "We currently support 35 destinations across Europe. Open any country page to see typical sectors, documents and the process."],
  ["How do I get started?", "Choose a destination and send us a message on WhatsApp. We will ask a few questions about your experience and arrange the next steps."],
  ["Will I know the full costs before I commit?", "Yes. We explain every stage and any costs outside our service before you agree to anything."]
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

const whatsAppLink = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const generalWhatsAppMessage =
  "Hello EU Pathfinder, I would like to know more about your services and current fees.";

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
      href="/${country.slug}"
      data-region="${escapeHtml(country.region)}"
      data-search="${escapeHtml(`${country.name} ${country.region} ${country.landmark}`.toLowerCase())}"
      style="--country-a:${country.colors[0]};--country-b:${country.colors[1]}"
    >
      <span class="destination-art" aria-hidden="true">
        ${countryPhotos[country.slug] ? `<img class="destination-photo" src="${countryPhotos[country.slug]}" alt="" loading="lazy" decoding="async">` : ""}
        <img src="${getFlag(country, 160)}" alt="" width="80" height="60" loading="lazy" decoding="async">
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

function renderHome() {
  const featured = countries[0];
  return `
    <section class="home-hero" aria-labelledby="home-title">
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <h1 id="home-title">Your path to legal work in Europe,<span>planned with you</span></h1>
          <p class="hero-intro">Job opportunities, work-permit guidance and relocation support across 35 destinations, with an adviser beside you from first message to arrival.</p>
          <div class="hero-actions">
            <a class="button button-gold" href="/#destinations">Explore destinations</a>
            <a class="button hero-secondary" href="${whatsAppLink(generalWhatsAppMessage)}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5a12 12 0 0 0-10.3 18.2L4 28l6.5-1.7A12 12 0 1 0 16 3.5Zm0 21.8a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.8 1 1-3.7-.3-.4A9.7 9.7 0 1 1 16 25.3Zm5.3-7.3c-.3-.2-1.7-.9-2-.9s-.5-.2-.7.2c-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.2-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z"></path></svg>
              Contact us on WhatsApp
            </a>
          </div>
          <a
            class="featured-place"
            id="featured-destination"
            href="/${featured.slug}"
            style="--country-a:${featured.colors[0]};--country-b:${featured.colors[1]}"
          >
            <span class="featured-flag"><img id="featured-flag" src="${getFlag(featured, 80)}" alt="" width="36" height="27"></span>
            <span class="featured-copy"><strong id="featured-name">${escapeHtml(featured.name)}</strong><span id="featured-landmark">${escapeHtml(featured.landmark)}</span></span>
            <span class="featured-arrow" aria-hidden="true">↗</span>
          </a>
          <div class="hero-chips" aria-label="Select a destination to preview">
            ${countries.map((country) => renderCountryChip(country, country.slug === featured.slug)).join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="proof-strip" aria-label="How EU Pathfinder supports you">
      <div class="proof-item"><span class="proof-icon" aria-hidden="true">✓</span><div><strong>Employer and document review</strong><p>Opportunities and paperwork are reviewed carefully as part of our support.</p></div></div>
      <div class="proof-item"><span class="proof-icon" aria-hidden="true">↗</span><div><strong>A clear, step-by-step process</strong><p>You always know what happens next, from first review through arrival.</p></div></div>
      <div class="proof-item"><span class="proof-icon" aria-hidden="true">↗</span><div><strong>Direct WhatsApp support</strong><p>Message an adviser any time with questions about your application.</p></div></div>
    </section>

    <section class="section destinations-section" id="destinations" aria-labelledby="destinations-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="destinations-title">Choose your destination</h2><p class="section-lead">Open any country to see typical sectors, commonly requested documents and how our process works there.</p></div>
        </div>
        <div class="destination-controls">
          <div class="region-filters" role="group" aria-label="Filter countries by region">
            <button class="filter-button" type="button" data-filter="All" aria-pressed="true">All</button>
            <button class="filter-button" type="button" data-filter="Western" aria-pressed="false">Western</button>
            <button class="filter-button" type="button" data-filter="Northern" aria-pressed="false">Northern</button>
            <button class="filter-button" type="button" data-filter="Southern" aria-pressed="false">Southern</button>
            <button class="filter-button" type="button" data-filter="Central & Eastern" aria-pressed="false">Central &amp; Eastern</button>
          </div>
          <label class="destination-search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>
            <span class="sr-only">Search countries</span>
            <input id="country-search" type="search" placeholder="Search countries" autocomplete="off">
          </label>
        </div>
        <p class="results-count" id="results-count" aria-live="polite"></p>
        <div class="destination-grid" id="destination-grid">
          ${countries.map(renderDestinationCard).join("")}
        </div>
        <p class="empty-results" id="empty-results" hidden>No destinations match that search. Try another country or region.</p>
      </div>
    </section>

    <section class="section other-destinations" id="worker-markets" aria-labelledby="worker-markets-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="worker-markets-title">Planning to work in Europe from Asia or the Gulf?</h2><p class="section-lead">Start with guidance for applicants in your country or current place of residence, then compare European destinations and their requirements.</p></div>
        </div>
        <div class="destination-pills">
          ${workerMarkets.map((market) => `<a class="destination-pill" href="/${market.slug}"><span>Europe work guidance: ${escapeHtml(market.country)}</span></a>`).join("")}
        </div>
      </div>
    </section>

    <section class="section process-section" id="how" aria-labelledby="process-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="process-title">A clear path from first message to arrival</h2><p class="section-lead">Seven stages, each explained before you begin.</p></div>
        </div>
        ${renderProcessSteps()}
      </div>
    </section>

    <section class="section services-section" id="services" aria-labelledby="services-title">
      <div class="wrap">
        <div class="section-heading">
          <div><h2 id="services-title">Support beyond the core process</h2><p class="section-lead">Add the help you need, when you need it.</p></div>
        </div>
        <div class="services-grid">
          ${services.map(([title, detail]) => `<article class="service-item"><span class="service-symbol" aria-hidden="true">+</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(detail)}</p></div></article>`).join("")}
        </div>
      </div>
    </section>

    <section class="pricing-section" aria-labelledby="pricing-title">
      <div class="wrap pricing-layout">
        <div><h2 id="pricing-title">Fees and pricing</h2><p>Our fees vary by destination, role and the level of support you need. For current rates and a clear breakdown, contact us on WhatsApp and an adviser will share the details with you directly.</p></div>
        <a class="button button-gold" href="${whatsAppLink("Hello EU Pathfinder, I would like to know about current fees and pricing.")}" target="_blank" rel="noopener noreferrer">Ask about pricing <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <section class="section faq-section" id="faq" aria-labelledby="faq-title">
      <div class="wrap">
        <div class="section-heading"><div><h2 id="faq-title">Questions before you start</h2></div></div>
        ${renderFaqs()}
      </div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title">
      <div class="wrap contact-layout">
        <div><h2 id="contact-title">Speak with the EU Pathfinder team</h2><p>Choose a destination, then send us a message. We will reply with your next steps.</p></div>
        <div class="contact-actions">
          <a class="button button-whatsapp" href="${whatsAppLink(generalWhatsAppMessage)}" target="_blank" rel="noopener noreferrer">WhatsApp · +1 469 626 8272</a>
          <a class="contact-email" href="mailto:${contactEmail}">${contactEmail}</a>
        </div>
      </div>
    </section>`;
}

function renderDestinationPills(currentSlug) {
  return countries
    .filter((country) => country.slug !== currentSlug)
    .map((country) => `
      <a class="destination-pill" href="/${country.slug}">
        <img class="flag" src="${getFlag(country, 40)}" alt="" width="27" height="20" loading="lazy">
        <span>${escapeHtml(country.name)}</span>
      </a>`)
    .join("");
}

function renderCountryPage(country) {
  const contactMessage = `Hello EU Pathfinder, I would like information about working in ${country.name}, including current fees.`;
  const contactUrl = whatsAppLink(contactMessage);
  const countryPhoto = countryPhotos[country.slug]
    ? `url("${countryPhotos[country.slug]}")`
    : "none";

  return `
    <section class="country-hero" style="--country-a:${country.colors[0]};--country-b:${country.colors[1]};--country-photo:${countryPhoto}" aria-labelledby="country-title">
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
        <a class="button button-whatsapp" href="${contactUrl}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5a12 12 0 0 0-10.3 18.2L4 28l6.5-1.7A12 12 0 1 0 16 3.5Zm0 21.8a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.8 1 1-3.7-.3-.4A9.7 9.7 0 1 1 16 25.3Zm5.3-7.3c-.3-.2-1.7-.9-2-.9s-.5-.2-.7.2c-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.2-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z"></path></svg>
          Contact us about ${escapeHtml(country.name)}
        </a>
      </div>
    </section>

    <section class="section" aria-label="Work and relocation information for ${escapeHtml(country.name)}">
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
            <p>For current rates and a clear breakdown, contact us on WhatsApp. An adviser will share the details with you directly.</p>
            <a class="button button-whatsapp" href="${contactUrl}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5a12 12 0 0 0-10.3 18.2L4 28l6.5-1.7A12 12 0 1 0 16 3.5Zm0 21.8a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.8 1 1-3.7-.3-.4A9.7 9.7 0 1 1 16 25.3Zm5.3-7.3c-.3-.2-1.7-.9-2-.9s-.5-.2-.7.2c-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.2-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z"></path></svg>
              Message us on WhatsApp
            </a>
            <p class="side-phone">+1 469 626 8272</p>
          </div>
        </aside>
      </div>
    </section>

    <section class="section other-destinations">
      <div class="wrap">
        <h2>Other destinations</h2>
        <p>Explore another destination to see its typical sectors, commonly requested documents and process information.</p>
        <div class="destination-pills">${renderDestinationPills(country.slug)}</div>
      </div>
    </section>`;
}

function renderWorkerMarketPage(market) {
  const contactMessage = `Hello EU Pathfinder, I am looking for information about legal work in Europe from ${market.country}. Please share the current destinations, requirements and fees.`;
  const contactUrl = whatsAppLink(contactMessage);

  return `
    <section class="country-hero worker-hero" style="--country-a:#0b2a57;--country-b:#0c356c;--country-photo:none" aria-labelledby="worker-market-title">
      <div class="wrap">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#worker-markets">For workers</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(market.country)}</span>
        </nav>
        <h1 id="worker-market-title">European work guidance for ${escapeHtml(market.audience)}</h1>
        <p class="country-intro">Planning to work in Europe from ${escapeHtml(market.country)}? Explore destination guides, understand the typical application steps and discuss your experience with EU Pathfinder before deciding what to do next.</p>
        <a class="button button-gold" href="/#destinations">Explore European destinations</a>
      </div>
    </section>

    <section class="section" aria-label="European work guidance for applicants in ${escapeHtml(market.country)}">
      <div class="wrap country-content">
        <div class="country-main">
          <h2>Start with a real role and destination</h2>
          <p>Work-permit rules are set by each destination country. The available route depends on the role, employer, your experience and the rules in force when you apply. Use our destination guides as a starting point, then confirm current requirements with the relevant official authorities.</p>
          <ul class="check-list">
            <li>Compare destinations and the sectors described in each country guide.</li>
            <li>Check that an opportunity names a verifiable employer and a specific role.</li>
            <li>Ask for the full service fees and written terms before agreeing or paying.</li>
            <li>Confirm visa and work-permit requirements through official government or embassy sources.</li>
          </ul>

          <h2>Applying from ${escapeHtml(market.country)}</h2>
          <p>Your nationality and your current country of residence can both matter. If you live in a different country from the one that issued your passport, check with the destination country's embassy or official visa service where you are allowed to submit an application. Do this before making travel plans or paying anyone.</p>
          <p>${escapeHtml(market.planningNote)}</p>

          <h2>How EU Pathfinder can help you plan</h2>
          <p>We can discuss your work history and goals, review the documents you provide, and explain the support options and fees before you decide whether to proceed. The steps below are a general overview; the process differs by country and case.</p>
          ${renderProcessSteps(true)}

          <h2>Check an opportunity before you commit</h2>
          <p>A genuine recruitment process should identify the employer, role, pay, location and written terms. Verify these details independently and be cautious of anyone promising a guaranteed job, visa or work permit.</p>

          <h2>Documents to prepare for an initial discussion</h2>
          <p>These are useful starting documents, not a country-specific visa checklist. An employer or authority may request different items.</p>
          <ul class="check-list">${documents.map((document) => `<li>${escapeHtml(document)}</li>`).join("")}</ul>

          <h2>Frequently asked questions</h2>
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
            <a class="button button-whatsapp" href="${contactUrl}" target="_blank" rel="noopener noreferrer">Ask EU Pathfinder on WhatsApp</a>
            <p class="side-phone"><a href="mailto:${contactEmail}">${contactEmail}</a></p>
          </div>
        </aside>
      </div>
    </section>

    <section class="section other-destinations" aria-labelledby="market-destinations-title">
      <div class="wrap">
        <h2 id="market-destinations-title">Explore European work destinations</h2>
        <p>Read the country guides for typical sectors, general work-route information and documents to discuss.</p>
        <div class="destination-pills">${renderDestinationPills("")}</div>
      </div>
    </section>`;
}

function renderNotFound() {
  return `
    <section class="not-found wrap">
      <h1>We couldn't find that destination.</h1>
      <p>Choose from our 35 destination guides to explore typical sectors, documents and next steps.</p>
      <a class="button button-gold" href="/#destinations">Browse destinations</a>
    </section>`;
}

function updatePageMetadata(country, market) {
  const title = market
    ? `European Jobs for ${market.titleAudience} | EU Pathfinder`
    : country
      ? `Jobs and Work Permits in ${country.name} | EU Pathfinder`
      : "Work in Europe | Jobs & Relocation Guidance | EU Pathfinder";
  const description = market
    ? `Looking for jobs in Europe from ${market.country}? Explore destination guides and general work-route information for ${market.audience}. Requirements depend on the role and country.`
    : country
      ? `${country.intro} Explore work routes, common hiring sectors, documents and support for ${country.name}.`
      : "Job opportunities, work-permit guidance and relocation support across 35 European destinations, with an adviser beside you from first message to arrival.";
  const canonicalPath = market ? market.slug : country?.slug;

  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute("content", description);
  document.querySelector('link[rel="canonical"]').setAttribute(
    "href",
    `https://eupathfinder.agency${canonicalPath ? `/${canonicalPath}` : "/"}`
  );
}

function setupNavigation() {
  const button = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#primary-nav");
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    navigation.classList.toggle("is-open", !expanded);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      button.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}

function setupHomeInteractions() {
  const search = document.querySelector("#country-search");
  const cards = [...document.querySelectorAll(".destination-card")];
  const count = document.querySelector("#results-count");
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
      const matchesTerm = !term || card.dataset.search.includes(term);
      const isVisible = matchesRegion && matchesTerm;
      card.hidden = !isVisible;
      if (isVisible) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? "destination" : "destinations"}`;
    empty.hidden = visible !== 0;
  };

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      activeRegion = filter.dataset.filter;
      filters.forEach((item) => item.setAttribute("aria-pressed", String(item === filter)));
      filterCountries();
    });
  });
  search.addEventListener("input", filterCountries);

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const country = countries.find((item) => item.slug === chip.dataset.feature);
      if (!country) return;
      chips.forEach((item) => item.setAttribute("aria-pressed", String(item === chip)));
      document.querySelector("#featured-flag").src = getFlag(country);
      document.querySelector("#featured-name").textContent = country.name;
      document.querySelector("#featured-landmark").textContent = country.landmark;
      featured.href = `/${country.slug}`;
      featured.style.setProperty("--country-a", country.colors[0]);
      featured.style.setProperty("--country-b", country.colors[1]);
    });
  });

  filterCountries();
}

document.querySelector("#year").textContent = new Date().getFullYear();
setupNavigation();

const pathname = decodeURIComponent(window.location.pathname).replace(/^\/+|\/+$/g, "");
const path = window.location.protocol === "file:" || /(?:^|\/)index\.html$/i.test(pathname)
  ? ""
  : pathname.split("/").pop();
const currentCountry = countries.find((country) => country.slug === path);
const currentWorkerMarket = workerMarkets.find((market) => market.slug === path);
const main = document.querySelector("#main");

if (!path) {
  main.innerHTML = renderHome();
  updatePageMetadata(null);
  setupHomeInteractions();
} else if (currentCountry) {
  main.innerHTML = renderCountryPage(currentCountry);
  updatePageMetadata(currentCountry);
} else if (currentWorkerMarket) {
  main.innerHTML = renderWorkerMarketPage(currentWorkerMarket);
  updatePageMetadata(null, currentWorkerMarket);
} else {
  main.innerHTML = renderNotFound();
  updatePageMetadata(null);
}
