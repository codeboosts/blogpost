import { Response } from 'express';
import { UserService } from './user.service';
import { onSignToken } from '../common/utils/tokenManager';

export class UserController {
  private readonly userService: UserService

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.register(req.body);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  verifyEmail = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.verifyEmail(req.body);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  sendOTP = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.sendOTP(req.body);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  myInfo = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.myInfo(req.currentUser._id);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  login = async (req: RequestType, res: Response) => {
    try {
      const user = await this.userService.login(req.body);
      res.json({ token: onSignToken({ _id: user._id.toString(), email: user.email }) })
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  deleteUser = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.deleteUser(req.currentUser._id);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  changePassword = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.changePassword(req.body, req.currentUser._id);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  changeEmail = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.changeEmail(req.body, req.currentUser.email);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  updateUser = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.updateUser(req.body, req.currentUser._id);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  forgotPassword = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.forgotPassword(req.body);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  resetPassword = async (req: RequestType, res: Response) => {
    try {
      const result = await this.userService.resetPassword(req.body);
      res.json(result)
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}
