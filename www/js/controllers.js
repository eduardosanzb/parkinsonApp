angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($rootScope, $scope, Chats, $ionicPlatform, $localStorage, $ionicSlideBoxDelegate) {
  $scope.x = [];
  $scope.y = [];
  $scope.index = false;
  
  $rootScope.level = 2;
/*
 $ionicPlatform.ready(function(){
    $scope.value = {};
      
      function onError() {
          alert('onError!');
      }
      var options = {frecuency:1000};
      var watchID = navigator.accelerometer.watchAcceleration(function(acceleration){
        var alpha = 0.8;
        var gravity=[];
        gravity[0] = alpha  + (1 - alpha) * acceleration.x;
        gravity[1] = alpha  + (1 - alpha) * acceleration.y;
        
        $scope.x.push(Math.abs(acceleration.x-gravity[0]));
        $scope.y.push(Math.abs(acceleration.y-gravity[1]));
        
        var size = $scope.x.length;
        if(size <= 1)
          $rootScope.level = 1;
        else{
          
          var deltaY = Math.abs($scope.y[size-1] - $scope.y[size-2]);
          var deltaX = Math.abs($scope.x[size-1] - $scope.x[size-2]);
          if(deltaX < 1 && deltaY < 1)
            $rootScope.level = 1;
          else if(deltaX > 1)
            $rootScope.level = 2;
        }
        console.log("Deltax: " + deltaX);
        console.log("Deltay: " + deltaY);
        $scope.$apply();
        $rootScope.$apply();
      }, onError, options);   
 });
*/
  $scope.callDr = function(){
    var number = parseInt($localStorage.get('drTel'));
    document.location.href = 'tel:'+ number;
  }
  $scope.callHospital = function(){
    document.location.href = 'tel:911';
  }

  $ionicSlideBoxDelegate.enableSlide(true);
  $scope.next = function(){
    if($ionicSlideBoxDelegate.currentIndex() == 0){
      $ionicSlideBoxDelegate.next();
      $scope.index = true;
    }
    else{
      $ionicSlideBoxDelegate.previous();
      $scope.index = false;
    }
  }

})
.controller('AgendaCtrl', function($rootScope, $scope, contacts, $ionicModal, $localStorage, $ionicHistory) {
  $scope.contacts = contacts;
  $scope.addContact = function(data){
    if(data){
      var agenda = $localStorage.getObject('agenda');
      agenda.push(data);
      $scope.contacts = agenda;
      $localStorage.setObject('agenda',agenda);
      $scope.newContact = {};
      $scope.addContactModal.hide();     
    }
  }
  $scope.goToDetail = function(contact){
    $scope.currentUser = contact;
    $scope.modalDetail.show();
  }
  $scope.saveUser = function(){
    var temp = $scope.contacts;
    angular.forEach(temp, function(contact){
      delete(contact.$$hashKey)
    });
    $localStorage.setObject('agenda',temp);
    $scope.modalDetail.hide()
  }
  $scope.delete = function(){
    var temp = $scope.contacts;
    for (var i = 0; i < temp.length; i++) {
      delete(temp[i].$$hashKey);
      if(temp[i].$$hashKey === $scope.currentUser.$$hashKey)
        temp.splice(i,1);
    }
    $localStorage.setObject('agenda',temp); 
    $scope.modalDetail.hide()
  }
  $scope.setDr = function(tel){
    $localStorage.set('drTel',tel);
  }
  $scope.call = function(number){
    var number = parseInt(number);
    document.location.href = 'tel:'+ number;
  }
  $scope.goBack = function(){

    $ionicHistory.goBack();
  }
  $ionicModal.fromTemplateUrl('templates/newContact.html',{
    scope:$scope,
    animation:'slide-in-up'
    }).then(function(modal){
      $scope.addContactModal = modal;
    }
  );
  $ionicModal.fromTemplateUrl('templates/detailContact.html',{
    scope:$scope,
    animation:'slide-in-up'
    }).then(function(modal){$scope.modalDetail = modal}
  );
})
.controller('TelCtrl', function($rootScope,$scope, $ionicHistory) {
  $scope.number= "";
  $scope.keys = [[1,2,3],[4,5,6],[7,8,9],['*',0,'#']];
  $scope.append = function(number){
    if(number != "*" || number != "#")
      $scope.number += number;
  };
  $scope.delete = function(){
    $scope.number = $scope.number.slice(0,-1);
  }
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $scope.call = function(){
    var number = parseInt($scope.number);
    document.location.href = 'tel:'+ number;
    $scope.number = "";
  }
})
.controller('EraserCtrl', function($rootScope, $scope,contacts, $ionicPopup,$ionicHistory, $localStorage) {
  $scope.contacts = contacts;
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $scope.delete = function(theContact){
    $ionicPopup.confirm({
      title:'Eliminar Contacto',
      content:'Estas seguro que quieres eliminar a: ' + theContact.name + '?'
    }).then(function(res){
      if(res){
        console.log("deleting contact");
        var temp = $scope.contacts;
        for (var i = 0; i < temp.length; i++) {          
          if(temp[i].$$hashKey === theContact.$$hashKey)
            temp.splice(i,1);
        }
        $localStorage.setObject('agenda',temp); 
      }
    });
  }
});
