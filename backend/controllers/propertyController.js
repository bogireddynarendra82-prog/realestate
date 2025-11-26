const Property = require("../models/Property");
const cloudinary = require("../config/cloudinary");
const mailer = require("../utils/mailer");

// CREATE PROPERTY
exports.createProperty = async (req, res) => {
  const images = [];

  for (const file of req.files) {
    const uploaded = await cloudinary.uploader.upload(file.path);
    images.push({ url: uploaded.secure_url, public_id: uploaded.public_id });
  }

  const property = await Property.create({
    ...req.body,
    images
  });

  res.json(property);
};

// UPDATE PROPERTY
exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  let property = await Property.findById(id);

  if (!property) return res.status(404).json({ message: "Not found" });

  // DELETE OLD IMAGES
  if (req.body.removedImages) {
    const ids = Array.isArray(req.body.removedImages)
      ? req.body.removedImages
      : [req.body.removedImages];

    for (const pid of ids) {
      await cloudinary.uploader.destroy(pid);
      property.images = property.images.filter((i) => i.public_id !== pid);
    }
  }

  // ADD NEW IMAGES
  if (req.files.length > 0) {
    for (const file of req.files) {
      const uploaded = await cloudinary.uploader.upload(file.path);
      property.images.push({
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      });
    }
  }

  Object.assign(property, req.body);
  await property.save();

  res.json(property);
};

// GET ALL PROPERTIES
exports.getProperties = async (req, res) => {
  const filter = {};

  if (req.query.sellerId) filter.seller = req.query.sellerId;

  const properties = await Property.find(filter).sort({ createdAt: -1 });

  res.json({ properties });
};

// GET SINGLE PROPERTY
exports.getProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.json(property);
};

// DELETE PROPERTY
exports.deleteProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);

  for (const img of property.images) {
    await cloudinary.uploader.destroy(img.public_id);
  }

  await property.deleteOne();

  res.json({ message: "Deleted" });
};

// CONTACT SELLER
exports.contactSeller = async (req, res) => {
  const { name, email, message } = req.body;

  await mailer.sendMail({
    from: email,
    to: "seller@example.com",
    subject: "Property Inquiry",
    text: `Name: ${name}\nMessage: ${message}`,
  });

  res.json({ message: "Email sent!" });
};
