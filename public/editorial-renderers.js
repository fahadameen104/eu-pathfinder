/* Page renderers use escaped owner-supplied text. Images describe scenes, not client outcomes. */
function editorialImage(key, className = "", eager = false) {
  const image = editorialContent.photos[key];
  return `<img class="${className}" src="${image.src}" alt="${escapeHtml(image.alt)}" width="${image.width}" height="${image.height}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
function editorialHero(title, intro, eyebrow, imageKey) {
  return `<header class="editorial-hero wrap"><div><p class="eyebrow">${escapeHtml(eyebrow)}</p><h1>${escapeHtml(title)}</h1><p class="editorial-intro">${escapeHtml(intro)}</p></div>${imageKey ? `<figure>${editorialImage(imageKey,"",true)}</figure>` : ""}</header>`;
}
function renderFocusedServicesPage() {
  return `<article class="editorial-page services-editorial">
    ${editorialHero("Guidance, employer matching and relocation support", "Prepare your next step from India, Bangladesh, Nepal or Pakistan. Understand what support is included, what you need to provide and what happens next.", "Our services", "meeting")}
    <div class="wrap editorial-body"><section class="reading-card scope-intro"><h2>Start with an agreed scope</h2><p>EU PathFinder Agency provides guidance and employer-matching support. Recruitment or placement services apply only where expressly covered by a separate written agreement. Employers make hiring decisions; authorities decide visas, work permits and residence permissions.</p><p><strong>Contact us for current pricing.</strong> Ask for an itemised quote, responsibilities and cancellation terms before agreeing to a service.</p><nav class="regional-links" aria-label="Service information"><a href="#service-options">Explore the services</a><a href="/refund-policy/">Refund and cancellation policy</a><a href="#services-contact">Discuss your requirements</a></nav></section>
    <nav class="service-index reading-card" aria-label="On this services page"><h2>Find the support you need</h2><ol>${editorialContent.services.map(s=>`<li><a href="#${s.id}">${escapeHtml(s.title)}</a></li>`).join("")}</ol></nav>
    <section id="service-options" class="service-editorial-grid" aria-label="Service details">${editorialContent.services.map((s,i)=>`<section id="${s.id}" class="reading-card service-editorial-card"><span class="service-number" aria-hidden="true">${String(i+1).padStart(2,"0")}</span><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.intro)}</p><dl><dt>Support to discuss</dt><dd>${escapeHtml(s.deliverable)}</dd><dt>What you provide</dt><dd>${escapeHtml(s.provide)}</dd><dt>What happens next</dt><dd>${escapeHtml(s.next)}</dd></dl></section>`).join("")}</section>
    <section class="reading-card"><h2>Industries and experience to discuss</h2><p>Tell us about the work you have actually performed, your training and the roles you are exploring. These sectors are areas for discussion, not a list of advertised vacancies.</p><ul class="sector-tags">${editorialContent.industries.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul><p>Requirements, professional recognition and available routes depend on the role and destination.</p></section>
    <section class="reading-card"><h2>Before you decide</h2><ul class="check-list"><li>Verify the named employer and written role independently.</li><li>Confirm the service deliverables and your own responsibilities in writing.</li><li>Separate adviser fees from official charges, translations, travel and other third-party costs.</li><li>Ask what is refundable, when charges become due and how to cancel.</li></ul><p><a href="/insights/">Read our insights and preparation guides</a> · <a href="/privacy/">Privacy policy</a> · <a href="/gdpr/">GDPR notice</a></p></section></div>
    ${renderContactSection({id:"services-contact",title:"Contact us for current pricing",description:"Share your nationality, current residence, experience and preferred destination. We will discuss the scope and next steps before you decide."})}</article>`;
}
function insightCard(article) {
  return `<article class="insight-card reading-card" data-insight-category="${escapeHtml(article.category)}"><a class="insight-card-image" href="/insights/${article.slug}/">${editorialImage(article.image)}</a><div class="insight-card-copy"><p class="article-category">${escapeHtml(article.category)}</p><h2><a href="/insights/${article.slug}/">${escapeHtml(article.title)}</a></h2><p>${escapeHtml(article.excerpt)}</p><a class="text-link" href="/insights/${article.slug}/">Read article <span class="sr-only">: ${escapeHtml(article.title)}</span><span aria-hidden="true"> ↗</span></a></div></article>`;
}
function renderInsightsPage() {
  return `<article class="editorial-page">
    ${editorialHero("Insights for your next step", "Practical reading for workers and employers: international hiring, work-permit preparation, employer checks and life after arrival.", "Insights & resources", "team")}
    <div class="wrap editorial-body"><section class="insights-introduction reading-card"><h2>Make an informed plan</h2><p>Explore ten practical topics to help prepare your next step. Country-specific hiring, application requirements and workplace expectations should always be checked against the relevant employer and official authority.</p><p>These articles provide general information. They do not advertise current vacancies, confirm eligibility or guarantee a job, permit or visa.</p><nav class="regional-links" aria-label="Regional preparation guides"><a href="/#worker-markets">Choose your current country</a><a href="/guides/europe-work-guidance-from-africa/">Africa guide</a><a href="/guides/europe-work-guidance-from-gulf/">Gulf guide</a><a href="/services/">Explore our services</a></nav></section>
    <section aria-labelledby="article-library-title"><h2 id="article-library-title">Explore the articles</h2><div class="insight-filters" role="group" aria-label="Filter insights by category">${["All","Global Solutions","Legal Compliance"].map((category,i)=>`<button type="button" data-insight-filter="${category}" aria-pressed="${i===0}">${category}</button>`).join("")}</div><p class="insight-count" role="status" aria-live="polite" data-insight-count>10 articles</p><div class="insight-grid">${editorialContent.articles.map(insightCard).join("")}</div></section></div></article>`;
}
function articleSources(kind) {
  const labour={label:"Council of the European Union: skills shortages and human capital",url:"https://www.consilium.europa.eu/en/press/press-releases/2026/03/09/tackling-the-skills-shortage-council-adopts-recommendation-on-human-capital/"};
  const immigration={label:"European Union: immigration information",url:"https://european-union.europa.eu/live-work-study/immigration-eu_en"};
  const sources=kind==="labour"?[labour,immigration]:[immigration];
  return `<ul>${sources.map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`).join("")}</ul>`;
}
function renderInsightArticle(article) {
  return `<article class="editorial-page insight-article"><div class="wrap article-top"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/insights/">Insights</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(article.title)}</span></nav></div>
    ${editorialHero(article.title,article.excerpt,article.category,article.image)}
    <div class="wrap article-layout"><aside class="article-aside reading-card"><p class="article-category">EU PathFinder Agency</p><p>General preparation guidance</p><nav aria-label="On this article"><a href="#article-overview">Overview</a><a href="#article-checklist">Preparation checklist</a><a href="#article-resources">Official resources</a><a href="#article-next">Next step</a></nav><a class="text-link" href="/insights/">← All insights</a></aside><div class="article-prose">
    <section id="article-overview" class="reading-card"><h2>What to consider</h2>${article.paragraphs.map(p=>`<p>${escapeHtml(p)}</p>`).join("")}</section>
    <section id="article-checklist" class="reading-card"><h2>Your preparation checklist</h2><ul class="check-list">${article.checklist.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul></section>
    <section id="article-resources" class="reading-card"><h2>Check the official information</h2>${articleSources(article.source)}<p>For a particular application, follow the destination government or embassy’s current instructions. Rules, eligibility and application locations depend on your circumstances. For non-EU destinations, use that country’s own immigration authority.</p></section>
    <section id="article-next" class="reading-card"><h2>Turn your questions into a plan</h2><p>Tell us your nationality, current residence, occupation, experience and the destination you are considering. Keep sensitive documents out of the initial enquiry.</p><p><strong>Contact us for current pricing.</strong> Recruitment or placement applies only under a separate written agreement. No job, visa or permit outcome is guaranteed.</p><a class="button button-gold" href="/services/#services-contact">Discuss your next step <span aria-hidden="true">↗</span></a></section>
    <section class="related-insights"><h2>Keep reading</h2>${editorialContent.articles.filter(x=>x.slug!==article.slug&&x.category===article.category).slice(0,2).map(x=>`<p><a href="/insights/${x.slug}/">${escapeHtml(x.title)}</a></p>`).join("")}</section></div></div></article>`;
}
const legalSubheadings=new Set(["Contact Information","Personal Information","Technical Information","Communication Information","Payment Information","Accuracy of Information","Withdrawal of Consent","Scope of Data Rights","Service Nature","Cancellation Requests","Refund Eligibility","Generally Non-Refundable Items","Refused Applications","Refund Processing","Refund Complaints"]);
function legalText(text) {
  return escapeHtml(text).replace(/https:\/\/(?:www\.)?eupathfinder\.agency/g,'<a href="https://eupathfinder.agency/">eupathfinder.agency</a>').replace(/\b(info@eupathfinder\.agency|Eupathfinder@gmail\.com)\b/g,'<a href="mailto:$1">$1</a>');
}
function renderLegalLines(lines) {
  let html="",items=[];
  const flush=()=>{if(items.length){html+=`<ul>${items.map(x=>`<li>${legalText(x)}</li>`).join("")}</ul>`;items=[];}};
  for(const text of lines){if(legalSubheadings.has(text)){flush();html+=`<h3>${escapeHtml(text)}</h3>`;}else if(text.length<88&&!/[.!?:]$/.test(text)&&!text.includes(":")&&!text.startsWith("EU PathFinder Agency")){items.push(text);}else{flush();html+=`<p>${legalText(text)}</p>`;}}flush();return html;
}
function legalSection(section) {
  return `<section class="reading-card legal-section" id="policy-${section.number}"><h2>${escapeHtml(section.title)}</h2>${renderLegalLines(section.lines)}${section.number===7?'<p><button type="button" data-analytics-settings>Analytics preferences</button> · <button type="button" data-ad-settings>Advertising preferences</button></p>':""}</section>`;
}
function renderPolicyPage(kind) {
  const policy=editorialContent.policy;
  const selection=kind==="refund-policy"?[20,3,19,23,24]:kind==="gdpr"?[5,10,11,12,13,14,16,24]:policy.sections.map(x=>x.number).filter(n=>![14,20].includes(n));
  const sections=selection.map(n=>policy.sections.find(s=>s.number===n));
  const title=kind==="refund-policy"?"Refund and cancellation policy":kind==="gdpr"?"GDPR notice and data rights":"Privacy policy";
  const intro=kind==="refund-policy"?"How to request cancellation, how refunds are assessed and how to contact the team. Mandatory consumer rights remain unaffected.":kind==="gdpr"?"How to contact EU PathFinder Agency about personal information and the rights that may apply under the GDPR.":"How EU PathFinder Agency handles website enquiries, communications and information provided during agreed services.";
  return `<article class="editorial-page legal-page">${editorialHero(title,intro,"Policies & information",null)}<div class="wrap policy-dates"><p>Effective: ${policy.effective} · Last updated: ${policy.updated}</p><nav class="regional-links" aria-label="Related policies"><a href="/privacy/">Privacy policy</a><a href="/gdpr/">GDPR notice</a><a href="/refund-policy/">Refund and cancellation</a><a href="/services/">Service scope</a></nav></div><div class="wrap article-layout"><aside class="article-aside reading-card"><h2>On this page</h2><nav aria-label="Policy sections">${sections.map(s=>`<a href="#policy-${s.number}">${escapeHtml(s.title)}</a>`).join("")}</nav></aside><div class="article-prose">${kind==="gdpr"?'<section class="reading-card"><h2>Where GDPR applies</h2><p>This notice explains our data-protection commitments and how to contact us. It is not a certification or a claim that GDPR applies to every interaction. The legal rights and obligations depend on the applicable law and circumstances.</p><p>Contact <a href="mailto:info@eupathfinder.agency">info@eupathfinder.agency</a> to ask about access, correction, deletion, restriction, portability, objection or withdrawal of consent. Do not send passport scans or sensitive records with an initial request.</p></section>':""}${kind==="refund-policy"?'<section class="reading-card"><h2>Before you pay</h2><p>Request a written service agreement, an itemised fee breakdown and the cancellation and refund terms for your particular service. The provisions below are subject to mandatory consumer rights and any applicable legal requirements.</p><p><a href="mailto:Eupathfinder@gmail.com?subject=Cancellation%20or%20refund%20request">Email the refund team</a> · <a href="mailto:info@eupathfinder.agency">Contact customer support</a></p></section>':""}${sections.map(legalSection).join("")}</div></div></article>`;
}
function renderEditorialPublication(page) {
  if(page.slug==="services")return renderFocusedServicesPage();
  if(page.slug==="insights")return renderInsightsPage();
  if(["gdpr","refund-policy"].includes(page.slug))return renderPolicyPage(page.slug);
  const article=editorialContent.articles.find(a=>'insights/'+a.slug===page.slug);
  return article?renderInsightArticle(article):renderNotFound();
}
function setupInsightFilters() {
  const buttons=document.querySelectorAll('[data-insight-filter]');
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const category=button.dataset.insightFilter;let count=0;
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelectorAll('[data-insight-category]').forEach(card=>{card.hidden=category!=="All"&&card.dataset.insightCategory!==category;if(!card.hidden)count++;});
    const status=document.querySelector('[data-insight-count]');if(status)status.textContent=`${count} ${count===1?'article':'articles'}`;
  }));
}
