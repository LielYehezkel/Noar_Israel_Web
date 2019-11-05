<template>
  <v-app light>
    <v-app-bar light>
      <v-app-bar-nav-icon class="red--text"></v-app-bar-nav-icon>

      <v-toolbar-title class="red--text">נוער ישראל</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon class="red--text">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon class="red--text">mdi-magnify</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-container id="container_body" fluid fill-height>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Varela+Round&display=swap");

#container_body {
  font-family: "Varela Round", sans-serif;
  background: #e53935; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #e35d5b,
    #e53935
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #e35d5b,
    #e53935
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
