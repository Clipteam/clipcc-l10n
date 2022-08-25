/**
 * Currently supported locales for the Scratch Project
 * @type {Object} Key Value pairs of locale code: Language name written in the language
 */

const locales = {
    /*'ab': {name: 'Аҧсшәа'},
    'ar': {name: 'العربية'},
    'am': {name: 'አማርኛ'},
    'az': {name: 'Azeri'},
    'id': {name: 'Bahasa Indonesia'},
    'be': {name: 'Беларуская'},
    'bg': {name: 'Български'},
    'ca': {name: 'Català'},
    'cs': {name: 'Česky'},
    'cy': {name: 'Cymraeg'},
    'da': {name: 'Dansk'},
    'de': {name: 'Deutsch'},
    'et': {name: 'Eesti'},
    'el': {name: 'Ελληνικά'},*/
    'en': {name: 'English'},
    /*'es': {name: 'Español'},
    'es-419': {name: 'Español Latinoamericano'},
    'eu': {name: 'Euskara'},
    'fa': {name: 'فارسی'}*/
    'fr': {name: 'Français'},
    /*'ga': {name: 'Gaeilge'},
    'gd': {name: 'Gàidhlig'},
    'gl': {name: 'Galego'},
    'ko': {name: '한국어'},
    'hy': {name: 'Հայերեն'},
    'he': {name: 'עִבְרִית'},
    'hr': {name: 'Hrvatski'},
    'zu': {name: 'isiZulu'},
    'is': {name: 'Íslenska'},
    'it': {name: 'Italiano'},
    'ka': {name: 'ქართული ენა'},
    'sw': {name: 'Kiswahili'},
    'ht': {name: 'Kreyòl ayisyen'},
    'ku': {name: 'Kurdî'},
    'ckb': {name: 'کوردیی ناوەندی'},
    'lv': {name: 'Latviešu'},
    'lt': {name: 'Lietuvių'},
    'hu': {name: 'Magyar'},
    'mi': {name: 'Māori'},
    'mn': {name: 'Монгол хэл'},
    'nl': {name: 'Nederlands'},
    'ja': {name: '日本語'},
    'nb': {name: 'Norsk Bokmål'},
    'nn': {name: 'Norsk Nynorsk'},
    'uz': {name: 'Oʻzbekcha'},
    'th': {name: 'ไทย'},
    'km': {name: 'ភាសាខ្មែរ'},
    'pl': {name: 'Polski'},
    'pt': {name: 'Português'},
    'pt-br': {name: 'Português Brasileiro'},
    'rap': {name: 'Rapa Nui'},
    'ro': {name: 'Română'},
    'ru': {name: 'Русский'},
    'sr': {name: 'Српски'},
    'sk': {name: 'Slovenčina'},
    'sl': {name: 'Slovenščina'},
    'fi': {name: 'Suomi'},
    'sv': {name: 'Svenska'},
    'vi': {name: 'Tiếng Việt'},
    'tr': {name: 'Türkçe'},
    'uk': {name: 'Українська'},*/
    'zh-cn': {name: '简体中文'},
    'zh-tw': {name: '繁體中文'},
    'zh-cn-chunibyo': {name: '中二模式'}
};

const customLocales = {
    /*'ab': {
        locale: 'ab',
        parentLocale: 'az'
    },
    // haitian creole is not in react-intl locales
    'ht': {
        locale: 'ht',
        parentLocale: 'fr'
    },
    'rap': {
        locale: 'rap',
        parentLocale: 'es'
    },*/
    'zh-cn': {
        locale: 'zh-cn',
        parentLocale: 'zh'
    },
    'zh-tw': {
        locale: 'zh-tw',
        parentLocale: 'zh'
    },
    'zh-cn-chunibyo': {
        locale: 'zh-cn-chunibyo',
        parentLocale: 'zh'
    }
};

const localeMap = {
    /*'aa-dj': 'aa_DJ',
    'es-419': 'es_419',
    // ja-Hira: no map - it's 'ja-Hira' on transifex
    'pt-br': 'pt_BR',*/
    'zh-cn': 'zh-Hans',
    'zh-tw': 'zh-Hant',
    'zh-cn-chunibyo': 'zh-cn-Chunibyo'
};

// list of RTL locales supported, and a function to check whether a locale is RTL
const rtlLocales = [
    'ar',
    'ckb',
    'fa',
    'he'
];

const isRtl = locale => {
    return rtlLocales.indexOf(locale) !== -1;
};

export {locales as default, customLocales, localeMap, rtlLocales, isRtl};
