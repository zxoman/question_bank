class SocketOn{
    bank = require('./bank');
    constructor(client){
        this.client = client;
        this.client.on("get_questions",this.get_questions);
        this.client.on("update_questions",this.update_questions);
        this.client.on("delete_questions",this.delete_questions);
        this.client.on("add_questions",this.add_questions);
        this.client.on("create_exam",this.create_exam);
    }
    get_questions(data){
        this.bank.get(data.info,data.limit,(err,rows,f)=>{
            this.client.emit("get_questions",rows);
        })
    }
    update_questions(data){
        this.bank.update(data.id,data.info);
        this.client.emit("update_questions","sucss");
    }
    delete_questions(data){
        this.bank.delete(data.id);
        this.client.emit("delete_questions","sucss");
    }
    add_questions(data){
        this.bank.add(data)
        this.client.emit("add_questions","sucss");

    }
    create_exam(data){
        //this.client.emit("create_exam","sucss");
    }
}