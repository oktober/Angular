'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('HomeCtrl', [function() {

    }])
  .controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('WordsCtrl', ['$scope', '$http',
      function ($scope, $http) {
            $http.get('data/words.json?' + new Date().getTime()).success(function(data) {
                $scope.words = data.words;
                console.log(data);
            })
  }])
  .controller('QuizCtrl', ['$scope', '$http', '$routeParams', '$timeout',
      function ($scope, $http, $routeParams, $timeout) {
          $http.get('data/words.json?' + new Date().getTime()).success(function(data) {
              var word = data.words[$routeParams.quizId][0];

              //this function will randomize which image displays first
              var randomFunction = function(){
                  var theNumber = Math.round(Math.random());
                  if(theNumber === 0){
                      $scope.img1 = word.correct_img;
                      $scope.img2 = word.incorrect_img;
                  }else{
                      $scope.img1 = word.incorrect_img;
                      $scope.img2 = word.correct_img;
                  }
              };
              randomFunction();

              $scope.word = word;
          });

          $scope.checkImg = function(img){
              if(img == $scope.word.correct_img){
                  //check to see if this is the last sightword
                  if($scope.word.last == 'yes'){
                     window.location = '#/home/';
                  }else{
                      var nextId = parseInt($scope.word.id) + 1;
                      window.location = '#/quiz/'+nextId;
                  }
              }else{
                  alert("Image is incorrect");
              }
          };

          $scope.playClip = function(word){
              var mySound = new buzz.sound("audio/"+word+".mp3");
              mySound.load();
              mySound.play();
          };
  }])
  ;