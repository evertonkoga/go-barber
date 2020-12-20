import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmet = container.resolve(CreateAppointmentServices);

    const appointment = await createAppointmet.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  }

  public async index(request: Request, response: Response): Promise<Response> {

    const createAppointmet = container.resolve(CreateAppointmentServices);

    // const appointments = await createAppointmet.execute({});

    return response.send();
  }
}
