import { Router } from "express";
import { UserController } from "./user.controller";
import { authentication } from "../middleware/authentication";
import { validationMiddleware } from "../middleware/validation.middleware";
import { UserRegisterInputDto, ChangeEmailInputDto, ChangePasswordInputDto, ForgotPasswordInputDto, LoginInputDto, ResetPasswordInputDto, SendOTPInputDto, UpdateUserInputDto, VerifyEmailInputDto } from "./dto/UserInput.dto";

const router = Router();
const userController = new UserController();

router.get("/", (_, res) => res.send("Hello from user!"));


router.post("/register", validationMiddleware(UserRegisterInputDto), userController.register);
router.post("/verify-email", validationMiddleware(VerifyEmailInputDto), userController.verifyEmail);
router.post("/send-otp", validationMiddleware(SendOTPInputDto), userController.sendOTP);
router.post("/login", validationMiddleware(LoginInputDto), userController.login);
router.get("me", authentication(), userController.myInfo);
router.delete("", authentication(),  userController.deleteUser);
router.put("change-password", authentication(), validationMiddleware(ChangePasswordInputDto), userController.changePassword);
router.put("change-email", authentication(), validationMiddleware(ChangeEmailInputDto), userController.changeEmail);
router.put("update", authentication(), validationMiddleware(UpdateUserInputDto), userController.updateUser);
router.post("forgot-password", validationMiddleware(ForgotPasswordInputDto), userController.forgotPassword);
router.put("reset-password", validationMiddleware(ResetPasswordInputDto), userController.resetPassword);

export default router;
