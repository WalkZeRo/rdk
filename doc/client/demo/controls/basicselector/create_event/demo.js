(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.BasicSelector'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope,EventService,EventTypes ) {
        scope.allItems = [{
                label: "江苏省"
            }, {
                label: "浙江省"
            }, {
                label: "广东省"
            }, {
                label: "广西省"
            }, {
                label: "河北省"
            }, {
                label: "河南省"
            }, {
                label: "湖北省"
            }, {
                label: "湖南省"
            }, {
                label: "新疆省"
            }, {
                label: "四川省"
            }];

            scope.selectedItems = [{
                label: "广西省"
            }, {
                label: "湖南省"
            }, {
                label: "河北省"
            }];


            EventService.register('id_selector', EventTypes.CREATE, function(event, data) {
                if (data) {
                    alert("新增成功！");
                }
            });
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