<template>
  <v-app>
    <!-- Header -->
    <v-toolbar class="header-bar">
      <v-btn icon @click.stop="toggleMenu" class="display-none responsive-block">
            <v-icon >mdi-menu</v-icon>
          </v-btn> 
      <div class="box-right">
        <div class="btn-logout" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </div>
      </div>
    
     
      <!-- Header content -->
    </v-toolbar>

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app class="side-bar">
      <!-- Profile section -->
      <div class="profile text-center">
        <img src="@/assets/image/profile.png" />
        <div class="f-13">{{ user.user?.full_name }}</div>
        <div class="f-13">{{ user.user?.position }}</div>
      </div>

      <!-- Navigation links -->
      <label class="f-13" for="Mapping List">Mapping List</label>
      <nav class="menu">
        <ul>
          <li v-for="item in items" :key="item.route" :class="{ 'active': isRouteActive(item.route) }">
            <router-link :to="item.route">{{ item.title }}</router-link>
          </li>
        </ul>
      </nav>
      <!-- <v-list class="menu" dense>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="navigateTo(item.route)"
          :class="{ 'active': isRouteActive(item.route) }"
        >
          <v-list-item-content active-class="activemenu">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
    </v-navigation-drawer>

    <!-- Content -->
    <v-main>
      <v-container fluid>
        <v-row class="pl3">
          <!-- Banner section -->
          <div class="banner">
            <h1 class="text-white text-image">Mapping Interface</h1>
            <img src="@/assets/image/banner.jpg" />
          </div>
        </v-row>

        <!-- Main content area -->
        <div class="box-content mt-6">
          <!-- Router view for displaying different pages based on route -->
          <router-view></router-view>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import Swal from 'sweetalert2';
import store  from '../store/index.js';

export default {
  name: 'MainLayout',

  data: () => ({
    drawer: true,
    items: [
      { title: 'ArPaymentTerm', route: '/ArPaymentTerm' },
      { title: 'ARAccountGroup', route: '/ARAccountGroup' },
      { title: 'StoreMedecine', route: '/StoreMedecine' },
      { title: 'TMArCode', route: '/TMArCode' },
      { title: 'TMHNActivityAndGL', route: '/TMHNActivity' },
      { title: 'CashAndGL', route: '/CashAndGL' },
      { title: 'EmployeeStatus', route: '/EmployeeStatus' }
      // Add more sidebar items as needed
    ],
    user: store.getters

  }),

  // created() {
  //   console.log('App.vue created');
  //   store.dispatch('checkLogin').then(() => {
  //     console.log('checkLogin dispatched successfully');
  //   }).catch(error => {
  //     console.error('Error dispatching checkLogin:', error);
  //   });
  // },
  methods: {
    toggleMenu() {
      this.drawer = !this.drawer;
    },
    navigateTo(route) {
      if (this.$route.path !== route) {
        // Navigate to the specified route
        this.$router.push(route);
      }
    },

    isRouteActive(route) {
      // Check if the given route matches the current route
      return this.$route.path === route;
    },
    async logout() {
      Swal.fire({
        icon: "warning",
        title: "คุณต้องการออกจากระบบ",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: `ยกเลิก`
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await store.dispatch("logout");

          await this.$router.push("/login");
          // await location.reload();

        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  }
};
</script>
  <style>
    @media only screen and (max-width: 1024px) {
      .pl3{
        padding-left: 0!important;
      }
      .responsive-block{
        display: block!important;
      }
    }
    .display-none{
    display: none;
  }
  .responsive-block i{
    color: white!important;
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
    .box-right{
      width: 100%;
      text-align: right;
    }
    .btn-logout{
      border: 1px solid #F9BA7F;
      display: inline-block;
      padding: 0.5rem;
      border-radius: 4px;
      background: #F9BA7F;
      font-size: 16px;
      cursor: pointer;
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
    
  
    .menu{
      padding: 0;
    }
    .menu ul{
      list-style: none;
      padding-left: 0;
      margin-top: 0.5rem;
    }
  
    .menu li{
      background: white;
      margin-bottom: 0.5rem;
    }
    .menu li a{
      color: #000;
      font-weight: 400;
      text-decoration: none;
      display: inline-block;
      padding: 11px;
      font-size: 12px;
      width: 100%;

    }
    /* .menu .v-list-item {
      background: white;
      margin-bottom: 0.5rem;
    } */
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
      font-display: block;
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
    .profile img{
      width: 50%;
    }
    .profile{
      margin: 1rem 0;
    }

    .v-tab{
        background: #D9D9D9!important;
        color: #000!important;
        margin-right: 0.5rem;
    }
    .v-tab--active{
        background: #F9BA7F!important;
    }
    ::v-deep .v-tabs-slider{
        display: none;
    }
    ::v-deep .style-table thead.v-data-table-header {
        background: #D9D9D9!important;
    }

    ::v-deep .style-table thead.v-data-table-header span{
        color: #000;
    }
  
    ::v-deep .style-table td{
        border: 1px solid #D9D9D9;
    }

    .border-b-lg{
        height: 5px!important;
        width: 100%!important;
        background: #F9BA7F;

    }
    .style-card{
        padding: 16px
    }

    .bg-blue{
        background-color: #7FA9F9!important;
    }
    .bg-orange{
        background-color: #F9BA7F!important;
        
    }
    ::v-deep .dialog-search{
        height: 550px!important;
    }
    .h25{
        height: 25px;
    }

    .border-bottom{
        border-bottom-style: solid;
        border-bottom-width: thin;
        border-bottom-color: #D9D9D9;
    }
    .border-gray{
        height: 3px !important;
        width: 100% !important;
        background: #D9D9D9;
    }
    .btn-with-icon{
        height: auto!important;
        min-width: auto!important;
        padding: 0!important;
    }
   
    .custom-v-select{
        margin: 0;
        padding: 0;
        display: ruby;
        flex: none;
    }
    ::v-deep .custom-v-select .v-select__selections {
        display: none!important;
    }

    ::v-deep .custom-v-select .v-input__append-inner {
        background-color: #ABABAB;
        cursor: pointer;
        padding: 0;
        margin: 0;
        border-radius: 4px;
    }

    ::v-deep .v-text-field > .v-input__control > .v-input__slot:before {
      border-style: none;
    }
    
    .line-height{
        line-height: 1.8;
    }
    
    .pl3{
        padding-left: 12px;
      }
    
  
  </style>
  