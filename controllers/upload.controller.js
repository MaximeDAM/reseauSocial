const UserModel = require("../models/user.model");
const multer = require("multer")
const fs = require("fs");
const { uploadErrors } = require("../utils/errors.utils");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./client/public/uploads/profil")
    },
    filename: (req, file, callback) => {
        callback(null, `${req.body.name}.jpg`);
    }
})

const storagePost = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./client/public/uploads/posts")
    },
    filename: (req, file, callback) => {
        callback(null, `${req.body.posterId}${Date.now()}.jpg`);
    }
});

module.exports.uploadPost = multer({
    storage: storagePost,
    limits: {
        fileSize: 500000
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
})

module.exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 500000
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
})

module.exports.uploadProfil = (req, res) => {
    try {
        UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "./uploads/profil/" + req.body.name + ".jpg" } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};


