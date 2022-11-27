<template>
  <v-container>
    <menu-section />
    <h2>Lista de Projetos</h2>
    <br />
    <div>
      <v-data-table
        :headers="headers"
        :items="projects"
        item-key="id"
        class="elevation-1"
        @click:row="handleClick"
      >
      </v-data-table>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import MenuSection from "../components/MenuSection.vue";
import axios from "axios";

export default Vue.extend({
  name: "DashboardView",

  data: () => ({
    projects: [],
  }),
  computed: {
    headers() {
      return [
        {
          text: "Title Project",
          value: "title",
        },
        {
          text: "Zip Code",
          value: "zip_code",
        },
        { text: "Cost R$", value: "cost" },
        { text: "Deadline", value: "deadline" },
        { text: "Done", value: "done" },
      ];
    },
  },
  components: {
    MenuSection,
  },
  beforeMount() {
    this.loadProjects();
  },
  methods: {
    async handleClick(row: any): Promise<void> {
      this.$router.push({
        name: "update-project",
        params: row,
      });
    },
    async loadProjects(): Promise<void> {
      const userInfo = JSON.parse(localStorage.getItem("user-info") ?? "");

      this.projects = (
        await axios.get("projects", {
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
            username: userInfo.username,
          },
        })
      ).data;
    },
  },
});
</script>
