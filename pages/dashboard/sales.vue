<template>
  <v-container fluid :class="$vuetify.breakpoint.smAndDown ? 'pr-3 pl-3' : 'pr-1 pt-5'">
    <div v-if="isLoading" class="d-flex align-center justify-center" style="height: 75vh;">
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
    </div>
    <div v-if="!isLoading" class="table_shadow">
      <v-data-table
        :headers="headers"
        :items="salesItems"
        sort-by="index"
        :height="$vuetify.breakpoint.smAndDown ? '100%' : '550px'"
        style="background-color: rgba(255, 255, 255, 0.90);"
        :fixed-header="true"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ניהול הטבות</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  tile
                  dark
                  small
                  class="mb-2 mt-2 elevation-3"
                  @click="editItem"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.title" label="שם עסק"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.description" label="תיאור"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-switch v-model="editedItem.isGold" label="הטבת זהב"></v-switch>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.saleUrl" label="כתובת הטבה"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.imageBackgroundUrl" label="תמונה"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-color-picker
                          v-model="editedItem.backgroundColor"
                          hide-inputs
                          hide-mode-switch
                        ></v-color-picker>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field type="number" v-model="editedItem.index" label="מיקום בדף"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="blue darken-1" text @click="close">סגור</v-btn>
                  <v-btn color="blue darken-1" text @click="save">שמור</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.saleUrl="{ item }">
          <a :href="'//' + item.saleUrl" target="_blank">{{item.title}}</a>
        </template>
        <template v-slot:item.imageBackgroundUrl="{ item }">
          <v-img
            :src="item.imageBackgroundUrl"
            max-width="40px"
            max-height="40px"
            :alt="item.title"
          />
        </template>
        <template v-slot:item.backgroundColor="{ item }">
          <div
            :style="`background-color: rgb(${item.backgroundColor['r']}, ${item.backgroundColor['g']}, ${item.backgroundColor['b']}); width: 15px; height: 15px;`"
          ></div>
        </template>
        <template v-slot:item.isGold="{ item }">
          <b>{{item.isGold ? 'כן' : 'לא'}}</b>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small @click="editItem(item)">mdi-tooltip-edit</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete-circle</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "dashboard",
  async asyncData(context) {
    const { db } = require("../../services/firebase");
    const sales = await db.collection("salesClub").get();
    return {
      db: db,
      salesItems: sales.docs.map(sale => {
        // job.backgroundColor = `job.backgroundColor[0]`;
        let saleData = sale.data();
        saleData.id = sale.id;
        saleData.backgroundColor = {
          r: saleData.backgroundColor[0],
          g: saleData.backgroundColor[1],
          b: saleData.backgroundColor[2],
          a: 1
        };
        return saleData;
      })
    };
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "כותרת",
        value: "title"
      },
      { text: "תיאור", value: "description", sortable: false },
      { text: "הטבת זהב", value: "isGold", sortable: true },
      { text: "כתובת הטבה", value: "saleUrl", sortable: false },
      { text: "תמונה", value: "imageBackgroundUrl", sortable: false },
      { text: "צבע תמונה", value: "backgroundColor", sortable: false },
      { text: "מיקום בדף", value: "index", sortable: true },
      { text: "פעולות", value: "action", sortable: false }
    ],
    salesItems: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      description: "",
      isGold: false,
      saleUrl: "",
      imageBackgroundUrl: "",
      backgroundColor: { r: 0, g: 0, b: 0 },
      index: 0
    },
    defaultItem: {
      title: "כותרת",
      description: "תיאור עסק",
      isGold: false,
      saleUrl: "#",
      imageBackgroundUrl: "#",
      backgroundColor: { r: 0, g: 0, b: 0 },
      index: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "עסק חדש" : "עריכת עסק";
    },
    backgroundColorInFirebase(backgroundColor) {
      return [backgroundColor["r"], backgroundColor["g"], backgroundColor["b"]];
    },
    isLoading() {
      return this.$store.state.dashboard.isLoading;
    }
  },

  mounted() {
    this.$store.commit("dashboard/setLoading", false);
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.salesItems.indexOf(item);
      this.editedItem = Object.assign(
        {},
        this.editedIndex > -1 ? item : this.defaultItem
      );
      this.dialog = true;
    },

    async deleteItem(item) {
      try {
        this.$store.commit("dashboard/setLoading", true);

        const index = this.salesItems.indexOf(item);

        const saleRef = this.db
          .collection("salesClub")
          .doc(this.salesItems[index].id);

        confirm("Are you sure you want to delete this item?");
        await saleRef.delete();
        this.salesItems.splice(index, 1);

        this.$store.commit("dashboard/setLoading", false);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      try {
        this.$store.commit("dashboard/setLoading", true);
        if (this.editedIndex > -1) {
          let diffKeys = {};

          Object.keys(this.salesItems[this.editedIndex]).forEach(key => {
            if (
              this.salesItems[this.editedIndex][key] !== this.editedItem[key]
            ) {
              if (key === "index") {
                diffKeys[key] = parseInt(this.editedItem[key]);
              } else {
                diffKeys[key] = this.editedItem[key];
              }
            }
          });

          const backgroundColor = [
            diffKeys.backgroundColor.r,
            diffKeys.backgroundColor.g,
            diffKeys.backgroundColor.b
          ];

          const saleRef = this.db
            .collection("salesClub")
            .doc(this.salesItems[this.editedIndex].id);

          const saleUpdated = await saleRef.update({
            ...diffKeys,
            backgroundColor
          });

          Object.assign(this.salesItems[this.editedIndex], this.editedItem);
        } else {
          const backgroundColor = [
            this.editedItem["backgroundColor"].r,
            this.editedItem["backgroundColor"].g,
            this.editedItem["backgroundColor"].b
          ];
          delete this.editedItem["backgroundColor"];
          this.editedItem["index"] = parseInt(this.editedItem["index"]);
          const saleAdded = await this.db.collection("salesClub").add({
            ...this.editedItem,
            backgroundColor
          });
          this.salesItems.push({
            id: saleAdded.id,
            ...this.editedItem,
            backgroundColor: {
              r: backgroundColor[0],
              g: backgroundColor[1],
              b: backgroundColor[2]
            }
          });
        }
        this.$store.commit("dashboard/setLoading", false);
        this.close();
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
</script>

<style scoped>
.table_shadow {
  position: relative;
  left: 1px;
  -webkit-box-shadow: 0px 0px 5px 0px rgb(222, 222, 222);
  -moz-box-shadow: 0px 0px 5px 0px rgb(222, 222, 222);
  box-shadow: 0px 0px 5px 0px rgb(222, 222, 222);
}
</style>