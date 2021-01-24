<template>
  <v-app-bar app color="white" flat>
    <v-tabs v-model="tab" centered class="ml-n9" color="grey darken-1">
      <v-tab> Wallets </v-tab>
      <v-tab> Converting </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Header extends Vue {
  tabTo: Record<number, string> = {
    0: "/main/wallets",
    1: "/main/converting",
  };
  tabFrom: Record<string, number> = {
    "/main/wallets": 0,
    "/main/converting": 1,
  };
  set tab(tab: number) {
    this["$router"].push(this.tabTo[tab]);
  }
  get tab() {
    const tab = this["$route"].fullPath;
    return this.tabFrom[tab];
  }
}
</script>
