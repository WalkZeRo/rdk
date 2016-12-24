/**
 * Created by 00100630 on 2016/12/19.
 */
define(['angular', 'jquery', 'rd.core',
  'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap', 'css!rd.styles.NumericInput'], function() {
  var nInputApp = angular.module("rd.controls.NumericInput", ['rd.core']);
  nInputApp.directive('rdkNumericInput', ['EventService', 'EventTypes','Utils', '$timeout','$compile', '$controller',
    function(EventService, EventTypes, Utils, $timeout, $compile, $controller) {
      return {
        restrict: 'E',
        require: '?ngModel',
        scope: {
          step: '=',
          min: '=',
          max: '=',
          change: '&?'
        },
        controller: ['$scope', function(scope){
          Utils.publish(scope, this);
        }],
        template: function(tElement, tAttrs) {
          return '<div class="input-group numeric_input"> \
            <input type="number" class="form-control" value=0 ng-keydown="changeValue($event)"> \
            <div class="input-group-addon"> \
              <a href="javascript:;" class="spin-up" ng-click="plus()"><i class="glyphicon glyphicon-chevron-up"></i></a> \
              <a href="javascript:;" class="spin-down" ng-click="minus()"><i class="glyphicon glyphicon-chevron-down"></i></a> \
            </div> \
          </div>';
        },
        compile: function(tEle, tAttrs) {
          return {
            post: _link
          }
        }
      }



      function _link(scope, element, attrs, ngModel) {
        if (!ngModel) return;
        var inputElement = element[0].children[0].children[0];

        var updateModel = function(inputValue) {
          scope.$apply(function() {
            ngModel.$setViewValue(inputValue);
          });
        };

        var KEY_CODE = {
          DOWN: 40,
          UP: 38
        };

        var step = attrs.step? attrs.step: 1,max = attrs.max,min = attrs.min, isFloat = false, bits= 0;

        if (/^[+-]{0,1}([0-9]*\.)\d+$/.test(step)) {
          isFloat = true;
          bits = step.split('.')[1].length
        }
        //纠错
        try{
          step = isFloat? parseFloat(step): parseInt(step);
          min = isFloat? parseFloat(min): parseInt(min);
          max = isFloat? parseFloat(max): parseInt(max);
        }catch(e) {
          console.error('step、min和max属性必须为数值');
          return;
        }

        if(min){
          inputElement.value = min;
        }

        scope.plus = function() {
          var value = inputElement.value
          value = isFloat? parseFloat(value): parseInt(value)
          value = (value + step).toFixed(bits)
          if (value > max) {
            value = max;
          }
          EventService.raiseControlEvent(scope, EventTypes.CHANGE, value);
          ngModel.$setViewValue(value);
          inputElement.value = value;
        };

        scope.minus = function() {
          var value = inputElement.value
          value = isFloat? parseFloat(value): parseInt(value)
          value = (value - step).toFixed(bits)
          if (value < min) {
            value = min;
          }
          EventService.raiseControlEvent(scope, EventTypes.CHANGE, value);
          ngModel.$setViewValue(value);
          inputElement.value = value;
        };

        scope.changeValue = function (event) {
          event.preventDefault();
          if(event.keyCode === KEY_CODE.UP) {
            scope.plus();
          } else if (event.keyCode === KEY_CODE.DOWN) {
            scope.minus();
          }
        };

        ngModel.$render = function() {
          inputElement.value = ngModel.$viewValue || 0;
        };
      }
    }
  ]);
});