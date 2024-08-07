import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/factories/make-search-gyms-use-case";
import { makeFetchUserCheckInsHistoryUseCase } from "@/factories/make-fetch-user-check-ins-history-use-case";
import { makeGetUserMetricsUseCase } from "@/factories/make-get-user-metrics-use-case";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(201).send({
    checkInsCount,
  });
}
