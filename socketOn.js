var bank = require('./bank')

exports.connect = (socket,db=bank)=>{
    socket.on("connection",(c)=>{
        c.on("add_questions",(data)=>{
            db.add(data)
            c.emit("add_questions","success")
        })
    })
}