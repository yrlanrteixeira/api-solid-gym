import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true,
  });

  const token = await reply.jwtSign(
    {},
    {
      sub: request.user.sub,
    }
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sub: request.user.sub,
      expiresIn: "7d",
    }
  );

  return reply
    .setCookie("refresh_token", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true, // This is important to prevent XSS attacks
    })
    .status(200)
    .send({
      token,
    });
}
