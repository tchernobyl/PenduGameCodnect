import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate'
import ngTouch from 'angular-touch'
import uiBootstrap from 'angular-ui-bootstrap';
import LocalStorageModule from 'angular-local-storage'

import {componentsModule} from './components';
import {commonModule} from './common';

import routesConfig from './routes';

import './index.scss';


angular
    .module('myApp', [
        // dependencies
        uiRouter, ngAnimate, ngTouch, uiBootstrap,LocalStorageModule,

        // modules
        componentsModule,
        commonModule,

    ])

    .config(routesConfig)
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('Pendu');
      })
  .run(function ($rootScope,localStorageService) {
    let settings=localStorageService.get("settings")
    if (typeof settings === 'string') {
      $rootScope.settings= JSON.parse(settings);
    }

  })