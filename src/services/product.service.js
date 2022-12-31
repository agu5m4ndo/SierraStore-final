//Sirven para dar una fecha futura de presentación en el
//envío de un producto, en el front
const date = new Date();
date.setDate(date.getDate() + 15);

let monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

monthNames = monthNames[date.getMonth()]

const queryBuilder = (searchTerm) => {
    return {
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } }
        ]
    }
}
module.exports = { date, monthNames, queryBuilder }