const snd = {
  audioPlayer: null,
  play: (path, vol) => {
    const audio = new Audio(path);
    if (vol == 'undefined' || vol == null) {
      audio.volume = 0.5;
    }
    else{
      audio.volume = vol;
    }
    audio.addEventListener("canplay", event => {
      audio.play();
    });
    return audio;
  },
  playFx: (store, path, delay) => {
    if (store.getters.fx) {
      setTimeout(function() { snd.play(path) }, delay);
    }
  },
  playMsc: (store, path) => {
    if (snd.audioPlayer) {
      const url = new URL(snd.audioPlayer.src)
      if (url.pathname != path) {
        snd.audioPlayer.src = path
      }
    }
    else {
      snd.audioPlayer = snd
        .play(path, store.getters.musicVol)
      snd.audioPlayer.loop = true;
    }
  },
  selectMusic: (level) => {
    let path = '/snd/game/puzzle_theme.wav';

    if (level > 10)  { path = '/snd/game/marimba_boy.wav'; }
    if (level > 20)  { path = '/snd/game/puzzle_gamer.wav'; }
    if (level > 30)  { path = '/snd/game/papergirl.wav'; }
    if (level > 40)  { path = '/snd/game/marimba_game1.wav'; }
    if (level > 50)  { path = '/snd/game/kilijoy_arena.wav'; }
    if (level > 60)  { path = '/snd/game/african_safari_loop.wav'; }
    if (level > 70)  { path = '/snd/game/rock_and_diamonds.wav'; }
    if (level > 80)  { path = '/snd/game/wooden_dices.wav'; }

    return path;
  }
}

export default snd
