const Sequelize = require("sequelize");
const sequelize = require("../databases/connection");
const { DataTypes, Op } = Sequelize;
const { Message } = require("../models/message")(sequelize,DataTypes);
const { User } = require("../models/user")(sequelize,DataTypes);

const sendMessage = async (req,res) => {
    let { username, password, message, usercari } = req.body;

    const user = await sequelize.models.User.findOne(
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:password
        }}}
    );
    
    const friend = await sequelize.models.User.findOne(
        {where: {
            username: {
                [Op.eq]: usercari
            }
        }},
    );
    
    if(!friend||!user){
        res.status(201).json({msg:"username/password/usercari salah/tidak ditemukan"});
    }

    const relationship = await sequelize.models.Friend.findOne(
        {
            where:{
                id_user:{
                    [Op.eq]:user.id
                },
                id_friend:{
                    [Op.eq]:friend.id
                }
            } 
        }
    );

    if(!relationship){
        return res.status(200).json({msg:"tidak punya teman"})
    }


    const result = await sequelize.models.Message.create(
        {
            id_user_pengirim:user.id,
            pesan:message,
            id_user_dikirim:friend.id
        }
    )
    if(!result){
        return res.status(400).json({msg:"galat",err})
    }
   else{
    return res.status(201).json({msg:"Berhasil mengirim pesan",result});
   }

}
const viewMessage = async(req,res) => {
    let {username} = req.params;
    let {password} = req.body;

    const user = await sequelize.models.User.findOne(
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:password
        }}}
    );
    if(!user){
        return res.status(400).json({msg:"Password salah/ user tidak ditemukan"});
    }
    const message = await sequelize.models.Message.findAll(
        {where: {id_user_pengirim:{
            [Op.eq]:user.id
        }}}
    );
    if (message.length>0){
        return res.status(200).json({message});
    }else{
        return res.status(500).json({msg: `user tidak pernah mengirim pesan`})
    }

}

module.exports = {
    sendMessage,
    viewMessage,
}