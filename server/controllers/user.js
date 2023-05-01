const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Funcion para pasar un usuario y regresar un token
function createToken(user, SECRET_KEY, expiresIn){
    const {id, name, email, username} = user;
    const payload = {
        id,
        name,
        email,
        username,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register(input) {
                // console.log("Registrando usuarios");
            // console.log(input)
            const newUser = input;
            newUser.email = newUser.email.toLowerCase();
            newUser.username = newUser.username.toLowerCase();

            const {email, username, password} = newUser;

            // Revisamos si el email esta en uso
            const foundEmail = await User.findOne({ email })
            if(foundEmail) throw new Error("El email ya esta en uso")

            // Revisamos si el usuario esta en uso
            const foundUsername = await User.findOne({ username });
            if(foundUsername) throw new Error("El nombre de usuario ya esta en uso")

            // Encriptar
            const salt = await bcryptjs.genSaltSync(10);
            newUser.password = await bcryptjs.hash(password, salt);

            try{
                const user = new User(newUser);
                user.save();
                return user;
            } catch(error){
                console.log(error)
            }

            // console.log(newUser);
            // return null;
}

async function login(input) {
    const { email, password} = input;

    // console.log("Email: " + email);
    // console.log("Password: " + password);

    // Seleccionar usuario por medio de Email
    const userFound = await User.findOne({email: email.toLowerCase()});
    if(!userFound) throw new Error("Error en el email o contraseña");

    // console.log(userFound);

    const passwordSucess = await bcryptjs.compare(password, userFound.password);
    if(!passwordSucess) throw new Error("Error en el email o contraseña");

    // console.log(createToken(userFound, process.env.SECRET_KEY, "24h"));

    return {
        token: createToken(userFound, process.env.SECRET_KEY, "24h"),
    };
}

module.exports = {
    register,
    login,
};