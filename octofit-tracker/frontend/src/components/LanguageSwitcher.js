import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="btn-group w-100" role="group" aria-label="Language switcher">
      <button
        type="button"
        className={`btn btn-sm ${i18n.language === 'en' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={() => changeLanguage('en')}
        title="English"
      >
        🇺🇸 EN
      </button>
      <button
        type="button"
        className={`btn btn-sm ${i18n.language === 'pt' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={() => changeLanguage('pt')}
        title="Português"
      >
        🇧🇷 PT
      </button>
    </div>
  );
};

export default LanguageSwitcher;
