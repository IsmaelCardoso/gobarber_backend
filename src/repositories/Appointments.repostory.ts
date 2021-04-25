import AppointmentsModel from "../models/Appointments.model"

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AppointmentsModel)
class AppointmentsRepository extends Repository<AppointmentsModel> {
  public async findByDate(date: Date): Promise<AppointmentsModel | null> {
    const findAppointment = await this.findOne({
      where: { date }
    })

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
