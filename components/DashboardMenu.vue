<template>
  <v-card tile height="100%" class="mx-auto max_menu_width">
    <v-navigation-drawer
      :disable-resize-watcher="true"
      width="100%"
      class="max_menu_height"
      :permanent="true"
    >
      <v-list-item class="blue darken-2" style="height: 125px;">
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
/* .firewatch_gradient {
  background: #136a8a;
  background: -webkit-linear-gradient(to center, #267871, #136a8a);
  background: linear-gradient(to center, #267871, #136a8a);
} */

.max_menu_height {
  min-height: 95vh;
}
</style>
