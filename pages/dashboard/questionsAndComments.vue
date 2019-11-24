<template>
  <v-container fluid class="pr-1 pt-5">
    <h1 class="indigo--text text-center">שאלות ותשובות</h1>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(category, i) in categories"
          :key="i"
          cols="12"
          md="6"
          lg="4"
          xl="3"
        >
          <v-card class="ma-0 pa-1" outlined flat>
            <!-- :color="`rgba(${item.color[0]}, ${item.color[1]}, ${item.color[2]}, 0.9)`" -->
            <!-- {{question.color}} -->
            <v-card-title>
              <div
                class="d-flex justify-space-between align-center"
                style="width: 100%;"
              >
                <span>{{ category.name }}</span>
                <v-btn
                  text
                  @click="
                    listItems[i].show
                      ? hideQuestions(i)
                      : loadQuestions(category.id, i, 'init')
                  "
                >
                  <v-icon>{{
                    listItems[i].show ? "mdi-arrow-up" : "mdi-arrow-down"
                  }}</v-icon>
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
                    <v-list-item-title class="indigo--text font-weight-bold">{{
                      question.authorName
                    }}</v-list-item-title>
                    {{ question.description }}
                    <v-list-item-action class="mr-0 ml-0">
                      <div
                        class="d-flex align-center justify-end"
                        style="width: 100%"
                      >
                        <v-btn
                          icon
                          tile
                          @click="
                            removeQuestion(category.id, question.id, i, g)
                          "
                        >
                          <v-icon>mdi-comment-remove-outline</v-icon>
                        </v-btn>
                        <!-- <v-btn icon tile>
                          <v-icon>mdi-account-alert</v-icon>
                        </v-btn> -->
                        <v-btn
                          icon
                          tile
                          @click="
                            toggleComments(
                              category.id,
                              question.id,
                              i,
                              g,
                              'init'
                            )
                          "
                        >
                          <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                      </div>

                      <v-list-item-group
                        v-if="listItems[i].data[g].showComments"
                        multiple
                        style="max-height: 800px;overflow-y: auto; width: 100%;"
                      >
                        <v-list-item
                          v-for="(comment, n) in listItems[i].data[g].comments"
                          :key="n"
                          class="white mt-2 mb-2"
                          :ripple="false"
                        >
                          <v-list-item-content
                            v-if="n != listItems[i].data[g].comments.length + 1"
                          >
                            <v-list-item-title
                              class="indigo--text font-weight-bold"
                              >{{ comment.authorName }}</v-list-item-title
                            >
                            {{ comment.description }}
                            <div
                              class="d-flex align-center justify-end"
                              style="width: 100%"
                            >
                              <v-btn
                                icon
                                tile
                                @click="
                                  removeComment(
                                    category.id,
                                    question.id,
                                    comment.id,
                                    i,
                                    g,
                                    n
                                  )
                                "
                              >
                                <v-icon>mdi-comment-remove-outline</v-icon>
                              </v-btn>
                              <!-- <v-btn icon tile>
                                <v-icon>mdi-account-alert</v-icon>
                              </v-btn> -->
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item
                          v-if="listItems[i].data[g].comments.length > 0"
                          @click="
                            toggleComments(
                              category.id,
                              question.id,
                              i,
                              g,
                              'loadmore'
                            )
                          "
                        >
                          <v-list-item-title
                            class="indigo--text font-weight-bold text-left"
                            >טען עוד...</v-list-item-title
                          >
                        </v-list-item>
                      </v-list-item-group>
                    </v-list-item-action>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="listItems[i].data.length > 0"
                  @click="loadQuestions(category.id, i, 'loadmore')"
                >
                  <v-list-item-title
                    class="indigo--text font-weight-bold text-center"
                    >טען עוד...</v-list-item-title
                  >
                </v-list-item>
              </v-list-item-group>
            </v-list>
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
    const categories = await db()
      .collection("categories")
      .get();
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
      db: db(),
      fieldValue: db.FieldValue,
      categories: categoriesMapped,
      listItems
    };
  },
  data: () => ({
    questionsLoadLimit: 20,
    lastQuestionDocument: null,
    commentsLoadLimit: 20,
    lastCommentDocument: null
  }),
  computed: {
    listItemIndex(id) {
      return this.listItems.map(item => item.id).indexOf(id);
    },
    colorParsed(color) {
      return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.9)`;
    }
  },
  methods: {
    async loadQuestions(id, index, mode) {
      if (mode == "loadmore" && !this.lastQuestionDocument) {
        return;
      }

      const categoryQuestions =
        mode === "init"
          ? await this.db
              .collection("categories")
              .doc(id)
              .collection("categories_questions")
              .limit(this.questionsLoadLimit)
              .get()
          : await this.db
              .collection("categories")
              .doc(id)
              .collection("categories_questions")
              .limit(this.questionsLoadLimit)
              .startAfter(this.lastQuestionDocument)
              .get();

      this.lastQuestionDocument =
        categoryQuestions.docs[categoryQuestions.docs.length - 1];

      let data = mode === "loadmore" ? this.listItems[index].data : [];

      data.push(
        ...categoryQuestions.docs.map(question => {
          return {
            id: question.id,
            ...question.data(),
            comments: [],
            showComments: false
          };
        })
      );

      this.$set(this.listItems[index], "show", true);
      this.$set(this.listItems[index], "data", data);
    },
    hideQuestions(index) {
      this.$set(this.listItems[index], "show", false);
      this.$set(this.listItems[index], "data", []);
    },
    async toggleComments(
      categoryId,
      questionId,
      categoryIndex,
      questionIndex,
      mode
    ) {
      if (mode !== "loadmore") {
        this.$set(
          this.listItems[categoryIndex].data[questionIndex],
          "showComments",
          !this.listItems[categoryIndex].data[questionIndex].showComments
        );
      } else if (mode == "loadmore" && !this.lastCommentDocument) {
        return;
      }

      if (this.listItems[categoryIndex].data[questionIndex].showComments) {
        const categoryComments =
          mode == "init"
            ? await this.db
                .collection("categories")
                .doc(categoryId)
                .collection("categories_questions")
                .doc(questionId)
                .collection("question_comments")
                .limit(this.commentsLoadLimit)
                .get()
            : await this.db
                .collection("categories")
                .doc(categoryId)
                .collection("categories_questions")
                .doc(questionId)
                .collection("question_comments")
                .limit(this.commentsLoadLimit)
                .startAfter(this.lastCommentDocument)
                .get();

        this.lastCommentDocument =
          categoryComments.docs[categoryComments.docs.length - 1];

        let data =
          mode === "loadmore"
            ? this.listItems[categoryIndex].data[questionIndex].comments
            : [];

        data.push(
          ...categoryComments.docs.map(comment => {
            return {
              id: comment.id,
              ...comment.data()
            };
          })
        );

        this.$set(
          this.listItems[categoryIndex].data[questionIndex],
          "comments",
          data
        );
      }
    },
    async removeQuestion(categoryId, questionId, i, g) {
      try {
        await this.db
          .collection("categories")
          .doc(categoryId)
          .collection("categories_questions")
          .doc(questionId)
          .delete();

        const data = this.listItems[i].data;
        data.splice(g, 1);
        this.$set(this.listItems[i], "data", data);
      } catch (error) {
        console.error(error);
      }
    },
    async removeComment(categoryId, questionId, commentId, i, g, n) {
      try {
        // console.log(this.FieldValue.increment(-1));
        console.log(this.fieldValue);
        const commentDeleted = await this.db
          .collection("categories")
          .doc(categoryId)
          .collection("categories_questions")
          .doc(questionId)
          .collection("question_comments")
          .doc(commentId)
          .delete();

        const decrement = this.fieldValue.increment(-1);
        const commentsCounterRef = this.db
          .collection("categories")
          .doc(categoryId)
          .collection("categories_questions")
          .doc(questionId);

        await commentsCounterRef.update({
          commentsCounter: decrement
        });

        const data = this.listItems[i].data[g].comments;
        data.splice(n, 1);
        this.$set(this.listItems[i].data[g], "comments", data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped></style>
