<template>
  <div class="header-menu main-nav" :class="{ 'text-right': getIsAr }">
    <nav class="menu nav-categories header-main-menu">
      <!-- Cars Menu -->
      <nav class="left-menu-items" @click="getCars()" :class="{ 'orange-background': carMenuOpened }">
        <nuxt-link
          :to="getLink('#')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu" 
          :class="{ 'orange-background': carMenuOpened }"
          >
            {{ $t("header.Cars") }}
          </span>
        </nuxt-link>
        <nav
          v-if="carMenuOpened"
          class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white"
          v-for="(item, key) in cars"
          :key="key">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div
                v-for="(i, key2) in item"
                :key="key2"
                class="bg-white logo-item-car p-0 with-box-shadow sub-menu-cars">
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image && i.image.s">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image.s.url"
                  />
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>



      <nav class="left-menu-items" @click="getManufacturers()" :class="{ 'orange-background': ManufacturerMenuOpened }">
        <nuxt-link
          :to="getLink('#')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu" :class="{ 'orange-background': ManufacturerMenuOpened }">
            {{ $t("header.Manufactures") }}
          </span>
        </nuxt-link>
        <nav
          v-if="ManufacturerMenuOpened"
          class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white"
          v-for="(item, key) in manufacturers"
          :key="key">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div
                v-for="(i, key2) in item"
                :key="key2"
                class="bg-white logo-item p-0 with-box-shadow sub-menu-cars">
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image && i.image.s">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image.s.url"
                  />
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>

      
      <nav class="left-menu-items" @click="getKeysAndRemotes()" :class="{ 'orange-background': keysAndRemoteMenuOpened }">
        <nuxt-link
          :to="getLink('#')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu" :class="{ 'orange-background': keysAndRemoteMenuOpened }">
            {{ $t("header.keysAndRemote") }}
          </span>
        </nuxt-link>
        <nav
          v-if="keysAndRemoteMenuOpened"
          class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white"
          v-for="(item, key) in keysAndRemotes"
          :key="key">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div
                v-for="(i, key2) in item"
                :key="key2"
                class="bg-white logo-item p-0 with-box-shadow sub-menu-cars">
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image"
                  />
                  <div class="" style="color:#3E3E3E;font-size: 11px;text-align: center; margin-top: 5px;margin-bottom: 5px;text-transform: capitalize;">
                    <span>{{ i.name[$i18n.locale] }}</span>
                  </div>
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>


      <nav class="left-menu-items" @click="getAccessoriesAndTools()" :class="{ 'orange-background': AccessoriesAndToolsMenuOpened }">
        <nuxt-link
          :to="getLink('#')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu" :class="{ 'orange-background': AccessoriesAndToolsMenuOpened }">
            {{ $t("header.AccessoriesAndTools") }}
          </span>
        </nuxt-link>
        <nav
          v-if="AccessoriesAndToolsMenuOpened"
          class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white"
          v-for="(item, key) in accessoriesAndTools"
          :key="key">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div
                v-for="(i, key2) in item"
                :key="key2"
                class="bg-white logo-item-accessories p-0 with-box-shadow sub-menu-cars">
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image"
                  />
                  <div class="" style="color:#3E3E3E;font-size: 11px;text-align: center; margin-top: 5px;margin-bottom: 5px;text-transform: capitalize;">
                    <span>{{ i.name[$i18n.locale] }}</span>
                  </div>
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>



      <nav class="left-menu-items" @click="getDevicesAndMachines()" :class="{ 'orange-background': DeviceAndMachineMenuOpened }">
        <nuxt-link
          :to="getLink('#')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu" :class="{ 'orange-background': DeviceAndMachineMenuOpened }">
            {{ $t("header.DeviceAndMachine") }}
          </span>
        </nuxt-link>
        <nav
          v-if="DeviceAndMachineMenuOpened"
          class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white"
          v-for="(item, key) in devicesAndMachines"
          :key="key">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div
                v-for="(i, key2) in item"
                :key="key2"
                class="bg-white logo-item-device-machine p-0 with-box-shadow sub-menu-cars">
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image"
                  />
                  <div class="" style="color:#3E3E3E;font-size: 11px;text-align: center; margin-top: 5px;margin-bottom: 5px;text-transform: capitalize;">
                    <span>{{ i.name[$i18n.locale] }}</span>
                  </div>
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>

      <nav class="left-menu-items">
        <nuxt-link
          :to="getLink('/emulators')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu">
            {{ $t("header.Emulators") }}
          </span>
        </nuxt-link>
      </nav>


      <nav class="left-menu-items" @click="getSoftwareAndTokens()" :class="{ 'orange-background': SoftwareAndTokenMenuOpened }">
        <nuxt-link
          :to="getLink('#')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu" :class="{ 'orange-background': SoftwareAndTokenMenuOpened }">
            {{ $t("header.TokensAndSoftware") }}
          </span>
        </nuxt-link>
        <nav
          v-if="SoftwareAndTokenMenuOpened"
          class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white"
          v-for="(item, key) in softwareAndTokens"
          :key="key">
          <div class="row bg-white m-0">
            <div class="col-6 software-menu-right-border pl-0 pr-0">
              <div class="p-4">
                <button class="token-and-software-buttons">{{ $t("common.software")}}</button>
              </div>
              <nav class="d-flex flex-wrap bg-white p-0">
                <div
                  v-for="(i, key2) in item.software"
                  :key="key2"
                  class="bg-white p-0 with-box-shadow software-token-items">
                  <nuxt-link :to="getLink('/' + i.slug)">
                    <nuxt-img
                      format="webp"
                      class="sub-menu-images p-2"
                      :src="i.image['s'].url"
                    />
                  </nuxt-link>
                </div>
              </nav>
            </div>
            <div class="col-6 pr-0 pl-0">
              <div class="p-4">
                <button class="token-and-software-buttons">{{ $t("common.token")}}</button>                
              </div>
              <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
                <div
                  v-for="(i, key2) in item.token"
                  :key="key2"
                  class="bg-white p-0 with-box-shadow software-token-items">
                  <nuxt-link :to="getLink('/' + i.slug)">
                    <nuxt-img
                      format="webp"
                      class="sub-menu-images p-2"
                      :src="i.image['s'].url"
                    />
                  </nuxt-link>
                </div>
              </nav>
            </div>
          </div>
        </nav>
      </nav>



      <nav class="left-menu-items">
        <nuxt-link
          :to="getLink('/downloads')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu">
            {{ $t("header.downloads") }}
          </span>
        </nuxt-link>
      </nav>


      <nav class="left-menu-items">
        <nuxt-link
          :to="getLink('/pin-code')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles bg-red">
          <span class="header-main-menu bg-red">
            {{ $t("header.PinCode") }}
          </span>
        </nuxt-link>
      </nav>


    </nav>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import Api from "~/api";
export default {
  data: function () {
    return {
      manufacturers : [],
      cars: [],
      keysAndRemotes : [],
      accessoriesAndTools: [],
      devicesAndMachines: [],
      softwareAndTokens: [],
      carMenuOpened: false,
      ManufacturerMenuOpened: false,
      keysAndRemoteMenuOpened: false,
      AccessoriesAndToolsMenuOpened: false,
      DeviceAndMachineMenuOpened: false,
      SoftwareAndTokenMenuOpened: false,
      isFetchingDevicesAndMachines:false,
      isFetchingAccessoriesAndTools: false,
      isFetchingKeysAndRemotes: false,
      isFetchingManufacturers: false,
      isFetchingCars: false,
      isFetchingSoftwareAndToken: false, 
    };
  },
  mounted(){
    document.addEventListener("click", this.handleGlobalClick);
  },
  beforeDestroy(){
    document.removeEventListener("click", this.handleGlobalClick);
  },
  methods: {
    handleGlobalClick(event) {
      if(this.carMenuOpened || this.ManufacturerMenuOpened || this.keysAndRemoteMenuOpened || this.AccessoriesAndToolsMenuOpened || this.DeviceAndMachineMenuOpened || this.SoftwareAndTokenMenuOpened){
        this.closeCarMenu();
        this.closeManufacturerMenu();
        this.closeKeyAndRemotesMenu();
        this.closeAccessoriesAndTools();
        this.closeDeviceAndMachineMenu();
        this.closeSoftwareAndTokenMenu();
      }
    },
    closeCarMenu(){
      this.carMenuOpened = false;
      // this.isFetchingCars = false;
      // this.cars = []
    },
    closeManufacturerMenu(){
      this.ManufacturerMenuOpened = false;
    },
    closeKeyAndRemotesMenu(){
      this.keysAndRemoteMenuOpened = false;
    },
    closeAccessoriesAndTools(){
      this.AccessoriesAndToolsMenuOpened = false;
    },
    closeDeviceAndMachineMenu(){
      this.DeviceAndMachineMenuOpened = false;
    },
    closeSoftwareAndTokenMenu(){
      this.SoftwareAndTokenMenuOpened = false;
    },
    async getCars() {
      if(!this.carMenuOpened){
        this.isFetchingCars = true; // Set flag to true before making the request
        await Api.get('/menu')
          .then(response => {
            this.carMenuOpened = true;
            this.cars = response.data.data.menu.main_menu.cars;
          })
          .catch(error => {
            console.error("Error fetching cars:", error);
          })
          .finally(() => {
            this.isFetchingCars = false; // Reset flag after the request is done
          });
        }
        else{
          this.carMenuOpened = !this.carMenuOpened
        }
    },
   async getManufacturers() {
    if(!this.ManufacturerMenuOpened){
      this.isFetchingManufacturers = true;
      await Api.get('/manufacturers_menu')
      .then(response => {
        this.ManufacturerMenuOpened = true;
        this.manufacturers = response.data.data.menu.main_menu.manufacturers;
      })
      .catch(error => {
        console.error("Error fetching manufacturers:", error);
      })
      .finally(() => {
        this.isFetchingManufacturers = false; // Reset flag after the request is done
      });
    }else{
      this.ManufacturerMenuOpened = !this.ManufacturerMenuOpened
    }
  },
    async getKeysAndRemotes() {
      if(!this.keysAndRemoteMenuOpened){
        this.isFetchingKeysAndRemotes = true;
      await Api.get('/keys-and-remotes-menu')
      .then(response => {
        this.keysAndRemoteMenuOpened = true;
        this.keysAndRemotes = response.data.data.menu.main_menu['Key-Remote'];
      })
      .catch(error => {
        console.error("Error fetching keys and remotes:", error);
      })
      .finally(() => {
        this.isFetchingKeysAndRemotes = false; // Reset flag after the request is done
      });
      }else{
        this.keysAndRemoteMenuOpened = !this.keysAndRemoteMenuOpened;
      }
    },
    async getAccessoriesAndTools() {
      if(!this.AccessoriesAndToolsMenuOpened){
        this.isFetchingAccessoriesAndTools = true;
        await Api.get('/accessories-tools-menu')
        .then(response => {
            this.AccessoriesAndToolsMenuOpened = true;
            this.accessoriesAndTools = response.data.data.menu.main_menu['accessories-tools'];
        })
      .catch(error => {
        console.error("Error fetching Accessories and tools:", error);
      })
      .finally(() => {
        this.isFetchingAccessoriesAndTools = false; // Reset flag after the request is done
      });
      }else{
        this.AccessoriesAndToolsMenuOpened = !this.AccessoriesAndToolsMenuOpened;
      }
    },
    
    async getDevicesAndMachines() {
      if(!this.DeviceAndMachineMenuOpened){
        this.isFetchingDevicesAndMachines = true;
        await Api.get('/device-machine-menu')
        .then(response => {
            this.DeviceAndMachineMenuOpened = true;
            this.devicesAndMachines = response.data.data.menu.main_menu['device_machines'];
        })
      .catch(error => {
        console.error("Error fetching Device and machines:", error);
      })
      .finally(() => {
        this.isFetchingDevicesAndMachines = false;
      });
      }else{
        this.DeviceAndMachineMenuOpened = !this.DeviceAndMachineMenuOpened;
      }
    },    
    async getSoftwareAndTokens(){
      if(!this.SoftwareAndTokenMenuOpened){
        try{
        const response = await Api.get('/software-and-token');
        this.SoftwareAndTokenMenuOpened = true;
        this.softwareAndTokens = response.data.data.menu.main_menu['tokens-software'];
      }catch(error){
        console.log("Error Fetching Token and software Menu:", error);
      } finally{
        this.isFetchingSoftwareAndToken = false;
      }
      }else{
        this.SoftwareAndTokenMenuOpened = !this.SoftwareAndTokenMenuOpened
      }
    },
      getLink(route) {
        if (this.getLang === 'en') {
          return route; // Return the route as is without the language parameter
        } else {
          return `/${this.getLang}${route}`; // Include the language parameter
        }
      },
    },
  computed: {
    ...mapGetters("language", ["getLang"]),
      ...mapGetters("rtlStore", ["getIsAr"]),
    totalLength: function () {
      const mainMenuLength = Object.keys(this.$settings.main_menu).length;
      const menusLength = Object.keys(this.$settings.menus).length;
      return mainMenuLength + menusLength;
    },
    itemWidth: function () {
      return `${100 / this.totalLength}%`;
    },
    currentItem: function () {
      if (this.$route.query && this.$route.query.category)
        return this.$route.query.category;
      return "";
    },
  },
};
</script>

<style scoped>
/* === GENERAL HEADER STYLES === */
.header-main-menu {
  color: white;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
  background-color: #3e3e3e;
  max-height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: capitalize;
  font-size: 13.5px;
}

.left-menu-items,
.right-menu-items {
  border-right: 1px solid #585a5e !important;
}

.header-li-titles {
  height: 50px !important;
  padding: 3px;
}

.hoverable {
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
  font-size: 14px;
  margin: auto;
}

.left-menu-items:hover .hoverable {
  transform: rotateX(-180deg);
}

/* === BUTTON STYLES === */
.token-and-software-buttons {
  width: 120px;
  font-size: 15px;
  font-weight: bold;
  padding: 10px !important;
  border-radius: 10px;
  background-color: #892118;
  border: 1px solid #892118;
  color: white;
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.token-and-software-buttons:hover {
  background-color: #892118 !important;
  text-decoration: underline;
}

/* === SOFTWARE & TOKEN MENU: WIDER & CLEANER === */
.custom-megamenu.megamenu-car.megamenu-2cols {
  width: 1200px; /* ✅ Make wider */
  max-width: 100%;
  padding: 20px;
}

.custom-megamenu .col-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding-left: 20px;
  padding-right: 20px;
}

/* Optional divider between Software and Token */
.software-menu-right-border {
  border-right: 1px solid #e0e0e0;
}

/* === GRID ITEMS === */
.logo-item-car {
  width: 8.33%;
  max-width: 8.33%;
  flex: 0 0 8.33%;
  padding: 10px;
  box-sizing: border-box;
}

.logo-item,
.logo-item-accessories,
.logo-item-device-machine,
.software-token-items {
  width: 10%;
  max-width: 10%;
  flex: 0 0 10%;
  padding: 10px;
  box-sizing: border-box;
}

/* === Responsive Adjustments === */
@media screen and (max-width: 1200px) {
  .logo-item-car,
  .logo-item,
  .logo-item-accessories,
  .logo-item-device-machine,
  .software-token-items {
    width: 12.5%;
    max-width: 12.5%;
    flex: 0 0 12.5%;
  }
}

@media screen and (max-width: 768px) {
  .logo-item-car,
  .logo-item,
  .logo-item-accessories,
  .logo-item-device-machine,
  .software-token-items {
    width: 25%;
    max-width: 25%;
    flex: 0 0 25%;
  }
}

@media screen and (max-width: 480px) {
  .logo-item-car,
  .logo-item,
  .logo-item-accessories,
  .logo-item-device-machine,
  .software-token-items {
    width: 50%;
    max-width: 50%;
    flex: 0 0 50%;
  }
}

/* === IMAGES === */
.sub-menu-images {
  width: 100%;
  height: auto;
  object-fit: contain;
  padding: 5px;
  transition: transform 0.2s ease-in-out;
}

.logo-item-car img,
.logo-item img,
.logo-item-accessories img,
.logo-item-device-machine img,
.software-token-items img {
  transform: scale(0.9);
  transition: transform 0.2s ease-in-out;
}

.logo-item-car:hover img,
.logo-item:hover img,
.logo-item-accessories:hover img,
.logo-item-device-machine:hover img,
.software-token-items:hover img {
  transform: scale(0.8);
}

/* === BRAND NAME UNDER LOGOS === */
.brand-name {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25% !important;
  background: #892118;
  color: white;
  top: 88%;
  left: 50%;
  transform-origin: top left;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease-out;
  font-size: 10px;
  overflow: hidden;
  padding: 11px;
}

@media screen and (max-width: 1435px) {
  .brand-name {
    padding: 0;
    height: 30% !important;
    top: 85%;
  }
}

@media screen and (max-width: 1300px) {
  .brand-name {
    padding: 0;
    top: 90%;
    font-size: 8px;
  }
}

.logo-item:hover .brand-name,
.logo-item-car:hover .brand-name {
  opacity: 0.85;
  transform: translate(-50%, -50%);
  border-radius: 3px;
}

.logo-item .brand-name span {
  opacity: 1;
}

/* === UTILITIES === */
.with-box-shadow {
  box-shadow: 0 0px 7px 0 rgba(0, 0, 0, 0.1);
}

.download-pin-code {
  height: 50px;
}

.megamenu-car {
  overflow-y: scroll;
  max-height: 75vh;
}

.custom-megamenu {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 1000;
  position: absolute;
  left: 0;
  border-bottom: 0;
  border-image: linear-gradient(90deg, #892118, #ff6800) 1;
  border-left: 0;
  border-right: 0;
  border-top: 4px solid #844701 !important;
  transform: translateY(0);
}

.orange-background {
  background-color: orange;
}

.bg-red {
  background-color: red;
}
/* === Token & Software Menu: Full width without side gaps === */
.left-menu-items:nth-child(7) > .custom-megamenu.megamenu-car.megamenu-2cols {
  width: 100% !important;
  padding: 20px 0; /* remove left/right gaps */
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 0;
}

/* === Software & Token Columns (50% each, no inner padding) === */
.left-menu-items:nth-child(7) .custom-megamenu .col-6 {
  flex: 0 0 50%;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  padding: 0;
}

/* === Grid wrapper for logos inside each column === */
.left-menu-items:nth-child(7) .custom-megamenu .col-6 nav {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px; /* slight inner padding for logos */
}

/* === Logo Items: 5 per row (100 / 5 = 20%) === */
.left-menu-items:nth-child(7) .software-token-items {
  width: 20%;
  max-width: 20%;
  flex: 0 0 20%;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
}

/* === Tablet: 4 items per row === */
@media screen and (max-width: 992px) {
  .left-menu-items:nth-child(7) > .custom-megamenu.megamenu-car.megamenu-2cols {
    flex-direction: column;
  }

  .left-menu-items:nth-child(7) .custom-megamenu .col-6 {
    max-width: 100%;
    flex: 100%;
    margin-bottom: 20px;
  }

  .left-menu-items:nth-child(7) .software-token-items {
    width: 25%;
    max-width: 25%;
    flex: 0 0 25%;
  }
}

/* === Mobile: 2 items per row === */
@media screen and (max-width: 576px) {
  .left-menu-items:nth-child(7) .software-token-items {
    width: 50%;
    max-width: 50%;
    flex: 0 0 50%;
  }
}

</style>
