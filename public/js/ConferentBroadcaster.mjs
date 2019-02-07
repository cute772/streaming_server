
import Broadcaster from './Broadcaster.js'
import Player from './Player.js'
import Chat from './Chat.mjs'
let connection = null 
window.Broadcaster = Broadcaster;
function sendMessage(){
    conole.log('wut')
}
window.onload = ()=>{

    var SIGNALING_SERVER = "http://localhost";
    connection = new Broadcaster("http://localhost", io() ,{audio: true, video: false},window.id)
    let connections = 1;
    let columnsOnMedia = 3;
    connection.subscribeTo(window.channel, (mEl)=>{
        let broadcaster = new Player({'media': connection,'constrains': connection.getConstrains(), 'reso': '1by1'},3)
        let chat = new Chat(connection.getSocket())
        $('.row:nth-child(1)').append(broadcaster.getPlayer())
        $('.big-container').append(chat.getChatInstance())
    })
    connection.onBroadcaster((mEl, socket_id, constrains)=>{
        let player = new Player({'media': mEl, 'socket_id': socket_id, 'constrains': constrains, 'reso': '1by1'},3);
        connection.onBroadcastNegotiation((constrains,mEl)=>{
            player.negotiatePlayer(constrains, mEl)
        })
        if(connections / 3 == 1){
            let breaker = $('<div class="w-100">');
            $('.row:nth-child(1)').append(breaker)
        }
        connections++
        $('.row:nth-child(1)').append(player.getPlayer())
    })

    connection.onPeerDiscconect((socket_id)=>{
        $(`#${socket_id}`).remove()
        connections--
        if(connections / 3 == 1){
            $(".w-100").last().remove();
        }
    })
}