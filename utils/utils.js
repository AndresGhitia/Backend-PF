const bCrypt = require(`bcrypt`);

const createHash = password => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const isValidPassword = (userPassword, password) => {
    return bCrypt.compareSync(password, userPassword);
};

// const isAdmin = (user) => {
//     return user && user.role === 'admin';
// }

module.exports = {
    createHash,
    isValidPassword,
    // isAdmin
}