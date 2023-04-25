require('dotenv').config();

const dev={
    app:{
        serverPort:process.env.SERVER_PORT||3003,
        privateKey:process.env.PRIVATE_KEY,
        clientUrl:process.env.CLIENT_URL,
        emailAccont_username:process.env.SMTP_USERNAME,
        emailAccont_password:process.env.SMTP_AUTH_PASSWORD,
        secret_sess_key:process.env.SECRET_SESSION_KEY,

    },
    db:{
        url:process.env.MONGO_URL
    }
}

module.exports=dev;