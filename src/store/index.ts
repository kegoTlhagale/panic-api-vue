import { Commit, createStore } from 'vuex'

export default createStore({
  state: {
    id: '',
    loggedIn: false,
    adminUser: false,
    responder: false,
    number: '',
    // set when a user logs in
    user: ''
  },
  mutations: {
    SET_AUTH: (state: { loggedIn: boolean }, loggedIn: boolean) => (state.loggedIn = loggedIn),
    SET_USER: (state: { user: string }, user: string) => (state.user = user),
    SET_NUMBER: (state: { number: string }, number: string) => (state.number = number),
    SET_RESPONDER: (state: { responder: boolean, }, responder: boolean) => (state.responder = responder)
  },
  actions: {
    setAuth: ({ commit }: { commit: Commit }, loggedIn: boolean) => commit('SET_AUTH', loggedIn),
    setUser: ({ commit }: { commit: Commit }, user: string) => commit('SET_USER', user),
    setNumber: ({ commit }: { commit: Commit }, number: string) => commit('SET_NUMBER', number),
    setResponder: ({ commit }: { commit: Commit }, responder: boolean) => commit('SET_RESPONDER', responder)
  },
  modules: {
  }
})
