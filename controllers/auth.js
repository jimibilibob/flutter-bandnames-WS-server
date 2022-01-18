const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');

const createUser = async (req, res = response) => {

  const { user, email, password } = req.body;

  try {
    const emailExists = await User.findOne({email});

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: 'Email already exists'
      });
    }

    const user = new User( req.body );

    // Encript password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);


    await user.save();


    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Conect to the administrator'
    });
  }

}


const login = async (req, res = response) => {

  const { user, email, password } = req.body;

  try {
    const userDB = await User.findOne({email});

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email not found'
      });
    }

    // Validate Password
    const validPassword = bcrypt.compareSync( password, userDB.password );
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'Password not found'
      }); 
    }

    // Generate JWT
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      user: userDB,
      token
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Conect to the administrator'
    });
  }

}

const refreshToken = async (req, res = response) => {

  const uid = req.uid;
  console.log(req);

  const newToken = await generateJWT(uid);

  const user = await User.findById(uid);

  
  res.json({
    ok: true,
    user,
    newToken
  });
};

module.exports = {
  createUser,
  login,
  refreshToken
};