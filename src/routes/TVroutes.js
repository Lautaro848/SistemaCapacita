// Agregar en app.js reemplazando la línea:
// app.get('/tv', (req, res) => res.render('tv'));
// Por esta ruta que carga datos reales:

const db = require('./src/config/db');
const dayjs = require('dayjs');

app.get('/tv', async (req, res) => {
  try {
    // Traer empleados activos con aptitudes
    const [empleados] = await db.query(`
      SELECT e.*,
        GROUP_CONCAT(DISTINCT a.nombre ORDER BY a.nombre SEPARATOR ', ') as aptitudes
      FROM empleados e
      LEFT JOIN empleado_aptitudes ea ON e.id = ea.empleado_id
      LEFT JOIN aptitudes a ON ea.aptitud_id = a.id
      WHERE e.activo = 1
      GROUP BY e.id
      ORDER BY e.apellido ASC
    `);

    // Traer carnets vigentes/próximos por empleado
    const [carnets] = await db.query(`
      SELECT c.empleado_id, c.especialidad, c.fecha_vencimiento, c.estado
      FROM carnets c
      WHERE c.estado IN ('vigente', 'proximo')
      ORDER BY c.fecha_vencimiento ASC
    `);

    // Formatear fechas y agrupar carnets por empleado
    const carnetsPorEmpleado = {};
    carnets.forEach(c => {
      if (!carnetsPorEmpleado[c.empleado_id]) carnetsPorEmpleado[c.empleado_id] = [];
      carnetsPorEmpleado[c.empleado_id].push({
        ...c,
        fecha_vencimiento_str: dayjs(c.fecha_vencimiento).format('DD/MM/YYYY')
      });
    });

    // Adjuntar carnets a cada empleado
    const empleadosConCarnets = empleados.map(e => ({
      ...e,
      carnets: carnetsPorEmpleado[e.id] || []
    }));

    // Calcular cuántas tarjetas mostrar según cantidad de empleados
    const total = empleadosConCarnets.length;
    let visibleCards = 3;
    if (total === 1) visibleCards = 1;
    else if (total === 2) visibleCards = 2;

    // Ancho de cada tarjeta según visibles
    const cardWidth = visibleCards === 1 ? 600 : visibleCards === 2 ? 500 : 380;

    res.render('tv', { empleados: empleadosConCarnets, visibleCards, cardWidth });
  } catch (error) {
    console.error('[/tv]', error);
    res.status(500).send('Error al cargar vista TV: ' + error.message);
  }
});