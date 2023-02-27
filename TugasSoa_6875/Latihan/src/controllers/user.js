const {Sequelize} = require("sequelize");
const sequelize = require("../databases/connection");
const { DataTypes, QueryTypes, Op } = Sequelize;


const getAll = async (req,res) => {
    console.log(sequelize.models)
    const result = await sequelize.models.User.findAll();
    return res.json(result);
}

const register = async (req,res) => {
    let { username, password, nama, alamat, nomorhp } = req.body;
    const result = await sequelize.models.User.findAll(
        {where: {
            username: {
                [Op.eq]: username
            }
        }},
    )
    const insert = undefined;
    console.log(result.length);
    if (result.length==0){
        await sequelize.models.User.create(
            {username: username,
            password: password,
            nama: nama,
            alamat: alamat,
            nomorhp: nomorhp},
        ).then((result) => {
            console.log(result);
            return res.status(200).json({
                result
            });
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({msg: `Silahkan coba lagi`,err});
        });
        
    }else {
        return res.status(400).json({msg: `Username sudah ada`});
    }
    if (insert){
    }else{
    }
}
const login = async(req,res) => {
    let { username,password } = req.body;
    const result = await sequelize.models.User.findAll(
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:password
        }}}
    );
    if (result.length!=0){
        return res.status(200).json({msg:"Berhasil Login"})
    }else{
        return res.status(400).json({msg:"Gagal Login"})
    }

}
const editProfile = async (req,res) => {
    let {nama,alamat,nomorhp,oldpassword,newpassword} = req.body;
    let username = req.params.username

    if(!nama||!alamat||!nomorhp||!oldpassword||!newpassword){
        return res.status(200).json({msg:"Gagal Update"})
    }

    const user = await sequelize.models.User.findAll(
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:oldpassword
        }}}
    );

    if (user.length==0){
        return res.status(200).json({msg:"Gagal Update"})
    }

    const result = await sequelize.models.User.update(
        {
            nama:nama,
            alamat:alamat,
            nomorhp:nomorhp,
            password:newpassword
        },
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:oldpassword
        }}}
    );
    if (result){
        return res.status(200).json({msg: `Success update`});
    }else{
        return res.status(500).json({msg: `Gagal update`})
    }

}

module.exports = {
    getAll,
    register,
    login,
    editProfile,
}