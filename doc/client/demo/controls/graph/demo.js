(function() {
    // ��Щ�����ͺ�����˵������ο� rdk/app/example/web/scripts/main.js ��ע��
    var downloadDependency = [
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        $code
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 �����￪ʼ�Ĵ��롢ע���벻Ҫ�����޸�
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();