const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const showLogin = (req, res) => {
  res.render('login', { error: null });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.render('login', { error: 'Correo o contraseña incorrectos' });
    }

    const usuario = rows[0];

    const passwordOk = await bcrypt.compare(password, usuario.password);
    if (!passwordOk) {
      return res.render('login', { error: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, nivel: usuario.nivel },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60 * 1000 
    });

    if (usuario.nivel === 1 || usuario.nivel === 2) {
      return res.redirect('/dashboard');
    }

    return res.render('login', { error: 'No tenés permisos para acceder al sistema' });

  } catch (error) {
    console.error('Error en login:', error);
    return res.render('login', { error: error.message });  
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

module.exports = { showLogin, postLogin, logout };