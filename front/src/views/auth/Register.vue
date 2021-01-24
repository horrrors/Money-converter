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
      <v-btn primary large block @click="register">Registration</v-btn>
    </v-card-actions>
  </v-form>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { CreateUserDto } from "../../store/modules/auth/interfaces/AuthDto";

@Component
export default class Register extends Vue {
  email = "";
  password = "";

  async register() {
    const createUserDto: CreateUserDto = {
      password: this.password,
      email: this.email,
    };
    try {
      await this["$store"].dispatch("auth/register", createUserDto);
      this["$router"].push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style>
</style>