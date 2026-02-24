const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

// Nivel 1 (Admin)
const soloAdmin = (req, res, next) => {
  if (req.usuario?.nivel !== 1) {
    return res.status(403).render('login', {
      error: 'No tenés permisos para realizar esta acción'
    });
  }
  next();
};

//Nivel 1 y 2 (Admin y Supervisor)
const adminOSupervisor = (req, res, next) => {
  if (![1, 2].includes(req.usuario?.nivel)) {
    return res.status(403).render('login', {
      error: 'Acceso denegado'
    });
  }
  next();
};

module.exports = { verificarToken, soloAdmin, adminOSupervisor };