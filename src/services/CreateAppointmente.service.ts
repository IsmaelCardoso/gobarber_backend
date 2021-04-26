import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm';

import AppointmentsModel from "../models/Appointments.model"
import AppointmentsRepository from "../repositories/Appointments.repostory"

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: RequestDTO): Promise<AppointmentsModel> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
