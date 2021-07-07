require('./database')
require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fetch = require("node-fetch");
const config = require('./config.json');
const helps = require('./module')
const mongoose = require('mongoose')
const Usuario = require('./models/User')

let num = helps.random_num;
console.log(num);
let urlapi  = 'https://danbooru.donmai.us/posts/';
let prefix  = config.prefix;



function CountW() {
    console.log('hola');
}
client.on('ready', () => {
    CountW()
    console.log(`EL BOT  ${client.user.tag}! esta corriendo`);
});

client.on('message', msg => {
    let comand = msg.content.split(" ");
    let comand_v1 = comand[0];
    let comand_v2 = comand[1];
    if (msg.content === `${prefix}register`) {
        let user = new Usuario()
        user.name = msg.author.username,
        user.avatar = msg.author.avatar,
        user.server_id = msg.guild.id,
        user.server_name = msg.guild.name

        user.save()
    }

    if(comand_v1 == `${prefix}info`){
        const msgData = Object.entries(msg)
        msg.channel.send("\`"+msgData+"\`");
        console.log(msg.guild.id);
    }
    if (comand_v1 === `${prefix}anime`) {
        if(!isNaN(comand_v2) || comand_v2 == 'random'){
            let id_num =  (comand_v2 == 'random')? num:comand_v2;
            fetch(urlapi+comand_v2+'.json')
                .then(promesaFetch => promesaFetch.json())
                .then(contenido => {
                    if (!contenido.is_banned) {
                        if (contenido.file_ext == 'jpg' || contenido.file_ext == 'png' || contenido.file_ext == 'mp4') {
                            if (contenido.rating == 'e' || contenido.rating== 'q') {
                                if (msg.channel.nsfw) {
                                    const embed = new MessageEmbed()
                                        .setTitle(`Is time to PAJA 🍆🍌💦`)
                                        .setColor(0xff0000)
                                        .setDescription(`**obra:** ${contenido.tag_string_copyright}
                                        **personajes:** ${contenido.tag_string_character}
                                        **artista:** ${contenido.tag_string_artist}`)
                                        .setImage(contenido.large_file_url)
                                        .setFooter(`codigo ${contenido.id}`)
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
                                    .setColor('#A7B960')
                                    .setDescription(`**obra:** ${contenido.tag_string_copyright}
                                    **personajes:** ${contenido.tag_string_character}
                                    **artista:** ${contenido.tag_string_artist}`)
                                    .setImage(contenido.large_file_url)
                                    .setFooter(`codigo  ${contenido.id}`)
                                msg.channel.send(embed)
                            }
                        }else{
                            const embed = new MessageEmbed()
                                    .setTitle(`IMAGEN NO DISPONIBLE`)
                                    .setColor('#A7B960')
                                    .setImage('https://memegenerator.net/img/instances/65961959/pero-mira-como-esta-ese-contenido-no-disponible-pap.jpg')
                                msg.channel.send(embed)
                        }
                    }else{
                        const embed = new MessageEmbed()
                        .setTitle(`IMAGEN BENEADA`)
                        .setColor('#3da6bd')
                        .setDescription(`**obra:** ${contenido.tag_string_copyright}
                        **personajes:** ${contenido.tag_string_character}
                        **artista:** ${contenido.tag_string_artist}`)
                        .setImage('https://cdn.memegenerator.es/imagenes/memes/full/30/98/30982970.jpg')
                    msg.channel.send(embed)
                    }
                    
                    })
        }else{
            msg.channel.send('Upsi! , comando invalido')
        }
    }
});

client.login(config.token);