
<template>
  <v-col :cols="4">
    <v-card
      class="mx-auto rounded-card"
      max-width="344"
      min-height="194"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Wallet</div>
          <v-list-item-title class="headline mb-1">
            {{ wallet.amount
            }}<v-icon small color="black darken-2">
              {{ icon(wallet.type) }}
            </v-icon>
          </v-list-item-title>
          <v-list-item-subtitle>{{ wallet.type }} </v-list-item-subtitle>
        </v-list-item-content>

        <v-avatar size="56">
          <img alt="user" :src="image(wallet.type)" />
        </v-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text class="action-button"> Change </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Wallet } from "../store/modules/wallet/interfaces/Wallet";
import { MoneyTypes } from "../store/modules/wallet/interfaces/MoneyTypes";
import { moneyIcon } from "../utils/moneyIcon";
import { moneyImage } from "../utils/moneyImage";

const GreetingProps = Vue.extend({
  props: {
    wallet: Object as () => Wallet,
  },
});

@Component
export default class WalletCard extends GreetingProps {
  icon(type: MoneyTypes) {
    return moneyIcon(type);
  }

  image(type: MoneyTypes) {
    return moneyImage(type);
  }
}
</script>

<style >
.action-button {
  margin-left: auto;
  margin-right: auto;
}
</style>