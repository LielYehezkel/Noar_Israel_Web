<template>
  <v-container fluid :class="$vuetify.breakpoint.smAndDown ? 'pr-3 pl-3' : 'pr-1 pt-5'">
    <div class="table_shadow">
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="saleIndex"
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
                <v-btn color="primary" tile dark small class="mb-2 mt-2 elevation-3" v-on="on">
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
                        <v-switch v-model="editedItem.isGold" label='הטבת זהב'></v-switch>
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
                        <v-text-field type="number" v-model="editedItem.saleIndex" label="מיקום בדף"></v-text-field>
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
          <v-img :src="item.imageBackgroundUrl" max-width="50px" :alt="item.title" />
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
      { text: "מיקום בדף", value: "saleIndex", sortable: true },
      { text: "פעולות", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      description: "",
      isGold: false,
      saleUrl: "",
      imageBackgroundUrl: "",
      backgroundColor: { r: 0, g: 0, b: 0 },
      saleIndex: 0
    },
    defaultItem: {
      title: "",
      description: "תיאור עסק",
      isGold: false,
      saleUrl: "www",
      imageBackgroundUrl: "www",
      backgroundColor: { r: 0, g: 0, b: 0 },
      saleIndex: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "עסק חדש" : "עריכת עסק";
    },
    backgroundColorInFirebase(backgroundColor) {
      return [backgroundColor["r"], backgroundColor["g"], backgroundColor["b"]];
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          title: "בורגראנץ",
          description: "רשת המבורגרים הכי טובה בארץ",
          isGold: false,
          saleUrl: "www.google.com",
          imageBackgroundUrl:
            "https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          backgroundColor: { r: 75, g: 55, b: 22 },
          saleIndex: 0
        },
        {
          title: "1+1",
          description: "20% הנחה ברשת מקדונלס",
          isGold: true,
          saleUrl: "www.youtube.com",
          imageBackgroundUrl:
            "https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          backgroundColor: { r: 0, g: 255, b: 122 },
          saleIndex: 0
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
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