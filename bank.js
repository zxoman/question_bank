module.exports.sql = require('sqlite3').verbose();
module.exports.db = new this.sql.Database('./db/bank.db', this.sql.OPEN_READWRITE, (err) => {
    if (err) return console.log(err.message);
    console.log("db connected");
});
module.exports.add = (question) => {
    this.db.run(`INSERT INTO question (
        text,
        image,
        class,
        unit,
        lesson,
        type_q,
        type_a,
        answer
    ) VALUES(
        "${question.text}",
        "${question.image}",
        ${question.class},
        ${question.unit},
        ${question.lesson},
        "${question.type_q}",
        "${question.type_a}",
        "${question.answer}"
    );
    `)
}
module.exports.delete = (id) => {
    this.db.run(`delete from question where id=${id}`)
}
module.exports.get = () => {

}
module.exports.update = () => {

}
module.exports.exam = () => {

}