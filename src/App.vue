<template>
  <v-app>
    <!-- Header -->
    <v-toolbar class="header-bar"></v-toolbar>

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app class="side-bar">
      <div class="profile text-center">
          <v-avatar image="smirk.png" size="80"></v-avatar>
        </div>
        <label class="f-13" for="Mapping List">Mapping List</label>
        <v-list class="menu" dense>
        <v-list-item 
          v-for="(item, index) in items" 
          :key="index" 
          @click="navigateTo(item.route)" 
          :class="{ 'active': isRouteActive(item.route) }"
        >
          <v-list-item-content active-class="activemenu">
            <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Content -->
    <v-main>
      <v-container fluid>
        <v-row class="pl-3">
          <div class="banner">
            <h1 class="text-white text-image">Mapping Interface</h1>
            <img src="@/assets/image/banner.jpg"/>
          </div>
        </v-row>

        <div class="box-content mt-6">
           <!-- Main content goes here -->
          <router-view></router-view>

        </div>

         
       
      </v-container>
    </v-main>
  </v-app>
</template>


<script>

export default {
  name: 'App',

  data: () => ({
    drawer: true,
      items: [
        { title: 'ArPaymentTerm', route: '/ArPaymentTerm'},
        { title: 'ARCode', route: '/TMArCode'},
        { title: 'ARAccountGroup', route: '/ARAccountGroup'},
        { title: 'StoreMedecine', route: '/'},
        { title: 'TMHNActivityAndGL', route: '/TMHNActivityAndGL'},
        { title: 'CashAndGL', route: '/CashAndGL'},
        { title: 'EmployeeStatus', route: '/EmployeeStatus'}
        // Add more sidebar items as needed
      ]
    //
  }),
  methods: {
    navigateTo(route) {

      if (this.$route.path !== route) {
        // Navigate to the specified route
        this.$router.push(route);
      }
      // console.log(route);
      // Navigate to the specified route
      // this.$router.push(route);
      // this.$router.push({ path: `${route}` });
    },
    isRouteActive(route) {
      // Check if the given route matches the current route
      return this.$route.path === route;
    }
  }
};
</script>
<style>
    @font-face {
      font-family: "chulabhornlikittext";
      src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-light.woff") format("woff");
      font-weight: 200;
    }

    @font-face {
      font-family: "chulabhornlikittext";
      src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-regular.woff") format("woff");
      font-weight: 500;
    }

    @font-face {
      font-family: "chulabhornlikittext";
      src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-medium.woff") format("woff");
      font-weight: 400;
    }

    @font-face {
      font-family: "chulabhornlikittext";
      src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-bold.woff") format("woff");
      font-weight: 700;
    }

    #app {
      font-size: 18px;
      font-family: 'chulabhornlikittext', sans-serif;
    }

  .header-bar{
    background-color: #001A78!important;
    height: 60px;
    top: 0px;
    z-index: 1014;
    transform: translateY(0px);
    position: fixed;
    left: 0px;
    width: calc(100% + 0px);


  }
  .side-bar{
    background-color: #D9D9D9!important;
    left: 0px;
    z-index: 1008;
    position: fixed;
    bottom: 0px;
    top: 70px!important;
    padding: 0.5rem;
    
  }
  .v-main{
    padding-top: 70px!important;
  }

  .menu .v-list-item {
    background: white;
    margin-bottom: 0.5rem;
  }
  .banner{
    height: 225px;
    overflow: hidden;
    position: relative;
  }
  .text-image{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    padding: 2rem;

  }

  .f-13{
    font-size: 13px;
  }
  .active {
  background: #F9BA7F!important; /* Adjust color as needed */
}
  .f-20{
    font-size: 20px;
  }
  .f-16{
      font-size: 16px;
  }
  .f-12{
    font-size: 14px;
  }

  .bg-red{
        background: #ff5252;
    } 
  .text-white span{
      color: white;
  }
  .text-white{
      color: white;
  }
  .text-back{
      color: #000;
  }

  /* custom sweetAlert */
  div:where(.swal2-container) div:where(.swal2-popup) {
    font-family:'chulabhornlikittext', sans-serif !important;
  }
   
  .text-warning{
      color: #FFC048;
  }
  .text-success{
      color: #001A78;
  }
  .text-error{
      color: #C72C2C;
  }

  .swal2-confirm{
    background-color: #52A1DB!important;
  }

  table{
   
    /* display: block; */
    overflow-x: auto;
    white-space: nowrap;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 6px;
    border: 1px solid #D9D9D9;
  }

  ::-webkit-scrollbar-track {
    border-radius: 0;
    background: #eeeeee;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background: #D9D9D9;
  }

  .border-right{
        border-right: 1px solid;
        border-right-color: #D9D9D9;
        margin: 1rem 0; 
    }

</style>
