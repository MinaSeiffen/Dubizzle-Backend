const ROLES_LIST =require('../config/roles_list')
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req?.roles) {
                console.log('User roles not found');
                return res.sendStatus(401);
            }

            const rolesArray = allowedRoles.map(role => String(role).toLowerCase()); 
            const userRoles = req.roles.map(role => String(role).toLowerCase()); 

            const isAdminAndUserAllowed = rolesArray.includes(String(ROLES_LIST.Admin).toLowerCase()) &&
                rolesArray.includes(String(ROLES_LIST.User).toLowerCase());
            console.log(isAdminAndUserAllowed);
            const result = isAdminAndUserAllowed || userRoles.some(role => rolesArray.includes(role));

            if (!result) {
                console.log('Unauthorized - Roles mismatch');
                return res.sendStatus(401);
            }

            console.log('Authorized');
            next();
        } catch (error) {
            console.log('Error:', error.message);
            res.status(500).json({ 'message': error.message });
        }
    };
};

module.exports = verifyRoles;
