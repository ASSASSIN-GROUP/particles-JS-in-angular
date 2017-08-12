var particlesComponent = function(particlesModule) {
  'use strict';

  particlesModule.directive('particles', function() {
      return {
        scope: {
          loadConfig: '@',
          loadCallback: '&',
          config: '=?'
        },
        restrict:'EA',
        controller: 'ParticlesController'
      };
    });
};

module.exports = particlesComponent;
