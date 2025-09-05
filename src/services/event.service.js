import { Event } from '../models/Event.js';
import { Ticket } from '../models/Ticket.js';
import { AppError } from '../utils/errors.js';

export async function listPublished() {
  return Event.find({ isPublished: true }).sort({ date: 1 }).lean();
}

export async function getById(id) {
  const e = await Event.findById(id).lean();
  if (!e) throw new AppError('Event not found', 404, 'EVENT_NOT_FOUND');
  return e;
}

export async function createEvent(input, ownerId) {
  const e = await Event.create({ ...input, owner: ownerId });
  return e.toObject();
}

export async function getOccupiedSeats(eventId) {
  const event = await Event.findById(eventId).lean();
  if (!event) {
    throw new AppError('Event not found', 404, 'EVENT_NOT_FOUND');
  }

  // Si el evento es GA, no se devuelven asientos
  if (event.seatMap?.type === 'ga'){
    return [];
  }

  // Buscar todos los tickets vendidos para ese evento
  const tickets = await Ticket.find({ event: eventId }).lean();

  // Extraer únicamente el asiento
  return tickets.map(t => t.seat);
}