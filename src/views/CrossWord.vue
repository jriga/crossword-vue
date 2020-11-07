<template>
  <van-row justify="center">
    <van-col span="22">
      <div id="grid">
        <div class="row" v-for="(y, yi) in board.grid" v-bind:key="y">
          <div class="col"
               :class="colClass"
               :data-x="xi"
               :data-y="yi"
               v-for="(x, xi) in y"
               v-bind:key="x"
               @click="highlight">
            {{x}}
          </div>
        </div>
     </div>
    </van-col>
  </van-row>

  <van-row justify="center">
    <van-col span="12">
      <ul v-if="showWords">
        <li v-for="word in board.words"
            v-bind:key="word.pattern"
            :style="word.style"
            @found="found"
            class="word">{{word.pattern}}</li>
      </ul>
    </van-col>
  </van-row>
</template>

<script>
import { mapState } from 'vuex'
import snd from '@/plugins/sound.js'

export default {
  name: 'CrossWord',
  data() {
    return {
      activeSearch: [],
      coord: [],
      restart: false
    }
  },
  computed: {
    colClass () {
      return "col-" + this.$store.getters.size;
    },
    ...mapState([
      'board',
      'words',
      'showWords'
    ])
  },
  mounted() {
    snd.playMsc(this.$store, snd.selectMusic(this.$store.getters.level))
 },
  methods: {
    highlight(event) {
      const verify = function (wordSeq, words) {
        const word = wordSeq.map(function(e) { return e.innerText }).join('')
        return words.map(function(e) {return e.pattern}).includes(word);
      }

      const findWord = function(coords){
        const range = function(start, end) {
          var r = []
          for (var i= parseInt(start); i <= parseInt(end); i++) { r.push(i.toString()) }
          return r;
        }

        const getLine = function(direction, idx) {
          const elts = document
                .querySelectorAll("[data-"+ direction +"='" + idx + "']")
          return Array.prototype.slice.call(elts)
        }

        let seq = []

        if (coords[0].x === coords[1].x) {
          //vertical
          const list = range(coords[0].y, coords[1].y)
          seq = getLine('x', coords[0].x)
            .filter(elt => list.includes(elt.dataset.y))
        }
        if (coords[0].y === coords[1].y) {
          //horizontal
          const list = range(coords[0].x, coords[1].x)
          seq = getLine('y', coords[0].y)
            .filter(elt => list.includes(elt.dataset.x))
        }

        return seq;
      }

      const trigger = function(word) {
        const event = new Event('found');
        const li = [].slice.call(document.getElementsByTagName('li'))
          .filter(elt => elt.innerText == word);
        li[0].dispatchEvent(event)
      }

      const store = this.$store;
      this.coord.push({
        x: event.target.dataset.x,
        y: event.target.dataset.y,
        elt: event.target})

      event.target.classList.add("active")
      snd.playFx(store, "/fx/blop.wav", 0)

      if (this.coord.length == 2) {
        const wordSeq = findWord(this.coord)
        if (verify(wordSeq, this.board.words)) {
          const word = wordSeq.map(function(e) { return e.innerText }).join('')
          trigger(word)
          wordSeq.forEach(function(e){
            e.classList.remove("active");
            e.classList.add("found");
            snd.playFx(store, "/fx/woosh.wav", 200)
          })
        }else{
          // when word exists in dict add has bonus
          event.target.classList.remove("active");
          this.coord[0].elt.classList.remove('active');
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

<style scoped>
.active {
   background: #ecf0c0;
}

.found {
   background: #b1e6aa;
}
.word {
  display: inline-block;
  padding: 0 5px;
  margin: 5px;
  background: #a29ea3;
  border-radius: 6px;
}

#grid {
  margin: 2rem auto;
  border-radius: 12px;
  color: black;
  background: whitesmoke;
  padding: 15px;
  border: solid 10px grey;
  max-width: fit-content;
}
.row{
  margin: 0;
  padding: 0;
}
.col {
  display: inline-block;
  margin: 0;
  padding: 0;
}

@media (max-width: 320.99999px) {
  #grid {
    margin: 1rem auto;
    padding: 10px;
  }
  .col{
    width: 1.4rem;
    font-size: 1.4rem;
  }
  .col-9 {
    width: 1.3rem;
    font-size: 1.4rem;
  }
  .col-10 {
    width: 1.2rem;
    font-size: 1.2rem;
  }
  .col-11 {
    width: 1.1rem;
    font-size: 1.2rem;
  }
  .col-12 {
    width: 1rem;
    font-size: 1.1rem;
  }
  .col-13 {
    width: 0.93rem;
    font-size: 0.95rem;
  }
  .col-14 {
    width: 0.85rem;
    font-size: 0.9rem;
  }
  .col-15 {
    width: 0.81rem;
    font-size: 0.85rem;
  }
  .col-16 {
    width: 0.76rem;
    font-size: 0.8rem;
  }
  .col-17 {
    width: 0.73rem;
    font-size: 0.85rem;
  }
  .col-18 {
    width: 0.7rem;
    font-size: 0.8rem;
  }
  .col-19 {
    width: 0.65rem;
    font-size: 0.78rem;
  }
  .col-20 {
    width: 0.63rem;
    font-size: 0.79rem;
  }
}

@media (min-width: 322px) and (max-width: 414.99999px) {
  #grid {
    margin: 1.3rem auto;
    padding: 10px;
  }
  .col{
    width: 1.6rem;
    font-size: 1.6rem;
  }
  .col-9 {
    width: 1.4rem;
    font-size: 1.4rem;
  }
  .col-10 {
    width: 1.3rem;
    font-size: 1.3rem;
  }
  .col-11 {
    width: 1.25rem;
    font-size: 1.3rem;
  }
  .col-12 {
    width: 1.15rem;
    font-size: 1.2rem;
  }
  .col-13 {
    width: 1.05rem;
    font-size: 1.1rem;
  }
  .col-14 {
    width: 0.95rem;
    font-size: 1rem;
  }
  .col-15 {
    width: 0.93rem;
    font-size: 1.05rem;
  }
  .col-16 {
    width: 0.83rem;
    font-size: 0.9rem;
  }
  .col-17 {
    width: 0.81rem;
    font-size: 0.85rem;
  }
  .col-18 {
    width: 0.77rem;
    font-size: 0.8rem;
  }
  .col-19 {
    width: 0.73rem;
    font-size: 0.78rem;
  }
  .col-20 {
    width: 0.7rem;
    font-size: 0.79rem;
  }
}

@media (min-width: 415px) and (max-width: 1024.99999px) {
  #grid {
    margin: 1.3rem auto;
    padding: 10px;
  }
  .col{
    width: 1.9rem;
    font-size: 1.6rem;
  }
  .col-7 {
    width: 1.6rem;
  }
  .col-8 {
    width: 1.6rem;
  }
  .col-9 {
    width: 1.7rem;
  }
  .col-10 {
    width: 1.8rem;
  }
  .col-18 {
    width: 1.7rem;
  }
  .col-19 {
    width: 1.7rem;
  }
  .col-20 {
    width: 1.65rem;
  }
}

@media (min-width: 1025px) {
  #grid {
    margin: 2rem auto;
    padding: 15px;
  }
  .col{
    width: 1.9rem;
    font-size: 1.6rem;
  }
  .col-7 {
    width: 1.6rem;
  }
  .col-8 {
    width: 1.6rem;
  }
  .col-9 {
    width: 1.7rem;
  }
  .col-10 {
    width: 1.8rem;
  }
  .col-18 {
    width: 1.7rem;
  }
  .col-19 {
    width: 1.7rem;
  }
  .col-20 {
    width: 1.65rem;
  }
}

</style>
