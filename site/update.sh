#!/bin/sh

basepath=$(cd `dirname $0`; pwd)
cd $basepath/..

echo "=================================================" >> $basepath/update.log
echo "updating... time: `date`" >> $basepath/update.log

# pull code.....
nodePid=`ps gaux | grep tools/node-linux-x64 | grep -v grep | awk '{print $2}'`
if [ ! "$nodePid" = "" ]; then
	kill -9 $nodePid
fi
git checkout -- rdk/proc/conf/rdk.cfg
git checkout -- tools/http_server/config.json
git checkout master
git pull origin master >> $basepath/update.log

# restart rdk...
cd rdk/proc/bin
sh ./shutdown.sh > /dev/null

cd $basepath/..
# ��һ���µ�RDK���̼����˿ڣ����������ж˿ڳ�ͻ
#sed -i 's/5812/5813/g' rdk/proc/conf/rdk.cfg
#sed -i 's/5812/5813/g' tools/http_server/config.json

# web�������˿ڸ�ΪĬ��80�˿�
#sed -i 's/8080/80/g' tools/http_server/config.json

sh start.sh > /dev/null

