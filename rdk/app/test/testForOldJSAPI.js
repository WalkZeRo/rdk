(function(){
    var testServiceFilePath="./app/test/"
    return {

        file_loadProperty:function(request, script){
            var properties=file.loadProperty(testServiceFilePath+"conf1.propertites");
            var uump=properties.getProperty("conf");
            return uump;
        },

        file_loadPropertyerror:function(request, script){
            return file.loadProperty();
        },

        file_save:function(request, script){
            return file.save(testServiceFilePath+"save.txt","just test")
        },

        file_savepathnull:function(request, script){
            return file.save(null,"just test")
        },

        file_savecontentnull:function(request, script){
            return file.save(testServiceFilePath+"save.txt",null)
        },

        file_save_dirfalse:function(request, script){
            return file.save(testServiceFilePath,"just test")
        },

        file_saveAsCSV:function(request, script){
            return file.saveAsCSV(testServiceFilePath+"save.csv", [
                [1, 2, 3],
                [2, 4, 5]
            ], [1])
        },

        file_saveAsCSVopUndefined:function(request, script){
            return file.saveAsCSV(testServiceFilePath+"save.csv", [
                [1, 2, 3],
                [2, 4, 5]
            ], [1],{quoteChar:"*"})
        },

        file_list:function(request, script){
            return file.list(testServiceFilePath);
        },

        file_web:function(request, script){
            return file.web();
        },

        file_base:function(request, script){
            return file.base();
        },

        file_svr:function(request, script){
            return file.svr();
        },
        kvTest:function(request, script){
            var tranformFunction = kv({1: "yes", 0: "no"});
            return  tranformFunction(0);
        },
        kvTestdefaultvaluenull:function(request, script){
            var tranformFunction = kv({1: "yes", 0: "no"});
            return  tranformFunction(2);
        },
        kvTestdefaultvalue:function(request, script){
            var tranformFunction = kv({1: "yes", 0: "no"},"defaultvalue");
            return  tranformFunction(2);
        },
        requireTest:function(request, script){
            var lib = require(testServiceFilePath+"require.js");
            return lib.hello('rdk');
        },
        bufferTest:function(request, script){
            var neMap = buffer('neMap', function () {
                return {4:'f',
                        5:'s',
                        6:'t'};
            });
            return getBuffer('neMap')[4]
        },
        bufferTestfalse:function(request, script){
            var neMap = buffer('neMap', function () {
                return {4:'f',
                    5:'s',
                    6:'t'};
            });
            removeBuffer('neMap');

            return getBuffer('neMap')
        },
        jsonTest:function(request, script){
            var data=[1,2];
            return json(data)
        },

        load_classTest:function(request, script){
            var testclass=JVM.load_class("$base/lib", "com.zte.lw.test.Loadclass")
            var myInst = testclass.newInstance()
            return myInst.loadtest()
        },

        load_classTesterror:function(request, script){
            return JVM.load_class("$base/lib", "com.zte.lw.test.Load")
        },


        i18nTest:function(request, script){
            return i18n("greetings")
        },
        i18nArrayTest:function(request, script){
            return i18n(["greetings","greetings1"])
        },
        i18nparamlenthzero:function(request, script){
            return i18n()
        },
        i18nkeynotstr:function(request, script){
            return i18n({a:1})
        },


        sqlTest:function(request, script){
            return sql("select * from dim_ne;").getString(1);
        },


        mapperTest:function(request, script){
            return mapper("select neid,name from dim_ne","neid","name");
        },
        mapperTestkeynull:function(request, script){
            return mapper("select neid,name from dim_ne",null,"name");
        },
        mapperTestvaluenull:function(request, script){
            return mapper("select neid,name from dim_ne","neid",null);
        },
        mapperTestResultSetnull:function(request, script){
        return mapper(null,"neid","name");
        },


        matrixTest:function(request, script){
            return matrix("select neid,name from dim_ne");
        },
        matrixTestmapIterator:function(request, script){
            return matrix("select neid,name from dim_ne",{name:function(neid, row, index){return neid+"ttt"}});
        },
        matrixTestError:function(request, script){
            return matrix();
        }
    }
})()