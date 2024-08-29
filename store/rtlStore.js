// state
export const state = () => ({
  selectedLan: 'en',
  isAr: false
});

// getters
export const getters = {
  getLan: state => state.selectedLan,
  getIsAr: state => state.isAr,
};

// mutations
export const mutations = {
  setLan: (state, payload) => {
    state.selectedLan = payload;
    state.isAr = payload === 'ar';
  }
};

// actions
export const actions = {
  // No need for setLanguageFromURL anymore, as the plugin handles it
};
