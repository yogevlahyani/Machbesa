// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
	'ionic',
	'ngCordova'
])

.run(function($ionicPlatform, $ionicPopup, $rootScope, $cordovaNetwork, $cordovaInAppBrowser) {
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
	
	if(window.plugins && window.plugins.AdMob) {
            var admob_key = device.platform == "Android" ? "ca-app-pub-9527017308521805/7487375975" : "ca-app-pub-9527017308521805/7487375975";
            var admob_interstitial = "ca-app-pub-9527017308521805/6928972773";
            $rootScope.admob = window.plugins.AdMob;
            $rootScope.admob.createBannerView( 
                {
                    'publisherId': admob_key,
                    'adSize': $rootScope.admob.AD_SIZE.SMART_BANNER,
                    'bannerAtTop': false
                }, 
                function() {
                    $rootScope.admob.requestAd(
                        { 'isTesting': true }, 
                        function() {
                            $rootScope.admob.showAd(true);
                        }, 
                        function() { console.log('failed to request ad'); }
                    );
                }, 
                function() { console.log('failed to create banner view'); }
            );
			
			
			$rootScope.admob.createInterstitialView({
				'publisherId': admob_interstitial
			});
			
			$rootScope.admob.requestInterstitialAd({
				'isTesting': true
			});
			
			$rootScope.admob.showInterstitialAd();
			
        }
	
  });
  
	var options = {
		location: 'no',
		clearcache: 'no',
		toolbar: 'no'
	};

	document.addEventListener("deviceready", function () {
		$cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
		.then(function(event) {
			alert("Success: " + event);
		})
		.catch(function(event) {
			alert("Error: " + event);
		});
		$cordovaInAppBrowser.close();

	}, false);
	
  })

.config(function($stateProvider, $urlRouterProvider, $cordovaInAppBrowserProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('main', {
    url: '/',
    templateUrl: 'main.html',
	controller: "WebCtrl"
  })
    .state('offline', {
    url: '/offline',
    templateUrl: 'offline.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
  
    var defaultOptions = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no'
  };

	document.addEventListener("deviceready", function () {
		$cordovaInAppBrowserProvider.setDefaultOptions(options)
	}, false);

})

.controller("MainCtrl", function($scope, $ionicPlatform, $ionicPopup, $rootScope, $cordovaNetwork, $state) {
	document.addEventListener("deviceready", function () {

    var type = $cordovaNetwork.getNetwork()

    var isOnline = $cordovaNetwork.isOnline()

    var isOffline = $cordovaNetwork.isOffline()


    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
		$rootScope.admob.showInterstitialAd();
		$ionicPopup.alert({
			title: 'תמצצו לי',
			content: 'יוגב המלך וכולכם צריכים למצוץ לי'
		}).then(function(res) {
			$state.go("/");
		});
    });

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
		$ionicPopup.alert({
			title: 'לא מחובר',
			content: 'אינך מחובר לאינטרנט, אנא התחבר וחזור אלינו'
		}).then(function(res) {
			$state.go("offline");
		});
    });

  }, false);
  
  $scope.test = function() {
	var iframe = document.getElementsByTagName('iframe');
	window.history.back();
  };

  document.addEventListener("backbutton", function() {
	  
	  $ionicPopup.show({
    template: 'האם את\ה בטוח\ה שאת\ה רוצה לצאת מהאפליקציה ?',
    title: 'האם את\ה בטוח\ה ?',
    buttons: [
      { text: 'אני נשאר' },
      {
        text: 'יאללה ביי',
        type: 'button-positive',
        onTap: function(e) {
          if (true) {
			navigator.app.exitApp();
			return true;
          } else {
            return false;
          }
        }
      }
    ]
  });
		
  }, false);
  
})

.controller("WebCtrl", function() {
	
});
