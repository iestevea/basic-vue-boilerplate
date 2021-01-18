<template>
  <v-app>
    <h1>{{ message }}</h1>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({ message: "Hey, this is a basic Vue app! =) " })
});
</script>
