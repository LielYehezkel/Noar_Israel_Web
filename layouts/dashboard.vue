<template>
  <v-app light>
    <!-- <v-parallax
      height="100vh"
      class="pr-0 mr-0 ml-0 pl-0"
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      alt="Parallax"
    ></v-parallax> -->

    <div id="container_body">
      <v-container fluid class="pt-0 pb-0">
        <v-row align="start" justify="end">
          <v-col v-if="showMenu && $vuetify.breakpoint.smAndUp" md="3" xs="12">
            <dashboard-menu />
          </v-col>

          <v-col
            :class="showMenu || !$vuetify.breakpoint.smAndUp ? 'pl-0 pr-0 pt-0 pb-0' : 'pt-0 pb-0 pl-0 pr-0'"
            xs="12"
            :md="showMenu || !$vuetify.breakpoint.smAndUp ? '9' : '12'"
          >
            <div class="d-flex flex-column" style="height:100vh;">
              <div
                id="appbar_container"
                :class="showMenu && $vuetify.breakpoint.smAndUp ? 'd-flex align-center pl-3 pt-3' : 'd-flex align-center pl-0 pr-0 pt-0 pb-3'"
              >
                <dashboard-appbar />
              </div>
              <div id="dashboard_view">
                <nuxt />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import DashboardAppbar from "../components/DashboardAppbar";
import DashboardMenu from "../components/DashboardMenu";

export default {
  components: {
    DashboardAppbar,
    DashboardMenu
  },
  data: () => ({}),
  computed: {
    isLoading() {
      return this.$store.state.dashboard.isLoading;
    },
    showMenu() {
      return this.$store.state.dashboard.showMenu;
    }
  },
  created() {
    // console.log(this.$store.state);
  },
  methods: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Varela+Round&display=swap");

html, body {
  height: 100%;
}

#container_body {
  font-family: "Varela Round", sans-serif;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: auto;
}

#appbar_container {
  /* background-color: #fafafa; */
  width: 100%;
  /* height: 100px; */
}

#dashboard_view {
  height: 100%;
  width: 100%;
  /* background-color: #fafafa; */
  overflow-y: auto;
}

.v-parallax > .v-parallax__content {
  padding: 0;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1976D2ef;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #1976D2;
}
</style>
