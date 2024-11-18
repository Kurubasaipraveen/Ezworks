const File = require('../models/File');
const crypto = require('crypto');

// File upload
exports.uploadFile = async (req, res) => {
  const { file } = req;
  const { user_id } = req.user;

  const encryptedUrl = crypto.randomBytes(20).toString('hex'); // Simple encryption for the URL

  try {
    const newFile = await File.create({
      file_name: file.originalname,
      file_type: file.mimetype,
      uploaded_by: user_id,
      encrypted_url: encryptedUrl,
    });

    res.status(200).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List files
exports.listFiles = async (req, res) => {
  try {
    const files = await File.findAll();
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Download file
exports.downloadFile = async (req, res) => {
  const { file_id } = req.params;
  
  try {
    const file = await File.findOne({ where: { id: file_id } });

    if (!file) return res.status(400).json({ error: 'File not found' });

    res.status(200).json({ message: 'File ready for download', file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
