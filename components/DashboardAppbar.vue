<template>
  <v-toolbar
    dark
    class="blue darken-2"
    :extended="$vuetify.breakpoint.smAndDown && extendedSlotToggle"
  >
    <template v-if="$vuetify.breakpoint.smAndDown">
      <v-btn icon @click="toggleExtended">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>

    <v-toolbar-title v-if="$vuetify.breakpoint.smAndDown">פאנל ניהול - נוער ישראל</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="extendedSlot && extendedSlotToggle" #extension>
      <v-toolbar-items>
        <v-btn  v-for="(route, i) in dashboardRoutes" :key="i" text nuxt exact :to="route.to">{{route.title}}</v-btn>
      </v-toolbar-items>
    </template>

    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn icon @click="toggleMenu">
        <v-icon>{{showMenu ? 'mdi-window-maximize' : 'mdi-window-minimize'}}</v-icon>
      </v-btn>
      <v-btn icon nuxt @click="logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
import dashboardRoutes from "../constants/dashboardRoutes";

export default {
  data: () => ({
    extendedSlotToggle: false,
    dashboardRoutes: dashboardRoutes
  }),
  computed: {
    showMenu() {
      return this.$store.state.dashboard.showMenu;
    },
    extendedSlot() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("dashboard/toggleMenu");
    },
    toggleExtended() {
      this.extendedSlotToggle = !this.extendedSlotToggle;
    },
    async logout() {
      await this.$store.dispatch("users/signOut");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
/* .firewatch_gradient {
  background: #136a8a;
  background: -webkit-linear-gradient(to center, #267871, #136a8a);
  background: linear-gradient(to center, #267871, #136a8a);
} */
</style>
