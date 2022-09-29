module.exports.sql = require("sqlite3").verbose();
module.exports.db = new this.sql.Database(
    "./db/bank.db",
    this.sql.OPEN_READWRITE,
    (err) => {
        if (err) return console.log(err.message);
        console.log("db connected");
    }
);
module.exports.add = (question) => {
    values = [];
    keys = [];
    for (const [key, value] of Object.entries(question)) {
        values[values.length] = value;
        keys[keys.length] = key;


    }
    console.log(keys);
    this.db.run(`INSERT INTO question (
        1,
        2,
        3,
        4,
        class,
        term,
        unit,
        lesson,
        type_a,
        difficulty,
        text,
        answer
    ) VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );
    `,values);
};
module.exports.delete = (id) => {
    this.db.run(`delete from question where id=${id}`);
};
module.exports.get = (data,limit=false,call) => {
    keys = [];
    values = [];
    for (const [key, value] of Object.entries(data)) {
        keys[keys.length] = `${key}=?`;
        values[values.length] = value;
    }
    keys = keys.toString();
    var limit_query = '' 
    if (limit) {
        limit_query = ` limit ${limit}`
    }
    if (keys.length>0) {
        this.db.all(`select * from question where ${keys} ${limit_query}`,values,call)
    }else{
        this.db.all(`select * from question ${limit_query}`,call)
    }
};
module.exports.update = (id,data) => {
    keys = [];
    values = [];
    for (const [key, value] of Object.entries(data)) {
        keys[keys.length] = `${key}=?`;
        values[values.length] = value;
    }
    keys = keys.toString();
    values[values.length] = id;
    this.db.run(`
    UPDATE question set
        ${keys}
        where id=? 
        `,values);
};
module.exports.exam = () => {};