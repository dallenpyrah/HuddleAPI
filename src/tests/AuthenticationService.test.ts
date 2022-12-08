import {expect} from 'chai'
import {stub} from 'sinon'
import IAuthentication from '../interfaces/IAuthentication'
import {User as FireBaseUser} from '@firebase/auth'
import {User} from '@prisma/client'
import AuthenticationService from "../services/AuthenticationService";

describe('AuthenticationService', () => {
    describe('signup', () => {
        let authenticationRepositoryStub: IAuthentication
        let authenticationService: AuthenticationService

        beforeEach(() => {
            authenticationRepositoryStub = {
                getUser: stub(),
                signup: stub(),
            }
            authenticationService = new AuthenticationService(authenticationRepositoryStub)
        })

        it('should return the existing user if one exists', async () => {
            const user: FireBaseUser = {
                email: 'test@example.com',
                uid: 'test-uid',
            } as FireBaseUser
            const existingUser: User = {
                email: 'test@example.com',
                id: 1,
            } as User
            authenticationRepositoryStub.getUser = stub().returns(existingUser)

            const result = await authenticationService.signup(user)

            expect(result).to.equal(existingUser)
        })

        it('should sign up the user if they do not exist', async () => {
            const user: FireBaseUser = {
                email: 'test@example.com',
                uid: 'test-uid',
            } as FireBaseUser
            const existingUser = null
            const signedUpUser: User = {
                email: 'test@example.com',
                id: 1,
            } as User

            authenticationRepositoryStub.getUser = stub().returns(existingUser)
            authenticationRepositoryStub.signup = stub().returns(signedUpUser)

            const result = await authenticationService.signup(user)

            expect(result).to.equal(signedUpUser)
        })

        it('should throw an error if an error is thrown when getting the user', async () => {
            const user: FireBaseUser = {
                email: 'test@example.com',
                uid: 'test-uid',
            } as FireBaseUser
            const errorMessage = 'Error getting user'
            authenticationRepositoryStub.getUser = stub().throws(new Error(errorMessage))

            try {
                await authenticationService.signup(user)
                expect.fail('Expected an error to be thrown')
            } catch ({message}) {
                expect(message).to.equal(errorMessage)
            }
        })

        it('should throw an error if an error is thrown when signing up the user', async () => {
            const user: FireBaseUser = {
                email: 'test@example.com',
                uid: 'test-uid',
            } as FireBaseUser
            const errorMessage = 'Error signing up user'
            authenticationRepositoryStub.getUser = stub().returns(null)
            authenticationRepositoryStub.signup = stub().throws(new Error(errorMessage))

            try {
                await authenticationService.signup(user)
                expect.fail('Expected an error to be thrown')
            } catch ({message}) {
                expect(message).to.equal(errorMessage)
            }
        })
    })
})
