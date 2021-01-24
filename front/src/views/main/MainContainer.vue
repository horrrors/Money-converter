<template>
  <div>
    <Header />
    <v-main class="grey lighten-3 main-back">
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" class="main-panel">
            <v-sheet min-height="70vh" rounded="lg">
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "../../components/Header.vue";

@Component({
  components: { Header },
})
export default class App extends Vue {
  async mounted() {
    await this["$store"].dispatch("wallet/getWallets");
  }
}
</script>

<style>
.main-back {
  height: 100vh;
}
.main-panel {
  margin-left: auto;
  margin-right: auto;
}
</style>
