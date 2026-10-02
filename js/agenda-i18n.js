/** Turtle workshop agenda (Foundation · agenda/turtle). */
export const agendaEn = {
  agendaPageTitle: "Turtle projects · BotWorkshop",
  agendaTitle: "Turtle projects",
  agendaLead:
    "Pick a project, try the challenge, show it off! Change blocks in Coding → Upload to Turtle (unplug Bluetooth).",
  agendaBackCoding: "← Coding",
  fhP1Tag: "Start here",
  fhP1Title: "Meet your turtle",
  fhP1Body: "Wheels, eyes, lights — snap Coding blocks like Lego!",
  fhP1Challenge: "Try a sample and upload once.",
  fhP2Tag: "Warm-up",
  fhP2Title: "8×8 face art",
  fhP2Body: "Draw a smile, letter, or secret emoji on the light face.",
  fhP2Challenge: "Challenge: class guesses your drawing!",
  fhP2Link: "Draw face",
  fhP3Tag: "Show",
  fhP3Title: "Dance party",
  fhP3Body: "Press IR remote buttons — each one starts a different dance. Remix the maps in Coding!",
  fhP3Challenge: "Vote: funniest or coolest dance!",
  fhP3Dance: "Dance (IR)",
  fhP3Square: "Square",
  fhP4Tag: "Eyes",
  fhP4Title: "Ultrasonic scan & move",
  fhP4Body:
    "Eyes look left/right when something is close, then the turtle moves. Motors wiring Normal = flee. Reverse = chase.",
  fhP4Challenge: "Can it dodge walls — and chase a friend?",
  fhP4Game:
    "Game — Cat & mice: same program on every turtle. Cat uses Motors → Reverse direction (chase). Mice keep Normal (flee). If the cat catches a mouse, that mouse is out. Last mouse free wins!",
  fhP4Link: "Open scan & move",
  fhP7Tag: "Track",
  fhP7Title: "Tape track",
  fhP7Body: "Build a tape path — can the turtle stay on it?",
  fhP7Challenge: "Rally: finish the loop twice!",
  fhP7Link: "Line follow",
  language: "Language",
};

export const agendaAr = {
  agendaPageTitle: "مشاريع السلحفاة · BotWorkshop",
  agendaTitle: "مشاريع السلحفاة",
  agendaLead:
    "اختر مشروعاً، جرّب التحدي، واعرضه! عدّل البلوكات في البرمجة → ارفع إلى السلحفاة (افصل البلوتوث).",
  agendaBackCoding: "← البرمجة",
  fhP1Tag: "ابدأ هنا",
  fhP1Title: "تعرّف على سلحفاتك",
  fhP1Body: "عجلات، عيون، أضواء — بلوكات كالليغو!",
  fhP1Challenge: "جرّب نموذجاً وارفع مرة واحدة.",
  fhP2Tag: "إحماء",
  fhP2Title: "فن الوجه 8×8",
  fhP2Body: "ارسم ابتسامة أو حرفاً أو إيموجي على الوجه المضيء.",
  fhP2Challenge: "تحدي: الصف يخمّن رسمك!",
  fhP2Link: "ارسم وجهاً",
  fhP3Tag: "عرض",
  fhP3Title: "حفلة رقص",
  fhP3Body: "اضغط أزرار ريموت IR — كل زر يبدأ رقصة مختلفة. عدّل الربط في البرمجة!",
  fhP3Challenge: "تصويت: أطرف أو أجمل رقصة!",
  fhP3Dance: "رقصة (IR)",
  fhP3Square: "مربع",
  fhP4Tag: "عيون",
  fhP4Title: "مسح فوق صوتي وحركة",
  fhP4Body:
    "العيون يمين/يسار عندما يقترب شيء، ثم تتحرك السلحفاة. توصيل المحركات Normal = هروب. Reverse = مطاردة.",
  fhP4Challenge: "هل تتجنب الجدران — وتطارد صديقاً؟",
  fhP4Game:
    "لعبة — قط وفئران: نفس البرنامج على كل سلحفاة. القط Motors → Reverse (مطاردة). الفئران Normal (هروب). إذا أمسك القط فأراً يخرج من اللعبة. آخر فأر حر يفوز!",
  fhP4Link: "افتح مسح وحركة",
  fhP7Tag: "مسار",
  fhP7Title: "مسار شريط",
  fhP7Body: "ابنِ مساراً بالشريط — هل تبقى السلحفاة عليه؟",
  fhP7Challenge: "سباق: أكمل الحلقة مرتين!",
  fhP7Link: "تتبع الخط",
  language: "Language",
};

export function getAgendaLang() {
  return localStorage.getItem("bw-lang") === "ar" ? "ar" : "en";
}

export function agendaUi(lang = getAgendaLang()) {
  return lang === "ar" ? agendaAr : agendaEn;
}

export function applyAgendaI18n(lang = getAgendaLang()) {
  const t = agendaUi(lang);
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ar", lang === "ar");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && t[key] != null) el.textContent = t[key];
  });
  const title = document.querySelector("title[data-i18n]");
  if (title && t.agendaPageTitle) title.textContent = t.agendaPageTitle;
  const sel = document.getElementById("site-lang");
  if (sel instanceof HTMLSelectElement) sel.value = lang;
}
