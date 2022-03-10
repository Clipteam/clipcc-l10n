import locales, {customLocales, localeMap, isRtl} from './supported-locales.js';

for (const lang in customLocales) {
    localeData.push(customLocales[lang]);
}

export {
    locales as default,
    localeMap,
    isRtl
};
