import template from './pendu.html'
import styles from './styles.css'
import _ from 'lodash'




class Controller {



    /** @ngInject */
    constructor($rootScope,$uibModal,WordService) {


        this.wordService=WordService;
        this.wordService.getOneWord()
        console.log('getResults',this.wordService.getOneWord())
        this.$rootScope=$rootScope;
        this.styles = styles;
        this.$uibModal=$uibModal;
        if(this.$rootScope.settings){
            this.initDataInController();

        }else{
            this.errorSettingsMessage="s'il vous plaît configurer les paramètres avant de commencer"
            this.openSettings();
        }


    }
    $onInit() {


    }
    initDataInController(){
        this.errorSettingsMessage=null;
        this.maxTry=this.$rootScope.settings.maxTry;
        this.currentTry=0;
        this.score=0;
        let alphabet=getAlphabet();

        let letters=[];

        _.forEach(alphabet, function(vl,i) {
           letters.push( {
                name:vl,
                status:true,
                enabled:true
            })
        });
        this.letters=letters;


        this.word=this.wordService.getOneWord();
    }

    openSettings(){

        let controller=this;
        // open the modal
        this.$rootScope.modalSettings=this.$uibModal.open({
            component: 'setting',
            size:'sm',
            bindings: {
                greeting: 'hello',
            },
        });
        this.$rootScope.modalSettings.result.then(function(result){
            if(controller.$rootScope.settings.userName.length && controller.$rootScope.settings.maxTry){

                controller.initDataInController()
            }

          }, function(result){
              console.log(result)

          });

    }
    checkLetter(index,value){
        let object=this.word;
        if(!object.completed.result && this.currentTry<this.maxTry && value.enabled){


            _.forEach(object.word, function(letter,i) {

                if (letter.toLowerCase() === value.name.toLowerCase()){

                    object.parts[i].letter=letter;
                    object.parts[i].status=true;

                }
            });


            this.letters[index].enabled=false;
            this.currentTry++;
            let searchResults = _.filter(object.parts, (item) => {
                return !item.status
            });

            if(!searchResults.length) {

                object.completed={
                    result:true,
                    message:"Félicitation vous avez gagné",
                    class:"alert-success"}

            }else {
                if(this.currentTry==this.maxTry){
                    object.completed={
                        result:true,
                        message:" Dommage vous avez perdu, :( la réponse est :"+this.word.word,
                        class:"alert-danger"}
                }
            };
        }

    }


}
Controller.$inject = ['$rootScope','$uibModal','WordService'];
export default {
    template,
    controller: Controller
};

let getAlphabet = () => {
    let listAlphabet=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    return listAlphabet;
};