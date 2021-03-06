import Room from './Room.mjs'
import StreamingRoom from './StreamingRoom.mjs'
import ConferentRoom from './ConferentRoom.mjs'
import SurvillianceRoom from './SurvillianceRoom.mjs'

import Predicate from './Predicate.mjs'

export default class RoomContainer{
    constructor(server) {
        this.rooms = {}
        this.oncollect = (predicate)=>{
            return Object.values(this.rooms).filter(predicate)
        }   
    }
    where(options){
        let filtered = []
        if(Object.keys(options).length == 0){
            return Object.values(this.rooms)
        }
        let predicate = new Predicate(this.oncollect)
        predicate.initialize(Object.values(options)[0],Object.keys(options)[0])
        return predicate
    }
    whereTopic(topic){
        let topics = topic.split(" ")
        let filtered = []
        let predicate = null
        for(let topic of topics){
            if(predicate)
                predicate.or({topics: topic})
            else{
                predicate = this.where({topics:topic})
            }
        }
        return predicate
    }
    addRoom(roomObj){
        switch(roomObj.type){

            case 'conferent':
                            this.rooms[roomObj.channel] = 
                                new ConferentRoom(roomObj.name,{audio: roomObj.audio, video: roomObj.video, screen: roomObj.screen} ,roomObj.owner,roomObj.channel, roomObj.broadcasters, roomObj.io)
                            break;
            case 'streaming':
                            this.rooms[roomObj.channel] = new StreamingRoom(roomObj.name,roomObj.owner,roomObj.channel,roomObj.io,{max_topics: roomObj.max_topics, tick: roomObj.tick})
                            break;
            case 'surveillance':
                            this.rooms[roomObj.channel] = new SurvillianceRoom(roomObj.name,roomObj.owner,roomObj.channel,roomObj.io)
                            break;
        }
        return this.rooms[roomObj.channel]
    }
    getRoom(id){
        if(this.rooms[id]){
          this.rooms[id].id = id
          return this.rooms[id]
        };
    }
}