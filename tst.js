var oracledb = require('oracledb');
var fs = require('fs');
var path = require('path');
var async = require('async');
const util = require('util');
var dateFormat = require('dateformat');
var fileArray=[];
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

        var runQuery = function (sql,callback) {
                    connection.execute(sql.trim(),
                        function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            console.log("Query run:" + sql.trim());
                            console.log("Result:" + result.rows);
                            callback();
                        });

        }


        //var fileArray = ['C:/Users/vinisman/IdeaProjects/StroyBusiness_SRC/sql/Module1/Module1.sql','C:/Users/vinisman/IdeaProjects/StroyBusiness_SRC/sql/script1.sql'];

        var readFile = function (file,callbackDone){
            console.log("file=" + file);
            var content = fs.readFileSync(file);
            var filecontent = content.toString().split(";");
            filecontent = filecontent.filter(function(n){ return n != '' });
            console.log("filecontent=[" + filecontent +"]");
            async.eachSeries(filecontent,runQuery,function (err) {
                console.log('Done');callbackDone();});


        }
        var SqlFileList = function(directoryName)
        {
            var files = fs.readdirSync(directoryName);
            files.forEach(function(file)
            {
                var FilePath=directoryName + path.sep + file;
                var f = fs.statSync(FilePath);
                if (f.isDirectory())
                {
                    SqlFileList(FilePath)
                }
                else
                {
                  //  console.log("File: " + FilePath);


                    var ts = fs.statSync(FilePath);
                    var tm = dateFormat(ts.mtime, "dd-mm-yyyy H:MM:ss");
                   // console.log("Time: " +  tm);

                    fileArray.push({
                        path:   FilePath,
                        mtime:  tm
                    });
                    fs.writeFileSync('test.json', JSON.stringify(fileArray, null, 4));
                 //  fileArray.push(FilePath);
                   // readFile(FilePath,function(){});
                }
            }

            )

        }

        SqlFileList(__dirname +path.sep+"sql");


        console.log(fileArray);

/*

        async.eachSeries(fileArray,readFile, function (err) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.close();
            console.log('Connection closed');
        })

*/

    });

