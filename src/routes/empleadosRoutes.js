const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { verificarToken, soloAdmin } = require('../middlewares/auth');
const {
  getEmpleados, getNuevoEmpleado, postEmpleado,
  getEditarEmpleado, putEmpleado, deleteEmpleado
} = require('../controllers/empleadosController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'emp-' + unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  }
});

router.get('/empleados',              verificarToken, getEmpleados);
router.get('/empleados/nuevo',        verificarToken, soloAdmin, getNuevoEmpleado);
router.post('/empleados',             verificarToken, soloAdmin, upload.single('foto'), postEmpleado);
router.get('/empleados/:id/editar',   verificarToken, soloAdmin, getEditarEmpleado);
router.post('/empleados/:id/editar',  verificarToken, soloAdmin, upload.single('foto'), putEmpleado);
router.post('/empleados/:id/borrar',  verificarToken, soloAdmin, deleteEmpleado);

module.exports = router;