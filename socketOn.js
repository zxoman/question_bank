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
        c.on("create_exam",(ch,ch_num,con,num)=>{
            db.exam(ch,ch_num,con,num)
            c.emit("exam","success")
        })
        c.on("get_exam",(id)=>{
            db.exam_with_id(id,(d)=>{
                c.emit("get_exam",d);
            })            
        })
    })
}
