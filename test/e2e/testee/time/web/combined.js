define('main', ['application', 'blockUI',
  'rd.controls.BasicSelector','rd.containers.Tab','rd.controls.TabSelector',
  'rd.controls.FoldSelector', 'rd.containers.Accordion','rd.controls.Time',
  'rd.controls.Graph','rd.controls.ComboSelect','rd.controls.Selector','rd.controls.Table','rd.containers.Panel',
  'rd.controls.Scroller'],
function(application) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.containers.Panel',
  'rd.controls.BasicSelector', 'rd.containers.Accordion','rd.containers.Tab','rd.controls.TabSelector'
  , 'rd.controls.FoldSelector','rd.controls.Time','rd.controls.Graph',
  'rd.controls.ComboSelect','rd.controls.Selector','rd.controls.Table','rd.controls.Scroller']);
app.config(['blockUIConfig', function(blockUIConfig) {
    // blockUI默认只要有ajax请求在进行，就会自动启动，阻止页面响应鼠标事件
    // 使用下面代码可以阻止自动模式，启用手动模式
    // blockUIConfig.autoBlock=false
    // 然后在需要阻止页面相应鼠标事件的时候，使用下面代码
    // blockUI.start();
    // 在需要继续相应页面相应鼠标事件的时候，使用下面代码
    // blockUI.stop();

    // blockUI的详细用法参考 https://github.com/McNull/angular-block-ui
    blockUIConfig.template = '<div class="block-ui-message-container">\
                                  <img src="images/loding.gif" />\
                              </div>';
}]);

// 创建一个控制器
app.controller('rdk_ctrl', ['$scope','$timeout','$filter', 'DataSourceService', 'blockUI','EventTypes','EventService',
function(scope,$timeout, $filter,DSService, blockUI,EventTypes,EventService) {
application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/

scope.TimeGap={
    value:['2010-01-01 14:00','2016-08-05 14:00'],//支持y/m/w/d
    granularity: "date",//quarter hour date week month
    selectGranularity: true,
    startDate: "2010-01-01 00:00",
    granularityItems: [{
        label: "天",
        value: "date",
        
    }, {
        label: "周",
        value: "week",
        
    },{
        label: "月",
        value: "month",
        
    }]
}

scope.TimeGranularity={
    value:['2010-01-01 00:00','2016-08-04 14:00'],//支持y/m/w/d
    granularity: "quarter",//quarter hour date week month
    weekStart:'0',// 0（星期日）到6（星期六）
    selectGranularity: true,
    startDate: "2010-01-01 00:00",
    granularityItems: [{
        label: "15分钟",
        value: "quarter"
    }, {
        label: "小时",
        value: "hour"
    }, {
        label: "天",
        value: "date",
    }, {
        label: "周",
        value: "week",
    },{
        label: "月",
        value: "month",
    }]
}


scope.items = [
    {label: "aaa", range: true, setting: {
    value:['2016-08-04 14:00','now'],//支持y/m/w/d
    granularity: "date",//quarter hour date week month
    selectGranularity: true,
    startDate: "2010-01-01 00:00",
    granularityItems: [{
        label: "天",
        value: "date",
        gap:"3d"
    }, {
        label: "周",
        value: "week",
        gap:"3w"
    },{
        label: "月",
        value: "month",
        gap:"3m"
    }]
}},
    {label: "bbb", range: false, setting: {
    value: "now - 2y", //支持y/m/w/d
}},
    {label: "ccc", range: true, setting: {
    value:['2010-01-01 00:00','now -1d'],//支持y/m/w/d
    granularity: "quarter",//quarter hour date week month
    weekStart:'0',// 0（星期日）到6（星期六）
    startDate: "2010-01-01 00:00",
    endDate: "2016-08-29",
    selectGranularity: true,
    granularityItems: [{
        label: "15分钟",
        value: "quarter"
    }, {
        label: "小时",
        value: "hour"
    }, {
        label: "天",
        value: "date",
    }, {
        label: "周",
        value: "week",
    },{
        label: "月",
        value: "month",
    }]
}}
];

scope.timePanel={
    value:['2010-01-01 00:00','2016-08-04 14:00'],//支持y/m/w/d
    granularity: "quarter",//quarter hour date week month
    weekStart:'0',// 0（星期日）到6（星期六）
    selectGranularity: true,
    startDate: "2010-01-01 00:00",
    granularityItems: [{
        label: "15分钟",
        value: "quarter"
    }, {
        label: "小时",
        value: "hour"
    }, {
        label: "天",
        value: "date",
    }, {
        label: "周",
        value: "week",
    },{
        label: "月",
        value: "month",
    }]
}

scope.time=[
    {
        timeScroller:{
            value:['2010-01-01 00:00','2016-08-04 14:00'],//支持y/m/w/d
            granularity: "quarter",//quarter hour date week month
            weekStart:'0',// 0（星期日）到6（星期六）
            selectGranularity: true,
            startDate: "2010-01-01 00:00",
            granularityItems: [{
                label: "15分钟",
                value: "quarter"
            }, {
                label: "小时",
                value: "hour"
            }, {
                label: "天",
                value: "date",
            }, {
                label: "周",
                value: "week",
            },{
                label: "月",
                value: "month",
            }]
        }
    }
]



  
scope.timeCombo={
    value:['2010-01-01 00:00','2016-08-04 14:00'],//支持y/m/w/d
    granularity: "quarter",//quarter hour date week month
    weekStart:'0',// 0（星期日）到6（星期六）
    selectGranularity: true,
    startDate: "2010-01-01 00:00",
    granularityItems: [{
        label: "15分钟",
        value: "quarter"
    }, {
        label: "小时",
        value: "hour"
    }, {
        label: "天",
        value: "date",
    }, {
        label: "周",
        value: "week",
    },{
        label: "月",
        value: "month",
    }]
}       
/************************ 应用的代码逻辑结束 ************************/
}]);

/********************************************************************
          应用如果将代码写在此处，可能会导致双向绑定失效
                需要手工调用 scope.$apply() 函数
          若非有特别的需要，否则请不要将代码放在这个区域
 ********************************************************************/

});

/********************************************************************
                       这个区域不要添加任何代码
 ********************************************************************/
