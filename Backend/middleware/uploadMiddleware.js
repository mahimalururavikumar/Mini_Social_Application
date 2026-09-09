import multer from "multer";

const storage = multer.memoryStorage();

const filter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, JPG, PNG, GIF, and WEBP images are allowed."), false);
    }
};

const upload = multer({
    storage,
    fileFilter: filter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export default upload;
