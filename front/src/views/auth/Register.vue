<template>
  <v-form class="form">
    <v-text-field
      :error-messages="emailErrors"
      name="Email"
      label="Email"
      v-model="email"
    ></v-text-field>
    <v-text-field
      name="Password"
      label="Password"
      type="password"
      :error-messages="passwordErrors"
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
  emailErrors: string[] = [];
  passwordErrors: string[] = [];

  async register() {
    const createUserDto: CreateUserDto = {
      password: this.password,
      email: this.email,
    };
    try {
      this.emailErrors = [];
      this.passwordErrors = [];
      await this["$store"].dispatch("auth/register", createUserDto);
      this["$router"].push("/auth/login");
    } catch (err) {
      const errorHasResponse =
        err.response?.data?.statusCode === 400 && err.response.data.message;
      if (errorHasResponse) {
        for (const message of err.response.data.message) {
          if (message.search("email") !== -1) this.emailErrors.push(message);
          if (message.search("password") !== -1)
            this.passwordErrors.push(message);
        }
      }
    }
  }
}
</script>

<style>
</style>