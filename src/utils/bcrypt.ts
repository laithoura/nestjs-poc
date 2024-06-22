import * as bcrypt from 'bcryptjs';

export async function encodePassword(rawPassword: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hash(rawPassword, SALT);
}


export async function comparePasswords(rawPassword: string, hash: string) {
    return bcrypt.compareSync(rawPassword, hash);
}