<rdk_title>����RDK�з�˵��</rdk_title>



## 1����ѧ�����ֱ�ӱ༭�ļ� {#edit-online}

### ��Files���ҵ���Ҫ�༭���ļ�

<img src="img/find-file-to-edit.PNG" width = "626" height = "466" alt="ͼƬ����" />

### ��ʼ�༭
ѡ��Ŀ���ļ�֮�󣬿��Բ鿴�ļ����ݣ��������Ͻǵ�EDIT��ť����༭״̬��

<img src="img/start-to-edit.PNG"  width = "444" height = "542" alt="ͼƬ����" />

���EDIT��ť�ǻ�ɫ�ģ������ֿ��ܣ�

1. δ��¼���������������˺���[�����¼](http://gitlab.zte.com.cn/users/sign_in)��
2. ��Ȩ�ޡ����rdk�����Ŷӵ� `����145812` �� `����00111190` �� `���6092001913` ���ʼ���ȡ��Ȩ�ޡ����ʼ�֮ǰ�����ٵ�¼��һ�Ρ�

### �ύ�༭ {#commit-edition}

�ڱ༭״̬ҳ���������·������Կ�����ͼ��

<img src="img/commit-edition.PNG" width = "555" height = "311" alt="ͼƬ����" />

## RDK�Ĺ����� {#work-flow}
���в���RDK���˶����������������Эͬ������

<img src="img/rdk-work-flow.PNG" width = "569" height = "959" alt="ͼƬ����" />

˵����

1. [����merge request����ϸ����˵��](#merge-request)
2. [��git������ϸ����˵��](#git-cmd-list)

## ����gitС�ף���Ҫ��ϸ�İ��� {#git-cmd-list}

### ��װ
�Ȱ��������˵����ȷ��װgit��<http://wiki.zte.com.cn/pages/viewpage.action?pageId=20197085>

### ����
������һ���Եġ�

#### ssh-key
1. ����git-bash����ȥ֮������������� `ssh-keygen -t rsa -C "myname@xxxx.com"`���������ⶼ����Ĭ�ϴ𰸾�������
2. ����`cat ~/.ssh/id_rsa.pub`������������������������а屸�á�������������ģ�
<img src="img/ssh-key.PNG" width = "672" height = "82" alt="ͼƬ����" />
3. �򿪲���¼[���ҳ��](http://gitlab.zte.com.cn/profile/keys)���������Ͻǵ�ADD SSH KEY���ѿ���������ճ����KEY���У����ADD KEY�Ϳ����ˡ�

#### git config
1. �򿪲���¼[���ҳ��](http://gitlab.zte.com.cn/profile)������Email���е����䡣
2. ��git-bash������������� `git config --global user.email "myname@xxxx.com"`��ע������ʹ�ÿ�����ֵ��
3. ������������� `git config --global user.name "��Ĵ���"`

### �ճ�ʹ��

��Ӧ[RDK�Ĺ�����](#work-flow)��ÿһ������ʹ�õ���git�����о����£�

1. `git clone git@gitlab.zte.com.cn:10045812/rdk.git`
2. ˳��ִ����Щ����
	1. `cd rdk`
	2. `git checkout master`����ѡ��
	3. `git pull origin master`
3. `git checkout -b my-branch-name`
4. ����༭&���Թ����У�����ʱ˳��ִ����Щ����
	1. `git add .`
	2. `git commit -m "�ύ˵��������"`
5. ��
6. ��
7. `git push origin my-branch-name`�����û�б�����������͵�������������ע�⣺��Ȼ�����Ѿ����������ϣ����Ǳ������master��֧������Ч��[��������ϸ����˵��](#merge-request)��

�����ɾ�����ط�֧�����˳��ִ����Щ����:

1. `git checkout master`
2. `git branch -d my-branch-name`

��git������ͬѧ����ϸ���˳��ִ�С�`my-branch-name` ע���滻Ϊʵ�ʷ�֧����

## ����merge request {#merge-request}
master��֧��һ���ǳ���Ҫ�ķ�֧��һ�㲻��������ֱ�Ӻ��룬�����Ҫ�ύmerge request����RDK�Ŷ����ͨ���󣬾Ϳ����Զ�����master��֧�ˡ�

��������ȡ��RDK��developerȨ��֮�󣬿��Ե�¼[���ҳ��](http://gitlab.zte.com.cn/10045812/rdk/merge_requests/new)����merge request��

<img src="img/merge-request.PNG" width = "917" height = "372" alt="ͼƬ����" />

�����д�ϲ���˵����

<img src="img/merge-request1.PNG" width = "904" height = "751" alt="ͼƬ����" />
