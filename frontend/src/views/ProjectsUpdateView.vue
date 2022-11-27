<template>
  <v-container>
    <menu-section />
    <update-project-form
      v-bind:title="project.title"
      v-bind:cost="project.cost"
      v-bind:deadline="project.deadline"
      v-bind:id="project.id"
      v-bind:zipCode="project.zip_code"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UpdateProjectForm from "../components/UpdateProjectForm.vue";
import MenuSection from "../components/MenuSection.vue";

export default Vue.extend({
  name: "ProjectsUpdateView",

  data: () => ({
    project: {
      title: "",
      cost: "",
      deadline: "",
      id: "",
      zip_code: "",
    },
  }),

  beforeMount() {
    this.fillParams();
  },
  methods: {
    fillParams(): void {
      if (
        this.$route.params &&
        Object.keys(this.$route.params).length === 0 &&
        Object.getPrototypeOf(this.$route.params) === Object.prototype
      )
        this.$router.push("/dashboard");

      this.project = {
        cost: this.$route.params.cost,
        deadline: this.$route.params.deadline,
        id: this.$route.params.id,
        title: this.$route.params.title,
        zip_code: this.$route.params.zip_code,
      };
    },
  },
  components: {
    UpdateProjectForm,
    MenuSection,
  },
});
</script>
