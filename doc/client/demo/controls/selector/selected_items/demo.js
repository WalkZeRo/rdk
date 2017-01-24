(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Selector', 'rd.controls.FoldSelector', 'rd.controls.BasicSelector'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope,EventService,EventTypes ) {
        scope.groupData = {
            "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
            "title2": [{ id: 2, label: "广东省" }, { id: 3, label: "广西省" },
                { id: 4, label: "河北省" }, { id: 5, label: "河南省" }
            ]
        };

        scope.groupSelectedItems = {
            "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
            "title2": [{ id: 2, label: "广东省" }]
        };


        scope.changeHandler = function(event, data) {
            console.log(scope.groupSelectedItems);
        }

        scope.clickHandler = function(){
            scope.groupSelectedItems = {
                "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
                "title2": [{ id: 2, label: "广东省" }, { id: 4, label: "河北省" }]
            };
        }

        EventService.register('test4selector', EventTypes.CHANGE, function(event, data){
            console.log(scope.groupSelectedItems);
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