import locales, {localeMap, isRtl} from './supported-locales.js';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/zh';

export {
    locales as default,
    localeMap,
    isRtl
};
