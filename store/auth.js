import Api from '~/api';
import { pick, includes } from 'lodash';

export const state = () => ({
  user: null,
  token: null
});

export const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
  getToken: (state) => state.token
};

export const actions = {
  Register: async function ({ dispatch }, form) {
    form = pick(form, ['name', 'email', 'password', 'confirm_password']);
    await Api.post('user/auth/register', form);
    let user = pick(form, ['email', 'password']);
    await dispatch('LogIn', user);
  },

  LogIn: async function ({ commit, dispatch }, user) {
    user = pick(user, ['email', 'password']);
    user = await Api.post('user/auth/login', user).then((res) => {
      let u = pick(res.data.user, ['name', 'email', 'avatar']);
      let token = res.data.authorisation.token;
      commit('SET_USER', u);
      commit('SET_TOKEN', token);
      dispatch('compare/fetchList', null, { root: true });
      dispatch('shop/getCartList', null, { root: true });
      dispatch('fav/fetchWishlist', null, { root: true });

      this._vm.$notify({
        group: 'custom-notify',
        type: 'success',
        text: res.data.status
      });

      let currentPath = this.$router.currentRoute.fullPath;
      if (includes(currentPath, '/auth')) {
        this.$router.push('/account');
      } else {
        this.$router.push({ path: currentPath, query: { logged_in: true } });
      }

    }).catch((err) => {
      this._vm.$notify({
        group: 'errorMessage',
        type: 'error',
        text: err.response.data.message[0]
      });
    });


  },

  LogOut: async function ({ commit }) {
    const response = await Api.post('user/auth/logout');
    await commit('LOGOUT');
    await this.$router.push('/auth/login');
    localStorage.setItem('tokenEnded', 1);
    await this._vm.$notify({
      group: 'addProduct',
      type: 'success',
      text: response.data.data.message
    });
  },
  // / forgot Password
  forgotPassword(_, email) {
    return Api.post('forget-password', { email });
  },
  // / reset Password
  resetPassword(_, data) {
    return Api.post('reset-password', data);
  },
  // / login with facebook
  loginWithFacebook(_, data) {
    return Api.post('user/auth/login-with-facebook', data);
  },
  // / login with facebook
  loginWithGoogle(_, data) {
    return Api.post('user/auth/login-with-google', data);
  },
  // / set user by token
  setUser({ commit }, data) {
    let u = pick(data.user, ['name', 'email', 'avatar']);
    const token = data.token;
    commit('SET_USER', u);
    commit('SET_TOKEN', token);
    this._vm.$notify({
      group: 'custom-notify',
      type: 'success',
      text: 'LogedIn'
    });
    this.$router.push('/account');

  },

  setNewData: async function ({ commit }) {
    let user = null;
    await Api.get('/user/profile').then((responce) => {
      user =responce.data.user_info;
    }).catch((error) => {
      console.log(error.data);
    })
    await commit('SET_USER', user);
  }
};

export const mutations = {
  SET_USER: function (state, user) {
    state.user = user;
  },

  SET_TOKEN: function (state, token) {
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('tokenEnded', 0);
    localStorage.setItem('version', process.env.version);
    state.token = token;
  },

  LOGOUT: function (state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem('card');
    localStorage.removeItem('tlkeys');
    delete Api.defaults.headers.common['Authorization'];
  },

  SET_AUTHENTICATED_FALSE: function (state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem('card');
    localStorage.removeItem('tlkeys');
    delete Api.defaults.headers.common['Authorization'];
  }
};
