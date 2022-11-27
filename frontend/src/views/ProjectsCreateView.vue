<template>
  <v-container>
    <menu-section />
    <create-project-form />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CreateProjectForm from "../components/CreateProjectForm.vue";
import MenuSection from "../components/MenuSection.vue";

export default Vue.extend({
  name: "ProjectsCreateView",

  components: {
    CreateProjectForm,
    MenuSection,
  },
});
</script>
