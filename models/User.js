'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: String,
    avatar: String,
    pure:{ type:Number, default: 0},
    hentai:{ type:Number, default: 0},
    SER:{ type:Number, default: 0},
    server_id: Number,
    server_name: String

})

module.exports = mongoose.model('User',UserSchema)