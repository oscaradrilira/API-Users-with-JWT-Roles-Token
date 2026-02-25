// Function to get the current date in MySQL format
function obtenerFechaMySQL() {
    const ahora = new Date();

    const yyyy = ahora.getFullYear();
    const mm = String(ahora.getMonth() + 1).padStart(2, '0'); // Month (0-11)
    const dd = String(ahora.getDate()).padStart(2, '0'); // Day (0-31)
    const hh = String(ahora.getHours()).padStart(2, '0'); // Hour (0-23)
    const min = String(ahora.getMinutes()).padStart(2, '0'); // Minute (0-59)
    const ss = String(ahora.getSeconds()).padStart(2, '0'); // Second (0-59)

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

module.exports = obtenerFechaMySQL;

