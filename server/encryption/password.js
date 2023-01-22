import becrypt from "becrypt"

export async function comparePassword(password, hashPassword){
    return await becrypt.compare(password, hashPassword);
}
