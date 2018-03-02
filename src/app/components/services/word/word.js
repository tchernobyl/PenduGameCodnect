import _ from 'lodash'

class WordService {


  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  getOneWord() {

    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let length=Math.floor((Math.random()*(6))+4)
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));


    let wordObject={
      word:text,
      completed:{},
      parts:[

      ]
    }
    _.forEach(text, function(value) {
      wordObject.parts.push(
        {
          letter:"-",
          status:false

        }
      )
    });
    return wordObject

  }
}
WordService.$inject=['$http','$q'];

export default WordService;