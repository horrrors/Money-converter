<template>
  <section>
    <date-picker
      type="datetime"
      placeholder="Select date until converting"
      :show-time-panel="showTimePanel"
      v-model="dateUntil"
      @change="changeDate"
      @close="handleOpenChange"
      :disabled-date="disabledBeforeTodayAndAfterAWeek"
    >
      <template v-slot:footer>
        <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
          {{ showTimePanel ? "select date" : "select time" }}
        </button>
      </template>
    </date-picker>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

@Component({
  components: {
    DatePicker,
  },
})
export default class Calendar extends Vue {
  dateUntil: Date | null = null;
  showTimePanel = false;
  showTimeRangePanel = false;

  toggleTimePanel() {
    this.showTimePanel = !this.showTimePanel;
  }
  toggleTimeRangePanel() {
    this.showTimeRangePanel = !this.showTimeRangePanel;
  }

  handleOpenChange() {
    this.showTimePanel = false;
  }

  changeDate(date: Date) {
    this.$emit("changeDate", date);
  }

  disabledBeforeTodayAndAfterAWeek(date: Date) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 1 * 24 * 3600 * 1000);
    tomorrow.setHours(0, 0, 0, 0);

    return (
      date < tomorrow ||
      date > new Date(tomorrow.getTime() + 7 * 24 * 3600 * 1000)
    );
  }
}
</script>

<style>
.mx-datepicker {
  width: 100% !important;
}
</style>