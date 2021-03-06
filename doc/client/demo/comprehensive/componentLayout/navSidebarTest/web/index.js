/*
===============================
    这些代码不重要，可无视
===============================
*/
(function() {
    var imports = [
        'base/demo',
        'rd.controls.Module','css!base/css/sidebar','rd.containers.Tab','rd.controls.Icon',
        'rd.controls.Table','rd.controls.Graph'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'DataSourceService','EventService', main];
    function main(scope, DataSourceService,EventService) {
        imports.helper.initDataSourceService(DataSourceService);
        scope.load = function() {
            rdk.m.loadModule({}, 'demo.html');
        }

        scope.setTitle = function() {
            var dom = $("div[doc_title]");
            var demoUrl = location.pathname.match(/\/doc\/client\/demo\/(.*)\//)[1];
            document.title = dom.length == 0 ? demoUrl : $(dom[0]).attr('doc_title');
        }
        scope.setting = {
            "columnDefs" :[
                {
                    title : "详单",

                    render : '<i class="iconfont iconfont-e8b7"></i>'
                },
                {
                    title : "得分趋势",
                    render : '<i class="iconfont iconfont-e8c8"></i>'
                }
            ]
        }
        function sidebarSize(){
            var sidebarHeight = $('.sidebar').height();
            var sidebarBtnHeight = $('.sidebarBtn').height();
            $('.sidebarBtn').css({
                "top":(sidebarHeight-sidebarBtnHeight)/2+'px',
            });
        }
        $(window).resize(function() {          //当浏览器大小变化时
            sidebarSize()
        });
        EventService.register('EventService', 'ready', function() {
            sidebarSize();
        });
        scope.iconCondition = true;
        scope.sideBarBtn = function(){
            scope.iconCondition = !scope.iconCondition
        }

    }
    require.config({paths:{helper: '/doc/tools/doc_js/doc_app_helper'}});
    imports.push({ url: 'blockUI', alias: 'blockUI' });
    imports.push({ url: 'helper', alias: 'helper' });
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller('RootController', controllerDefination);
        rdk.$ngModule.config(['blockUIConfig', function(blockUIConfig) {
            blockUIConfig.template = '<div class="block-ui-message-container">'
                + application.loadingImage + '</div>';
        }]);
    };
})();