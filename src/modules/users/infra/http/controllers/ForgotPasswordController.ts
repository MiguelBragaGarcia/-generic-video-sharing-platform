import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordService from '@modules/users/services/SendForgotEmailPassword';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const sendForgotEmailPassword = container.resolve(ForgotPasswordService);
    const { email } = request.body;

    await sendForgotEmailPassword.execute({ email });

    return response.status(204).json();
  }
}
export default ForgotPasswordController;
