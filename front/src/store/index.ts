import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import auth from './modules/auth/auth'
import wallet from './modules/wallet/wallet'
import { State } from './StoreState'

Vue.use(Vuex)

const store: StoreOptions<State> = {
  modules: {
    auth,
    wallet
  }
}

export default new Vuex.Store(store)
