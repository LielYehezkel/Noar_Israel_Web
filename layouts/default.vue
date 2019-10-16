<template>
  <v-app light>
    <!-- <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center">
            <h1 class="white--text display-2 text-center">נוער ישראל - פאנל ניהול</h1>
          </v-row>
        </v-col>
    </v-row>-->
    <v-app-bar light>
      <v-app-bar-nav-icon class="red--text"></v-app-bar-nav-icon>

      <v-toolbar-title class="red--text">נוער ישראל</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon class="red--text">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon class="red--text">mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container id="container_body" fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-card id="form_card">
            <h1 class="d-block text-right red--text">התחברות</h1>
            <form>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="24"
                label="שם משתמש"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="אמייל"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-col cols="12">
                <v-row justify="end">
                  <v-btn @click="submit">התחבר</v-btn>
                </v-row>
              </v-col>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(24) },
    email: { required, email }
  },

  data: () => ({
    name: "",
    email: ""
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("שם משתמש חייב להיות עד אורך של 24 תווים");
      !this.$v.name.required && errors.push("שם משתמש זהו שדה חובה.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("אמייל חייב להיות תקין");
      !this.$v.email.required && errors.push("אמייל זהו שדה חובה.");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Varela+Round&display=swap");

#container_body {
  font-family: "Varela Round", sans-serif;
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

#form_card {
  padding: 40px 25px;
}
</style>
