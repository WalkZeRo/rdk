(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope','EventService', main];
    function main(scope,EventService) {
        scope.mapUrl = '/doc/client/demo/controls/map/drill/data/china.json';

            EventService.register('gis', 'click', function(event, data) {
                scope.name = data.name;
                var id = data.rawData.properties.id;
                if (id.length == 2) {
                    scope.mapUrl = '/doc/client/demo/controls/map/drill/data/geometryProvince/' + id + '.json';
                } else if (id.length == 4) {
                    scope.mapUrl = '/doc/client/demo/controls/map/drill/data/geometryCouties/' + id + '00.json';
                }
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