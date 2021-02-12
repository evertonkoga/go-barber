import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointmet = container.resolve(CreateAppointmentServices);

    const appointment = await createAppointmet.execute({
      provider_id,
      user_id,
      date,
    });

    return response.status(201).json(appointment);
  }
}
