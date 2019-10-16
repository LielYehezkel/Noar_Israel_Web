<template>
  <v-app light>
    <v-container id="container_body" fluid fill-height>
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center">
            <h1 class="white--text display-2">נוער ישראל - פאנל ניהול</h1>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Varela+Round&display=swap');

#container_body {
  font-family: 'Varela Round', sans-serif;
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

.rounded-card {
  border-radius: 50px;
}


</style>
