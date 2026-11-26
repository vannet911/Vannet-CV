/* ============================================================
   SONY Vannet — CV / Portfolio
   Bilingual dictionary (English / ខ្មែរ)
   ============================================================ */

(() => {
  'use strict';

  const TRANSLATIONS = {
    en: {
      /* meta */
      'meta.title': 'SONY Vannet — Junior Developer',
      'meta.desc':
        'Portfolio and curriculum vitae of SONY Vannet — Junior Developer based in Phnom Penh, Cambodia.',

      /* navigation */
      'nav.menu': 'Main navigation',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.skill': 'Skills',
      'nav.education': 'Education',
      'nav.contact': 'Contact',

      /* hero */
      'hero.status': 'Available for opportunities',
      'hero.greet': "Hello, I'm",
      'hero.name': 'SONY Vannet',
      'hero.lead':
        'A junior developer from Phnom Penh, Cambodia — building clean, accessible and delightfully animated interfaces with HTML, CSS, JavaScript and C#.',
      'hero.cta1': 'Explore my CV',
      'hero.cta2': 'Get in touch',
      'hero.stat1': 'Certifications',
      'hero.stat2': 'Technologies',
      'hero.stat3': 'Graduated',
      'hero.scroll': 'Scroll',
      'hero.photoAlt': 'Illustration of Vannet working at a desk',

      /* about */
      'about.kicker': 'About me',
      'about.title': 'A little about <span class="gradient-text">who I am</span>',
      'about.p1':
        'My name is <span class="name">SONY Vannet</span>, I\'m <span class="name">23 years old</span> and I was born on February 21, 2002 in Kandal Province. I now live and work in Phnom Penh, Cambodia.',
      'about.p2':
        "I hold a bachelor's degree in Computer Science (Information Technology) from the <strong>Royal University of Phnom Penh</strong>, after finishing Hun Sen Kampong Phnom High School and Prek Touch Secondary School.",
      'about.p3':
        "I have completed training in Visual Studio C# Programming (Foundation & OOP with databases), C & C++ programming, graphic design with Photoshop & Illustrator, Microsoft Office, and accounting & taxation. I'm currently deepening my HTML, CSS, JavaScript and UX/UI skills.",
      'about.chip1': 'Front-end',
      'about.chip2': 'SQL',
      'about.chip3': 'OOP',
      'about.chip4': 'UI Design',
      'about.interests': 'Interests',
      'about.i1': 'Researching on the internet',
      'about.i2': 'Learning new technology',
      'about.i3': 'Listening to music & playing guitar',
      'about.loc1': 'Phnom Penh',
      'about.loc2': 'Cambodia',
      'about.photoAlt': 'Portrait of SONY Vannet',

      /* skills */
      'skill.kicker': 'Skills',
      'skill.title': 'My <span class="gradient-text">toolkit</span>',
      'skill.prog': 'Programming languages',
      'skill.tools': 'Tools I use',
      'skill.d1': 'Semantic, accessible markup',
      'skill.d2': 'Responsive layouts & animation',
      'skill.d3': 'Interactive, dynamic interfaces',
      'skill.d4': 'OOP & database fundamentals',
      'skill.tool2': 'SQL Server',

      /* education */
      'edu.kicker': 'Education',
      'edu.title': 'Where I <span class="gradient-text">learned</span>',
      'edu.tag1': 'University',
      'edu.tag2': 'Professional training',
      'edu.tag3': 'Online course',
      'edu.tag4': '2021',
      'edu.d1': 'Completed a bachelor\'s degree in Computer Science of Information Technology (IT).',
      'edu.d2': 'Completed Visual Studio C# Programming Foundation & OOP with Database.',
      'edu.d3': 'Completed the basic webpage languages: HTML, CSS and JavaScript.',
      'edu.d4': 'Completed the C & C++ programming language course.',
      'edu.link1': 'Visit RUPP',
      'edu.link2': 'Visit Master IT',
      'edu.link3': 'Visit Reanmore',
      'edu.link4': 'Visit ETEC',
      'edu.artAlt': 'Education illustration',

      /* contact */
      'contact.kicker': 'Contact',
      'contact.title': 'Let\'s <span class="gradient-text">work together</span>',
      'contact.lead':
        'Have a project, an internship or just a question? Send me a message — I usually reply within a day.',
      'contact.loc': 'Phnom Penh, Cambodia',

      /* form */
      'form.name': 'Your name',
      'form.email': 'Your email',
      'form.msg': 'Your message',
      'form.submit': 'Send message',
      'form.sending': 'Sending…',
      'form.mailtoNote':
        'Your mail app is opening with the message ready — just press Send. Or write directly to vannet.sony@gmail.com.',
      'form.sentSend': 'Thank you! Your message was sent — I usually reply within a day.',
      'form.failed': 'Sorry, the message could not be sent. Please email vannet.sony@gmail.com instead.',
      'err.name': 'Please enter your name.',
      'err.email': 'Please enter a valid email address.',
      'err.msg': 'Please enter a message.',

      /* footer & controls */
      'footer.copy': '© {year} SONY Vannet — All rights reserved.',
      'footer.meta': 'Designed &amp; built in Phnom Penh, Cambodia. <i class="fas fa-heart"></i>',
      'aria.top': 'Back to top',
      'aria.lang': 'Switch to Khmer',
      'aria.themeLight': 'Switch to light theme',
      'aria.themeDark': 'Switch to dark theme',
      'aria.menuOpen': 'Open menu',
      'aria.menuClose': 'Close menu',

      /* typed roles */
      heroRoles: ['Junior Developer', 'Front-end Enthusiast', 'UI/UX Learner', 'C# & SQL Explorer'],
    },

    km: {
      /* meta */
      'meta.title': 'សូនី វ៉ាន់នេត — អ្នកអភិវឌ្ឍន៍វ័យក្មេង',
      'meta.desc': 'ប្រវត្តិរូប និងផ្ទាំងស្នាដៃរបស់ សូនី វ៉ាន់នេត — អ្នកអភិវឌ្ឍន៍វ័យក្មេង នៅរាជធានីភ្នំពេញ ប្រទេសកម្ពុជា។',

      /* navigation */
      'nav.menu': 'ម៉ឺនុយមេ',
      'nav.home': 'ទំព័រដើម',
      'nav.about': 'អំពីខ្ញុំ',
      'nav.skill': 'ជំនាញ',
      'nav.education': 'ការអប់រំ',
      'nav.contact': 'ទំនាក់ទំនង',

      /* hero */
      'hero.status': 'អាចទទួលយកឱកាសបាន',
      'hero.greet': 'សួស្តី ខ្ញុំឈ្មោះ',
      'hero.name': 'សូនី វ៉ាន់នេត',
      'hero.lead':
        'អ្នកអភិវឌ្ឍន៍វ័យក្មេងមកពីរាជធានីភ្នំពេញ ប្រទេសកម្ពុជា — បង្កើតផ្ទាំងអន្តរកម្មដែលស្អាត ងាយស្រួលប្រើ និងមានចលនារស់រវើក ដោយប្រើ HTML, CSS, JavaScript និង C#។',
      'hero.cta1': 'មើលប្រវត្តិរូបខ្ញុំ',
      'hero.cta2': 'ទំនាក់ទំនងមកខ្ញុំ',
      'hero.stat1': 'វិញ្ញាបនបត្រ',
      'hero.stat2': 'បច្ចេកវិទ្យា',
      'hero.stat3': 'បញ្ចប់ការសិក្សា',
      'hero.scroll': 'រំកិលចុះក្រោម',
      'hero.photoAlt': 'រូបភាពពន្យល់ពី វ៉ាន់នេត កំពុងធ្វើការនៅតុ',

      /* about */
      'about.kicker': 'អំពីខ្ញុំ',
      'about.title': 'បន្តិចអំពី <span class="gradient-text">ខ្ញុំ</span>',
      'about.p1':
        'ខ្ញុំឈ្មោះ <span class="name">សូនី វ៉ាន់នេត</span> អាយុ <span class="name">២៣ ឆ្នាំ</span> កើតនៅថ្ងៃទី ២១ ខែកុម្ភៈ ឆ្នាំ ២០០២ នៅខេត្តកណ្តាល។ បច្ចុប្បន្នខ្ញុំរស់នៅ និងធ្វើការនៅរាជធានីភ្នំពេញ ប្រទេសកម្ពុជា។',
      'about.p2':
        'ខ្ញុំបានបញ្ចប់ថ្នាក់បរិញ្ញាបត្រ ផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ (បច្ចេកវិទ្យាព័ត៌មាន) ពី <strong>សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ</strong> បន្ទាប់ពីបញ្ចប់ថ្នាក់វិទ្យាល័យហ៊ុនសែនកំពង់ផ្នែក និងអនុវិទ្យាល័យព្រែកទូច។',
      'about.p3':
        'ខ្ញុំបានបញ្ចប់ការបណ្តុះបណ្តាល Visual Studio C# (Foundation និង OOP ជាមួយ Database), ភាសា C និង C++, ការរចនាក្រាហ្វិក (Photoshop និង Illustrator), Microsoft Office និងគណនេយ្យ-ពន្ធដារ។ បច្ចុប្បន្នខ្ញុំកំពុងបង្កើនជំនាញ HTML, CSS, JavaScript និង UX/UI។',
      'about.chip1': 'Front-end',
      'about.chip2': 'SQL',
      'about.chip3': 'OOP',
      'about.chip4': 'រចនា UI',
      'about.interests': 'ចំណាប់អារម្មណ៍',
      'about.i1': 'ស្រាវជ្រាវតាមអ៊ីនធឺណិត',
      'about.i2': 'រៀនបច្ចេកវិទ្យាថ្មីៗ',
      'about.i3': 'ស្តាប់តន្ត្រី និងលេងហ្គីតា',
      'about.loc1': 'រាជធានីភ្នំពេញ',
      'about.loc2': 'កម្ពុជា',
      'about.photoAlt': 'រូបថតរបស់ សូនី វ៉ាន់នេត',

      /* skills */
      'skill.kicker': 'ជំនាញ',
      'skill.title': '<span class="gradient-text">ឧបករណ៍</span>របស់ខ្ញុំ',
      'skill.prog': 'ភាសាកម្មវិធី',
      'skill.tools': 'ឧបករណ៍ដែលខ្ញុំប្រើ',
      'skill.d1': 'កូដសម្គាល់ដែលមានអត្ថន័យ និងងាយស្រួលប្រើ',
      'skill.d2': 'ប្លង់ឆ្លើយតប និងចលនា',
      'skill.d3': 'ផ្ទាំងអន្តរកម្មរស់រវើក',
      'skill.d4': 'មូលដ្ឋាន OOP និង Database',
      'skill.tool2': 'SQL Server',

      /* education */
      'edu.kicker': 'ការអប់រំ',
      'edu.title': 'កន្លែងដែលខ្ញុំ <span class="gradient-text">បានរៀន</span>',
      'edu.tag1': 'សាកលវិទ្យាល័យ',
      'edu.tag2': 'ការបណ្តុះបណ្តាលវិជ្ជាជីវៈ',
      'edu.tag3': 'វគ្គសិក្សាអនឡាញ',
      'edu.tag4': 'ឆ្នាំ ២០២១',
      'edu.d1': 'បានបញ្ចប់ថ្នាក់បរិញ្ញាបត្រ ផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ (បច្ចេកវិទ្យាព័ត៌មាន)។',
      'edu.d2': 'បានបញ្ចប់ Visual Studio C# Programming Foundation និង OOP ជាមួយ Database។',
      'edu.d3': 'បានបញ្ចប់ភាសាគេហទំព័រមូលដ្ឋាន៖ HTML, CSS និង JavaScript។',
      'edu.d4': 'បានបញ្ចប់វគ្គសិក្សាភាសា C និង C++។',
      'edu.link1': 'មើល RUPP',
      'edu.link2': 'មើល Master IT',
      'edu.link3': 'មើល Reanmore',
      'edu.link4': 'មើល ETEC',
      'edu.artAlt': 'រូបភាពពន្យល់ពីការអប់រំ',

      /* contact */
      'contact.kicker': 'ទំនាក់ទំនង',
      'contact.title': 'តោះ <span class="gradient-text">ធ្វើការជាមួយគ្នា</span>',
      'contact.lead':
        'មានគម្រោង ការកម្មសិក្សា ឬសំណួរ? ផ្ញើសារមកខ្ញុំ — ជាធម្មតាខ្ញុំឆ្លើយតបក្នុងរយៈពេលមួយថ្ងៃ។',
      'contact.loc': 'រាជធានីភ្នំពេញ, កម្ពុជា',

      /* form */
      'form.name': 'ឈ្មោះរបស់អ្នក',
      'form.email': 'អ៊ីមែលរបស់អ្នក',
      'form.msg': 'សាររបស់អ្នក',
      'form.submit': 'ផ្ញើសារ',
      'form.sending': 'កំពុងផ្ញើ…',
      'form.mailtoNote': 'កម្មវិធីអ៊ីមែលរបស់អ្នកកំពុងបើក ជាមួយសារដែលរៀបចំរួច — សូមចុច ផ្ញើ។ ឬផ្ញើផ្ទាល់មក vannet.sony@gmail.com។',
      'form.sentSend': 'អរគុណ! សាររបស់អ្នកបានផ្ញើរួចហើយ — ជាធម្មតាខ្ញុំឆ្លើយតបក្នុងរយៈពេលមួយថ្ងៃ។',
      'form.failed': 'សូមអភ័យទោស សារមិនអាចផ្ញើបានទេ។ សូមផ្ញើអ៊ីមែលមក vannet.sony@gmail.com ជំនួសវិញ។',
      'err.name': 'សូមបញ្ចូលឈ្មោះរបស់អ្នក។',
      'err.email': 'សូមបញ្ចូលអ៊ីមែលឲ្យបានត្រឹមត្រូវ។',
      'err.msg': 'សូមបញ្ចូលសារ។',

      /* footer & controls */
      'footer.copy': '© {year} សូនី វ៉ាន់នេត — រក្សាសិទ្ធិគ្រប់យ៉ាង។',
      'footer.meta': 'រចនា និងបង្កើតនៅភ្នំពេញ ប្រទេសកម្ពុជា។ <i class="fas fa-heart"></i>',
      'aria.top': 'ត្រឡប់ទៅខាងលើ',
      'aria.lang': 'ប្តូរទៅភាសាអង់គ្លេស',
      'aria.themeLight': 'ប្តូរទៅផ្ទាំងភ្លឺ',
      'aria.themeDark': 'ប្តូរទៅផ្ទាំងងងឹត',
      'aria.menuOpen': 'បើកម៉ឺនុយ',
      'aria.menuClose': 'បិទម៉ឺនុយ',

      /* typed roles */
      heroRoles: [
        'អ្នកអភិវឌ្ឍន៍វ័យក្មេង',
        'អ្នកស្រលាញ់ Front-end',
        'អ្នកសិក្សា UI/UX',
        'អ្នកស្វែងយល់ C# និង SQL',
      ],
    },
  };

  const STORAGE_KEY = 'lang';
  const root = document.documentElement;
  const btn = document.getElementById('lang-toggle');

  const dictFor = (lang) => TRANSLATIONS[lang] || TRANSLATIONS.en;

  // expose for other modules (typed headline, form notes)
  window.CV_I18N = {
    get(lang) {
      return dictFor(lang === 'km' ? 'km' : 'en');
    },
    t(key, lang = root.lang) {
      return dictFor(lang === 'km' ? 'km' : 'en')[key] ?? TRANSLATIONS.en[key] ?? '';
    },
  };

  const interpolate = (value) =>
    typeof value === 'string' ? value.replace('{year}', String(new Date().getFullYear())) : value;

  const applyTexts = (lang) => {
    const dict = dictFor(lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value == null) return;

      if (el.dataset.i18nHtml === 'true') el.innerHTML = interpolate(value);
      else el.textContent = interpolate(value);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const value = dict[el.dataset.i18nAria];
      if (value) el.setAttribute('aria-label', interpolate(value));
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const value = dict[el.dataset.i18nTitle];
      if (value) el.setAttribute('title', interpolate(value));
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const value = dict[el.dataset.i18nAlt];
      if (value) el.setAttribute('alt', interpolate(value));
    });

    const title = dict['meta.title'];
    if (title) document.title = title;

    const desc = document.querySelector('meta[name="description"]');
    if (desc && dict['meta.desc']) desc.setAttribute('content', dict['meta.desc']);
  };

  const syncControlState = (lang) => {
    // The button shows the language you would switch TO, so it always reads
    // as the next action: EN page -> "ខ្មែរ", KH page -> "English".
    if (btn) {
      const label = dictFor(lang)['aria.lang'];
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      // data-show tells CSS which flag/name pair to reveal
      btn.dataset.show = lang === 'km' ? 'en' : 'km';
    }
  };

  let currentLang = 'en';

  const setLang = (lang, { persist = true, announce = true } = {}) => {
    currentLang = lang === 'km' ? 'km' : 'en';

    root.lang = currentLang;
    root.dataset.lang = currentLang;

    applyTexts(currentLang);
    syncControlState(currentLang);

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, currentLang);
      } catch (_) {
        /* storage may be unavailable — language still applies for this visit */
      }
    }

    if (announce) {
      document.dispatchEvent(new CustomEvent('cv:langchange', { detail: { lang: currentLang } }));
    }
  };

  // initial language: stored choice, otherwise English
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (_) {
    stored = null;
  }

  setLang(stored === 'km' ? 'km' : 'en', { persist: false, announce: false });

  btn?.addEventListener('click', () => {
    setLang(currentLang === 'km' ? 'en' : 'km');
  });
})();
