import {Router} from "express";
import {googleLogin, refresh, logout,me} from "./auth.controller.js"
import {requireAuth} from "./auth.middleware.js";
const router  = Router();
router.post("/google",googleLogin);
router.post("refresh",refresh);
router.post("/logout",logout);
router.get('/me',requireAuth,me);