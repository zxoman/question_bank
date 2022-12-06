var bank = require('./bank')

exports.connect = (socket,db=bank)=>{
    socket.on("connection",(c)=>{
        c.on("add_questions",(data)=>{
            db.add(data)
            c.emit("add_questions","success")
        })
        c.on("get_data",(data)=>{ 
            db.get(data,false,(e,d,n)=>{
                console.log(d.length);
                c.emit("get_data",d);
            })
        })
        c.on("edit",(data)=>{
            db.update(data.id,data.info)
            c.emit("edit","success")
        })
        c.on("del_question",(id)=>{
            console.log('delete',id);
            db.delete(id)
            c.emit("del","success")
        })
        c.on("create_exam",(data)=>{
            db.exam(data.ch,data.ch_num,data.con,data.num);
            c.emit("exam","success")
        })
        c.on("get_exam",(id)=>{
            console.log(id);
            db.exam_with_id(id,(d)=>{
                c.emit("get_exam",d);
            })            
        })
        c.on("scaner",(id)=>{
            console.log(id);
            db.exam_with_id(id,(d)=>{
                ans = [];
                for (const element of d) {
                    ans[ans.length] = element.answer;
                }
                ans = ans.join("&&")
                console.log(ans);
                c.emit("scaner",ans);
            })            
        })
    })
}
