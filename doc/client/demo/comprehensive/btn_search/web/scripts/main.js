define('main', ['rd.controls.BtnSearch'], function() {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.BtnSearch']);
// 创建一个控制器
app.controller('myCtrl', ['$scope',  function(scope) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
	var userInfo = "用户接口";
    scope.search = function() {
        alert(userInfo);
    }
}
]);
});
