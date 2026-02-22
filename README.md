# SistemaCapacita

> Sistema de gestión de capacitaciones y aptitudes para empleados  
> **Empresa:** Durlock — La Pampa, Argentina

## Descripción

**SistemaCapacita** es una aplicación web desarrollada en **Node.js** que permite gestionar y visualizar las capacitaciones y aptitudes de los empleados de Durlock. El sistema muestra en tiempo real quién está habilitado para realizar determinadas tareas, con alertas de vencimiento de certificaciones y una vista optimizada para pantallas de TV.

## Objetivo

Centralizar la información de capacitaciones del personal para que supervisores y responsables puedan identificar rápidamente qué empleado está habilitado para una tarea específica, y mantener el control de las fechas de vencimiento de carnets y certificados.

## Niveles de Acceso

Nivel Rol Permisos

**Nivel 1** Administrador Crear, editar, eliminar empleados, tareas, capacitaciones y carnets
**Nivel 2** Supervisor / Consultor Solo lectura: buscar empleados aptos para una tarea  
 **Nivel 3** Empleado Sin acceso al sistema (solo aparece como perfil en la vista TV)

## Funcionalidades Principales

### Perfil de Empleado

- Foto de perfil
- Nombre y legajo
- Lista de aptitudes y capacitaciones aprobadas
- Estado de carnets (vigente / próximo a vencer / vencido)

### Vista Carrusel (Pantalla TV)

- Desfile automático de tarjetas de empleados
- Muestra foto, nombre y aptitudes principales
- Diseño optimizado para pantalla grande (TV / monitor)
- Actualización en tiempo real

### Gestión de Carnets y Certificaciones

- Registro de carnets con fecha de emisión y vencimiento
- Alerta visual cuando un carnet **vence en menos de 30 días** (color amarillo)
- Alerta visual cuando un carnet **está vencido** (color rojo)
- Calendario integrado con marcadores de vencimientos

### Búsqueda de Personal Apto

- Filtrar empleados por tarea o aptitud específica
- Ver quién está habilitado en este momento

## Stack Tecnológico

Capa Tecnología  
 **Backend** Node.js + Express.js  
 **Frontend** HTML5 + CSS3 + JavaScript (Vanilla o EJS como motor de templates)
**Base de datos** MySQL (compatible con Hostinger)  
 **Autenticación** JWT (JSON Web Tokens)  
 **Subida de fotos** Multer  
 **Notificaciones / Fechas** Day.js  
 **Carrusel** CSS animations + JS nativo  
 **Deploy** Hostinger (App web Node.js) + GitHub

## Entidades Principales (Base de Datos)

- **Empleados** — id, nombre, apellido, legajo, foto, nivel_acceso
- **Aptitudes** — id, nombre, descripción
- **Empleado_Aptitudes** — relación muchos a muchos
- **Carnets** — id, empleado_id, nombre, fecha_emision, fecha_vencimiento, estado
- **Tareas** — id, nombre, aptitudes_requeridas

## Roadmap de Desarrollo

- [x] Estructura del proyecto y README
- [ ] Configuración inicial de Node.js y Express
- [ ] Conexión a base de datos MySQL
- [ ] Sistema de autenticación y niveles de acceso
- [ ] ABM de empleados con foto de perfil
- [ ] Gestión de aptitudes y capacitaciones
- [ ] Gestión de carnets con control de vencimientos
- [ ] Vista carrusel para pantalla TV
- [ ] Calendario de vencimientos con alertas visuales
- [ ] Buscador de empleados por aptitud
- [ ] Deploy en Hostinger

---

## Instalación Local (próximamente)

```bash
git clone https://github.com/TU_USUARIO/SistemaCapacita.git
cd SistemaCapacita
npm install
cp .env.example .env
# Configurar variables de entorno
npm run dev
```

---

## Variables de Entorno

```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=sistemaCapacita
JWT_SECRET=tu_clave_secreta
```

---

## Desarrollo

Proyecto desarrollado para **Portafolio personal**  
Año: 2025

---

## Licencia

Uso interno — Todos los derechos reservados
