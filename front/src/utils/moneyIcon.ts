import { MoneyTypes } from "@/store/modules/wallet/interfaces/MoneyTypes";
import { mdiCurrencyEur, mdiCurrencyRub, mdiCurrencyUsd } from "@mdi/js";




export const moneyIcon = (type: MoneyTypes) => {
    const map = {
        [MoneyTypes.EUR]: mdiCurrencyEur,
        [MoneyTypes.USD]: mdiCurrencyUsd,
        [MoneyTypes.RUB]: mdiCurrencyRub
    }
    return map[type]


}