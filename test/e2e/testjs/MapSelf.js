'use strict';
describe('Map demo',function(){
    beforeEach(function(){
        browser.get("test/e2e/testee/map/web/self.html");
        browser.sleep(3000);
    });
    afterEach(function(){
    });
    it('module click test should show module name 白城市',function(){
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:80,y:80}).click().perform();
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("白城市");
        });
    });
    it('module click test should show module name 松原市',function(){
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:120,y:100}).click().perform();
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("松原市");
        });
    });
    it('module click test should show module name 长春市',function(){
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:160,y:120}).click().perform();
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("长春市");
        });
    });
    it('module click test should show module name 吉林市',function(){
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:209,y:121}).click().perform();
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("吉林市");
        });
    });
    it('module click test should show module name 通化市',function(){
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:177,y:207}).click().perform();
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("通化市");
        });
    });
    //切换江苏省，验证是否支持双向绑定情况
    it('module click test should show module name 盐城市',function(){
        var city=element(by.css(".cityname"));
        var buttons=element.all(by.css(".jilin button"));
        buttons.get(0).click();
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:234,y:105}).click().perform();
        city.getText().then(function(text){
            expect(text).toBe("盐城市");
        });
    });
    it('markPoint name should be 白城市',function(){
        element(by.css(".markPoint button")).click();
        var pointname=element(by.css(".markPoint span"));
        expect(pointname.getText()).toBe("白城市");
    });
    //地域钻取 province city
    it('module name should be 新疆维吾尔自治区...',function(){
        var area=element(by.css(".area-name"));
        browser.actions().mouseMove(element(by.css(".area-drill canvas")),{x:92,y:109}).click().perform();
        area.getText().then(function(text){
            expect(text).toBe("新疆维吾尔自治区");
        });
    });
    it('module name should be 和田地区',function(){
        var area=element(by.css(".area-name"));
        browser.actions().mouseMove(element(by.css(".area-drill canvas")),{x:92,y:109}).click().perform();
        browser.actions().mouseMove(element(by.css(".area-drill canvas")),{x:145,y:226}).click().perform();
        //此次点击后页面需要等待几秒dom加载完毕
        setTimeout('expectVal()',5000);
        function expectVal(){
            area.getText().then(function(text){
                expect(text).toBe("和田地区");
            });
        };
        
    });
});