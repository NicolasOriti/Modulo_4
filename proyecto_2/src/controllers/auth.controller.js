const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');
const { generateJWT } = require('../helpers/jwtGenerator');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // UserModel.findOne({ email }).then(
    //   (response) => {
    //     const user = response;
    //     if (user) {
    //     }
    //   }
    // )
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Email or password incorrect',
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        message: 'User inactive',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Email or password incorrect',
      });
    }

    // Crear token
    const token = await generateJWT(user.id);

    // Enviar el token
    res.json({
      message: 'User login success',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Contact support',
    });
  }
};

module.exports = {
  login,
};
