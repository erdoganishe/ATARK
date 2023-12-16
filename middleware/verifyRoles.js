const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("RQ: " + req.roles);
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log("AR: " + rolesArray);
        //console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        console.log("rs: " + result);
        if(!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;