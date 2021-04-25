import { startOfHour } from 'date-fns'

import AppointmentModel from "../models/Appointment.model"
import AppointmentsRepository from "../repositories/Appointments.repostory"

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): AppointmentModel {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate });

    return appointment;
  };
}

export default CreateAppointmentService;