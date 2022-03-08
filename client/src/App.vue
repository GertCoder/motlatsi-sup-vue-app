<template>
  <div id="app">
    <div class="container">
      <h1 class="heading">List of Things</h1>
      <thing-list></thing-list>
    </div>
  </div>
</template>

<script>
import ThingList from './components/ThingList'

export default {
  name: 'App',
  components: {
    ThingList
  }
}
</script>

<style lang="scss">
body {
    height: 100vh;
    margin: 0;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f0f0f0;
  font-size: 0.9rem;
  height: 100%;
  align-items: center;
  background: rgb(10, 25, 41);
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;

  .heading {
    font-size: 2.5rem;
  }
}
</style>
