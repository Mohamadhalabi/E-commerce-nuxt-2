<template>
  <div class="">
    <ul class="menu main-menu nav-categories">
      <div @click="closeAllNav()">
        <nuxt-link :to="getLink('/')">
          <li class="menu-list-items mb-0">
            {{ $t("header.home") }}
          </li>
        </nuxt-link>
      </div>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
        <div class="d-flex justify-content-between align-items-center w-100" @click="KeyRemoteMenu(),getKeysAndRemotes()">
          <span class="mobile-menu-links">{{ $t("header.keysAndRemote") }}</span>
          <span class="mobile-menu-toggle-button">&#x25BE;</span>
        </div>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
        <div class="d-flex justify-content-between align-items-center w-100" @click="accessoriesMenu(),getAccessoriesAndTools()">
          <span class="mobile-menu-links">{{ $t("header.AccessoriesAndTools") }}</span>
          <span class="mobile-menu-toggle-button">&#x25BE;</span>
        </div>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
        <div class="d-flex justify-content-between align-items-center w-100" @click="DeviceMachineMenu(),getDevicesAndMachines()">
          <span class="mobile-menu-links">{{ $t("header.DeviceAndMachine") }}</span>
          <span class="mobile-menu-toggle-button">&#x25BE;</span>
        </div>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
        <div class="d-flex justify-content-between align-items-center w-100" @click="manufacturersMenu(),getManufacturers()">
          <span class="mobile-menu-links">{{ $t("header.Manufactures") }}</span>
          <span class="mobile-menu-toggle-button">&#x25BE;</span>
        </div>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
        <div class="d-flex justify-content-between align-items-center w-100" @click="tokenSoftwareMenu()">
          <span class="mobile-menu-links">{{ $t("header.TokensAndSoftware") }}</span>
          <span class="mobile-menu-toggle-button">&#x25BE;</span>
        </div>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
        <div class="d-flex justify-content-between align-items-center w-100" @click="carsMenu(),getCars()">
          <span class="mobile-menu-links">{{ $t("header.Cars") }}</span>
          <span class="mobile-menu-toggle-button">&#x25BE;</span>
        </div>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" @click="closeAllNav()">
        <nuxt-link :to="getLink('/emulators')" class="d-flex w-100 justify-content-between align-items-center">
          <span class="mobile-menu-links">{{ $t("header.Emulators") }}</span>
        </nuxt-link>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" @click="closeAllNav()">
        <nuxt-link :to="getLink('/downloads')" class="d-flex w-100 justify-content-between align-items-center">
          <span class="mobile-menu-links">{{ $t("header.downloads") }}</span>
        </nuxt-link>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" style="background-color:orange;" @click="closeAllNav()">
        <nuxt-link :to="getLink('/pin-code')" class="d-flex w-100 justify-content-between align-items-center">
          <span class="mobile-menu-links text-white">{{ $t("header.PinCode") }}</span>
        </nuxt-link>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" @click="closeAllNav()">
        <nuxt-link :to="getLink('/shop?free-shipping')" class="d-flex w-100 justify-content-between align-items-center">
          <span class="mobile-menu-links-red">{{ $t("header.FreeShipping") }}</span>
        </nuxt-link>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" style="background-color:red;" @click="closeAllNav()">
        <nuxt-link :to="getLink('/shop?offers')" class="d-flex w-100 justify-content-between align-items-center">
          <span class="mobile-menu-links text-white">{{ $t("header.Offer") }}</span>
        </nuxt-link>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" @click="closeAllNav()">
        <nuxt-link :to="getLink('/shop?bundled')" class="d-flex w-100 justify-content-between align-items-center">
          <span class="mobile-menu-links-red">{{ $t("header.Bundles") }}</span>
        </nuxt-link>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" @click="closeAllNav()">
        <nuxt-link :to="getLink('/unlock-remote-services')" class="d-flex w-100 justify-content-between align-items-center">
          <span class="mobile-menu-links-red">{{ $t("header.unlockService") }}</span>
        </nuxt-link>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" @click="closeAllNav()">
        <nuxt-link :to="getLink('/online-services')" class="d-flex w-100 justify-content-between align-items-center">
          <span class="mobile-menu-links-red">{{ $t("header.OnlineServices") }}</span>
        </nuxt-link>
      </li>

      <hr class="mt-0 mb-0 dashed">

      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" v-if="isAuthenticated">
        <div class="text-center">
          <button class="login-button w-50" @click="LogOut(),closeAllNav()">
            {{ $t("account.log_out") }}
          </button>
        </div>
      </li>

      <hr class="mt-0 mb-0 dashed">
    </ul>
    <div id="mySidenav" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.keysAndRemote") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item, index) in keysAndRemotes" :key="index" class="px-3">
        <div v-for="(item2, index2) in item" :key="index2" class="mb-2">
          <div v-if="item2.slug && item2.slug !== ''">
            <nuxt-link
              :to="'/' + item2.slug"
              class="d-block py-2 w-100 border-bottom"
              @click.native="closeAllNav()"
            >
              <span class="font-weight-bold">
                {{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div id="mySidenav2" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.AccessoriesAndTools") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item, index) in accessoriesAndTools" :key="index" class="px-3">
        <div v-for="(item2, index2) in item" :key="index2" class="mb-2">
          <div v-if="item2.slug && item2.slug !== ''">
            <nuxt-link
              :to="'/' + item2.slug"
              class="d-block py-2 w-100 border-bottom"
              @click.native="closeAllNav()"
            >
              <span class="font-weight-bold">
                {{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div id="mySidenav3" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.DeviceAndMachine") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item, index) in devicesAndMachines" :key="index" class="px-3">
        <div v-for="(item2, index2) in item" :key="index2" class="mb-2">
          <div v-if="item2.slug && item2.slug !== ''">
            <nuxt-link
              :to="'/' + item2.slug"
              class="d-block py-2 w-100 border-bottom"
              @click.native="closeAllNav()"
            >
              <span class="font-weight-bold">
                {{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div id="mySidenav4" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.Manufactures") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item, index) in manufacturers" :key="index" class="px-3">
        <div v-for="(item2, index2) in item" :key="index2" class="mb-2">
          <div v-if="item2.slug && item2.slug !== ''">
            <nuxt-link
              :to="'/' + item2.slug"
              class="d-block py-2 w-100 border-bottom"
              @click.native="closeAllNav()"
            >
              <span class="font-weight-bold">
                {{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div id="mySidenav5" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.Cars") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item, index) in cars" :key="index" class="px-3">
        <div v-for="(item2, index2) in item" :key="index2" class="mb-2">
          <div v-if="item2.slug && item2.slug !== ''">
            <nuxt-link
              :to="'/' + item2.slug"
              class="d-block py-2 w-100 border-bottom"
              @click.native="closeAllNav()"
            >
              <span class="font-weight-bold">
                {{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div id="mySidenav6" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.TokensAndSoftware") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div class="px-3">
        <div class="mb-2 font-weight-bold">{{ $t("common.software") }}</div>
        <div v-for="(itemm, index) in $settings.main_menu" :key="index">
          <div v-for="(item2, index2) in itemm.items" :key="index2">
            <div v-if="itemm.slug === 'tokens-software'">
              <div v-for="(item3, index3) in item2" :key="index3">
                <div v-if="item3.slug.includes('software')">
                  <nuxt-link
                    :to="'/' + item3.slug"
                    class="d-block py-2 w-100 border-bottom"
                    @click.native="closeAllNav()"
                  >
                    <span class="font-weight-bold">
                      {{ item3.name && item3.name[$i18n.locale] ? item3.name[$i18n.locale] : 'N/A' }}
                    </span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr>

        <div class="mb-2 font-weight-bold">{{ $t("common.token") }}</div>
        <div v-for="(itemm, index) in $settings.main_menu" :key="index">
          <div v-for="(item2, index2) in itemm.items" :key="index2">
            <div v-if="itemm.slug === 'tokens-software'">
              <div v-for="(item3, index3) in item2" :key="index3">
                <div v-if="item3.slug.includes('token')">
                  <nuxt-link
                    :to="'/' + item3.slug"
                    class="d-block py-2 w-100 border-bottom"
                    @click.native="closeAllNav()"
                  >
                    <span class="font-weight-bold">
                      {{ item3.name && item3.name[$i18n.locale] ? item3.name[$i18n.locale] : 'N/A' }}
                    </span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import img from "~/static/images/blank.png";
import Api from "~/api";
export default {
  data: function () {
    return {
      manufacturers : [],
      cars: [],
      keysAndRemotes: [],
      accessoriesAndTools: [],
      devicesAndMachines: [],
      softwareAndTokens: [],
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("authentication", ["isAuthenticated", "StateUser"]),
    totalLength: function() {
      const mainMenuLength = Object.keys(this.$settings.main_menu).length;
      const menusLength = Object.keys(this.$settings.menus).length;
      return mainMenuLength + menusLength;
    },
  },
  methods: {
    ...mapActions("shop", ["getCartList"]),
    ...mapActions("compare", ["fetchList"]),
    ...mapActions("fav", ["fetchWishlist"]),

    getKeysAndRemotes: function(){
      if(JSON.parse(JSON.stringify(this.keysAndRemotes)).length == 0){
        Api.get('/keys-and-remotes-menu')
        .then(response => {
          this.keysAndRemotes = response.data.data.menu.main_menu['Key-Remote'];
        })
        .catch(error => ({error: JSON.stringify(error)}));
      }
    },
    getAccessoriesAndTools: function(){
      if(JSON.parse(JSON.stringify(this.accessoriesAndTools)).length == 0){
        Api.get('/accessories-tools-menu')
        .then(response => {
          this.accessoriesAndTools = response.data.data.menu.main_menu['accessories-tools'];
        })
        .catch(error => ({error: JSON.stringify(error)}));
      }
    },
    getDevicesAndMachines: function(){
      if(JSON.parse(JSON.stringify(this.devicesAndMachines)).length == 0){
        Api.get('/device-machine-menu')
        .then(response => {
          this.devicesAndMachines = response.data.data.menu.main_menu['device_machines'];
        })
        .catch(error => ({error: JSON.stringify(error)}));
      }
    },
    getManufacturers: function() {
      if(JSON.parse(JSON.stringify(this.manufacturers)).length == 0){
        Api.get('/manufacturers_menu')
        .then(response => {
          this.manufacturers = response.data.data.menu.main_menu.manufacturers
        })
        .catch(error => ({error: JSON.stringify(error)}));
      }
    },
    getCars: function() {
      if(JSON.parse(JSON.stringify(this.cars)).length == 0){
        Api.get(`/menu`)
        .then(response => {
          this.cars = response.data.data.menu.main_menu.cars;
        })
        .catch(error => ({error: JSON.stringify(error)}));        
      }
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    checkURL(url) {
      if (url) {
        return url;
      } else {
        return "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
      }
    },
    defaultAvatar(e) {
      e.target.src = img;
    },
    KeyRemoteMenu(){
      document.getElementById("mySidenav").style.width = "260px";
    },
    accessoriesMenu(){
      document.getElementById("mySidenav2").style.width = "260px";
    },
    DeviceMachineMenu(){
      document.getElementById("mySidenav3").style.width = "260px";
    },
    manufacturersMenu(){
      document.getElementById("mySidenav4").style.width = "260px";
    },
    carsMenu(){
      document.getElementById("mySidenav5").style.width = "260px";
    },
    tokenSoftwareMenu(){
      document.getElementById("mySidenav6").style.width = "260px";
    },
    closeNav(){
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenav2").style.width = "0";
      document.getElementById("mySidenav3").style.width = "0";
      document.getElementById("mySidenav4").style.width = "0";
      document.getElementById("mySidenav5").style.width = "0";
      document.getElementById("mySidenav6").style.width = "0";
    },
    closeAllNav(){
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenav2").style.width = "0";
      document.getElementById("mySidenav3").style.width = "0";
      document.getElementById("mySidenav4").style.width = "0";
      document.getElementById("mySidenav5").style.width = "0";
      document.getElementById("mySidenav6").style.width = "0";
      document.querySelector("body").classList.remove("mmenu-active");
    },
    LogOut() {
      // this.$Progress.start();
      this.$auth.logout().then((res) => {
        // localStorage.setItem("tokenEnded", 1);
        this.fetchList();
        this.fetchWishlist();
        this.getCartList();
        this.closeNav()
        this.$router.push("/");
      });
      // this.$Progress.finish();
    },
  },
};
</script>
