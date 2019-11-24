<template>
  <v-card tile height="100%" class="mx-auto max_menu_width">
    <v-navigation-drawer
      :disable-resize-watcher="true"
      width="100%"
      class="max_menu_height"
      :permanent="true"
    >
      <v-list-item class="blue darken-2" style="height: 150px;">
        <v-list-item-content>
          <v-list-item-title class="title white--text"
            >נוער ישראל</v-list-item-title
          >
          <v-list-item-subtitle class="white--text"
            >מערכת ניהול - גירסא 0.1</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list tile dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            nuxt
            :exact="true"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import dashboardRoutes from "../constants/dashboardRoutes";

export default {
  data: () => ({
    items: dashboardRoutes,
    right: null
  })
};
</script>

<style scoped>
.max_menu_height {
  min-height: 95vh;
}
</style>
