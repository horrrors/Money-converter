import { ActionTree, MutationTree } from 'vuex'

import axios from '../../../utils/Axios'
import { ConvertOrderState } from './interfaces/ConvertOrderState'
import { CreateConvertOrderDto } from './interfaces/CreateConvertOrderDto'
import { GetExchangeRateDto } from './interfaces/GetExchangeRateDto'

const state = (): ConvertOrderState => ({
})

const getters = {
}

const actions: ActionTree<ConvertOrderState, ConvertOrderState> = {
    async getExchangeRate(_, getExchangeRateDto: GetExchangeRateDto) {
        return axios.get('convert/rate', { params: getExchangeRateDto })
    },
    async createConvertOrder(_, createConvertOrderDto: CreateConvertOrderDto) {
        return axios.post('convert', createConvertOrderDto)
    }


}

const mutations: MutationTree<ConvertOrderState> = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}