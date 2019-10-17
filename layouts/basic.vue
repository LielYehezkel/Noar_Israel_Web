<template>
  <v-app light>
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
  background: #ece9e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
