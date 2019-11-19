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
  },
  REMOVE_USER: (state) => {
    state.user = null;
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
      
      await auth.signInWithEmailAndPassword(account.email, account.password);

      const {
        email,
        uid
      } = auth.currentUser;

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
