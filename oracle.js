const oracledb = require('oracledb');
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const dbConfig = {
    user          : "atc_demo",
    password      : "atc32w",
    connectString : "192.168.32.220/orcl.at-consulting.ru"
};

const sqlFile = argv.f;

const handleErr = callback => (err, res) => {
    if (err) {
        console.error(err.message);
        return;
    }
    callback(res);
};

const runSql = connection => {
    const filename = path.join(__dirname, sqlFile);
    const sql = fs.readFileSync(filename, 'utf8');
    connection.execute(sql, {}, handleErr(result => {
            console.log('ran:', filename);
}));
};

oracledb.getConnection({
    user: dbConfig.user,
    password: dbConfig.password,
    connectString: dbConfig.connectString
}, handleErr(runSql));