import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "@/factories/make-check-ins-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine(
      (value) => {
        return Math.abs(value) <= 90;
      },
      { message: "Latitude must be between -90 and 90." }
    ),

    longitude: z.coerce.number().refine(
      (value) => {
        return Math.abs(value) <= 180;
      },
      { message: "Longitude must be between -180 and 180." }
    ),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
