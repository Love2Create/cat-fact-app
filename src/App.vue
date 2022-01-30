<template>
  <div id="app">
    <h1>{{this.breeds}}</h1>
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  data(){
    return{
      maxQuestionRequest: 20,
    }
  },
  async created(){
    this.loadBreeds();
    this.loadRandomFact();
    const selectedQuestion = await this.processQuestion();
    this.addToAnsweredFacts(selectedQuestion);
  },
  methods:{
    ...mapActions(['loadBreeds', 'loadRandomFact', 'getQuestions', 'addToAnsweredFacts']),
    async processQuestion(attempt=0){
      if(attempt < this.maxQuestionRequest){
          const questionsArr = await this.getQuestions();
        // console.log(questionsArr[0]);

        if(questionsArr.length){
          // logic for selected question
          console.log('first try');
          return questionsArr[0];
        }else{
          console.log('not first try');
          return await this.processQuestion(attempt+1);
        }
      }
    }
  },
  computed:{
    ...mapState(['answeredFacts']),
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
