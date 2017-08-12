angular
  .module('particles.test', ['particles.js'])
  .controller('MainController', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.myCallback = function() {
      alert('Ajax config loaded successfully');
    };

    $scope.config = {
      'particles': {
        'number': {
          'value': 200
        },
        'color': {
          'value': ['#FF9900', '#424242', '#BCBCBC', '#3299BB']
        },
        'opacity': {
          'random': true
        },
        'size': {
          'value': 10,
          'random': true,
          'anim': {
            'enable': true,
            'speed': 2,
            'size_min': 0.1
          }
        },
        'line_linked': {
          'enable': false
        }
      }
    };

    $timeout(function() {
      $scope.config.particles.line_linked.enable = true;
      $scope.config.interactivity = {
        events: {
          onclick: {
            enable: true,
            mode: 'push'
          },
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          resize: false
        }
      };
    }, 5000);
  }]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['particles.test']);
});
