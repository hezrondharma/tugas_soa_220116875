
const express = require("express");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize
const app = express();
const port = 3000;
const sequelize = require("./src/databases/connection");
const userRouter = require("./src/routes/user");
const messageRouter = require("./src/routes/message");
const friendRouter = require("./src/routes/friend");
const Message = require("./src/models/message")(sequelize,DataTypes);
const Friend = require("./src/models/friend")(sequelize,DataTypes);


app.use(express.urlencoded({ extended: true }));
app.use("/api",userRouter);
app.use("/api",messageRouter);
app.use("/api",friendRouter);

const initApp = async () => {
    console.log("Testing database connection");
    try{
        await sequelize.authenticate();
        // await sequelize.sync({force:true});
        console.log("Berhasil connect database");
        app.listen(port, () =>
            console.log(`Example app listening on port ${port}!`)
        );
    } catch (error) {
        console.error("Tidak bisa connect database : ", error.original);
    }
}
initApp();

