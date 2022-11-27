<template>
  <div id="menu">
    <a href="/dashboard">Listar Projetos</a>
    <a href="/projects/create">Criar Novo Projeto</a>
    <a @click="logOut" href="#">Deslogar</a>
  </div>
</template>

<style>
#menu {
  background-color: #05498b;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 2px 1px 7px #5a5a5a;
  margin-bottom: 30px;
  margin-top: 10px;
}

#menu a {
  color: white;
  padding-left: 15px;
  padding-right: 15px;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MenuSection",

  data: () => ({}),
  methods: {
    async logOut(): Promise<void> {
      localStorage.removeItem("user-info");
      this.$router.push("/");
      return;
    },
  },
});
</script>
