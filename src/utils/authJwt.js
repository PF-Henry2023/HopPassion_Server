// funcion que nos indica para que confirmemos si el usuario esta enviado su token:
// verifica si tiene token:
//  verifica el tipo de susuario:
const { User } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PASSWORD_JWT } = process.env;

//para verificar en las rutas si el token existe; se puede pasar como funcion a cualquier ruta donde se desee
const verifyToken = async (req,res,next) => {
    try {
        const token = req.headers["x-access-token"];// recibimos el token por header
        if(!token) return res.status(403).json({message: "No token provided"});// comprobamos is el token no existe
        
        const decoded = jwt.verify(token, PASSWORD_JWT);// si existe token extraemos lo que esta dentro del token y guardamos en un objeto decoded
        console.log(decoded); // me trae esto: { id: 12, iat: 1696362113, exp: 1696448513 }
        req.userId = decoded.id
        const user = await User.findOne({where: {id: req.userId}}, {password: 0}); // buscamos al usuario con la propiedad decoded.id que es el id referenciado al usuario que se paso por header
        if(!user) return res.status(404).json({message: "no user found"});

        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}

const isAdmin = async(req,res,next) => {
    const user = await User.findOne({where: {id: req.userId}});
    console.log(user);
    const roleUser = user.role
    if(roleUser === "admin"){
        next(); // si el rol del usuario es igual a admin continua con la siguiente funcion
        return; // si coincide con el admin retorna
    }
    return res.status(403).json({message: "Require Admin role"});
}


// verifica si el rol que fue enviado ya fue creado
const checkRolesExisted = (req, res, next) => {
    if(req.body.role !== "admin" && req.body.role !== "user") {
        return res.status(400).json({
            message: `Role ${req.body.role} does not exists`
        })
    };
    next();
}

// verificar si me esta enviando un correo nuevo o si ya existe ese correo
// verifica si el usuario ya existe:
const checkDuplicateUserNameOrEmail = async (req, res, next) => {
    const user = await User.findOne({where: {name: req.body.name}});
    if(user) return res.status(400).json({message: "The user already exists"});

    const email = await User.findOne({where: {email: req.body.email}});
    if(email) return res.status(400).json({message: "The email already exists"});
    
    next();
}
module.exports = {
    verifyToken,
    isAdmin,
    checkRolesExisted,
    checkDuplicateUserNameOrEmail,
}