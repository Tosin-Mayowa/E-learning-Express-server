module.exports.getAllUsers=(req,res)=>{
    res.send("List all users");
}

module.exports.getUser=(req,res)=>{
    res.send("send a user");
}

module.exports.registerUser=(req,res)=>{
    res.send("created a user");
}