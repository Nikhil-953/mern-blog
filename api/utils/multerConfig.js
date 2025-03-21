// // backend/utils/multerConfig.js
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Ensure uploads directory exists
// const uploadDir = path.join(process.cwd(), 'public');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log('Saving to:', uploadDir);
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   },
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = /jpeg|jpg|png|gif/;
//   const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

//   const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedMimeTypes.includes(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'));
//   }
// };

// // Multer instance with limits and file filter
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter,
// });

// export default upload;

import path from "path";

import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 mb in size max limit
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
