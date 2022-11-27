<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center v-on:keyup.enter="create">
        <v-flex xs12 sm8 md3>
          <v-card class="card-login" color="#eee">
            <v-toolbar-title class="text-center mb-12 mt-6"
              >Criar Novo Projeto</v-toolbar-title
            >
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="title"
                  label="Titulo do projeto"
                  outlined
                  background-color="white"
                >
                </v-text-field>
                <v-text-field
                  v-model="zip_code"
                  label="Zip Code"
                  outlined
                  background-color="white"
                >
                </v-text-field>
                <v-text-field
                  v-model="cost"
                  label=" Custo (R$)"
                  outlined
                  background-color="white"
                >
                </v-text-field>
                <v-text-field
                  v-model="deadline"
                  label=" Deadline"
                  outlined
                  background-color="white"
                >
                </v-text-field>
              </v-form>
              <v-alert v-if="showError" dense outlined type="error">
                <strong>Ocorreu um erro:</strong> {{ errorMessage }}
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#1976d2"
                class="button-login white--text mb-6"
                :loading="isLoading"
                @click="create"
                >Registrar Conta
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "CreateProjectForm",

  data: () => ({
    title: "",
    cost: "",
    deadline: "",
    zip_code: "",
    showError: false,
    errorMessage: "",
    isLoading: false,
  }),
  methods: {
    async create(): Promise<void> {
      const userInfo = JSON.parse(localStorage.getItem("user-info") ?? "");
      axios
        .post(
          "projects",
          {
            title: this.title,
            cost: Number(this.cost),
            deadline: this.deadline,
            zip_code: Number(this.zip_code),
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.access_token}`,
              username: userInfo.username,
            },
          }
        )
        .then(() => {
          this.isLoading = true;
          this.$router.push("/dashboard");
        })
        .catch(() => {
          this.isLoading = false;
          this.showError = false;
          this.errorMessage = "Ocororeu um erro ao cadastrar o projeto.";
          this.showError = true;
        });

      return;
    },
  },
});
</script>
