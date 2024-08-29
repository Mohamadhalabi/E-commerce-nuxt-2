export default ({ app, store }) => {
    // Set the language initially when the app loads
    store.commit('rtlStore/setLan', app.i18n.locale);
  
    // Watch for language changes
    app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
      store.commit('rtlStore/setLan', newLocale);
    };
  };
  