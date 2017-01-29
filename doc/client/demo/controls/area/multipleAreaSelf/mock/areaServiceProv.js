(function() {
    return function(request, script) {
        //引入测试数据
        //require('$svr/areaData.js');
        var provinces=[{"ProID":1,"name":"北京市","ProSort":1,"ProRemark":"直辖市"},{"ProID":2,"name":"天津市","ProSort":2,"ProRemark":"直辖市"},{"ProID":3,"name":"河北省","ProSort":5,"ProRemark":"省份"},{"ProID":4,"name":"山西省","ProSort":6,"ProRemark":"省份"},{"ProID":5,"name":"内蒙古","ProSort":32,"ProRemark":""},{"ProID":6,"name":"辽宁省","ProSort":8,"ProRemark":"省份"},{"ProID":7,"name":"吉林省","ProSort":9,"ProRemark":"省份"},{"ProID":8,"name":"黑龙江省","ProSort":10,"ProRemark":"省份"},{"ProID":9,"name":"上海市","ProSort":3,"ProRemark":"直辖市"},{"ProID":10,"name":"江苏省","ProSort":11,"ProRemark":"省份"},{"ProID":11,"name":"浙江省","ProSort":12,"ProRemark":"省份"},{"ProID":12,"name":"安徽省","ProSort":13,"ProRemark":"省份"},{"ProID":13,"name":"福建省","ProSort":14,"ProRemark":"省份"},{"ProID":14,"name":"江西省","ProSort":15,"ProRemark":"省份"},{"ProID":15,"name":"山东省","ProSort":16,"ProRemark":"省份"},{"ProID":16,"name":"河南省","ProSort":17,"ProRemark":"省份"},{"ProID":17,"name":"湖北省","ProSort":18,"ProRemark":"省份"},{"ProID":18,"name":"湖南省","ProSort":19,"ProRemark":"省份"},{"ProID":19,"name":"广东省","ProSort":20,"ProRemark":"省份"},{"ProID":20,"name":"海南省","ProSort":24,"ProRemark":"省份"},{"ProID":21,"name":"广西省","ProSort":28,"ProRemark":""},{"ProID":22,"name":"甘肃省","ProSort":21,"ProRemark":"省份"},{"ProID":23,"name":"陕西省","ProSort":27,"ProRemark":"省份"},{"ProID":24,"name":"新疆维吾尔","ProSort":31,"ProRemark":""},{"ProID":25,"name":"青海省","ProSort":26,"ProRemark":"省份"},{"ProID":26,"name":"宁夏","ProSort":30,"ProRemark":""},{"ProID":27,"name":"重庆市","ProSort":4,"ProRemark":"直辖市"},{"ProID":28,"name":"四川省","ProSort":22,"ProRemark":"省份"},{"ProID":29,"name":"贵州省","ProSort":23,"ProRemark":"省份"},{"ProID":30,"name":"云南省","ProSort":25,"ProRemark":"省份"},{"ProID":31,"name":"西藏","ProSort":29,"ProRemark":""},{"ProID":32,"name":"台湾省","ProSort":7,"ProRemark":"省份"},{"ProID":33,"name":"澳门","ProSort":33,"ProRemark":""},{"ProID":34,"name":"香港","ProSort":34,"ProRemark":""}];
        return {
            header: ['PROVINCE_ID', 'PROVINCE_NAME'],
            field: ['PROVINCE_ID', 'PROVINCE_NAME'],
            data: provinces
        }
    }
})();