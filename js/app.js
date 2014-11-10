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
            templateUrl:'/partials/search.html'
        })
        .when('/add-muso', {
            controller:'MusoCtrl',
            templateUrl:'/partials/add-muso.html'
        })
        .when('/contact-details', {
            templateUrl:'/partials/contact-details.html'
        })
        .when('/add-venue', {
            controller:'VenueCtrl',
            templateUrl: '/partials/add-venue.html'
        })
        .otherwise({
            redirectTo:'/'
        });
    })

.controller('MusoCtrl', function($scope, Musos) {
    // sets $scope to Muso fatory of firebase
    $scope.musos = Musos;
    console.log("$scope.musos: ",$scope.musos);

    $scope.search = "muso";

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
            console.log("addMuso()");
        $scope.muso.type = "muso";
        Musos.$add($scope.muso);
    };

    $scope.getMusoDetails = function(musoId) {
            console.log("getMusoDetails()");
        $scope.musoDetails = Musos.$getRecord(musoId);
            console.log("$scope.musoDetails: ",$scope.musoDetails);
        $scope.searched = true;
    };

})
.controller('VenueCtrl', function($scope, Musos) {

    $scope.addVenue = function() {
        $scope.venue.type = "venue";
        Musos.$add($scope.venue);
    };

});