<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center v-on:keyup.enter="logIn">
        <v-flex xs12 sm8 md3>
          <v-card class="card-login" color="#eee">
            <v-toolbar-title class="text-center mb-12 mt-6"
              >Acesse sua Conta</v-toolbar-title
            >
            <v-card-text>
              <v-form>
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
                @click="logIn"
                >Entrar
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-card-text>
              <v-row align="center" class="mx-0">
                Não possui conta? <a href="/signup"> Criar uma Nova Conta</a>
              </v-row>
            </v-card-text>
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
  name: "LoginForm",

  data: () => ({
    username: "",
    password: "",
    showError: false,
    errorMessage: "",
    isLoading: false,
  }),
  methods: {
    async logIn(): Promise<void> {
      if (!this.checkFieldsBeforeSend()) {
        this.showError = true;
        return;
      }
      this.isLoading = true;

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
        .catch((error) => {
          this.isLoading = false;
          this.showError = false;
          this.errorMessage = "username e/ou senha incorretos.";
          this.showError = true;
        });

      return;
    },
    checkFieldsBeforeSend(): boolean {
      this.showError = false;
      if (this.username.trim() === "" || this.password.trim() === "") {
        this.errorMessage =
          "Preencha os campos adequadamente para acessar sua conta.";
        return false;
      }
      return true;
    },
  },
});
</script>
