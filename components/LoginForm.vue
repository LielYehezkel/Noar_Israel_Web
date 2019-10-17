<template>
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
.rounded-card {
  border-radius: 50px;
}

#form_card {
  padding: 40px 25px;
}
</style>
