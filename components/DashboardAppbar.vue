<template>
  <v-toolbar dark class="blue darken-2">
    <!-- <v-toolbar-title>Title</v-toolbar-title> -->

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn text>Link 1</v-btn>
      <v-btn text>Link 2</v-btn>
      <v-btn text>Link 3</v-btn>
    </v-toolbar-items>

    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn icon @click="toggleMenu">
        <v-icon>{{showMenu ? 'mdi-window-maximize' : 'mdi-window-minimize'}}</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    showMenu() {
      return this.$store.state.dashboard.showMenu;
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("dashboard/toggleMenu");
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
