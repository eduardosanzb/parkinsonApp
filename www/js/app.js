// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform, $localStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(!$localStorage.getObject('agenda'))
      $localStorage.setObject('agenda',[]);
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('chats', {
      url: '/chats',
      templateUrl: 'templates/tab-chats.html',
      controller: 'ChatsCtrl' 
  })
  .state('tel',{
    url:'/tel',
    templateUrl:'templates/tel.html',
    controller:'TelCtrl'
  })
  .state('agenda',{
    url:'/agenda',
    templateUrl:'templates/agenda.html',
    controller:'AgendaCtrl',
    resolve:{
      "contacts":function($localStorage){
        var agenda = $localStorage.getObject('agenda');
        if(agenda.length == 0)
          return null;
        else
          return agenda;
      }
    }
  })
  .state('eraser',{
    url:'/eraser',
    templateUrl:'templates/eraser.html',
    controller:'EraserCtrl',
    resolve:{
      "contacts":function($localStorage){
        var agenda = $localStorage.getObject('agenda');
        if(agenda.length == 0)
          return null;
        else
          return agenda;
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/chats');

});
