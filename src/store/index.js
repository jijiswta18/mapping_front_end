import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VuexPersistence from 'vuex-persist';
// import { isSessionExpired } from '@/utils'; 
Vue.use(Vuex);

const getDefaultState = () => {
  return {
    user: null,
    checkUser: null,
    isLoggedIn: !!localStorage.getItem('isLoggedIn'),
    expiryDate: null,
    // loginExpiryDate: null,
    // timeoutId: null
  }
}

const store = new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  state: getDefaultState(),

  getters: {
    user (state) {
      return state.user
    },
    checkUser (state) {
      return state.checkUser
    },
    isLoggedIn(state){
      return state.isLoggedIn
    },
    expiryDate(state){
      return state.expiryDate
    },
    // loginExpiryDate(state){
    //   return state.loginExpiryDate
    // },
    // timeoutId(state){
    //   return state.timeoutId
    // },
  

  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', true); // Set isLoggedIn in localStorage
   
    
    },
    
    checkUser (state, data) {
        state.checkUser = data
     
    },
    checkExpiryDate (state, expiryDate) {
      state.expiryDate = expiryDate;
     
    },
    clearUser(state) {
      state.user = null;
      state.checkUser = null;
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn'); // Clear isLoggedIn from localStorage
      state.expiryDate = null
    },

    // setLoginExpiryDate(state, expiryDate) {
    //   state.loginExpiryDate = expiryDate;
    // },
    // clearLoginExpiryDate(state) {
    //   state.loginExpiryDate = null;
    // },
    // clearTimeoutId(state) {
    //   if (state.timeoutId) {
    //     clearTimeout(state.timeoutId);
    //     state.timeoutId = null;
    //   }
    // }
    

  },
  actions: {
    async login({ commit }, authData) {

        let adPath = `/active_directory/login`
              
        let response = await axios.post(adPath, authData);

        if(response.data.code === "200"){
            const user = response.data.result
            commit('checkUser', "200");
            commit('setUser', user);

            const expiryDate = new Date().getTime() + (60 * 60 * 1000); // 5 minutes from now
            commit('checkExpiryDate', expiryDate);
            localStorage.setItem('loginExpiryDate', expiryDate); // Save expiry date in local storage

            // const  user = response.data.result;
            // commit('setUser', user);

        }else{
            commit('checkUser', "204");
            commit('setUser', null);
        }
 
    },

    logout({ commit }) {
      commit('clearUser'); // Clear user state on logout
    },

    checkLogin({ commit }) {

      const expiryDate = localStorage.getItem('loginExpiryDate');
      if (expiryDate && parseInt(expiryDate) > new Date().getTime()) {
        commit('checkExpiryDate', expiryDate);
      } else {

        commit('clearUser');
        localStorage.removeItem('loginExpiryDate');
      }
    },

    // startSessionTimeout({ commit, state }) {
    //   if (state.loginExpiryDate) {
    //     const now = new Date().getTime();
    //     const timeout = state.loginExpiryDate - now;

    //     if (timeout > 0) {
    //       state.timeoutId = setTimeout(() => {
    //         commit('clearLoginExpiryDate');
    //         commit('clearUser');
    //         // Perform logout or redirect to login page
    //         // Example: router.push('/login');
    //       }, timeout);
    //     }
    //   }
    // },
    // setLoginExpiry({ commit, dispatch }, expiryDate) {
    //   commit('setLoginExpiryDate', expiryDate);
    //   dispatch('startSessionTimeout');
    // },
    // clearSessionTimeout({ commit }) {
    //   commit('clearLoginExpiryDate');
    //   commit('clearTimeoutId');
    // }

   
  },

});


export default store;
