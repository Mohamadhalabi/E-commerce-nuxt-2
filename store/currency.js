export const state = () => ({
  currency: ""
});

export const getters = {
  currency: state => {
    return state.currency;
  }
};

export const mutations = {
  setCurrencyValue: (state, currency) => {
    state.currency = currency
  }
}
