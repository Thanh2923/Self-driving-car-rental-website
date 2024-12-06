const jwt = require("jsonwebtoken");

const Middleware = {
  verifyToken: (req, res, next) => {
    const tokenBear = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.headers.token;
    if (tokenBear || token) {
      const accessToken = tokenBear ? tokenBear : token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          res
            .status(403)
            .json({ message: "Token not valid . Please Login again" });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json(`You're not authentication`);
    }
  },

  verifyTokenRole: (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role_id;
      console.log(userRole);
      if (roles.includes(userRole)) {
        next();
      } else {
        return res
          .status(403)
          .json({
            message: "You do not have permission to perform this action"
          });
      }
    };
  }
};

module.exports = Middleware;
