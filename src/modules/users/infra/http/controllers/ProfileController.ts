import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = container.resolve(UpdateUserProfileService);
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const user = await updateProfileService.execute({
      id: user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id });

    return response.json(classToClass(user));
  }
}

export default ProfileController;
