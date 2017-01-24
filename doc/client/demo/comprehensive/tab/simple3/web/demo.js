(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Table','rd.containers.Panel'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main($scope) {
        $scope.setting = {
            "columnDefs" :[
                {
                    title : "操作",
                    render : '<i class="iconfont iconfont-tab"></i>&nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont iconfont-line"></i>'
                }
            ]
        }
        var width = parseFloat($('.hao').css('width'));
        var height = parseFloat($('.hao').css('height'));//恨据外围 div的长宽给图标自动定位
        $('button.images_right').css({
            'left':(width-1)+"px",
            'top':(height/2-32-100)+"px"
        });
        //左右拉的点击动漫效果
        $scope.iconCondition = true;
            $scope.images = function(){
                $scope.iconCondition =!$scope.iconCondition;
                if($('.hao').hasClass('images_down')){
                    $('.hao').removeClass('images_down').addClass('images_up');
                }else{
                    $('.hao').removeClass('images_up').addClass('images_down')
                }
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