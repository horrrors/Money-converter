<template>
  <v-form class="form">
    <v-text-field name="Email" label="Email" v-model="email"></v-text-field>
    <v-text-field
      name="Password"
      label="Password"
      type="password"
      v-model="password"
    ></v-text-field>
    <v-card-actions>
      <v-btn @click="login" primary large block>Login</v-btn>
    </v-card-actions>
  </v-form>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { LoginDto } from "../../store/modules/auth/interfaces/AuthDto";

@Component
export default class Login extends Vue {
  email = "";
  password = "";

  async login() {
    const loginDto: LoginDto = {
      password: this.password,
      email: this.email,
    };
    try {
      await this["$store"].dispatch("auth/login", loginDto);
      this["$router"].push("/main/wallets");
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style>
</style>