const defaultWords = ["kusum","penhook","latch","unfoulable","torrentuous","vasostimulant","stroboradiograph","occlusive","indiscernible","hepatorrhexis","shillibeer","warhead","inoculativity","goupen","perisplenetic","codings","retested","tillaea","baccate","myoalbumin","scleroblastemic","superexistent","vanhook","basinful","overmanage","taloscaphoid","henotheism","tarnside","palmyra","signaling","diaconicum","hagridden","physidae","quinquennial","alkylation","vento","sowan","nonirrigated","crustate","piecers"]

export default {
  fetchWords: (url, cb) => {
    fetch(url)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            cb(defaultWords);
          }
            
          // Examine the text in the response
          response.json().then(function(data) {
            cb(data);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
        cb(defaultWords);
      });
  }
}
