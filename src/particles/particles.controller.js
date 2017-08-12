var particlesController = function (particlesModule) {
  'use strict';

  particlesModule.controller('ParticlesController', [
    '$scope',
    '$element',
    '$attrs',
    '$http',
    '$window',
    '$log',
    'ParticlesService',
    function ($scope, $element, $attrs, $http, $window, $log, ParticlesService) {

      var PJS = {
        instance: undefined,
        index: undefined,
        uid: undefined,
        watchers: {
          config: undefined
        }
      };

      var createPJSInstance = function () {
        var PJSConfig = angular.merge({},$scope.config);
        $window.particlesJS(PJS.uid);
        PJS.index = ParticlesService.getPJSIndex(PJS.uid);
        PJS.instance = ParticlesService.getPJSInstance(PJS.index);
        ParticlesService.updatePJS(PJS, PJSConfig);
      };

      var initializePJS = function () {
        //Add a unique id to the element if one is not provided.
        PJS.uid = $attrs.id || (ParticlesService.uid() + '-' + ParticlesService.uid(true));

        $element.attr('id', PJS.uid);
        $element.addClass('ng-particles');

        if ($scope.loadConfig) {
          $http
            .get($scope.loadConfig)
            .then(function (response) {

              $scope.config = response.data;
              createPJSInstance();

              if (typeof $scope.loadCallback === 'function') {
                $scope.loadCallback();
              }

            }, function (response) {
              $log.log('Error pJS - XMLHttpRequest status: ' + response.status);
              $log.log('Error pJS - File config not found');
            });
        } else {
          createPJSInstance();
          PJS.watchers.config = $scope.$watch('config', function (newValue, oldValue) {
            if (newValue !== oldValue) {
              ParticlesService.updatePJS(PJS, newValue);
            }
          }, true);
        }
      };

      $scope.$on('$destroy', function () {
        if (PJS.instance) {
          ParticlesService.destroyPJS(PJS);
          PJS.instance = undefined;
          PJS.uid = undefined;
        }
        //destroy configWatcher;
        if (PJS.watchers.config) {
          PJS.watchers.config();
          PJS.watchers.config = undefined;
        }
      });

      initializePJS();
    }
  ]);
};

module.exports = particlesController;
