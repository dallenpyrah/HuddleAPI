import {expect} from 'chai'
import {stub} from 'sinon'
import IFireBaseRepository from '../interfaces/IFireBaseRepository'
import {User} from '@prisma/client'
import FireBaseService from "../services/FireBaseService";

describe('FireBaseService', () => {
    describe('getUserByFireBaseId', () => {
        let fireBaseRepositoryStub: IFireBaseRepository
        let fireBaseService: FireBaseService

        beforeEach(() => {
            fireBaseRepositoryStub = {
                getUserByFireBaseId: stub(),
            }
            fireBaseService = new FireBaseService(fireBaseRepositoryStub)
        })

        it('should return the user if they exist', async () => {
            const fireBaseUserId = 'test-firebase-id'
            const existingUser: User = {
                email: 'test@example.com',
                id: 1,
            } as User
            fireBaseRepositoryStub.getUserByFireBaseId = stub().returns(existingUser)

            const result = await fireBaseService.getUserByFireBaseId(fireBaseUserId)

            expect(result).to.equal(existingUser)
        })

        it('should return null if the user does not exist', async () => {
            const fireBaseUserId = 'test-firebase-id'
            const existingUser = null
            fireBaseRepositoryStub.getUserByFireBaseId = stub().returns(existingUser)

            const result = await fireBaseService.getUserByFireBaseId(fireBaseUserId)

            expect(result).to.be.null
        })

        it('should throw an error if an error is thrown when getting the user', async () => {
            const fireBaseUserId = 'test-firebase-id'
            const errorMessage = 'Error getting user'
            fireBaseRepositoryStub.getUserByFireBaseId = stub().throws(new Error(errorMessage))

            try {
                await fireBaseService.getUserByFireBaseId(fireBaseUserId)
                expect.fail('Expected an error to be thrown')
            } catch ({message}) {
                expect(message).to.equal(errorMessage)
            }
        })
    })
})
