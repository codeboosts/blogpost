import { Router } from "express";
import { UserController } from "./user.controller";
import { authentication } from "../middleware/authentication";


const router = Router();
const userController = UserController();


router.get("/", (_, res) => res.send("Hello from user!"));


router.post('register', userController.register)
//   register(@Body() input: UserRegisterInputDto) {
router.post('verify-email', userController.verifyEmail)
//   verifyEmail(@Body() input: VerifyEmailInputDto) {
router.post('send-otp', userController.sendOTP)
//   sendOTP(@Body() input: SendOTPInputDto) {
router.post('login', userController.login)
//   login(@Body() input: LoginInputDto) {
router.get('me', authentication(), userController.myInfo)
//   myInfo(@CurrentUser() currentUser: CurrentUserType) {
router.delete('', authentication(), userController.deleteUser)
//   deleteUser(, @CurrentUser() currentUser: CurrentUserType) {
router.put('change-password', authentication(), userController.changePassword)
//   changePassword(@Body() input: ChangePasswordInputDto, @CurrentUser() currentUser: CurrentUserType) {
router.put('change-email', authentication(), userController.changeEmail)
//   changeEmail(@Body() input: ChangeEmailInputDto, @CurrentUser() currentUser: CurrentUserType) {
router.put('update', authentication(), userController.updateUser)
//   updateUser(@Body() input: UpdateUserInputDto, @CurrentUser() currentUser: CurrentUserType) {
router.post('forgot-password', userController.forgotPassword)
//   forgotPassword(@Body() input: ForgotPasswordInputDto) {
router.put('reset-password', userController.resetPassword)
//   resetPassword(@Body() input: ResetPasswordInputDto) {

export default router