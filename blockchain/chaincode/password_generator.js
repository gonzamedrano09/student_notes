var crypto = require('crypto'); 

var password = "12345678";
console.log("Raw password: " + password)

var salt = crypto.randomBytes(16).toString('hex');
console.log("Salt: " + salt);

var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`); 
console.log("Hashed password: " + hash);
