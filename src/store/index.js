import 'es6-promise/auto'
import { createStore } from 'vuex'
import * as b from '@/assets/js/crossword.js'
import api from '@/api'

const initState = {
  level: 1,
  size: 9,
  showWords: true,
  board: {
    grid: [],
    words: []
  },
  coins: 0,
  sounds: {
    fx: true,
    musicVol: 0.2
  }
}

const getters = {
  level: state => { return state.level },
  size: state => { return state.size },
  showWords: state => { return state.showWords },
  grid: state => { return state.board.grid },
  words: state => { return state.board.words },
  coins: state => { return state.coins },
  fx: state => { return state.sounds.fx },
  musicVol: state => { return state.sounds.musicVol }
}

const actions = {
  updateBoard (context) {
    const s = context.getters.size
    const url = "/request?max=" + s + "&min=3&limit="+ (s * 2)
    api.fetchWords(url, words => {
      b
      const board = window.crossword.core.create(words, {"max-length": s})
      board.words = board.words.map(o => {
        o.found = false
        o.style = {textDecoration: "unset"}
        return o
      })
      context.commit('updateBoard', board) 
    })
  },
  incLevel (context) {
    context.commit('incLevel');
  },
  incCoins (context) {
    context.commit('incCoins');
  }
}

const mutations = {
  updateSize(state, size) {
    state.size = parseInt(size)
  },
  updateShowWords(state, bool) {
    state.showWords = bool
  },
  updateSoundsFx(state, bool) {
    state.sounds.fx = bool
  },
  updateSoundsMusicVol(state, value) {
    state.sounds.musicVol = value
  },
  incLevel(state) {
    state.level++
  },
  incCoins(state) {
    state.coins++
  },
  decCoins(state) {
    state.coins--
  },
  updateBoard(state, board) {
    state.board = board
  }
}

const store = createStore({
  state () {
    return initState;
  },
  getters,
  actions,
  mutations
});

export default store
