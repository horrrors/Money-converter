
import { ActionTree, MutationTree } from 'vuex'
import axios from '../../../utils/Axios'
import { Wallet } from './interfaces/Wallet'
import { CreateWalletDto } from './interfaces/WalletDto'
import { WalletState } from './interfaces/WalletState'
import { WalletMutationTypes } from './MutationTypes'


const state = (): WalletState => ({
    wallets: []
})

const getters = {
    wallets: (state: WalletState) => state.wallets
}


const actions: ActionTree<WalletState, WalletState> = {
    async createWallet(_, createWalletDto: CreateWalletDto) {
        try {
            const wallet: Wallet = await axios.post('/wallet', createWalletDto)
            console.log('created', wallet)
        } catch (err) {
            console.log(err)
        }
    },
    async getWallets({ commit }) {
        try {
            const wallets: Wallet[] = await axios.get('/wallet')
            commit(WalletMutationTypes.SET_TODO, wallets)
            console.log('got', wallets)
        } catch (err) {
            console.log(err)
        }
    }
}

const mutations: MutationTree<WalletState> = {
    [WalletMutationTypes.SET_TODO]: (state, wallets) => {
        state.wallets = wallets
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}