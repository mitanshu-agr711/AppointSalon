import jwt from 'jsonwebtoken';


interface User {
    email: string;
}

export function generateToken(user: User): string {
    const secretKey = process.env.JWT_SECRET || 'defaultSecretKey'; 

    const payload = {
        email: user.email,
    };

    const options = {
        expiresIn: '7d', 
    };

    return jwt.sign(payload, secretKey, options);
}
