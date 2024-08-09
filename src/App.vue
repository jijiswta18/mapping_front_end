<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
 

  data: () => ({
    //
  }),

};
</script>

<template>
  <!-- <div id="app"> -->
    <v-app id="app">

      
      
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view/>
    </v-app>
  <!-- </div> -->
</template>

<style lang="scss">


  @font-face {
    font-family: "chulabhornlikittext";
    src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-light.woff") format("woff");
    font-weight: 200;
    font-style: normal;
    font-display: block;
  }
  
  @font-face {
    font-family: "chulabhornlikittext";
    src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-regular.woff") format("woff");
    font-weight: 500;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: "chulabhornlikittext";
    src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-medium.woff") format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: "chulabhornlikittext";
    src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-bold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
    font-display: block;
  }

  #app {
    font-size: 18px;
    font-family: 'chulabhornlikittext', sans-serif;
    font-display: block;
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
  }

html{
  position: relative;
  min-height: 100%;
}

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;

// }

nav {
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
