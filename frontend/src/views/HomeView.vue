<template>
  <login-form />
</template>

<script lang="ts">
import Vue from "vue";
import LoginForm from "../components/LoginForm.vue";

export default Vue.extend({
  name: "HomeView",

  components: {
    LoginForm,
  },
});
</script>
