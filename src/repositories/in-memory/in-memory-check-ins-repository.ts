import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../check-ins-repository";
import {User, Prisma} from '@prisma/client'

interface CheckinData {
    id: string,
    create_at: Date, 
    validated_at: Date | null, 
    user_id : string,
    gym_id: string
}

export class inMemoryCheckInsRepository implements CheckInsRepository{

   

    public items: User[] = []

    async create(data: CheckinData){
        const checkIn = {
            id:randomUUID(),
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            user_id: data.user_id,
            gym_id: data.gym_id,

        }
   
    this.items.push(checkIn)
    return checkIn
}
}

// id?: string
// created_at?: Date | string
// validated_at?: Date | string | null
// user_id: string
// gym_id: string