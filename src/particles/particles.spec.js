/*jshint strict:false */
describe('Particles ', function() {
  var $compile, $rootScope, $scope, $httpBackend,$log, element, canvas;

  beforeEach(function() {
    angular.mock.module('particles.js');
    angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_,_$log_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    });
    element = angular.element('<particles/>');
    angular.element(document.body).append(element);
    $scope = $rootScope.$new();
  });

  afterEach(function() {
    element.remove();
  });

  it('should exist', function() {
    element = $compile(element)($scope);
    $rootScope.$digest();
    canvas = element[0].querySelector('canvas');
    expect(element[0].id).not.toBe('');
    expect(canvas).not.toBe(null);
  });

  it('should occupy the entire browser space', function() {
    element = $compile(element)($scope);
    $rootScope.$digest();
    canvas = element.find('canvas');
    expect(canvas.attr('width')).toEqual(window.innerWidth.toString());
    expect(canvas.attr('height')).toEqual(window.innerHeight.toString());
  });

  it('should update the particles.js configuration', function() {
    element.attr('config', 'testConfig');
    element = $compile(element)($scope);
    $rootScope.$digest();
    expect(window.pJSDom[0].pJS.background.color).toEqual('#272727');
    $scope.testConfig = {
      background: {
        color: false,
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
      }
    };
    $rootScope.$digest();
    expect(window.pJSDom[0].pJS.canvas.el.parentNode.style.backgroundColor).toEqual('transparent');
  });

  describe('Configuration via Ajax', function() {
    var backendRequest;
    beforeEach(function() {
      backendRequest = $httpBackend.when('GET', 'config.json').respond(200, {});
      element.attr('load-config', 'config.json');
      element.attr('load-callback', 'loadCB()');
      element = $compile(element)($scope);
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get configuration via Ajax', function() {
      backendRequest.respond(200, {
        background: {
          color: '#CCC'
        }
      });
      $rootScope.$digest();
      $httpBackend.flush();
      expect(window.pJSDom[0].pJS.background.color).toEqual('#CCC');
    });

    it('should call the load callback function', function() {
      $scope.loadCB = function() {};
      spyOn($scope, 'loadCB');
      $rootScope.$digest();
      $httpBackend.flush();
      expect($scope.loadCB).toHaveBeenCalled();
    });

    it('should throw error on failed configuration via Ajax', function() {
      spyOn($log,'log');
      backendRequest.respond(404, {});
      $rootScope.$digest();
      $httpBackend.flush();
      expect($log.log).toHaveBeenCalledWith('Error pJS - XMLHttpRequest status: 404');
      expect($log.log).toHaveBeenCalledWith( 'Error pJS - File config not found');
    });
  });
});
