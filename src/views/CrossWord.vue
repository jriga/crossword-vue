<template>
  <van-row id="crossword" justify="center">
    <van-col span="20">
      <table id='grid' :style="tableStyle">
        <tbody>
          <tr v-for="y in board.grid" v-bind:key="y">
            <td v-for="x in y" v-bind:key="x" @click="highlight">{{x}}</td>
          </tr>
        </tbody>
      </table>
    </van-col>
  </van-row>

  <van-row class="van-hairline--top" justify="center">
    <van-col span="12">
    
    <ul v-if="showWords">
      <li v-for="word in board.words"
          v-bind:key="word.pattern"
          :style="word.style"
          @found="found">{{word.pattern}}</li>
    </ul>
    </van-col>
  </van-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CrossWord',
  data() {
    return {
      margin: 100,
      tableStyle: {
        width: "70%",
        fontSize: "1.1em"
      },
      activeSearch: [],
      coord: [],
      restart: false
    }
  },
  mounted() {
    const dim = ((900 - 500) / (20 - 12)) * this.$store.getters.size / 1.5 + 100
    const fs = ((1.2 - 2) / (12 - 20)) * this.$store.getters.size / 1.5 + 1
    this.tableStyle = {
      width: dim + "px",
      height: dim + "px",
      fontSize: fs + "em"
    }
  },
  computed: mapState([
    'board',
    'words',
    'showWords'
  ]),
  methods: {
    highlight(event) {
      const verify = function (wordSeq, words) {
        const word = wordSeq.map(function(e) { return e.innerText }).join('')
        return words.map(function(e) {return e.pattern}).includes(word);
      }

      const findWord = function(coords){
        const range = function(start, end) {
          var r = []
          for (var i= start; i <= end; i++) { r.push(i) }
          return r;
        }

        let seq = []
        const table = document.getElementById('grid')
        if (coords[0][0] === coords[1][0]){
          //vertical
          seq = range(coords[0][1], coords[1][1]).map(function(e) {
            return table.rows[e].cells[coords[0][0]]
          })
        }
        else{
          //horizontal
          var row = table.rows[coords[0][1]]
          seq = range(coords[0][0], coords[1][0]).map(function(e){
            return row.cells[e]
          })
        }
        return seq;
      }

      const trigger = function(word) {
        const event = new Event('found');
        const li = [].slice.call(document.getElementsByTagName('li'))
          .filter(elt => elt.innerText == word);
        li[0].dispatchEvent(event)
      }

      this.coord.push(
        [event.target.cellIndex,
         event.target.parentElement.rowIndex])
      event.target.classList.add("active")

      if (this.coord.length == 2) {
        const wordSeq = findWord(this.coord)
        if (verify(wordSeq, this.board.words)) {
          const word = wordSeq.map(function(e) { return e.innerText }).join('')
          trigger(word)
          wordSeq.forEach(function(e){
            e.classList.remove("active");
            e.classList.add("found");
          })
        }else{
          // when word exists in dict add has bonus
          event.target.classList.remove("active");
          wordSeq.forEach(function(e){
            e.classList.remove("active");
          })
        }
        this.coord = []
      }
    },
    found(event) {
      const word = this.board.words.filter(elt => elt.pattern == event.target.innerText);
      word[0].found = true
      word[0].style = {textDecoration: "line-through"}
      this.$store.dispatch('incCoins');

      if (this.board.words.filter(w => w.found).length == this.board.words.length) {
        //inc level
        this.$store.dispatch('incLevel');
        // updateBoard
        this.$store.dispatch('updateBoard');
        // redirect to home page
        this.$router.push({ name: 'Home' });
      }
    }
  }
}
</script>

<style>
#crossword {
    width: 100%;
    padding: 2em;
}

#crossword table {
   background-color: wheat;
   margin: 0 auto;
   border-radius: 12px
}
#crossword table td {
    width: 7em;
    text-align: center;
}
#crossword .active {
    background: #ecf0c0;
}

#crossword .found {
    background: #b1e6aa;
}
</style>
