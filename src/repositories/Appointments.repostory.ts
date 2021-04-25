import AppointmentModel from "../models/Appointment.model"
import { isEqual } from 'date-fns'

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: AppointmentModel[];

  constructor() {
    this.appointments = [];
  }

  public findAll(): AppointmentModel[] {
    return this.appointments;
  }

  public findByDate(date: Date): AppointmentModel | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): AppointmentModel {
    const appointment = new AppointmentModel({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
