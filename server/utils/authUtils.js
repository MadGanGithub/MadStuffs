import bcrypt from "bcrypt";

//Hashes the password
async function hashed(password,num){
    try{
        const hashed_password=await bcrypt.hash(password,num)
        return hashed_password
    }catch(err){
        console.log(err)
    }
}
//Compares password with hashed password
async function comparePassword(password,hashed){
    return bcrypt.compare(password,hashed)
}

export {hashed,comparePassword};