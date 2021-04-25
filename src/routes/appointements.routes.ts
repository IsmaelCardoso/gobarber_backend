import { Router } from 'express';
import { parseISO } from 'date-fns'

import AppointmentsRepository from "../repositories/Appointments.repostory"
import CreateAppointmentService from "../services/CreateAppointmente.service"

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get("/", (req, res) => {
  const appointments = appointmentsRepository.findAll();

  return res.json(appointments);
})

appointmentsRouter.post("/", (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointmentService.execute({ provider, date: parsedDate })

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
});

export default appointmentsRouter;
