<template>
  <v-container fluid class="pr-1 pt-5">
    <h1 class="indigo--text text-center">שאלות ותשובות</h1>

    <v-container fluid>
      <v-row>
        <v-col v-for="(item, i) in categories" :key="i" cols="4">
          <v-card class="ma-0 pa-1" outlined flat>
            <!-- :color="`rgba(${item.color[0]}, ${item.color[1]}, ${item.color[2]}, 0.9)`" -->
            <!-- {{question.color}} -->
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
              <v-list-item-group multiple>
                <v-list-item
                  v-for="(question, g) in listItems[i].data"
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
                        <v-btn icon tile @click="toggleComments(item.id, question.id, i, g)">
                          <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                      </div>

                      <v-list-item-group
                        v-if="listItems[i].data[g].showComments"
                        multiple
                        style="width: 100%;"
                      >
                        <v-list-item
                          v-for="(comment, n) in listItems[i].data[g].comments"
                          :key="n"
                          class="white mt-2 mb-2"
                          :ripple="false"
                        >
                          <v-list-item-content
                            v-if="n != (listItems[i].data[g].comments.length + 1)"
                          >
                            <v-list-item-title
                              class="indigo--text font-weight-bold"
                            >{{comment.authorName}}</v-list-item-title>
                            {{comment.description}}
                            <div class="d-flex align-center justify-end" style="width: 100%">
                              <v-btn icon tile>
                                <v-icon>mdi-comment-remove-outline</v-icon>
                              </v-btn>
                              <v-btn icon tile>
                                <v-icon>mdi-account-alert</v-icon>
                              </v-btn>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="listItems[i].data[g].comments.length > 0">
                          <v-list-item-title
                            class="indigo--text font-weight-bold text-left"
                          >טען עוד...</v-list-item-title>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list-item-action>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="listItems[i].data.length > 0">
                  <v-list-item-title class="indigo--text font-weight-bold text-center">טען עוד...</v-list-item-title>
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
      const categoryData = category.data();
      return {
        id: category.id,
        name: categoryData.name,
        color: categoryData.color
      };
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
    },
    colorParsed(color) {
      return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.9)`;
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
          ...question.data(),
          comments: [],
          showComments: false
        };
      });

      this.$set(this.listItems[index], "show", true);
      this.$set(this.listItems[index], "data", data);
    },
    hideQuestions(index) {
      this.$set(this.listItems[index], "show", false);
      this.$set(this.listItems[index], "data", []);
    },
    async toggleComments(categoryId, questionId, categoryIndex, questionIndex) {
      this.$set(
        this.listItems[categoryIndex].data[questionIndex],
        "showComments",
        !this.listItems[categoryIndex].data[questionIndex].showComments
      );

      if (this.listItems[categoryIndex].data[questionIndex].showComments) {
        const categoryComments = await this.db
          .collection("categories")
          .doc(categoryId)
          .collection("categories_questions")
          .doc(questionId)
          .collection("question_comments")
          .get();

        const data = categoryComments.docs.map(comment => {
          return {
            id: comment.id,
            ...comment.data()
          };
        });

        this.$set(
          this.listItems[categoryIndex].data[questionIndex],
          "comments",
          data
        );

        console.log(data);
        console.log(this.listItems[categoryIndex].data[questionIndex]);
        console.log(this.listItems);
      }
    }
  }
};
</script>

<style scoped>
</style>