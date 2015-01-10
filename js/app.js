console.log("app.js");
var app = angular.module("theMusoList", ["firebase", "ngRoute", "checklist-model"])

.value('fbURL', 'https://glowing-inferno-2667.firebaseio.com/')

.factory('Musos', function($firebase, fbURL) {
    return $firebase(new Firebase(fbURL)).$asArray();
})

 // ROUTES
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl:'/the-muso-list/partials/search.html'
        })
        .when('/add-muso', {
            templateUrl:'/the-muso-list/partials/add-muso.html'
        })
        .when('/contact-details', {
            templateUrl:'/the-muso-list/partials/contact-details.html'
        })
        .when('/add-venue', {
            templateUrl: '/the-muso-list/partials/add-venue.html'
        })
        .when('/venue-details', {
            templateUrl: '/the-muso-list/partials/venue-details.html'
        })
        .otherwise({
            redirectTo:'/'
        });
    })

.controller('MusoCtrl', function($scope, Musos, $location) {
    // sets $scope to Muso factory of firebase
    $scope.musos = Musos;
    console.log("$scope.musos: ",$scope.musos);
    $scope.muso = {};
    $scope.venue = {};

    $scope.search = "muso";
    $scope.edit = "";

    // checkbox list of skills
    $scope.skills = [
        "singer",
        "piano",
        "guitar",
        "bass",
        "drums",
        "double bass",
        "acoustic guitar",
        "saxaphone",
        "trumpet",
        "trombone",
        "violin",
        "cello",
        "fiddle",
        "percussion",
        "live sound",
        "lighting",
        "producer",
        "writer",
        "agent",
        "photographer",
        "camera man",
        "engineer"
    ];

    $scope.addMuso = function() {
            // console.log("addMuso()");
        $scope.muso.type = "muso";
        Musos.$add($scope.muso);
        $scope.muso = {};
    };

    $scope.getMusoDetails = function(musoId) {
            // console.log("getMusoDetails()");
        $scope.venueDetails = {};
        $scope.musoDetails = Musos.$getRecord(musoId);
            // console.log("$scope.musoDetails: ",$scope.musoDetails);
        $scope.searched = true;
    };

    $scope.editMuso = function() {
        Musos.$save($scope.musoDetails).then(function(ref) {
          alert("Muso updated");
          $location.path('/');
        }, function(error) {
          alert("Sorry there was an error:", error);
        });
    };

    $scope.deleteMuso = function() {
        Musos.$remove($scope.musoDetails).then(function(ref) {
          alert("Muso deleted");
          $location.path('/');
        }, function(error) {
          alert("Sorry there was an error:", error);
        });
    };

    $scope.getVenueDetails = function(venueId) {
            // console.log("id: ", venueId);
            // console.log("getVenueDetails()");
        $scope.musoDetails = {};
        $scope.venueDetails = Musos.$getRecord(venueId);
            // console.log("$scope.venueDetails: ",$scope.venueDetails);
        $scope.searched = true;
    };

    $scope.editVenue = function() {
        Musos.$save($scope.venueDetails).then(function(ref) {
            alert("Venue updated");
            $location.path('/');
        }, function(error) {
          alert("Sorry there was an error:", error);
        });
    };

    $scope.deleteVenue = function() {
        Musos.$remove($scope.venueDetails).then(function(ref) {
          alert("Venue deleted");
          $location.path('/');
        }, function(error) {
          alert("Sorry there was an error:", error);
        });
    };

    $scope.addVenue = function() {
        $scope.venue.type = "venue";
        Musos.$add($scope.venue).then(function(ref) {
            alert("Muso saved");
            $scope.venue = {};        
        }, function(error) {
          alert("Sorry there was an error:", error);
        });
    };

})

  .controller('EditMuso', function ($scope, $location, $routeParams, $firebase, fbURL) {
    var personURL = new Firebase(fbURL + $routeParams.id);
    $scope.person = $firebase(personURL).$asObject();

    $scope.edit = function() {
      $scope.person.$save();
      $location.path('/');
    }
  });