const storage = require(`../../modelDAOs/factory`);
const ordenesStorage = storage().ordenes;
const sendEmail = require(`../../notifications/nodemailerGmail`);

const createOrdenController = async (req, res) => {
    try {
        const userLog = req.user;
        const userID = req.body.idUser;
        const orden = await ordenesStorage.createOrden(userID);

        auxEmail(userLog, orden);

        return res.render(`compraFinalizada`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al crear la orden ${err}`
        });
    }
};

const viewOrdenesController = async (req, res) => {
    try {
        const userLog = req.user;
        let allOrdenes = await ordenesStorage.getAll();

        return res.render(`ordenes`, { allOrdenes });
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener todos los productos ${err}`
        });
    }
};

const auxEmail = async (userLog, orden) => {
    let detallePedido = ``;

    orden.products.forEach(element => {
        detallePedido += `
        <li>UNIDADES: ${1}. PRODUCTO: ${element.nombre}. CODIGO: ${element._id} </li>
    `;
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: `andresghitia@gmail.com`,
        subject: `Nuevo pedido de: ${userLog.username}`,
        html: `
            <h3>Nuevo pedido</h3>
            <p> Datos del cliente:</p>
            <ul>
            <li> Nombre: ${userLog.username}</li>
            <li> Email: ${userLog.email}</li>
            <li> Teléfono: ${userLog.telefono}</li>
            <li> Direccion: ${userLog.direccion}</li>
            </ul>
            <p> Pedido:</p>
            <ul>
            ${detallePedido}
            </ul>
        `
    };
    const email = await sendEmail(mailOptions);
}

module.exports = {
    viewOrdenesController,
    createOrdenController,
};
