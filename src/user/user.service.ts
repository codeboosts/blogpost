import {
  UserRegisterInputDto,
  VerifyEmailInputDto,
  ChangePasswordInputDto,
  ChangeEmailInputDto,
  LoginInputDto,
  UpdateUserInputDto,
  ForgotPasswordInputDto,
  ResetPasswordInputDto,
  SendOTPInputDto,
} from './dto/UserInput.dto';
import User from './schema/user.schema';
import { onComparePassword, onHashPassword } from '../common/utils/bcrypt';
import { RedisService } from '../redis/redis.service';
import { MessageOutput, SuccessOutput } from '../common/dto/CommonOutput.dto';
import { onGenerateOTP } from '../common/utils/otpGenerator';
import { onSendOtpToMail } from '../common/utils/sendOtp';
import { BadRequestException, NotFoundException, UnauthorizedException } from '../error/exceptions';

export class UserService {
  private readonly redisService: RedisService

  constructor() {
    this.redisService = new RedisService();
  }

  async register(input: UserRegisterInputDto): Promise<MessageOutput> {
    const user = new User()
    user.email = input.Email,
      user.fullname = input.Fullname,
      user.password = await onHashPassword(input.Password),

      await user.save();

    const otp = onGenerateOTP(6);
    await this.storeAndSendOTP(input.Email, otp);

    return { message: 'Check your mailbox' };
  }

  async storeAndSendOTP(email: string, otp: string): Promise<void> {
    console.log(`Stored OTP for ${email}: ${otp} (placeholder)`);
    await this.redisService.storeValueInTempStore(otp, email, 600, true);

    await onSendOtpToMail(email, otp);
  }

  async verifyEmail(input: VerifyEmailInputDto): Promise<SuccessOutput> {
    await this.validateOTP(input.Email, input.OTP);

    await this.updateVerifyEmailStatus(input.Email);

    return { isSuccess: true };
  }

  async sendOTP(input: SendOTPInputDto): Promise<MessageOutput> {
    const otp = onGenerateOTP(6);
    await this.storeAndSendOTP(input.Email, otp);

    return { message: 'Check your mailbox' };
  }

  async myInfo(userId: string) {
    const user = await User.findById(userId);

    const { password, ...userInfo } = user.toJSON();

    return userInfo;
  }

  async login(input: LoginInputDto) {
    const user = await this.getByEmail(input.Email);
    if (!user) throw new NotFoundException('Invalid credentials specified');
    if (!user.emailVerified) throw new NotFoundException('Email not verified');

    const isMatched = onComparePassword(user.password, input.Password);
    if (!isMatched) throw new NotFoundException('Invalid credentials specified');

    return user;
  }

  async deleteUser(_id: string): Promise<SuccessOutput> {
    const deletedUser = await User.findOneAndDelete({ _id });
    if (!deletedUser) {
      throw new NotFoundException('Invalid user specified!');
    }

    return { isSuccess: true };
  }

  async changeEmail(input: ChangeEmailInputDto, email: string): Promise<MessageOutput> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }

    const isMatched = onComparePassword(user.password, input.Password);
    if (!isMatched) throw new UnauthorizedException('Invalid credentials specified');

    const otp = onGenerateOTP(6);
    await this.storeAndSendOTP(input.NewEmail, otp);

    await User.findOneAndUpdate({ email }, { $set: { emailVerified: false, email: input.NewEmail } });

    return { message: 'Check your mailbox' };
  }

  async changePassword(input: ChangePasswordInputDto, _id: string): Promise<SuccessOutput> {
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }

    const isMatched = onComparePassword(user.password, input.Password);
    if (!isMatched) throw new NotFoundException('Invalid credentials specified');

    await User.findOneAndUpdate({ _id }, { $set: { password: await onHashPassword(input.NewPassword) } });

    return { isSuccess: true };
  }

  async updateUser(input: UpdateUserInputDto, _id: string): Promise<SuccessOutput> {
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }

    await User.findOneAndUpdate({ _id }, { $set: { fullname: input.Fullname } });

    return { isSuccess: true };
  }

  async forgotPassword(input: ForgotPasswordInputDto): Promise<MessageOutput> {
    const user = await this.getByEmail(input.Email);
    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }

    const otp = onGenerateOTP(6);
    await this.storeAndSendOTP(input.Email, otp);

    return { message: 'Check your mailbox' };
  }

  async resetPassword(input: ResetPasswordInputDto): Promise<SuccessOutput> {
    await this.validateOTP(input.Email, input.OTP);

    await User.findOneAndUpdate({ email: input.Email }, { $set: { password: await onHashPassword(input.Password) } });

    return { isSuccess: true };
  }

  async getByEmail(email: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundException('Invalid email specified');
    }

    return user;
  }

  async isUserExistById(_id: string): Promise<boolean> {
    const user = await User.findById({ _id });
    return !!user;
  }

  async getUserById(_id: string) {
    const user = await User.findById(_id);

    if (!user) {
      throw new NotFoundException('Invalid user specified');
    }

    return user;
  }

  async updateVerifyEmailStatus(email: string): Promise<void> {
    const user = await User.findOneAndUpdate({ email }, { $set: { emailVerified: true } });

    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }
  }

  async validateOTP(email: string, otp: string) {
    const result = await this.redisService.getValueFromTempStore(email);

    if (result !== otp) {
      throw new BadRequestException('Invalid OTP for ' + email);
    }
  }
}
