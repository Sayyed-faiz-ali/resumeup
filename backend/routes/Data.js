const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware")
const { createResume ,viewResume,Resume, Remove,Edit} = require('../controller/resumeController'); 

router.get("/",authmiddleware,Resume);
router.post("/create",authmiddleware,createResume);

router.get("/:resumeId", authmiddleware, viewResume);
router.delete("/:id", authmiddleware, Remove);
router.put("/:resumeId", authmiddleware, Edit);



module.exports = router;