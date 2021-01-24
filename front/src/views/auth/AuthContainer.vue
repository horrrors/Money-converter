<template>
  <div>
    <v-main class="grey lighten-3 main-back">
      <v-container>
        <v-layout row class="text-xs-center top">
          <v-flex xs4>
            <v-container
              style="position: relative; top: 13%"
              class="text-xs-center"
            >
              <v-card flat>
                <v-card-title primary-title>
                  <v-tabs centered color="grey darken-1" v-model="tab">
                    <v-tab key="registration"> Registration </v-tab>
                    <v-tab key="login"> Login </v-tab>
                  </v-tabs>
                </v-card-title>
                <router-view />
              </v-card>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Auth extends Vue {
  tabTo: Record<number, string> = {
    0: "/auth/register",
    1: "/auth/login",
  };
  tabFrom: Record<string, number> = {
    "/auth/register": 0,
    "/auth/login": 1,
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

<style>
.title {
  margin-left: auto;
  margin-right: auto;
}

.top {
  height: 80vh;
}

.form {
  margin: 10px;
}
.flex {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
