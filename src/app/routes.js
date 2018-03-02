export default routesConfig;

// Using latest UI-ROUTER
// docs here: https://ui-router.github.io/docs/latest/

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '',
      component: 'app'
    })
    .state('app.pendu', {
      url: '/',
      component: 'pendu'
    })

}
