const formatedDate = () => {
    const now = new Date();
    const day = now.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const hours = now.toLocaleString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const time = { day, hours }
    return time;
}

module.exports = { formatedDate }