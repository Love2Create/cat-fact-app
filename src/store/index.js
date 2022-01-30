import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

const baseURL = "https://catfact.ninja/";

export default new Vuex.Store({
  state: {
    breeds: null,
    firstName: null,
    score: 7,
    answeredFacts: [],
    randomFact: null,
  },
  mutations: {
    setBreeds(state, data){
      Vue.set(state, 'breeds', data);
    },
    setRandomFact(state, data){
      Vue.set(state, 'randomFact', data);
    }
  },
  actions: {
    async loadBreeds({commit}){

      // the Merkle way
      try{
        const response = await axios.get(`${baseURL}breeds`);
        commit('setBreeds', response.data.fact);
      }catch(err) {
        console.log(err);
      }

      // the Gongos way
      // axios.get(`${baseURL}breeds`).then(response => {
      //   commit('setBreeds', response.data.data);
      // })
    },

    async loadRandomFact({commit}){
      try{
        const response = await axios.get(`${baseURL}fact`);
        commit('setRandomFact', response.data.fact);
        // console.log(response, response.data.fact);
      }catch(err){
        console.log(err);
      }
    },
    async getQuestions({state}){
      try{
        const response = await axios.get(`${baseURL}facts`);
        // console.log(response.data.data);
        return response.data.data
          .filter(item => item.fact.split(' ').filter(_item => !isNaN(_item)).length)
          .filter(item => !state.answeredFacts.map(item=>item.fact).includes(item.fact));
      }catch(err){
        console.log(err);
        return [];
      }
    }, 
    addToAnsweredFacts({state}, data){
      state.answeredFacts.push(data);
    }
  },
  modules: {
  }
})
