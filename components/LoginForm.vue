<template>
  <v-card id="form_card">
    <h1 class="d-block text-right red--text">התחברות</h1>
    <form>
      <v-text-field
        type="email"
        v-model="email"
        :error-messages="emailErrors"
        label="אמייל"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :counter="24"
        type="password"
        label="סיסמא"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>

      <v-col cols="12">
        <v-row justify="end">
          <v-btn @click="submit">התחבר</v-btn>
        </v-row>
      </v-col>
    </form>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    password: { required, maxLength: maxLength(24), minLength: minLength(8) },
    email: { required, email }
  },

  data: () => ({
    email: "",
    password: ""
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("אורך סיסמא חייב להיות בין 8 ל 24 תווים");

      !this.$v.password.maxLength &&
        errors.push("אורך סיסמא חייב להיות בין 8 ל 24 תווים");

      !this.$v.password.required && errors.push("שדה זה הינו חובה.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("אמייל חייב להיות תקין");
      !this.$v.email.required && errors.push("שדה זה הינו חובה.");
      return errors;
    }
  },

  methods: {
    submit() {
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("users/login", {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push("/dashboard");
          })
          .catch(error => {
            throw error;
          });
      }
      this.$v.$touch();
    }
  }
};
</script>

<style scoped>
.rounded-card {
  border-radius: 50px;
}

#form_card {
  padding: 40px 25px;
  width: 100%;
}
</style>
