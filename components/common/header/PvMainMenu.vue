<template>
  <div class="header-menu main-nav" :class="{ 'text-right': getIsAr }">
    <nav class="menu nav-categories header-main-menu">
      
      <!-- Cars Menu -->
      <nav class="left-menu-items" :class="{ 'orange-background': carMenuOpened }">
        <div class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles" @click.stop.prevent="handleMenu('cars')">
          <nuxt-link :to="getLink('#')">
            <span class="header-main-menu" :class="{ 'orange-background': carMenuOpened }">{{ $t("header.Cars") }}</span>
          </nuxt-link>
        </div>
        <nav v-if="carMenuOpened" class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white" v-for="(item, key) in cars" :key="key">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div v-for="(i, key2) in item" :key="key2" class="bg-white logo-item-car p-0 with-box-shadow sub-menu-cars">
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image">
                  <nuxt-img format="webp" class="sub-menu-images" :src="i.image" />
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>

      <!-- Manufacturer Menu -->
      <nav class="left-menu-items" :class="{ 'orange-background': manufacturerMenuOpened }">
        <div class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles" @click.stop.prevent="handleMenu('manufacturers')">
          <nuxt-link :to="getLink('#')">
            <span class="header-main-menu" :class="{ 'orange-background': manufacturerMenuOpened }">{{ $t("header.Manufactures") }}</span>
          </nuxt-link>
        </div>
        <nav v-if="manufacturerMenuOpened" class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white" v-for="(item, key) in manufacturers" :key="key">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div v-for="(i, key2) in item" :key="key2" class="bg-white logo-item p-0 with-box-shadow sub-menu-cars">
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image">
                   <nuxt-img format="webp" class="sub-menu-images" :src="i.image.s.url" />
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>

      <!-- Keys and Remotes Menu -->
      <nav class="left-menu-items" :class="{ 'orange-background': keysAndRemoteMenuOpened }">
        <div class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles" @click.stop.prevent="handleMenu('keysAndRemotes')">
          <nuxt-link :to="getLink('#')">
            <span class="header-main-menu" :class="{ 'orange-background': keysAndRemoteMenuOpened }">{{ $t("header.keysAndRemote") }}</span>
          </nuxt-link>
        </div>

        <nav v-if="keysAndRemoteMenuOpened" class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div
                v-for="(i, key2) in keysAndRemotes.items"
                :key="key2"
                class="bg-white logo-item p-0 with-box-shadow sub-menu-cars"
              >

              <span style="color:black!important">
              </span>
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image">
                  <nuxt-img format="webp" class="sub-menu-images" :src="i.image" />
                  <div class="text-center mt-1 mb-1 text-capitalize" style="color:#3E3E3E;font-size:11px;">
                    <span>{{ i.name[$i18n.locale] || i.name.en }}</span>
                  </div>
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>

      <!-- Accessories and Tools Menu -->
      <nav class="left-menu-items" :class="{ 'orange-background': accessoriesAndToolsMenuOpened }">
        <div class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles" @click.stop.prevent="handleMenu('accessoriesAndTools')">
          <nuxt-link :to="getLink('#')">
            <span class="header-main-menu" :class="{ 'orange-background': accessoriesAndToolsMenuOpened }">{{ $t("header.AccessoriesAndTools") }}</span>
          </nuxt-link>
        </div>

        <nav v-if="accessoriesAndToolsMenuOpened" class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div
                v-for="(i, key2) in accessoriesAndTools.items"
                :key="key2"
                class="bg-white logo-item-accessories p-0 with-box-shadow sub-menu-cars"
              >
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image">
                  <nuxt-img format="webp" class="sub-menu-images" :src="i.image" />
                  <div class="text-center mt-1 mb-1 text-capitalize" style="color:#3E3E3E;font-size:11px;">
                    <span>{{ i.name[$i18n.locale] || i.name.en }}</span>
                  </div>
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>

      <!-- Devices and Machines Menu -->
      <nav class="left-menu-items" :class="{ 'orange-background': deviceAndMachineMenuOpened }">
        <div class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles" @click.stop.prevent="handleMenu('devicesAndMachines')">
          <nuxt-link :to="getLink('#')">
            <span class="header-main-menu" :class="{ 'orange-background': deviceAndMachineMenuOpened }">{{ $t("header.DeviceAndMachine") }}</span>
          </nuxt-link>
        </div>

        <nav v-if="deviceAndMachineMenuOpened" class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white">
          <div class="row bg-white m-0">
            <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
              <div
                v-for="(i, key2) in devicesAndMachines.items"
                :key="key2"
                class="bg-white logo-item-device-machine p-0 with-box-shadow sub-menu-cars"
              >
                <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image">
                  <nuxt-img format="webp" class="sub-menu-images" :src="i.image" />
                  <div class="text-center mt-1 mb-1 text-capitalize" style="color:#3E3E3E;font-size:11px;">
                    <span>{{ i.name[$i18n.locale] || i.name.en }}</span>
                  </div>
                </nuxt-link>
              </div>
            </nav>
          </div>
        </nav>
      </nav>


      <!-- Software and Tokens Menu -->
      <nav class="left-menu-items" :class="{ 'orange-background': softwareAndTokenMenuOpened }">
        <div class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles" @click.stop.prevent="handleMenu('softwareAndTokens')">
          <nuxt-link :to="getLink('#')">
            <span class="header-main-menu" :class="{ 'orange-background': softwareAndTokenMenuOpened }">{{ $t("header.TokensAndSoftware") }}</span>
          </nuxt-link>
        </div>
        <nav v-if="softwareAndTokenMenuOpened" class="custom-megamenu megamenu-car p-0 megamenu-fixed-width megamenu-2cols bg-white" v-for="(item, key) in softwareAndTokens" :key="key">
          <div class="row bg-white m-0">
            <div class="col-6 software-menu-right-border pl-0 pr-0">
              <div class="p-4">
                <button class="token-and-software-buttons">{{ $t("common.software") }}</button>
              </div>
              <nav class="d-flex flex-wrap bg-white p-0">
                <div v-for="(i, key2) in item.software" :key="key2" class="bg-white p-0 with-box-shadow software-token-items">
                  <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image && i.image.s">
                    <nuxt-img format="webp" class="sub-menu-images p-2" :src="i.image.s.url" />
                  </nuxt-link>
                </div>
              </nav>
            </div>
            <div class="col-6 pr-0 pl-0">
              <div class="p-4">
                <button class="token-and-software-buttons">{{ $t("common.token") }}</button>
              </div>
              <nav class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
                <div v-for="(i, key2) in item.token" :key="key2" class="bg-white p-0 with-box-shadow software-token-items">
                  <nuxt-link :to="getLink('/' + i.slug)" v-if="i.image && i.image.s">
                    <nuxt-img format="webp" class="sub-menu-images p-2" :src="i.image.s.url" />
                  </nuxt-link>
                </div>
              </nav>
            </div>
          </div>
        </nav>
      </nav>

      <!-- Static Menus -->
      <nav class="left-menu-items">
        <nuxt-link :to="getLink('/emulators')" class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu">{{ $t("header.Emulators") }}</span>
        </nuxt-link>
      </nav>

      <nav class="left-menu-items">
        <nuxt-link :to="getLink('/downloads')" class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu">{{ $t("header.downloads") }}</span>
        </nuxt-link>
      </nav>

      <nav class="left-menu-items">
        <nuxt-link :to="getLink('/pin-code')" class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles bg-red">
          <span class="header-main-menu bg-red">{{ $t("header.PinCode") }}</span>
        </nuxt-link>
      </nav>

    </nav>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
import Api from "~/api";

export default {
  data() {
    return {
      cars: [],
      manufacturers: [],
      keysAndRemotes: [],
      accessoriesAndTools: [],
      devicesAndMachines: [],
      softwareAndTokens: [],

      carMenuOpened: false,
      manufacturerMenuOpened: false,
      keysAndRemoteMenuOpened: false,
      accessoriesAndToolsMenuOpened: false,
      deviceAndMachineMenuOpened: false,
      softwareAndTokenMenuOpened: false,

      carMenuLoaded: false,
      manufacturerMenuLoaded: false,
      keysAndRemoteMenuLoaded: false,
      accessoriesAndToolsMenuLoaded: false,
      deviceAndMachineMenuLoaded: false,
      softwareAndTokenMenuLoaded: false,

      isFetchingCars: false,
      isFetchingManufacturers: false,
      isFetchingKeysAndRemotes: false,
      isFetchingAccessoriesAndTools: false,
      isFetchingDevicesAndMachines: false,
      isFetchingSoftwareAndTokens: false,
    };
  },

  mounted() {
    document.addEventListener("click", this.handleGlobalClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleGlobalClick);
  },

  methods: {
    handleMenu(type) {
      const map = {
        cars: {
          fetch: this.getCars,
          opened: 'carMenuOpened',
          loaded: 'carMenuLoaded',
        },
        manufacturers: {
          fetch: this.getManufacturers,
          opened: 'manufacturerMenuOpened',
          loaded: 'manufacturerMenuLoaded',
        },
        keysAndRemotes: {
          fetch: this.getKeysAndRemotes,
          opened: 'keysAndRemoteMenuOpened',
          loaded: 'keysAndRemoteMenuLoaded',
        },
        accessoriesAndTools: {
          fetch: this.getAccessoriesAndTools,
          opened: 'accessoriesAndToolsMenuOpened',
          loaded: 'accessoriesAndToolsMenuLoaded',
        },
        devicesAndMachines: {
          fetch: this.getDevicesAndMachines,
          opened: 'deviceAndMachineMenuOpened',
          loaded: 'deviceAndMachineMenuLoaded',
        },
        softwareAndTokens: {
          fetch: this.getSoftwareAndTokens,
          opened: 'softwareAndTokenMenuOpened',
          loaded: 'softwareAndTokenMenuLoaded',
        },
      };

      const menu = map[type];
      if (!menu) return;

      const isOpen = this[menu.opened];

      this.closeAllMenus();

      if (isOpen) {
        this[menu.opened] = false;
      } else if (this[menu.loaded]) {
        this[menu.opened] = true;
      } else {
        menu.fetch();
      }
    },

    closeAllMenus() {
      this.carMenuOpened = false;
      this.manufacturerMenuOpened = false;
      this.keysAndRemoteMenuOpened = false;
      this.accessoriesAndToolsMenuOpened = false;
      this.deviceAndMachineMenuOpened = false;
      this.softwareAndTokenMenuOpened = false;
    },

    handleGlobalClick() {
      this.closeAllMenus();
    },

    async getCars() {
      if (this.carMenuLoaded) {
        this.carMenuOpened = true;
        return;
      }

      this.isFetchingCars = true;
      try {
        this.$nuxt.$loading.start();
        const res = await Api.get("/menu");
        this.cars = res.data.data.menu.main_menu.cars;
        this.carMenuLoaded = true;
        this.carMenuOpened = true;
      } catch (e) {
        console.error("Cars error", e);
      } finally {
        this.isFetchingCars = false;
        this.$nuxt.$loading.finish();
      }
    },

    async getManufacturers() {
      if (this.manufacturerMenuLoaded) {
        this.manufacturerMenuOpened = true;
        return;
      }

      this.isFetchingManufacturers = true;
      try {
        this.$nuxt.$loading.start();
        const res = await Api.get("/manufacturers_menu");
        this.manufacturers = res.data.data.menu.main_menu.manufacturers;
        this.manufacturerMenuLoaded = true;
        this.manufacturerMenuOpened = true;
      } catch (e) {
        console.error("Manufacturers error", e);
      } finally {
        this.isFetchingManufacturers = false;
        this.$nuxt.$loading.finish();
      }
    },

    async getKeysAndRemotes() {
      if (this.keysAndRemoteMenuLoaded) {
        this.keysAndRemoteMenuOpened = true;
        return;
      }

      this.isFetchingKeysAndRemotes = true;
      try {
        this.$nuxt.$loading.start();
        const res = await Api.get("/keys-and-remotes-menu");
        this.keysAndRemotes = res.data.data.menu.main_menu["Key-Remote"]; // 💡 store the entire object
        this.keysAndRemoteMenuLoaded = true;
        this.keysAndRemoteMenuOpened = true;
      } catch (err) {
        console.error("Keys & Remotes error", err);
      } finally {
        this.isFetchingKeysAndRemotes = false;
        this.$nuxt.$loading.finish();
      }
    },


    async getAccessoriesAndTools() {
      if (this.accessoriesAndToolsMenuLoaded) {
        this.accessoriesAndToolsMenuOpened = true;
        return;
      }

      this.isFetchingAccessoriesAndTools = true;
      try {
        this.$nuxt.$loading.start();
        const res = await Api.get("/accessories-tools-menu");
        this.accessoriesAndTools = res.data.data.menu.main_menu["accessories-tools"]; // save full object
        this.accessoriesAndToolsMenuLoaded = true;
        this.accessoriesAndToolsMenuOpened = true;
      } catch (err) {
        console.error("Accessories error", err);
      } finally {
        this.isFetchingAccessoriesAndTools = false;
        this.$nuxt.$loading.finish();
      }
    },

    async getDevicesAndMachines() {
      if (this.devicesAndMachinesMenuLoaded) {
        this.deviceAndMachineMenuOpened = true;
        return;
      }

      this.isFetchingDevicesAndMachines = true;
      try {
        this.$nuxt.$loading.start();
        const res = await Api.get("/device-machine-menu");
        this.devicesAndMachines = res.data.data.menu.main_menu["device_machines"]; // Store full object
        this.devicesAndMachinesMenuLoaded = true;
        this.deviceAndMachineMenuOpened = true;
      } catch (err) {
        console.error("Devices error", err);
      } finally {
        this.isFetchingDevicesAndMachines = false;
        this.$nuxt.$loading.finish();
      }
    },

    async getSoftwareAndTokens() {
      if (this.softwareAndTokensMenuLoaded) {
        this.softwareAndTokenMenuOpened = true;
        return;
      }

      this.isFetchingSoftwareAndTokens = true;
      try {
        this.$nuxt.$loading.start();
        const res = await Api.get("/software-and-token");
        console.log(res);
        this.softwareAndTokens = res.data.data.menu.main_menu["tokens-software"];
        this.softwareAndTokensMenuLoaded = true;
        this.softwareAndTokenMenuOpened = true;
      } catch (e) {
        console.error("Software & Tokens error", e);
      } finally {
        this.isFetchingSoftwareAndTokens = false;
        this.$nuxt.$loading.finish();
      }
    },

    getLink(route) {
      return this.getLang === "en" ? route : `/${this.getLang}${route}`;
    },
  },

  computed: {
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
    currentItem() {
      return this.$route.query?.category || "";
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
  justify-content: center;
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
  padding: 0;
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
.logo-item-device-machine{
  width: 10%;
  flex: 0 0 10%;
  padding: 10px;
  box-sizing: border-box;
}

/* === Responsive Adjustments === */
/* @media screen and (max-width: 1200px) {
  .logo-item-car,
  .logo-item,
  .logo-item-accessories,
  .logo-item-device-machine,
  .software-token-items {
    width: 12.5%;
    max-width: 12.5%;
    flex: 0 0 12.5%;
  }
} */

/* @media screen and (max-width: 768px) {
  .logo-item-car,
  .logo-item,
  .logo-item-accessories,
  .logo-item-device-machine,
  .software-token-items {
    width: 25%;
    max-width: 25%;
    flex: 0 0 25%;
  }
} */

/* @media screen and (max-width: 480px) {
  .logo-item-car,
  .logo-item,
  .logo-item-accessories,
  .logo-item-device-machine,
  .software-token-items {
    width: 50%;
    max-width: 50%;
    flex: 0 0 50%;
  }
} */

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
/* .left-menu-items:nth-child(7) .software-token-items {
  width: 20%;
  max-width: 20%;
  flex: 0 0 20%;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
} */

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

  /* .left-menu-items:nth-child(7) .software-token-items {
    width: 25%;
    max-width: 25%;
    flex: 0 0 25%;
  } */
}

/* === Mobile: 2 items per row === */
/* @media screen and (max-width: 576px) {
  .left-menu-items:nth-child(7) .software-token-items {
    width: 50%;
    max-width: 50%;
    flex: 0 0 50%;
  }
} */

</style>
