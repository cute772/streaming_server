export default class Chat{
    constructor(room){
        this.room = room
        room.onConnect((socket)=>{
           this.appendHandlers(socket)
        })
    }
    appendHandlers(socket){
        this.room.regHandler(socket,'sendMessage', (data)=>{
            let cons = this.room.getConnections()
            cons.forEach((connection, key)=>{
                connection.emit('recieveMessage',data)
            })
        })
    }
}