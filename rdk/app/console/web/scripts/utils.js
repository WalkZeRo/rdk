define([], function() {
	//����ļ������˵�ǰӦ�õĹ��ܺ��������԰ѳ��õĺ��������ڴ������㸴�á�
	
	function hello(toWho) {
		console.log('hello ' + toWho);
	}
	
	return {
		hello: hello
	}
});