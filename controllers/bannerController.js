const { Banner } = require('../models');

const getBanner = async (req, res) => {
    try {
        const banners = await Banner.findAll({
            where: { status: 'active' },
            attributes: ['id', 'banner_name', 'banner_image', 'description', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        return res.json({
            status: 0,
            message: "Sukses",
            data: banners
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

module.exports = {
    getBanner
}