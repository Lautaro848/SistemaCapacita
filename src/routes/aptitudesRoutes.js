const express = require('express');
const router = express.Router();
const { verificarToken, soloAdmin } = require('../middlewares/auth');
const { getAptitudes, postAptitud, deleteAptitud, putAptitud } = require('../controllers/aptitudesController');

router.get('/aptitudes',              verificarToken, getAptitudes);
router.post('/aptitudes',             verificarToken, soloAdmin, postAptitud);
router.post('/aptitudes/:id/borrar',  verificarToken, soloAdmin, deleteAptitud);
router.post('/aptitudes/:id/editar',  verificarToken, soloAdmin, putAptitud);

module.exports = router;