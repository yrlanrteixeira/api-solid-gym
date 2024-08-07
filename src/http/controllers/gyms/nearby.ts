import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeNearbyGymsUseCase } from "@/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine(
      (value) => {
        return Math.abs(value) <= 90;
      },
      { message: "Latitude must be between -90 and 90." }
    ),

    longitude: z.number().refine(
      (value) => {
        return Math.abs(value) <= 180;
      },
      { message: "Longitude must be between -180 and 180." }
    ),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);

  const searchGymsUseCase = makeNearbyGymsUseCase();

  const { gyms } = await searchGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({
    gyms,
  });
}
