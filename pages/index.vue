<template>
  <v-row align="center" justify="center">
    <v-col cols="6">
      <login-form />
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import LoginForm from "~/components/LoginForm";

export default {
  components: {
    LoginForm
  },
};
</script>

<style scoped>

</style>
