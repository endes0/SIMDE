"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _i18n = require("i18next");
var index_js_1 = require("i18next-xhr-backend/dist/es/index.js");
var index_js_2 = require("i18next-browser-languagedetector/dist/es/index.js");
var i18n = _i18n
    .use(index_js_1.default)
    .use(index_js_2.default)
    .init({
    fallbackLng: 'en',
    react: {
        wait: true
    },
    backend: {
        loadPath: 'locales/{{lng}}/{{ns}}.json'
    },
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: true,
    cache: {
        enabled: true
    },
    interpolation: {
        escapeValue: false,
        formatSeparator: ',',
        format: function (value, format, lng) {
            if (format === 'uppercase') {
                return value.toUpperCase();
            }
            return value;
        }
    }
});
exports.default = i18n;
//# sourceMappingURL=i18n.js.map