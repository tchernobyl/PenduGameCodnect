import angular from 'angular';

import app from './app/app'
import pendu from './pendu/pendu'
import setting from './setting/setting'
import WordService from './services/word/word';
export const componentsModule = 'myApp.components';

angular
  .module(componentsModule, [])
  .component('app', app)
  .service('WordService', WordService)
  .component('pendu', pendu)
  .component('setting', setting)
