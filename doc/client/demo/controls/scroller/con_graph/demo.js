(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Scroller','rd.controls.Graph'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','EventService','EventTypes',  main];
    function main(scope,EventService,EventTypes ) {

        EventService.register('scrollerID', EventTypes.CHANGE, function(content,data){
                alert("改变事件")
        });
        scope.images=[
        {
            src:'img/img1.png',
            title:'Pic 1',
            graphData:{
                rowDescriptor: ['最高气温', '最低气温'],
                header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                data: [
                    [15, 15, 15, 15, 15, 15, 15],
                    [1, 4, 6, 4, 9, 6, 3]
                ]
            }
        },
        {
            src:'img/img2.jpg',title:'Pic 2',
            graphData:{
                rowDescriptor: ['最高气温', '最低气温'],
                header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                data: [
                    [11, 13, 15, 18, 15, 12, 10],
                    [5, 5, 5, 5, 5, 5, 5]
                ]
            }
        },
        {
            src:'img/img3.jpg',title:'Pic 3',
            graphData:{
                rowDescriptor: ['最高气温', '最低气温'],
                header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                data: [
                    [15, 14, 13, 11, 13, 14, 15],
                    [1, 4, 6, 4, 9, 6, 3]
                ]
            }
        },
        {
            src:'img/img4.png',title:'Pic 4',
            graphData:{
                rowDescriptor: ['最高气温', '最低气温'],
                header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                data: [
                    [11, 15, 11, 15, 11, 15, 11],
                    [1, 4, 6, 4, 9, 6, 3]
                ]
            }
        },
        {
            src:'img/img5.png',title:'Pic 5',
            graphData:{
                rowDescriptor: ['最高气温', '最低气温'],
                header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                data: [
                    [11, 13, 15, 18, 15, 12, 10],
                    [1, 4, 6, 4, 9, 6, 3]
                ]
            }
        }
        ]
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();