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
  this.db.run(
    `INSERT INTO question (
        '1',
        '2',
        '3',
        '4',
        class,
        term,
        unit,
        lesson,
        type_a,
        difficulty,
        text,
        answer
    ) VALUES(
        "",
        "",
        "",
        "",
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );
    `,
    values
  );
};
module.exports.delete = (id) => {
  this.db.run(`delete from question where id=${id}`);
};
module.exports.get = (data, limit = false, call) => {
  keys = [];
  values = [];
  for (const [key, value] of Object.entries(data)) {
    keys[keys.length] = `${key}=?`;
    values[values.length] = value;
  }
  keys = keys.toString();
  var limit_query = "";
  if (limit) {
    limit_query = ` limit ${limit}`;
  }
  if (keys.length > 0) {
    this.db.all(
      `select * from question where ${keys} ${limit_query}`,
      values,
      call
    );
  } else {
    console.log(`select * from question ${limit_query}`);
    this.db.all(`select * from question ${limit_query}`, call);
  }
};
module.exports.update = (id, data) => {
  keys = [];
  values = [];
  for (const [key, value] of Object.entries(data)) {
    keys[keys.length] = `${key}=?`;
    values[values.length] = value;
  }
  keys = keys.toString();
  values[values.length] = id;
  this.db.run(
    `
    UPDATE question set
        ${keys}
        where id=? 
        `,
    values
  );
};
module.exports.getwids = (data, call) => {
  ids = `in(${"".padStart(data.length * 2, ",?").slice(1)})`;
  this.db.all(`select * from question where id ${ids} `, data, call);
};
module.exports.getch = (data, num, call) => {
  ids = `in(${"".padStart(data.length * 2, ",?").slice(1)})`;
  this.db.all(
    `select id from question where id ${ids} ORDER BY RANDOM() limit ${num}`,
    data,
    call
  );
};
module.exports.shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
module.exports.exam = (ch = [], ch_num = false, con = [], num,call) => {
  this.db.run(`delete from exams`);
  for (let index = 0; index < num; index++) {
    // console.log(num, index);
    // ch = this.shuffle(ch).slice(0, ch_num);
    // con = this.shuffle(con);
    // var qus = this.shuffle();
    //SELECT * FROM question ORDER BY RANDOM() LIMIT 20;
    this.getch(ch, ch_num, (s, d, e) => {
      //console.log([...d, ...con])
      arr = [];
      for (let index = 0; index < d.length; index++) {
        const element = d[index];
        arr[index] = element.id;
      }
      ex = [...arr, ...con];
      this.db.run(
        `
        INSERT INTO exams (
          exam,
          id
          ) VALUES(
            ?,
            ?
          );
      `,
        [ex, index]
      );
    });
  }
};
module.exports.exam_with_id = (id, call) => {
  this.db.all(`select * from exams where id=?`, [id], (ss, da, err) => {
    qus_ids = da[0].exam.split(",");
    this.getwids(qus_ids, (s, d, e) => {
      call(d);
    });
  });
};

//   }
//   this.getwids(con, (e, d, s) => {
//     for (const property in d) {
//       qus[qus.length] = d[property];

//     }
//     call(this.shuffle(qus))
//   });
//
