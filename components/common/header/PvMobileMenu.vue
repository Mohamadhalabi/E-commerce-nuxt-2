<template>
  <div>
    <div class="mobile-menu-overlay" @click="hideMobileMenu" />

    <div class="mobile-menu-container">
      <div class="mobile-menu-wrapper">
        <no-ssr>
          <PvMainMenuMonile />
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    PvPriceBox: () => import("~/components/product/partials/PvPriceBox.vue"),
    BaseButtonIcon1: () => import("../BaseButtonIcon1"),
    PvMainMenuMonile: () => import("~/components/common/PvMainMenuMonile"),
  },
  data: function () {
    return {
      searchKey: "",
      productsBySearch: [],
      totalProduct:null,
    };
  },
  methods: {
    hideMobileMenu: function () {
      document.querySelector("body").classList.remove("mmenu-active");
    },
  },
};
</script>

<style scoped>
.live-search-list span {
  display: inline-block;
}
/* Search */
form.nosubmit {
  color: #555;
  display: flex;
  padding: 2px;
  border: 1px solid currentColor;
  border-radius: 5px;
  margin: 0px 6px 8px 0px;
}

form.nosubmit input[type="search"] {
  border: none;
  /* background: transparent; */
  margin: 0;
  padding: 13px 35px;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
}

form.nosubmit input[type="search"]::placeholder {
  color: #bbb;
}

form.nosubmit input[type="search"]:focus {
  box-shadow: 0 0.12rem 0.2rem #ff6800 !important;
  border-color: #ff6800;
  outline: none;
}

form.nosubmit {
  border: none;
  position: sticky;
  top: 25px;
  background-color: transparent;
}

input.nosubmit {
  border: 1px solid #555;
  width: 100%;
  padding-left: 30px !important;
  padding-right: 30px !important;

  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat;
  background-position: 90% center;
}

.notViseble {
  display: none !important;
}
form.nosubmit [type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  width: 10px;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=");
  background-size: 10px 10px;
}

.mobile-menu-close {
  top: -10px;
  right: 10px;
  font-size: 18px;
  color: black!important;
}
</style>
