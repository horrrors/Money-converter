<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <wallet-card
          v-for="wallet in $store.getters['wallet/wallets']"
          :key="wallet.id"
          :wallet="wallet"
        >
        </wallet-card>
        <create-wallet-card />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mdiCurrencyEur } from "@mdi/js";
import Component from "vue-class-component";
import CreateWalletCard from "../../components/Create-wallet-card.vue";
import WalletCard from "../../components/Wallet-card.vue";

@Component({
  components: {
    CreateWalletCard,
    WalletCard,
  },
})
export default class Wallets extends Vue {
  moneyIcon() {
    return mdiCurrencyEur;
  }
}
</script>

<style>
.rounded-card {
  border-radius: 20px !important;
}
</style>
