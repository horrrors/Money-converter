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
                v-model.number="amount"
                :rules="decimalRules"
                label="amount"
                @change="amountChanged"
                type="number"
                required
              ></v-text-field>
              <p class="font-weight-regular">{{ rateHint }}</p>
              <v-text-field
                type="number"
                v-model.number="desiredRate"
                :rules="decimalRules"
                label="Desired rate "
                required
              ></v-text-field>
              <calendar @changeDate="changeDate" />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn
              class="action-button"
              :loading="creating"
              :disabled="creating"
              color="info"
              @click="createConvertOrder"
            >
              Create order
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-card-actions>
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
import { GetExchangeRateDto } from "../../store/modules/convertOrder/interfaces/GetExchangeRateDto";
import Calendar from "../../components/Calendar.vue";
import { CreateConvertOrderDto } from "../../store/modules/convertOrder/interfaces/CreateConvertOrderDto";

@Component({
  components: {
    Calendar,
  },
})
export default class Converting extends Vue {
  from: Wallet | null = null;
  to: Wallet | null = null;
  amount = 0;
  desiredRate: number | null = null;
  rate = 0;
  rateLoaded = false;
  rateHint = "";
  dateUntil: Date | null = null;
  loader = null;
  creating = false;

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

  get canSendToCreate() {
    return (
      this.from && this.to && this.desiredRate && this.amount && this.dateUntil
    );
  }

  async walletSelected() {
    if (this.from && this.to) {
      try {
        const getExchangeRateDto: GetExchangeRateDto = {
          from: this.from.type,
          to: this.to.type,
        };
        const { rate } = await this["$store"].dispatch(
          "convertOrder/getExchangeRate",
          getExchangeRateDto
        );

        this.rate = rate;
        this.desiredRate = this.rate;
        this.rateHint = `Current rate: 1 ${this.from.type} = ${Number(
          this.rate
        )} ${this.to.type}`;
        this.rateLoaded = true;
      } catch (err) {
        console.log(err);
      }
    }
  }

  async createConvertOrder() {
    if (this.from && this.to && this.desiredRate && this.dateUntil) {
      this.creating = true;

      const createConvertOrderDto: CreateConvertOrderDto = {
        id_from: this.from.id,
        id_to: this.to.id,
        desired_rate: this.desiredRate,
        amount: this.amount,
        date_time: this.dateUntil,
      };
      try {
        await this["$store"].dispatch(
          "convertOrder/createConvertOrder",
          createConvertOrderDto
        );
        this.from = null;
        this.to = null;
        this.amount = 0;
        this.rateLoaded = false;
        alert("Order created.");
      } catch (error) {
        console.log(error);
      }
      this.creating = false;
    }
  }

  amountChanged(amount: number) {
    if (this.from && this.to) {
      if (amount > this.from.amount) {
        alert("Not enought money");
        this.amount = +this.from.amount;
        amount = this.from.amount;
      }
      this.rateHint = `${amount} ${this.from.type} = ${Number(
        this.rate * amount
      )} ${this.to.type}`;
    }
    // this.amount = Number(this.amount);
  }

  changeDate(date: Date) {
    this.dateUntil = date;
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
.action-button {
  margin-left: auto;
  margin-right: auto;
}
.font-weight-regular {
  /* margin-top: 10px; */
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 10px !important;
}
</style>
