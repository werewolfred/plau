import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'
import axios from 'axios'
import router from '../router'

vue.use(vuex)

// addb.init({
//     appId: 14689,
//     host: window.location.host
// })
var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//plau.herokuapp.com/' : '//localhost:3000/';

let api = axios.create({
    baseURL: baseUrl + 'api/',
    timeout: 4000,
    withCredentials: true
})

let auth = axios.create({
    baseURL: baseUrl,
    timeout: 4000,
    withCredentials: true
})

var store = new vuex.Store({
    state: {
        activeUser: {},
        loggedIn: false,
        results: [],
        resultImgUrl: '',
        userSearchResults: []

    },
    mutations: {
        setUser(state, data) {
            state.activeGames = data.gamesPlayed
            state.activeWins = data.wins
            state.activeUser = data || {}
        },

        setLoggedIn(state, data) {
            state.loggedIn = data
        },

        setBoard(state, data) {
            state.leaderBoard = data
        },

        handleError(state, err) {
            state.error = err
        },
        setResults(state, results) {
            state.results = JSON.parse(results || '{result: []}').result
        },
        clearResults(state) {
            state.results = []
            state.resultImgUrl = ''
        },
        setUserSearchResults(state, data) {
            state.userSearchResults = data.data.data
        }
    },
    actions: {
        search({ commit, dispatch }, query) {
            var getterUrl = '//bcw-getter.herokuapp.com/?url=';
            var apiBaseUrl = 'https://addb.absolutdrinks.com/quickSearch/drinks/';
            var apiKey = '/?apiKey=0ff6ee2b1fef44fab626292fb8348cb5';
            var appId = '?appId=14689';
            var requestString = getterUrl + encodeURIComponent(apiBaseUrl + query + apiKey);
            $.get(requestString).then(data => {
                commit('setResults', data)
            })
        },
        clearResults({ commit }) {
            commit('clearResults')
        },

        setUser(data) {
            commit('setUser', data)
        },

        updateUser({ commit, dispatch }, user) {
            api.put('users/' + user._id, user)
                .then(res => {
                    console.log('updatedUser', res)
                    dispatch('authenticate')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        modifystreethip({ commit, dispatch }, user) {
            api.put('street/' + user.request.Receiver, user.request)
                .then(res => {
                    console.log('updatedUser', res)
                    dispatch('authenticate')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        searchUsers({ commit, dispatch }, query) {
            api('users?querySelector=' + query.querySelector + '&input=' + query.input)
                .then(res => {
                    commit('setUserSearchResults', res)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        register({ commit, dispatch }, accountUser) {
            auth.post('register', accountUser)
                .then(res => {
                    commit('setUser', res.data.data)
                    commit('setLoggedIn', true)
                    if (!res.data.data) {
                        router.push('/Home');
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },


        login({ commit, dispatch }, accountUser) {
            auth.post('login', accountUser)
                .then(res => {
                    commit('setUser', res.data.data)
                    commit('setLoggedIn', true)
                    if (!res.data.data) {
                        router.push('/Home');
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        logout({ commit, dispatch }, credentials) {
            auth.delete('/logout')
                .then(res => {
                    commit('setLoggedIn', false)
                }).catch(err => {
                    commit('handleError', err)
                })
        },

        authenticate({ commit, dispatch }) {
            auth('/authenticate')
                .then(res => {
                    if (res.data.data._id) {
                        commit('setLoggedIn', true)
                        commit('setUser', res.data.data)
                    } else {
                        commit('setLoggedIn', false)
                        console.log('No session found!')
                        router.push('/');
                    }
                }).catch(err => {
                    commit('handleError', err)
                    commit('setLoggedIn', false)
                    router.push('/');
                })
        },

        handleError({ commit, dispatch }, err) {
            commit('handleError', err)
        }
    }
})


export default store


