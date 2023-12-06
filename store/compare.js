import Api from '~/api';

export const state = () => ({
  count: 0,
  list: []
});

export const getters = {
  getCounts: state => {
    return state.count;
  },
  getList: state => {
    return state.list;
  }
};

export const actions = {
  fetchList: async function ({ commit }) {
    if (localStorage.getItem('tokenEnded') == '1') {
      let compareList = JSON.parse(localStorage.getItem('compare')) || [];
      commit('UPDATE_COMPARE', compareList);
      return;
    }
    const response = await Api.get('products/compares');
    await commit('UPDATE_COMPARE', response.data.products);
  },

  addToList: async function ({ commit }, payload) {
    if (localStorage.getItem('tokenEnded') == 1) {
      let compareList = JSON.parse(localStorage.getItem('compare')) || [];

      for (let i = 0; i < compareList.length; i++) {
        if (compareList[i].id == payload.id) {
          this._vm.$notify({
            group: 'CompareNotify',
            text: payload.sku + ' products alredy in wishlist',
            type: 'success'
          });
          return;
        }

      }
      let concateCompare = compareList.concat([payload]);
      localStorage.setItem('compare', JSON.stringify(concateCompare));
      commit('UPDATE_COMPARE', JSON.parse(localStorage.getItem('compare'), true));
      this._vm.$notify({
        group: 'CompareNotify',
        type: 'success',
        text: 'Has been added to your compare',
        data: payload
      });
      return;
    }
    if (localStorage.getItem('tokenEnded') == '1') return;

    let compareItems = await Api.get('products/compares');
    for (let i = 0; i < compareItems.data.products.length; i++) {
      if (compareItems.data.products[i].id == payload.id) {
        this._vm.$notify({
          group: 'CompareNotify',
          text: payload.sku + ' is already in your compare',
          data: payload,
          type: 'success'
        });
        return;
      }
    }


    await Api.post('products/compares', { 'product': payload.slug });
    this._vm.$notify({
      group: 'CompareNotify',
      type: 'success',
      text: 'Has been added to your compare',
      data: payload,
    });

    const response = await Api.get('products/compares');
    await commit('UPDATE_COMPARE', response.data.products);
  },

  removeFromList: async function ({ commit }, payload) {
    if (localStorage.getItem('tokenEnded') == '1') {
      let compareList = JSON.parse(localStorage.getItem('compare'));
      compareList.splice(parseInt(payload.index), 1);
      localStorage.setItem('compare', JSON.stringify(compareList));

      await commit('UPDATE_COMPARE', compareList);
    }
    else {
      await Api.post('products/compares/remove', { 'product': payload.product.slug });
      this._vm.$notify({
        group: 'CompareNotify',
        type: 'success',
        text: 'Has been removed from your compare',
        data: payload.product
      });
      const response = await Api.get('products/compares');
      await commit('UPDATE_COMPARE', response.data.products);
    }
  },

  afterLogOutCompare: async function ({ commit }, payload) {
    await commit('RESET_COMPARE', []);
  },

};

export const mutations = {
  UPDATE_COMPARE: function (state, payload) {
    state.count = payload.length;
    state.list = payload;
  },
  RESET_COMPARE: function (state, payload) {
    state.list = payload;
    state.count = 0;
  }
};
