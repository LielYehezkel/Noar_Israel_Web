// import createPersistedState from 'vuex-persistedstate'
import Cookie from 'js-cookie'
import {
  auth
} from "@/services/firebase";

// export const plugins = [createPersistedState({
//   getState: (key) => Cookie.getJSON(key),
//   setState: (key, state) => Cookie.set(key, state, {
//     expires: 3,
//     secure: false
//   })
// })]

export const state = () => ({
  user: null
});

export const fetch = () => {
  console.log("fetch");
}

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
    // if (account['token']) {
    //   Cookie.set('access_token', account['token']);
    // }
  },
  REMOVE_USER: (state) => {
    state.user = null;
    // Cookie.remove('access_token');
  }
};

export const actions = {
  async login({
    commit
  }, account) {
    try {
      if (!account) {
        commit('REMOVE_USER');
      }
      // Login the user
      await auth.signInWithEmailAndPassword(account.email, account.password);

      // Get JWT from Firebase
      // const token = await auth.currentUser.getIdToken();
      const {
        email,
        uid
      } = auth.currentUser;

      // Set JWT to the cookie
      // Cookie.set("access_token", token);

      // Set the user locally
      commit("SET_USER", {
        email,
        uid
      });
    } catch (error) {
      throw error;
    }
  },
  async signOut({
    commit,
  }) {
    try {
      await auth.signOut();
      commit('REMOVE_USER');
    } catch (error) {
      throw error;
    }
  }
};
