/**
 * Created by 00100630 on 2016/12/17.
 */
describe('editor test',function(){
  it('editor ˫��󶨵�ʵ��',function(){
    browser.get("test/e2e/testee/editor/web/self.html")
    .then(function(){
      browser.sleep(1500);
    });

    element(by.css(".demo1 input.form-control")).sendKeys(123)
      .then(function(){
        //���������Ļص�����,��ȡ�󶨵�span innerHTML
        var binding_value=element(by.css(".demo1 span.ng-binding"));
        expect(binding_value.getText()).toBe("123");
      });
  });
  it('placeholder��ʾ��Ϣ',function(){
    // browser.get("test/e2e/testee/input/web/self.html");
    var rdk_input=element(by.css(".demo2 input.form-control"));
    expect(rdk_input.getAttribute("placeholder")).toBe("please enter an number!");
    rdk_input.sendKeys(110);
    expect(rdk_input.getAttribute("value")).toBe("110");
  });
  it('readOnly �л�',function(){
    // browser.get("test/e2e/testee/input/web/self.html");
    var rdk_input=element(by.css(".demo3 input.form-control"));
    expect(rdk_input.getAttribute("readonly")).toBe("true");//��ʼֵ
    element(by.css(".demo3 button")).click();//�л�
    expect(rdk_input.getAttribute("readonly")).toBe(null);
    rdk_input.clear().sendKeys(250);//�����������250
    expect(rdk_input.getAttribute("value")).toBe("250");
    element(by.css(".demo3 button")).click();
    rdk_input.sendKeys(500).then(function(err){
      //ֻ�г���Ż���err����
    });
    expect(rdk_input.getAttribute("value")).toBe("250");//ֵ����
  });
});