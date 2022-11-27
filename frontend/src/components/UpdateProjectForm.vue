<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center v-on:keyup.enter="create">
        <v-flex xs12 sm8 md3>
          <v-card class="card-login" color="#eee">
            <v-toolbar-title class="text-center mb-12 mt-2"
              >Atualizar Projeto</v-toolbar-title
            >
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="titleValue"
                  label="Titulo do projeto"
                  outlined
                  background-color="white"
                >
                </v-text-field>
                <v-text-field
                  v-model="zipCodeValue"
                  label="Zip Code"
                  outlined
                  background-color="white"
                >
                </v-text-field>
                <v-text-field
                  v-model="costValue"
                  label=" Custo (R$)"
                  outlined
                  background-color="white"
                >
                </v-text-field>
                <v-text-field
                  v-model="deadlineValue"
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
                >Atualizar Projeto
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#1976d2"
                class="button-login white--text mb-6"
                :loading="isLoading"
                @click="makeDone"
                >Finalizar Projeto (done)
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#a90f0f"
                class="button-login white--text mb-6"
                :loading="isLoading"
                @click="deleteProject"
                >Remover Projeto
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
  name: "UpdateProjectForm",

  props: ["id", "title", "cost", "deadline", "zipCode"],

  data: function () {
    return {
      showError: false,
      errorMessage: "",
      isLoading: false,
      titleValue: this.title,
      idValue: this.id,
      costValue: this.cost,
      deadlineValue: this.deadline,
      zipCodeValue: this.zipCode,
    };
  },

  methods: {
    async create(): Promise<void> {
      const userInfo = JSON.parse(localStorage.getItem("user-info") ?? "");
      axios
        .put(
          `projects/${this.idValue}`,
          {
            title: this.titleValue,
            cost: Number(this.costValue),
            deadline: this.deadlineValue,
            zip_code: Number(this.zipCodeValue),
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
          this.errorMessage = "Ocororeu um erro ao atualizar o projeto.";
          this.showError = true;
        });

      return;
    },
    async makeDone(): Promise<void> {
      const userInfo = JSON.parse(localStorage.getItem("user-info") ?? "");
      axios
        .patch(
          `projects/${this.idValue}/done`,
          {},
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
          this.errorMessage = "Ocororeu um erro ao completar o projeto.";
          this.showError = true;
        });

      return;
    },
    async deleteProject(): Promise<void> {
      const userInfo = JSON.parse(localStorage.getItem("user-info") ?? "");
      axios
        .delete(`projects/${this.idValue}`, {
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
            username: userInfo.username,
          },
        })
        .then(() => {
          this.isLoading = true;
          this.$router.push("/dashboard");
        })
        .catch(() => {
          this.isLoading = false;
          this.showError = false;
          this.errorMessage = "Ocororeu um erro ao deletars o projeto.";
          this.showError = true;
        });

      return;
    },
  },
});
</script>
