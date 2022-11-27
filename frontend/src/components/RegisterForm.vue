<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center v-on:keyup.enter="register">
        <v-flex xs12 sm8 md3>
          <v-card class="card-login" color="#eee">
            <v-toolbar-title class="text-center mb-12 mt-6"
              >Criar uma Nova Conta</v-toolbar-title
            >
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="name"
                  label="Nome Completo"
                  outlined
                  background-color="white"
                >
                </v-text-field>
                <v-text-field
                  v-model="username"
                  label="Username"
                  outlined
                  background-color="white"
                >
                </v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  label=" Senha"
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
                @click="register"
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
  name: "RegisterForm",

  data: () => ({
    username: "",
    name: "",
    password: "",
    showError: false,
    errorMessage: "",
    isLoading: false,
  }),
  methods: {
    async register(): Promise<void> {
      if (!this.checkFieldsBeforeSend()) {
        this.showError = true;
        return;
      }
      this.isLoading = true;

      console.log(process.env.VUE_APP_BASE_API_UR);

      axios
        .post("users", {
          name: this.name,
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          axios
            .post("auth/login", {
              username: this.username,
              password: this.password,
            })
            .then((res) => {
              const userData = {
                access_token: res.data.access_token,
                username: this.username,
                logged: true,
              };
              localStorage.setItem("user-info", JSON.stringify(userData));
              this.isLoading = true;
              this.$router.push("/dashboard");
            })
            .catch(() => {
              this.$router.push("/signup");
            });
        })
        .catch(() => {
          this.isLoading = false;
          this.showError = false;
          this.errorMessage = "Ocororeu um erro ao cadastrar a conta.";
          this.showError = true;
        });

      return;
    },
    checkFieldsBeforeSend(): boolean {
      this.showError = false;
      if (
        this.name.trim() === "" ||
        this.username.trim() === "" ||
        this.password.trim() === ""
      ) {
        this.errorMessage =
          "Preencha os campos adequadamente para cadastrar uma nova conta.";
        return false;
      }
      return true;
    },
  },
});
</script>
