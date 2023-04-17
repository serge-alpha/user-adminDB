require('dotenv').config();

const dev={
    app:{
        serverPort:process.env.SERVER_PORT||3003
    },
    db:{
        url:process.env.MONGO_URL
    }
}

module.exports=dev;