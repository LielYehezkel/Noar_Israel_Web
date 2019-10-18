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
        <v-btn text nuxt exact to="/dashboard/">עמוד ראשי</v-btn>
        <v-btn text nuxt exact to="/dashboard/jobs">ניהול עבודות</v-btn>
        <v-btn text nuxt exact to="/dashboard/sales">ניהול הטבות</v-btn>
      </v-toolbar-items>
    </template>

    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn icon @click="toggleMenu">
        <v-icon>{{showMenu ? 'mdi-window-maximize' : 'mdi-window-minimize'}}</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    extendedSlotToggle: false
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
