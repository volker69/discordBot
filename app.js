const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fetch = require("node-fetch");
const config = require('./config.json');
let urlapi  = 'https://danbooru.donmai.us/posts/';
let prefix  = '~';
let num = Math.floor(Math.random() * ((4100000+1)-1)+1);

client.on('ready', () => {
    console.log(`EL BOT  ${client.user.tag}! esta corriendo`);
});

client.on('message', msg => {
    console.log(msg.content);
    let comand = msg.content.split(" ");
    let comand_v1 = comand[0];
    let comand_v2 = comand[1];
    if (msg.content === 'how to embed') {
        // We can create embeds using the MessageEmbed constructor
        // Read more about all that you can do with the constructor
        // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
        const embed = new MessageEmbed()
            .setTitle(`title`)
            .setColor(0xff0000)
            .setDescription(`content`);
        msg.channel.send(embed);
      }
    if(comand_v1 == `${prefix}info`){
        console.log(msg);
    }
    if (comand_v1 === `${prefix}anime`) {
        if(!isNaN(comand_v2) || comand_v2 == 'random'){
            let id_num =  (comand_v2 == 'random')? Math.floor(Math.random() * ((4500000+1)-1)+1):comand_v2;
            console.log(id_num);
            fetch(urlapi+comand_v2+'.json')
                .then(promesaFetch => promesaFetch.json())
                .then(contenido => {
                    if (contenido.rating == 'e' || contenido.rating== 'q') {
                        if (msg.channel.nsfw) {
                            const embed = new MessageEmbed()
                                .setTitle(`Is time to PAJA 🍆🍌💦`)
                                .setColor(0xff0000)
                                .setDescription(`obra: ${contenido.tag_string_copyright}
                                personajes: ${contenido.tag_string_character}
                                artista: ${contenido.tag_string_artist}`)
                                .setImage(contenido.file_url)
                            msg.channel.send(embed);
                        }else{
                            const embed = new MessageEmbed()
                            .setTitle(`Donde esta tu Honor basura`)
                            .setColor(0xff0000)
                            .setImage(`https://pm1.narvii.com/6913/8d6065441de5f37af5c8d835995fe63365ff1d18r1-480-299v2_hq.jpg`)
                            .setFooter(`codigo nuclear ${contenido.id}`)
                        msg.channel.send(embed);
                        }
                    }else{
                        const embed = new MessageEmbed()
                            .setTitle(`Una Imagen Relax`)
                            .setColor(0xff0000)
                            .setDescription(`obra: ${contenido.tag_string_copyright}
                            personajes: ${contenido.tag_string_character}
                            artista: ${contenido.tag_string_artist}`)
                            .setImage(contenido.file_url)
                        msg.channel.send(embed)
                    }
                    })
        }else{
            msg.channel.send('Upsi! , comando invalido')
        }
    }
});

client.login(config.token);