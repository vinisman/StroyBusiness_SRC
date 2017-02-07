var oracledb = require('oracledb');
var fs = require('fs');
var async = require('async');

oracledb.getConnection(
    {
        user          : "SCOTT",
        password      : "SCOTT",
        connectString : "192.168.1.103/orcl"
    },
    function(err, connection)
    {
        if (err) {
            console.error("ERROR: "+err.message);
            return;
        }


        //var array = ['SELECT 1 from dual','SELECT 2 from dual','SELECT 3 from dual'];

        var runQuery = function (sql,callback) {
                    connection.execute(sql.trim(),
                        function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            console.log("Result:" + result.rows);
                            callback();
                        });

        }


        var fileArray = ['C:/Users/vinisman/IdeaProjects/StroyBusiness_SRC/sql/Module1/Module1.sql','C:/Users/vinisman/IdeaProjects/StroyBusiness_SRC/sql/script1.sql'];
       // var fileArray = ['C:/Users/vinisman/IdeaProjects/StroyBusiness_SRC/sql/Module1/Module1.sql'];

        var readFile = function (file,callbackDone){
            console.log("file=" + file);
            var content = fs.readFileSync(file);
            var filecontent = content.toString().split(";");
            filecontent = filecontent.filter(function(n){ return n != '' });
            console.log("filecontent=[" + filecontent +"]");
            async.eachSeries(filecontent,runQuery,function (err) {
                console.log('Query run');callbackDone();});


        }
        async.eachSeries(fileArray,readFile, function (err) {
        console.log('All done');})

    });

