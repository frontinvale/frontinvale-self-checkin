(function () {
 'use strict';

 SelfCheckin.Controllers.
 controller('AdminCtrl',['$scope', '$http', '$q','eventick', 'dymoprinter', function($scope, $http, $q, eventick, dymoprinter) {
  $scope.$emit('bodyClass', 'admin');
  var defer;

  $scope.newAteendee = false;

  $scope.checked = function(item) {
    return item.checked_at !== null;
  };

  $scope.checkAttendee = function(a) {
    defer = $q.defer();
    defer.promise.then(function(attendee){
      attendee.dirty = false;
      $scope.updateAttendeeStorage();
    });

    if(a.checked_at){
      a.checked_at = null;
      a.dirty = true;
      eventick.checkAttendee(defer, a);
      $scope.updateAttendeeStorage();
    }else{
      a.checked_at = new Date();
      a.dirty = true;
      eventick.checkAttendee(defer, a);
      dymoprinter.print(a.name, a.ticket_type);
      $scope.updateAttendeeStorage();
    }
  };

  $scope.syncAttendee = function(a) {
    defer = $q.defer();
    defer.promise.then(function(attendee){
      attendee.dirty = false;
      $scope.updateAttendeeStorage();
    });
    eventick.checkAttendee(defer, a);
  };

  $scope.addAttendee = function(){
    if ($scope.attendee.name && $scope.attendee.ticket_type && $scope.attendee.email){
      $scope.attendees.push($scope.attendee);
      $scope.attendee = null;
    }
  }

  $scope.resetDay = function(){
    var i;
    for (i=0; i <= $scope.attendees.length-1; i++) {
      $scope.attendees[i].checked_at = null;
    }
  }

}]);
}());
