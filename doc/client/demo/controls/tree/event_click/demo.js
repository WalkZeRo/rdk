(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Tree'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main($scope,EventService,EventTypes ) {
        $scope.clickHandler = function(event,treeNode) {
            alert("单击选中：" + treeNode.label);
        };
        //也可以直接监听
        // EventService.register('testZtree', EventTypes.CLICK, function(event, data){
        //     console.log(data);
        // });
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();