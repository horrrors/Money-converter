<template>
  <v-container fluid v-if="$store.getters['wallet/wallets'].length">
    <v-container>
      <v-col>
        <v-card class="mx-auto rounded-card" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-select
                v-model="from"
                :items="fromWallets"
                :item-text="(from) => `${from.amount} ${from.type}`"
                label="from"
                :menu-props="{ auto: true, overflowY: true }"
                @change="walletSelected"
                return-object
              ></v-select>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-icon class="arrow-down" x-large color="black darken-2">
        {{ arrowDown() }}
      </v-icon>
      <v-col>
        <v-card class="mx-auto rounded-card" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-select
                v-model="to"
                :items="toWallets"
                :item-text="(to) => `${to.amount} ${to.type}`"
                label="to"
                :menu-props="{ auto: true, overflowY: true }"
                @change="walletSelected"
                return-object
              ></v-select>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-icon
          class="arrow-down"
          x-large
          color="black darken-2"
          v-if="selectedTwoWallets"
        >
          {{ arrowDown() }}
        </v-icon>
        <v-card
          class="mx-auto rounded-card"
          max-width="344"
          outlined
          v-if="rateLoaded"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-text-field
                v-model="amount"
                :rules="decimalRules"
                label="amount"
                @change="amountChanged"
                required
              ></v-text-field>
              <p class="font-weight-light">{{ rateHint }}</p>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mdiArrowDownBold } from "@mdi/js";
import { Wallet } from "../../store/modules/wallet/interfaces/Wallet";
import { getMoneyRate } from "../../utils/MoneyRate";

@Component
export default class Converting extends Vue {
  from: Wallet | null = null;
  to: Wallet | null = null;
  amount = 0;
  rate = 0;
  rateLoaded = false;
  rateHint = "";

  get fromWallets() {
    if (this.to) {
      return this["$store"].getters["wallet/wallets"].filter(
        (wallet: Wallet) => wallet.id != this.to?.id
      );
    } else {
      return this["$store"].getters["wallet/wallets"];
    }
  }

  get toWallets() {
    if (this.from) {
      return this["$store"].getters["wallet/wallets"].filter(
        (wallet: Wallet) => wallet.id != this.from?.id
      );
    } else {
      return this["$store"].getters["wallet/wallets"];
    }
  }

  get selectedTwoWallets() {
    return !!this.from && this.to;
  }

  async walletSelected() {
    if (this.from && this.to) {
      const { data } = await getMoneyRate(this.from.type, this.to.type);

      this.rate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      this.rateHint = `1 ${this.from.type} = ${Number(this.rate)} ${
        this.to.type
      }`;
      this.rateLoaded = true;
    }
  }

  amountChanged(amount: number) {
    if (this.from && this.to) {
      if (amount > this.from.amount) {
        alert("Not enougth money");
        this.amount = this.from.amount;
        amount = this.from.amount;
      }
      this.rateHint = `${amount} ${this.from.type} = ${Number(
        this.rate * amount
      )} ${this.to.type}`;
    }
  }

  isDecimalRegex = /^((\d+\.?|\.(?=\d))?\d{0,3}).$/;
  decimalRules = [
    (v: string) => this.isDecimalRegex.test(v) || "Amount is required",
  ];

  arrowDown() {
    return mdiArrowDownBold;
  }
}
</script>

<style>
.rounded-card {
  border-radius: 20px !important;
}
.arrow-down {
  display: block !important;
  margin-left: auto;
  margin-right: auto;
}
</style>
