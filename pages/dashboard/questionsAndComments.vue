<template>
  <v-container fluid class="pr-1 pt-5">
    <h1 class="indigo--text text-center">שאלות ותשובות</h1>

    <v-container fluid>
      <v-row>
        <v-col v-for="(item, i) in categories" :key="i" cols="4">
          <v-card class="ma-0 pa-3" outlined flat>
            <v-card-title>
              <div class="d-flex justify-space-between align-center" style="width: 100%;">
                <span>{{item.name}}</span>
                <v-btn
                  text
                  @click="listItems[i].show ? hideQuestions(i) : showQuestions(item.id, i)"
                >
                  <v-icon>{{listItems[i].show ? 'mdi-arrow-up' : 'mdi-arrow-down'}}</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-list flat style="max-height: 1000px;" class="overflow-y-auto">
              <v-list-item-group v-for="(listItem, n) in listItems[i]" :key="n" multiple>
                <v-list-item
                  v-for="(question, g) in listItem"
                  :key="g"
                  class="grey lighten-4 mt-2 mb-2"
                  :ripple="false"
                >
                  <v-list-item-content>
                    <v-list-item-title class="indigo--text font-weight-bold">{{question.authorName}}</v-list-item-title>
                    {{question.description}}
                    <v-list-item-action class="mr-0 ml-0">
                      <div class="d-flex align-center justify-end" style="width: 100%">
                        <v-btn icon tile>
                          <v-icon>mdi-comment-remove-outline</v-icon>
                        </v-btn>
                        <v-btn icon tile>
                          <v-icon>mdi-account-alert</v-icon>
                        </v-btn>
                        <v-btn icon tile>
                          <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-action>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

            <!-- <v-list>
              <v-list-item-group multiple>
                <v-card v-for="(listItem, index) in listItems.data" :key="index">
                  {{listItem.description}}
                  <v-divider v-if="index + 1 < listItems.length" :key="index"></v-divider>
                </v-card>
              </v-list-item-group>
            </v-list>-->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: "dashboard",
  async asyncData(context) {
    const { db } = require("../../services/firebase");
    const categories = await db.collection("categories").get();
    const categoriesMapped = categories.docs.map(category => {
      return { id: category.id, name: category.data().name };
    });

    const listItems = categoriesMapped.map(item => {
      return {
        show: false,
        data: []
      };
    });

    return {
      db: db,
      categories: categoriesMapped,
      listItems
    };
  },
  data: () => ({}),
  mounted() {
    console.log(this.categories);
    console.log(this.listItems);
  },
  computed: {
    listItemIndex(id) {
      return this.listItems.map(item => item.id).indexOf(id);
    }
  },
  methods: {
    async showQuestions(id, index) {
      const categoryQuestions = await this.db
        .collection("categories")
        .doc(id)
        .collection("categories_questions")
        .get();

      const data = categoryQuestions.docs.map(question => {
        return {
          id: question.id,
          ...question.data()
        };
      });

      this.$set(this.listItems[index], "show", true);
      this.$set(this.listItems[index], "data", data);

      //   console.log(id);
      //   console.log(this.listItems);
      //   console.log(this.listItems[index]);
    },
    hideQuestions(index) {
      this.$set(this.listItems[index], "show", false);
      this.$set(this.listItems[index], "data", []);
    }
  }
};
</script>

<style scoped>
</style>