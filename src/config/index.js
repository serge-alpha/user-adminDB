require('dotenv').config();

const dev={
    app:{
        serverPort:process.env.SERVER_PORT||3003,
        privateKey:process.env.PRIVATE_KEY,
        clientUrl:process.env.CLIENT_URL
    },
    db:{
        url:process.env.MONGO_URL
    }
}

module.exports=dev;