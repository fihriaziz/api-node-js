const { User } = require('../models');

const getProfile = async (req, res) => {
    try {
        const email = req.user.email;

        const user = await User.findOne({
            where: {email},
            attributes: ['id', 'email', 'first_name', 'last_name', 'profile_image']
        });

        if (!user) {
            return res.status(401).json({
                status: 108,
                message: "Token tidak valid atau kadaluarsa",
                data: null
            });
        }

        return res.json({
            status: 0,
            message: "Sukses",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { first_name, last_name } = req.body;
        const email = req.user.email;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                status: 108,
                message: "Unauthorized",
                data: null
            });
        }

        await user.update({ first_name, last_name });

        return res.json({
            status: 0,
            message: "Sukses",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

const updateImage = async (req, res) => {
    try {
        const email = req.user.email;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                status: 108,
                message: "Token tidak valid atau kadaluarsa",
                data: null
            });
        }

        const file = req.file;

        if (!file) {
            return res.status(400).json({
                status: 102,
                message: "File tidak ditemukan",
                data: null
            });
        }

        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimes.includes(file.mimetype)) {
            return res.status(400).json({
                status: 102,
                message: "Format Image tidak sesuai",
                data: null
            });
        }

        await user.update({ profile_image: file.filename });

        return res.status(200).json({
            status: 0,
            message: "Update Profile Image berhasil",
            data: {
                email: user.email,
                profile_image: file.filename
            }
        });

    } catch (e) {
        return res.status(500).json({
            status: "error",
            message: e.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    updateImage
}