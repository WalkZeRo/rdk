
// underscore 是一个开源库，提供了丰富的高性能的对数组，集合等的操作
// api 手册：http://learningcn.com/underscore
// 为了少加载不必要的代码，默认是不引入 underscore 的，需要用到的话
// 将define所在中的'underscore'的注释去掉即可。即改为
//        define(['underscore'], function() {
//           ...
//        });

define([/*  'underscore'   */], function() {

// data 是Graph的输入数据。
// 使用data参数时，请务必保持只读
// 除非你很清楚你需要对data做什么，并且了解AngularJS的digest循环机制
// 否则请不要增删改data的任何属性，这会引起digest死循环

// context 是生成图形定义的辅助数据，默认值是应用的scope。
// 在生成复杂图形的时候，仅靠data本身不足以生成一个图形定义
// 此时就需要用到这个对象来辅助

// GraphService 是一个函数集，主要提供了对二维数组的常用操作

// attributes 是当前Graph所在的html节点的所有属性集。也是一种辅助数据。
return function(data, context, GraphService, attributes) {
    var sampleColors = ["#54acd5","#f99660","#a4bf6a","#ec6d6d","#f7b913","#8ac9b6","#bea5c8","#01c5c2","#a17660"];
    var vmaxColors = ['#41addc', '#bea5c8', '#85c56c', '#f99660', '#ffc20e', '#ec6d6d', '#8ac9b6', '#585eaa', '#b22c46', '#96582a'];
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var  colors = GetRequest().vmax==3.0?vmaxColors:sampleColors;
return {
    /*对于有的内容进行换行处理方式*/
    /*
    * 在echarts里面配置项里面用到2种内容换行方式;
    * 1、内容支持html解析,可以用<br>标签换行，如tooltip内容
    * 2、内容支持js解析,可能用\n转义字符，如title标题
    * */
    //tooltip内容设置：
    /*
    * 1、没有特殊要求，设置项应该能满足要求（字符串模板和回调函数都行）;
    * 2、有特殊情况，如：每一条前面的图形标志不用echarts默认的标志，但又没有相关项的设置，怎么办了：
    *    可以这样处理:用回调函数处理，回调函数可以拿到这个点的所有值（如：颜色，内容），其返回值
    *    就是提示框的内容。而返回值是支持html标签解析的，所以你可以用html写出设计模板，再将数据放
    *    到相应的位置就行了。
    * */
    tooltip : {
        trigger: 'axis',
    },
    title:{
        text:'掉话排行',
        textAlign:'left',
        top:20,
        textStyle:{
            fontSize:14,
            fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
            fontWeight: 'normal',
            color: '#008fd4' 
        },
    },
    grid:{
        left:45,
        right:45,
        top:60,
		show:true,
        borderWidth:1
        },
    legend: {
        data: data.rowDescriptor,
        top:20,
        right:43,
        inactiveColor: "#bbb",
        textStyle:{
            color:'#333',
            fontSize:12,
            fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
            fontWeight: 'normal'
        },
        itemWidth:20,//设置icon长高
        itemHeight:10
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : true,
			position:'bottom',
            axisLabel:{
                interval:4,//类轴网格设置
                textStyle: { 
                        fontSize:10,
                        fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
                        fontWeight: 'normal',
                        color: '#666' 
                }       
            },
			axisLine: {//轴线设置
				show:true,
                lineStyle: {
                    color: '#cccccc',
                }
            },  
            splitLine:{//网格相关设置
                show: true,
                interval:0,
                lineStyle:{
                color:"#e5e5e5"
                }

           },
            data : data.header
        },
		
    ],
    /*双数字轴和数据对应那个数字轴设置*/
    /*
    * 数字轴的位置设置：yAxis.position设置为"right"，表示在右侧;
    * 数据显示相对应的数字轴：yAxisIndex：1，表示对应第2个数字轴;
    * */
    yAxis : [
        {
             // name: '掉话次数',
             nameTextStyle:{
                color:colors[0],
                fontSize:10,
                fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
                fontWeight: 'normal',
            },
			axisLabel : {
				//show:true,
				textStyle: { 
					fontSize:10,
					fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
					fontWeight: 'normal',
					color: colors[0],
                },
                formatter: function(params){
                    return  params.toFixed(1)==0 ? "" : params.toFixed(1)
				}             
			},
            max:6,
            splitLine: {show:false},// 是否现示网格
            type : 'value',
            // splitNumber:4,
             axisLine: {
                show:true,
                lineStyle: {
                    color: colors[0]
                }
            }
        },
        {   
            // name: '掉话率(%)',
            type : 'value',
            // max:1.2,
			splitLine: {show:false},
            position:'right',
            axisLabel : {//标签名样式
				textStyle: { 
					fontSize:10,
					fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
					fontWeight: 'normal',
					color: colors[1] 
				},
                formatter: function(params){
                        return  params.toFixed(1)==0 ? "" : params.toFixed(1)
                    }             
			},
            nameTextStyle:{
               color:colors[1],
               fontStyle:'10px'
             },
            axisLine: {
                lineStyle: {
                    color: colors[1],
                }
            },  
        }
    ],
    series : [
        {
            name: data.rowDescriptor[0],animation:true,
            data: data.data[0],showAllSymbol :true,
            legendHoverLink:false,
			itemStyle : { 
                    normal: {
                        label : {show: false, position: 'top'},
                        barBorderColor:colors[0],
                        color:colors[0],
                        barBorderRadius: 0,
                    }
                },
            barCategoryGap:'15%',//控制条形柱间的间距
            type:'bar'
        },
        {
            name: data.rowDescriptor[1],animation:true,
            symbolSize:[5,5],
			itemStyle : { 
                normal: {
                    color:colors[1],
                }
            },
            yAxisIndex: 1,
            smooth: false,
            data: data.data[1],showAllSymbol :true,
            hoverAnimation:false,
            type:'line'
        }
    ]
};

}});