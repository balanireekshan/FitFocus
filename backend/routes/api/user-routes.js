const router = require("express").Router();
const { createUser, login, getSingleUser } = require("../../controllers/user-controller");

// import middleware
const { verifyToken } = require("../../Middlewares/auth");

// put authMiddleware anywhere we need to send a token for verification of user
// /api/user for user signup
router.route("/").post(createUser)

// /api/user/login for user login
router.route("/login").post(login);

// /api/user/me to get single user data
router.route('/me').get(verifyToken, getSingleUser);


module.exports = router;
