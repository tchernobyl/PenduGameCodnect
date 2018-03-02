import template from './setting.html'



class Controller {



    /** @ngInject */
    constructor(localStorageService,$rootScope) {
        this.$rootScope=$rootScope;
        this.localStorageService=localStorageService;

        this.$rootScope.settings=this.getConfigurationFromLocalStorage();
        this.settings=angular.copy(this.$rootScope.settings);

    }
    setConfigurationInLocalStorageAndClose(){
        this.setConfigurationInLocalStorage();
        this.closeModal()
    }
    submitSettings(){
        console.log("submit",this.SettingsForm.$valid)
        if(this.SettingsForm.$valid){
            this.setConfigurationInLocalStorage();
            this.closeModal()

        }
    }
    closeModal(){
        this.$rootScope.modalSettings.close()
    }
    setConfigurationInLocalStorage(){
        this.$rootScope.settings=this.settings;
        this.localStorageService.set('settings', JSON.stringify(this.settings));

    }
    getConfigurationFromLocalStorage(){
        let settings=this.localStorageService.get("settings")
        if (typeof settings === 'string') {

            return  JSON.parse(settings);
        } else {
            return  {
                userName:'',
                maxTry:10,
            };
        }
    }

}

export default {
    template,
    controller: Controller
};
