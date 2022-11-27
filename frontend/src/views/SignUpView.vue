<template>
  <register-form />
</template>

<script lang="ts">
import Vue from "vue";
import RegisterForm from "../components/RegisterForm.vue";

export default Vue.extend({
  name: "SignUpView",

  components: {
    RegisterForm,
  },
});
</script>
