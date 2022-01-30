<template>
  <div class="hello">
    <p>{{ randomFact }}</p>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'HelloWorld',

  computed:{
    ...mapState(['score','breeds','randomFact']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
