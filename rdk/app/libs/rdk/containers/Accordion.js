define(['angular', 'jquery', 'rd.core', 'css!rd.styles.Accordion',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
    var accordionModule = angular.module('rd.containers.Accordion', ['rd.core']);

    accordionModule.constant("PositionTypes", {
        TOP: 'top',
        BOTTOM: 'bottom',
        LEFT: 'left',
        RIGHT: 'right',
    });


    accordionModule
        .directive('rdkAccordion', ['Utils', 'EventService', 'EventTypes', '$compile', 'PositionTypes', '$timeout', function(Utils, EventService, EventTypes, $compile, PositionTypes, $timeout) {
            return{
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    foldedIcon: '=?',
                    unfoldedIcon: '=?',
                    caption: '=?',

                    frozen: '=?',
                    open: '=?',
                    editable: '=?',

                    childChange: '&?',

                    buttons: '=',
                    id: '@',
                    expandDirection: '=?',
                    coverable: '=?',
                    exchangable: '=?',
                    minWidth: '=?'
                }, 
                template: 
                '<div class="rdk-accordion-module" ng-click="stopPropagation()">\
                    <div class="theme" ng-click="toggle()">\
                        <i class="{{(minWidth==0)?(open?unfoldedIcon:foldedIcon):(opened?unfoldedIcon:foldedIcon)}}"></i>\
                        <span ng-show="!!caption" class="theme-caption" contentEditable="{{editable}}"\
                         ng-keydown="keyPressHandler($event)"\
                         >\
                            {{caption}}\
                        </span>\
                        <div class="theme-buttons" ng-show="showButtons">\
                            <a href="javascript:void(0)" class="btn btn-link"\
                                ng-repeat="button in buttons"\
                                ng-click="clickHandler(button.callback, button, id)"\
                                ng-mouseover=getTooltips($event,button.tooltips,button.label)>\
                                <img ng-src="{{button.icon}}">{{button.label}}\
                            </a>\
                        </div>\
                    </div>\
                    <div ng-show="open" class="content"></div>\
                </div>',  

                controller: ['$scope', function(scope) {
                    Utils.onChildChange(scope, scope.childChange(scope));
                }],
                compile: function(tEle, tAttrs){
                        return {
                            post: _link
                        }
                },
                terminal: true          
            }

            function _link(scope, iEle, iAttrs, ctrl, transclude){

                var transcludeScope = scope.$parent.$new();
                transclude(transcludeScope, function(clone,innerScope) {
                    for (var key in clone){
                        if (clone.hasOwnProperty(key) && clone[key].tagName == "HEADER_RENDERER") {
                            $(iEle).find(".theme").html("").append(clone[key].innerHTML);
                            $(clone[key]).css('display', 'none');
                        }
                    };
                    if(!iEle.attr('ng-repeat')){//ng-repeat要最后编译
                        $compile(iEle)(scope);
                    }
                    $(iEle).find(".content").html("").append(clone);
                }); 

                if(iEle.attr('ng-repeat')){
                    $compile(iEle.contents())(scope);
                }

                _init();

                if(scope.id){
                    EventService.register(scope.id, EventTypes.OPEN, function(event, data){
                        scope.open = true;
                    });
                    EventService.register(scope.id, EventTypes.CLOSE, function(event, data){
                        scope.open = false;
                    });
                    EventService.broadcast(scope.id, EventTypes.READY, scope);//对ngRepeat的data回显有用
                }

                function _init(){
                    scope.expandDirection = Utils.getValue(scope.expandDirection, iAttrs.expandDirection, PositionTypes.BOTTOM);             
                    scope.caption = Utils.getValue(scope.caption, iAttrs.caption, '');                                       
                    scope.open = Utils.isTrue(scope.open, false);   
                    scope.minWidth =  Utils.getValue(scope.minWidth, iAttrs.minWidth, 0);                           
                    scope.frozen = Utils.isTrue(scope.frozen, false);
                    scope.editable = Utils.isTrue(scope.editable, false);
                    scope.showButtons = angular.isDefined(scope.buttons);                   
                    scope.appScope = Utils.findAppScope(scope);
                    /*var 4 cover*/
                    scope.outerLeft = (parseInt($(iEle[0]).css('left'), 10)|| 0 )- (parseInt($(iEle[0]).css('right'), 10)||0);
                    scope.transcludeDomWidth = iEle[0].querySelector(".content").offsetWidth;
                    scope.supportable = true;
                    /*var 4 cover*/

                    _initDefaultAttrByDirection();
                    _refreshThemeByCaption();

                    _unCoverStartStateHandler();
                    _coverStartStateHandler();

                    scope.toggle = _toggle;
                    scope.clickHandler = _clickHandler;   
                    scope.getTooltips = _getTooltips;

                    scope.keyPressHandler = _keyPressHandler;
                    scope.stopPropagation = _stopPropagation;
                }

                function _coverStartStateHandler(){
                    if(!scope.coverable) return;
                    _coverStartState();
                    _minWidthHandler();
                }

                function _unCoverStartStateHandler(){
                    if(scope.coverable) return;
                    _uncoverStartState();
                    _minWidthHandler();                  
                }

                function _minWidthHandler(){
                    if(scope.minWidth == 0) return;
                    scope.open = true;
                    scope.opened = false;
                    var transcludeDom = iEle[0].querySelector(".content");
                    $(transcludeDom).css({'width': scope.minWidth+'px', 'overflow': 'hidden'});
                }

                function _uncoverStartState(){
                    if((scope.coverable)||(!scope.supportable)) return;
                    if((!scope.coverable) && (scope.exchangable)) return;

                    var themeDom = iEle[0].querySelector(".theme");
                    var transcludeDom = iEle[0].querySelector(".content");
                    var direction = scope.expandDirection.toLowerCase();

                    if(direction == PositionTypes.RIGHT){
                        $(transcludeDom).css({'display': 'inline-block'});
                    }
                    if(direction == PositionTypes.LEFT){   
                        $(transcludeDom).css({'display': 'inline-block'});
                        $(iEle[0]).empty();
                        $(iEle[0]).append(transcludeDom).append(themeDom);
                        $compile(iEle.contents())(scope);
                    } 
                    if(direction == PositionTypes.TOP){
                        $(iEle[0]).empty();
                        $(iEle[0]).append(transcludeDom).append(themeDom);
                        $compile(iEle.contents())(scope);
                    }                 
                }

                function _refreshThemeByCaption(){
                    var direction = scope.expandDirection.toLowerCase();
                    if(!scope.caption){
                        var themeDom = iEle[0].querySelector(".theme");
                        $(themeDom).css({'display': 'inline-block', 'vertical-align': 'top'});
                    }
                    else{
                        if((direction == PositionTypes.LEFT)||(direction == PositionTypes.RIGHT)){
                            console.warn('caption非空，不支持left/right，left/right时请删除caption属性');
                            scope.supportable = false;
                        }
                    }
                    if((scope.coverable && scope.exchangable)||(scope.minWidth!=0)){
                        if((direction == PositionTypes.TOP)||(direction == PositionTypes.BOTTOM)){
                            console.warn('上下覆盖时不支持互换，上下挤开和覆盖都不支持minWidth');
                            scope.supportable = false;
                        }
                    }
                }

                function _defaultCoverable(defaultBln){
                    scope.coverable = Utils.isTrue(scope.coverable, defaultBln);
                    scope.exchangable = Utils.isTrue(scope.exchangable, defaultBln);
                }

                function _initDefaultAttrByDirection(){
                    if(scope.expandDirection == PositionTypes.BOTTOM){
                        _foldIconsHandler("fa fa-angle-down", "fa fa-angle-up");
                        _defaultCoverable(false);
                    }
                    if(scope.expandDirection == PositionTypes.TOP){
                        _foldIconsHandler("fa fa-angle-up", "fa fa-angle-down"); 
                        _defaultCoverable(false);                   
                    }
                    if(scope.expandDirection == PositionTypes.RIGHT){
                        _foldIconsHandler("fa fa-angle-right", "fa fa-angle-left");
                        _defaultCoverable(true);
                    }
                    if(scope.expandDirection == PositionTypes.LEFT){
                        _foldIconsHandler("fa fa-angle-left", "fa fa-angle-right"); 
                        _defaultCoverable(true);                    
                    }
                }

                function _foldIconsHandler(foldedIconStr, unfoldedIconStr){
                    scope.foldedIcon = Utils.getValue(scope.foldedIcon, iAttrs.foldedIcon, foldedIconStr);
                    scope.unfoldedIcon = Utils.getValue(scope.unfoldedIcon, iAttrs.unfoldedIcon, unfoldedIconStr);
                }

                function _uncoverHandler(){//挤开，单击前就编译
                    if((scope.coverable)||(!scope.supportable)) return;
                    if((!scope.coverable) && (scope.exchangable)) return;

                    var themeDom = iEle[0].querySelector(".theme");
                    var transcludeDom = iEle[0].querySelector(".content");
                    var direction = scope.expandDirection.toLowerCase();

                    if(scope.minWidth == 0){
                        scope.open = !scope.open;
                    }
                    else{
                        scope.opened = !scope.opened;
                        $(transcludeDom).css({'width': ((scope.opened)?"":(scope.minWidth+'px'))});                      
                    }               
                }

                function _coverStartState(){
                    if((!scope.coverable)||(!scope.supportable)) return;

                    var themeDom = iEle[0].querySelector(".theme");
                    var transcludeDom = iEle[0].querySelector(".content");
                    var direction = scope.expandDirection.toLowerCase();


                    $(transcludeDom).css({'position': 'absolute', 'z-index': '9999'}); 
                    if(scope.exchangable){
                        if(direction == PositionTypes.LEFT){
                            $timeout(function(){
                                $(transcludeDom).css({'left': themeDom.offsetWidth+'px', 'top': 0});
                            }, 0);
                        }
                        if(direction == PositionTypes.RIGHT){
                            $timeout(function(){
                                $(transcludeDom).css({'right': themeDom.offsetWidth+'px', 'top': 0});
                            }, 0);
                        }
                    }
                    else{
                        $(transcludeDom).css({'width': '100%'});
                        if(direction == PositionTypes.TOP){
                            $timeout(function(){
                                $(transcludeDom).css({'bottom': themeDom.offsetHeight+'px'});
                            }, 0);
                        }
                        if(direction == PositionTypes.RIGHT){
                            $timeout(function(){
                                $(transcludeDom).css({'left': themeDom.offsetWidth+'px', 'top': 0});
                            }, 0);
                        }
                        if(direction == PositionTypes.LEFT){
                            $timeout(function(){
                                $(transcludeDom).css({'right': themeDom.offsetWidth+'px', 'top': 0});
                            }, 0);
                        }
                    }

                }

                function _coverExchangeHandler(){
                    if(!scope.exchangable) return;
                    if(scope.minWidth == 0){
                        if(scope.open){
                            $timeout(function(){
                                _move();
                            }, 0);
                        }
                        else{
                            scope.open = true;
                            $(iEle[0]).animate({'left': scope.outerLeft+'px'}, function(){
                                $timeout(function(){
                                    scope.open = false;
                                }, 0);
                            });
                        }
                    }
                    else{
                        if(scope.opened){
                            $timeout(function(){
                                _move();
                            }, 0);
                        }
                        else{
                            scope.opened = true;
                            $(iEle[0]).animate({'left': scope.outerLeft+'px'}, function(){
                                $timeout(function(){
                                    scope.opened = false;
                                }, 0);
                            });
                        }                        
                    }
                }

                function _move(){
                    var direction = scope.expandDirection.toLowerCase();
                    var moveStep = iEle[0].querySelector(".content").offsetWidth;
                    if(direction == PositionTypes.LEFT){
                        _moveCover(-moveStep);
                    }
                    if(direction == PositionTypes.RIGHT){
                        _moveCover(moveStep);
                    }
                }

                function _moveCover(moveStep){
                    $(iEle[0]).animate({'left': moveStep+scope.outerLeft+'px'}); 
                }

                function _coverHandler(){//覆盖时，根据exchangable分类
                    if((!scope.coverable)||(!scope.supportable)) return;

                    var themeDom = iEle[0].querySelector(".theme");
                    var transcludeDom = iEle[0].querySelector(".content");
                    var direction = scope.expandDirection.toLowerCase();

                    if(scope.minWidth == 0){
                        scope.open = !scope.open;
                    }
                    else{
                        scope.opened = !scope.opened;
                        $(transcludeDom).css({'width': ((scope.opened)?"":(scope.minWidth+'px'))});                      
                    }

                    _coverExchangeHandler();
                }               

                function _stopPropagation(){
                    event.stopPropagation();
                }

                function _keyPressHandler(){
                    if (event.keyCode == 13) {
                        scope.caption = $(iEle[0]).find('span').text();
                        $(iEle[0]).find('span').text(scope.caption);
                    }
                    if (event.keyCode == 27) {
                        $(iEle[0]).find('span').text(scope.caption);
                    }               
                }

                function _toggle(){
                    if(scope.frozen) return;//冻结
                    if(($(iEle).find(".content").get(0).children.length == 1)&&($(iEle).find(".content").get(0).children[0].tagName == "HEADER_RENDERER")) return;//最外层就只有一个header_renderer，没内容
                     
                    _uncoverHandler();//挤开时的处理
                    _coverHandler();//覆盖时的处理

                    if (scope.id){
                        EventService.broadcast(scope.id, EventTypes.CHANGE, scope.open); //事件
                    }
                }               

                function _clickHandler(callback, button, htmlID){
                    callback(button, htmlID);
                    event.stopPropagation();                    
                }  

                function _getTooltips(event, tooltips, label){
                    tooltips = tooltips ? tooltips : label;
                    event.target.setAttribute("title", tooltips);                    
                }
            }
        }])
    })
