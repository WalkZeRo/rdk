(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Module', 'rd.services.PopupService','base/template/sample_module'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','PopupService', main];
    function main(scope,PopupService) {
        var moduleID;

        scope.load = function(){
            var sampleUrl = 'template/sample_module.html';
            var initData = {myData: 'load module manually...'};
            var option = {
                controller: 'templateController'
            };
            moduleID = PopupService.popup(sampleUrl, initData, option);
        }
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