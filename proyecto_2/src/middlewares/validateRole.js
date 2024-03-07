const isAdminRole = (req, res, next) => {
  const { role, name } = req.user;

  if (role !== 'ADMIN') {
    return res.status(401).json({
      message: `${name} is not admin`,
    });
  }

  next();
};

module.exports = {
  isAdminRole,
};
