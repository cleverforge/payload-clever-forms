export const cleverFormsTranslations = {
  en: { submit: 'Submit', previous: 'Previous', next: 'Next', submitting: 'Submitting...', required: 'Required', success: 'Thank you. Your form has been submitted.' },
  es: { submit: 'Enviar', previous: 'Anterior', next: 'Siguiente', submitting: 'Enviando...', required: 'Obligatorio', success: 'Gracias. Su formulario ha sido enviado.' },
  fr: { submit: 'Envoyer', previous: 'Précédent', next: 'Suivant', submitting: 'Envoi...', required: 'Obligatoire', success: 'Merci. Votre formulaire a été envoyé.' },
} as const

export type CleverFormsLocale = keyof typeof cleverFormsTranslations
