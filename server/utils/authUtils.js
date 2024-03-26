import bcrypt from "bcrypt";

//Hashes the password
async function hashed(password,num){
    const hashed_password=await bcrypt.hash(password,num)
    return hashed_password

}
//Compares password with hashed password
async function comparePassword(password,hashed){
    return bcrypt.compare(password,hashed)
}

export {hashed,comparePassword};