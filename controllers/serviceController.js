const { Service } = require('../models');

const getServices = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                status: 108,
                message: "Unauthorized",
                data: null
            });
        }

        const services = await Service.findAll({
            where: { status: 'active' },
            attributes: ['service_code', 'service_name', 'service_icon', 'service_tariff'],
            order: [['createdAt', 'ASC']]
        });

        return res.json({
            status: 0,
            message: "Sukses",
            data: services
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

module.exports = {
    getServices
}
