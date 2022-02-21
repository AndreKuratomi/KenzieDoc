"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verifyAdmin = function (req, res, next) {
    var userInfo = req.user;
    try {
        console.log(userInfo.isAdm);
        if (userInfo.isAdm !== true) {
            return res.status(401).json({
                status: "error",
                message: "Acess denied - You must be an Admin to access this resource",
            });
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.default = verifyAdmin;
//# sourceMappingURL=verify.admin.middleware.js.map