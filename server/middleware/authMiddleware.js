const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).send('Unauthorized');

  jwt.verify(token, 'x&@3H!uZC8LbNp$^sWp#EzTq7gYt5Hk'
  , (err, user) => {
    if (err) return res.status(403).send('Forbidden');
    req.user = user;
    next();
  });
};
