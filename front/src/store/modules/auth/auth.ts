import { ActionTree, MutationTree } from 'vuex'

import axios from '../../../utils/Axios'
import { AuthMutationTypes } from "./MutationTypes"
import { CreateUserDto, LoginDto } from './interfaces/AuthDto'
import { AuthState } from './interfaces/AuthState'

const state = (): AuthState => ({
  token: localStorage.getItem("token") || undefined
})

const getters = {
  isAuthenticated: (state: AuthState) => !!state.token
}

const actions: ActionTree<AuthState, AuthState> = {
  async register(_, createUserDto: CreateUserDto) {
    try {
      const result: string = await axios.post('/auth/registration', createUserDto)
      console.log('registred', result)
    } catch (err) {
      console.log(err)
    }
  },
  async login({ commit }, loginDto: LoginDto) {
    try {
      const token: string = await axios.post('/auth/login', loginDto)
      commit(AuthMutationTypes.LOGIN, token)
      localStorage.setItem('token', token)
      axios.defaults.headers.authorization = `bearer ${token}`
    } catch (err) {
      console.log(err)
    }
  },
  async logout({ commit }) {
    commit(AuthMutationTypes.LOGOUT, undefined)
    localStorage.removeItem('token')
  }
}

const mutations: MutationTree<AuthState> = {
  [AuthMutationTypes.LOGIN]: (state, token) => {
    state.token = token
  },
  [AuthMutationTypes.LOGOUT]: (state, token) => {
    state.token = token
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}