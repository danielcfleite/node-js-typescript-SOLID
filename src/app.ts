import fastify from "fastify";
import {ZodError, z} from 'zod'
import { prisma } from "./lib/prisma";
import { register } from "./http/controllers/register.controller";
import { AppRoutes } from "./http/routes";
import { env } from "./env";

export const app = fastify()

app.register(AppRoutes)

app.setErrorHandler(async (error, _request, reply)=>{
if (error instanceof ZodError){
    return reply.status(400)
    .send({message: 'Validation error.', issues: error.format()})
}

    if (env.NODE_ENV !== 'production'){
        console.error(error)
    } else{
        //TODO: Here we should log to an external toll like DataDog
    }

return reply.status(500).send({message: 'Internal server error.'})
})