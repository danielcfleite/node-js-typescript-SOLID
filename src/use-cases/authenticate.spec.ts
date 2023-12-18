import {test, expect, describe, it, beforeEach, afterEach} from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { compare, hash } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: inMemoryUsersRepository
let sut : AuthenticateUseCase

describe('Authenticate Use Case', ()=>{
    beforeEach(()=>{
 usersRepository = new inMemoryUsersRepository()
 sut = new AuthenticateUseCase(usersRepository)
    })


    it('should be able to athenticate', async ()=>{
         
        await usersRepository.create({
            name: "John Doe",
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const {user} = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })

        const isPassWordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )
        expect(isPassWordCorrectlyHashed).toBe(true)
    })

    it ('should not be able to ahtenticate with wrong email'), async () => {       

        await expect(async ()=> sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
        
    }

    it ('should not be able to ahtenticate with wrong password'), async () => {

        await usersRepository.create({
            name: "John Doe",
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })        

        await expect(async ()=> sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
        
    }
})








