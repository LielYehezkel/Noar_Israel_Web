<template>
  <v-app light>
    <div id="container_body">
      <v-container fluid class="pt-0 pb-0">
        <v-row align="start" justify="end">
          <v-col id="menubar" cols="3">
            <v-card height="100%" width="80%" class="mx-auto">
              <v-navigation-drawer width="100%">
                <v-list-item class="grey darken-3" style="height: 125px;">
                  <v-list-item-content>
                    <v-list-item-title class="title white--text">נוער ישראל</v-list-item-title>
                    <v-list-item-subtitle class="white--text">מערכת ניהול - גירסא 0.1</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list dense nav>
                  <v-list-item v-for="item in items" :key="item.title" link>
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-col>

          <v-col class="pl-0 pr-0 pt-0 pb-0" cols="9">
            <div class="d-flex flex-column" style="height:100vh;">
              <div id="appbar_container" class="d-flex align-center pl-3">
                <v-toolbar dark>
                  <!-- <v-toolbar-title>Title</v-toolbar-title> -->

                  <v-spacer></v-spacer>

                  <v-toolbar-items>
                    <v-btn text>Link 1</v-btn>
                    <v-btn text>Link 2</v-btn>
                    <v-btn text>Link 3</v-btn>
                  </v-toolbar-items>

                  <template v-if="$vuetify.breakpoint.smAndUp">
                    <v-btn icon>
                      <v-icon>mdi-export-variant</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-delete-circle</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                  </template>
                </v-toolbar>
              </div>
              <div id="dashboard_view"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- <nuxt /> -->
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "עמוד ראשי", icon: "mdi-view-dashboard" },
      { title: "ניהול עבודות", icon: "mdi-image" },
      { title: "ניהול הטבות", icon: "mdi-help-box" }
    ],
    right: null
  })
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Varela+Round&display=swap");

#container_body {
  font-family: "Varela Round", sans-serif;
  height: 100vh;
  width: 100%;
  background: #ece9e6;
  background: -webkit-linear-gradient(to right, #ffffff, #ece9e6);
  background: linear-gradient(to right, #ffffff, #ece9e6);
}

#appbar_container {
  background-color: #d7d7d7;
  width: 100%;
  height: 100px;
}

#menubar {
  background-color: #d7d7d7;
  width: 100%;
  height: 100vh;
}

#dashboard_view {
  height: 100%;
  width: 100%;
  background-color: #424242;
}
</style>
