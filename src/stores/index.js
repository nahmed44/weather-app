import { createStore } from 'vuex'

export default createStore({
  state: {
    darkMode: null,
    bodyBgColor: '',
    textColor: '',  
    cityBgColor: '',
    toggleValue: '',  
  },
  mutations: {
   toggleDarkMode(state, userTheme){
    state.darkMode = userTheme;
    if(state.darkMode){
      state.bodyBgColor = '#021420';
      state.textColor = 'white';
      state.cityBgColor = '#0d2836';
    }
    else{
      state.bodyBgColor = '#d0cdcd92';
      state.textColor = '#021420';
      state.cityBgColor = '#ffffff';
    }
   },
   setToggleValue(state, value){
    state.toggleValue = value;
   }
  },
  actions: {
    checkDarkMode({commit}, initial){
      try {
        // Getting the user's theme preference from localStorage if it exists
        // const userPreference = Boolean(localStorage.getItem('darkMode'));
        const userPreference = localStorage.getItem('darkMode');
        // If the user preferred darkMode, we set app's theme to darkMode 
        if(userPreference === 'true'){
          commit('toggleDarkMode', true);
          // If the funtion is called on app init, we set the initial toggleValue based on the user's preference
          initial? commit('setToggleValue', true) : null; 
          return;
        }
        else if (userPreference === 'false') { // If the user did not prefer darkMode, we set app's theme to lightMode
          commit('toggleDarkMode', false);
          initial? commit('setToggleValue', false) : null; // If initial is true, we set the toggleValue to true
          return;
        }
      } catch (error) {
        console.log('User has not set a preference yet');
      }
      // User has not explictly set a preference yet, so we are checking the browser's theme
      // Setting darkMode to true if the browser prefers darkMode
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        commit('toggleDarkMode', true);
        initial? commit('setToggleValue', true) : null;
        return;
      }
      else{ // Browser is using lightMode, so the app defaults to lightMode as well
        commit('toggleDarkMode', false);
        initial? commit('setToggleValue', false) : null;
        return;
      }
      
    },

    // This function is called when the user clicks on the theme toggle button
    storeUserPreference({dispatch, state}){
      try {
        localStorage.setItem('darkMode', state.toggleValue);
        dispatch('checkDarkMode', false);
        return;
      } catch (error) {
        console.log('Enable to store user preference in local storage 😔😔');
      }
    }
  }
})