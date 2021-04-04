const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");

let urlapi  = 'https://danbooru.donmai.us/posts/'
let prefix  = '~';
fetch(urlapi)

client.on('ready', () => {
    console.log(`EL BOT  ${client.user.tag}! esta corriendo`);
});

client.on('message', msg => {
    console.log(msg.content);
    let comand = msg.content.split(" ");
    let comand_v1 = comand[0];
    let comand_v2 = comand[1];
    if(comand_v1 == `${prefix}info`){
        console.log();
    }
    if (comand_v1 === `${prefix}anime`) {
        if(!isNaN(comand_v2)){
            fetch(urlapi+comand_v2+'.json')
                .then(promesaFetch => promesaFetch.json())
                .then(contenido => {
                    if (contenido.rating == 'e' || contenido.rating== 'q') {
                        if (msg.channel.nsfw) {
                            msg.channel.send('Is time to PAJA');
                            msg.channel.send(`${contenido.file_url}
                            obra: ${contenido.tag_string_copyright}
                            personajes: ${contenido.tag_string_character}
                            artista: ${contenido.tag_string_artist}`)
                        }else{
                            msg.channel.send('Donde esta tu Honor basura');
                        }
                    }else{
                        msg.channel.send(`${contenido.file_url}
                            obra: ${contenido.tag_string_copyright}
                            personajes: ${contenido.tag_string_character}
                            artista: ${contenido.tag_string_artist}`)
                    }
                    })
        }else{
            msg.channel.send('Upsi! , comando inavaldio')
        }
    }
});
client.login('the TOKEN');