var fs = require('fs');
var path = require('path');
var oracledb = require('oracledb');


oracledb.getConnection(
    {
      user          : "SCOTT",
      password      : "SCOTT",
      connectString : "192.168.1.103/orcl"
    },
    function(err, connection)
    {
      if (err) { console.error(err); return; }

      var SqlFileRun = function(sqlFile)
      {
        var array = fs.readFileSync(sqlFile, 'utf8').toString().split(";");
        for (i in array)
        {
          if(array[i].trim() != '')
          {
            console.log("SQL statement: " + array[i].trim());

            connection.execute(array[i].trim(), {}, handleErr(result => {
                  console.log('ran:', result.rows);
            console.log("----------------------------------------");
          }));
            // var result = connection.execute(array[i].trim());
            //  console.log(result.rows);

          }
        }
      }

      const handleErr = callback => (err, res) => {
      if (err) {
        console.error(err.message);
        return;
      }
      callback(res);
    };
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
            console.log("File: " + FilePath);
            SqlFileRun(FilePath);
          }
        })
      }

      SqlFileList(__dirname +path.sep+"sql");

    }
);





