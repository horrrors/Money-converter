
<template>
  <v-col :cols="4">
    <v-card
      v-if="!clicked"
      class="mx-auto rounded-card pre-added"
      min-height="170px"
      max-width="344"
      width="100%"
      outlined
    >
      <v-card-actions width="100%" class="pre-added">
        <v-btn
          @click="clicked = true"
          rounded
          x-large
          text
          class="button pre-added"
          ><v-icon x-large color="black darken-2">
            {{ mdiIcon() }}
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card
      v-if="clicked"
      class="mx-auto rounded-card"
      min-height="170px"
      max-width="344"
      width="100%"
      outlined
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            <v-text-field
              v-model="amount"
              :rules="decimalRules"
              label="amount"
              required
            ></v-text-field>
            <v-select
              required
              v-model="moneyType"
              dense
              :items="moneyItems"
            ></v-select>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text class="action-button" @click="create">
          create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mdiPlusBox } from "@mdi/js";
import { MoneyTypes } from "../store/modules/wallet/interfaces/MoneyTypes";
import { CreateWalletDto } from "../store/modules/wallet/interfaces/WalletDto";
@Component
export default class CreateWalletCard extends Vue {
  clicked = false;
  amount = 0;

  moneyItems = Object.values(MoneyTypes);
  moneyType = this.moneyItems[0];

  isDecimalRegex = /^((\d+\.?|\.(?=\d))?\d{0,3}).$/;
  decimalRules = [
    (v: string) => this.isDecimalRegex.test(v) || "Amount is required",
  ];

  async create() {
    const createWalletDto: CreateWalletDto = {
      amount: this.amount,
      type: this.moneyType,
    };

    try {
      await this["$store"].dispatch("wallet/createWallet", createWalletDto);
      this.clicked = false;
      this.amount = 0;
      this["$store"].dispatch("wallet/getWallets");
    } catch (err) {
      console.log(err);
    }
  }

  mdiIcon() {
    return mdiPlusBox;
  }
}
</script>

<style >
.pre-added {
  position: relative;
  height: 100%;
}
.button.pre-added {
  margin-left: auto;
  margin-right: auto;
}
.action-button {
  margin-left: auto;
  margin-right: auto;
}
</style>