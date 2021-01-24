import { MoneyTypes } from "@/store/modules/wallet/interfaces/MoneyTypes"

export const moneyImage = (type: MoneyTypes) => {
    const map = {
        [MoneyTypes.EUR]: 'https://pngimg.com/uploads/euro_sign/euro_sign_PNG21579.png',
        [MoneyTypes.USD]: 'https://s1.iconbird.com/ico/2014/1/633/w512h5121390857271USD512.png',
        [MoneyTypes.RUB]: 'https://st24invest.com/userfiles/categories/news/2018-03-05/img_1520235137.png'
    }
    return map[type]


}