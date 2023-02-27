const {Sequelize} = require("sequelize");
const sequelize = require("../databases/connection");
const { DataTypes, QueryTypes, Op } = Sequelize;

const addFriend = async (req,res) => {
    let {username,password,usercari} = req.body;
    


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

    if(!user){
        return res.status(200).json({msg:"user tidak ada"})
    }
    if(!friend){
        return res.status(200).json({msg:"teman tidak ada"})
    }

    let iduser=user.id;
    let idfriend = friend.id;

    const cek = await sequelize.models.Friend.findAll(
        {where: {id_user:{
            [Op.eq]:iduser
        },id_friend:{
            [Op.eq]:idfriend
        }}}
    );

    if(cek.length>0){
        return res.status(200).json({msg:"teman udah ada"})
    }else{
        await sequelize.models.Friend.create(
            {id_user:user.id,
            id_friend:friend.id}
        ).then((result) => {
            return res.status(200).json({msg:"sukses",result})
        }).catch((err) => {
            return res.status(400).json({msg: `Silahkan coba lagi`,err})
        });
    }

}
const viewFriend = async (req,res) => {
    let {username} = req.params;
    let {password} = req.body;
    console.log(username+password);
    const user = await sequelize.models.User.findOne(
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:password
        }}}
    );
    if(!user){
        return res.status(200).json({msg:"tidak punya teman"})
    }
    const friend = await sequelize.models.Friend.findAll({ where: { id_user:user.id} });
    const friends = [];
    for(i = 0;i<friend.length;i++){
        temp = await sequelize.models.User.findOne({ where: { id:friend[i].id_friend} })
        friends.push(temp);
    };
    if(friend.length==0){
        return res.status(200).json({msg:"tidak punya teman"})
    }
    
    return res.status(200).json({friends})

}
const deleteFriend = async (req,res) => {
    let {username,password,usercari} = req.body;

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
    if(!user){
        return res.status(200).json({msg:"user tidak ada"})
    }
    if(!friend){
        return res.status(200).json({msg:"teman tidak ada"})
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

    await relationship.destroy().then((result) => {
        return res.status(200).json({msg:"Berhasil hapus teman",result})
    }).catch((err) => {
        return res.status(400).json({msg: `Silahkan coba lagi`,err})
    });

}


module.exports = {
    addFriend,
    viewFriend,
    deleteFriend,
}