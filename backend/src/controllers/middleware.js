const jwt = require('jsonwebtoken')

const Middleware ={
    verifyToken: (req, res, next) => {
        const tokenBear = req.header('Authorization')?.replace('Bearer ', '');
        const token = req.headers.token;
        if (tokenBear || token) {
          const accessToken = tokenBear ? tokenBear : token.split(' ')[1];
          jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
              res
                .status(403)
                .json({ message: 'Token not valid . Please Login again' });
            } else {
              req.user = user;
              next();
            }
          });
        } else {
          res.status(401).json(`You're not authentication`);
        }
      },
}

module.exports = Middleware;