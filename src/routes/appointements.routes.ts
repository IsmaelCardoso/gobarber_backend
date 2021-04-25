import { Router } from 'express';
import { getCustomRepository } from 'typeorm'

import { parseISO } from 'date-fns'

import AppointmentsRepository from "../repositories/Appointments.repostory"
import CreateAppointmentService from "../services/CreateAppointmente.service"

const appointmentsRouter = Router();

appointmentsRouter.get("/", async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
})

appointmentsRouter.post("/", async (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({ provider, date: parsedDate })

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
});

export default appointmentsRouter;
