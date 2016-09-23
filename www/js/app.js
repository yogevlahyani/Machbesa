// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
	'ionic',
	'ngCordova'
])

.run(function($ionicPlatform, $ionicPopup, $rootScope, $cordovaNetwork) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
  });
})

.controller("MainCtrl", function($ionicPopup, $rootScope, $cordovaNetwork) {
	document.addEventListener("deviceready", function () {

    var type = $cordovaNetwork.getNetwork()

    var isOnline = $cordovaNetwork.isOnline()

    var isOffline = $cordovaNetwork.isOffline()


    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
	  $ionicPopup.confirm({
			title: 'מחובר',
			content: 'אינך מחובר לאינטרנט, אנא התחבר וחזור אלינו'
		});
    });

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
		$ionicPopup.confirm({
			title: 'לא מחובר',
			content: 'אינך מחובר לאינטרנט, אנא התחבר וחזור אלינו'
		});
    });

  }, false);
});
