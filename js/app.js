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
            controller:'MusoCtrl',
            templateUrl:'search.html'
        })
        .when('/add-muso', {
            controller:'MusoCtrl',
            templateUrl:'add-muso.html'
        })
        .when('/new', {
            controller:'TacoCtrl',
            templateUrl:'order.html'
        })
        .when('/confirmation', {
            controller:'ConfCtrl',
            templateUrl:'confirmation.html'
        })
        .when('/soldout',{
            templateUrl:'sold-out.html'
        })
        .otherwise({
            redirectTo:'/'
        });
    })

.controller('MusoCtrl', function($scope, Musos) {
    // sets $scope to Muso fatory of firebase
    $scope.musos = Musos;

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
        "camera man"
    ];

    $scope.addMuso = function() {
        console.log("addMuso()");
        Musos.$add($scope.muso);
    };

});