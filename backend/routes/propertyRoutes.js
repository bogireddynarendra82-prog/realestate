const router = require("express").Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  createProperty,
  updateProperty,
  getProperties,
  getProperty,
  deleteProperty,
  contactSeller,
} = require("../controllers/propertyController");

router.get("/", getProperties);
router.get("/:id", getProperty);

router.post("/", auth, upload.array("images"), createProperty);

router.put("/:id", auth, upload.array("images"), updateProperty);

router.delete("/:id", auth, deleteProperty);

router.post("/:id/contact", contactSeller);

module.exports = router;
