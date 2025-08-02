import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { enTranslations } from './locales/en'
import { ruTranslations } from './locales/ru'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: enTranslations },
			ru: { translation: ruTranslations },
		},
		fallbackLng: 'en',
		supportedLngs: ['en', 'ru'],
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			convertDetectedLanguage: lng => {
				return ['en', 'ru'].includes(lng) ? lng : 'en'
			},
		},
	})

export default i18n
