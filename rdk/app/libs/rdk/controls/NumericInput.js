/**
 * Created by 00100630 on 2016/12/19.
 */
define(['angular', 'jquery', 'rd.core',
  'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap', 'css!rd.styles.NumericInput'], function() {
  var nInputApp = angular.module("rd.controls.NumericInput", ['rd.core']);
  nInputApp.directive('rdkNumericInput', ['EventService', 'EventTypes','Utils', '$timeout','$compile', '$controller',
    function(EventService, EventTypes, Utils, $timeout, $compile, $controller) {
      var scopeDefine = {
          step: '=',
          min: '=',
          max: '=',
          change: '&?'
      }; 
      return {
        restrict: 'E',
        require: '?ngModel',
        scope: scopeDefine,
        controller: ['$scope', function(scope){
          Utils.publish(scope, this);
        }],
        template: function(tElement, tAttrs) {
          return '<div class="input-group numeric_input"> \
            <input type="text" class="form-control" value=0 ng-keydown="keydownHandler($event)" ng-keyup="keyupHandler($event)""> \
            <div class="input-group-addon"> \
              <a href="javascript:;" class="spin-up" ng-click="plus()"><i class="fa fa-angle-up"></i></a> \
              <a href="javascript:;" class="spin-down" ng-click="minus()"><i class="fa fa-angle-down"></i></a> \
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
        Utils.checkEventHandlers(attrs,scopeDefine);
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

        var step = typeof(attrs.step) !=='undefined' ? attrs.step: 1,
          max = attrs.max,min = attrs.min, isFloat = false, bits= 0;

        if (/^[+-]{0,1}([0-9]*\.)\d+$/.test(step)) {
          isFloat = true;
          bits = step.split('.')[1].length;
        }
        //纠错
        try{
          step = parseFloat(step);//isFloat? parseFloat(step): parseInt(step);
          min = parseFloat(min);//isFloat? parseFloat(min): parseInt(min);
          max = parseFloat(max);//isFloat? parseFloat(max): parseInt(max);
        }catch(e) {
          console.error('step、min和max属性必须为数值');
          return;
        }

        if(min){
          inputElement.value = min;
        }

        scope.plus = function() {
          // var value = inputElement.value;
          //value = isFloat? parseFloat(value): parseInt(value);
          _refreshBits(inputElement.value);
          var value = parseFloat(inputElement.value);
          value = parseFloat((value + step).toFixed(bits));
          if (value > max) {
            value = max;
          }
          _resetValue(value);
        };

        scope.minus = function() {
          // var value = inputElement.value;
          //value = isFloat? parseFloat(value): parseInt(value);
          _refreshBits(inputElement.value);
          var value = parseFloat(inputElement.value);
          value = parseFloat((value - step).toFixed(bits));
          if (value < min) {
            value = min;
          }
          _resetValue(value);
        };

        scope.keydownHandler = function(event){
          if(event.keyCode === KEY_CODE.UP){
            event.preventDefault();
            scope.plus();
          }
          if (event.keyCode === KEY_CODE.DOWN){
            event.preventDefault();
            scope.minus();
          }
        };

        scope.keyupHandler = function(event){
          event.preventDefault();
          if((event.keyCode === KEY_CODE.UP) || (event.keyCode === KEY_CODE.DOWN)) return;
          _checkInputIntFloat();
          _refreshValue();
        }

        function _refreshBits(valueStr){
          if (/^[+-]{0,1}([0-9]*\.)\d+$/.test(valueStr)){
            bits = Math.max(valueStr.split('.')[1].length, bits);
          }
        }

        function _resetValue(value){
          EventService.raiseControlEvent(scope, EventTypes.CHANGE, value);
          ngModel.$setViewValue(value);
          inputElement.value = value;
        }

        function _checkInputIntFloat(){
          if(!/^[-]?\d+(?:\.\d+)?$/.test(inputElement.value)){
            inputElement.value = inputElement.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' : inputElement.value.match(/\d{1,}\.{0,1}\d{0,}/);
          }
        }

        function _refreshValue(){
            var arr = inputElement.value.split('.');
            if((arr.length == 2) && (arr[1] == '')){
              _resetValue(inputElement.value);
              return;
            }
            var value = parseFloat(inputElement.value) || 0;
            if(value < min){
              value = min;
            }
            if(value > max){
              value = max;
            }
            _resetValue(value);
        }

        ngModel.$render = function() {
          inputElement.value = ngModel.$viewValue || 0;
        };
      }
    }
  ]);
});