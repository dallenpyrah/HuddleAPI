// import sinon = require('sinon')
// import AuthenticationService from '../services/AuthenticationService'
// import AuthenticationRepository from '../repositories/AuthenticationRepository'
// import { PrismaClient } from '@prisma/client'
// import IUserContract from '../contracts/IUserContract'
// import { expect } from 'chai'

// describe('AuthenticationService Tests', () => {
//   describe('signup tests', () => {
//     it('should throw an error if email is empty', async () => {
//       const user = new IUserContract('', 'password', 'password', 'fullName')
//
//       const prisma = new PrismaClient()
//       const authenticationRepository = new AuthenticationRepository(prisma)
//       const mockAuthenticationRepository = sinon.mock(authenticationRepository)
//       mockAuthenticationRepository.expects('signup').never()
//       const { signup } = new AuthenticationService(authenticationRepository)
//
//       const expectedResult = new Error('All fields are required')
//
//       try {
//         await signup(user)
//       } catch (error) {
//         expect(error).to.be.an.instanceOf(Error)
//         expect(error.message).to.equal(expectedResult.message)
//       }
//     })
//
//     it('should throw an error if password is empty', async () => {
//       const user = new IUserContract('email', '', 'password', 'fullName')
//
//       const prisma = new PrismaClient()
//       const authenticationRepository = new AuthenticationRepository(prisma)
//       const mockAuthenticationRepository = sinon.mock(authenticationRepository)
//       mockAuthenticationRepository.expects('signup').never()
//       const { signup } = new AuthenticationService(authenticationRepository)
//
//       const expectedResult = new Error('All fields are required')
//
//       try {
//         await signup(user)
//       } catch (error) {
//         expect(error).to.be.an.instanceOf(Error)
//         expect(error.message).to.equal(expectedResult.message)
//       }
//     })
//
//     it('should throw an error if confirm password is empty', async () => {
//       const user = new IUserContract('email', 'password', '', 'fullName')
//
//       const prisma = new PrismaClient()
//       const authenticationRepository = new AuthenticationRepository(prisma)
//       const mockAuthenticationRepository = sinon.mock(authenticationRepository)
//       mockAuthenticationRepository.expects('signup').never()
//       const { signup } = new AuthenticationService(authenticationRepository)
//
//       const expectedResult = new Error('All fields are required')
//
//       try {
//         await signup(user)
//       } catch (error) {
//         expect(error).to.be.an.instanceOf(Error)
//         expect(error.message).to.equal(expectedResult.message)
//       }
//     })
//
//     it('should throw an error if full name is empty', async () => {
//       const user = new IUserContract('email', 'password', 'password', '')
//
//       const prisma = new PrismaClient()
//       const authenticationRepository = new AuthenticationRepository(prisma)
//       const mockAuthenticationRepository = sinon.mock(authenticationRepository)
//       mockAuthenticationRepository.expects('signup').never()
//       const { signup } = new AuthenticationService(authenticationRepository)
//
//       const expectedResult = new Error('All fields are required')
//
//       try {
//         await signup(user)
//       } catch (error) {
//         expect(error).to.be.an.instanceOf(Error)
//         expect(error.message).to.equal(expectedResult.message)
//       }
//     })
//
//     it('should throw an error if passwords do not match', async () => {
//       const user = new IUserContract('email', 'password', 'password2', 'fullName')
//
//       const prisma = new PrismaClient()
//       const authenticationRepository = new AuthenticationRepository(prisma)
//       const mockAuthenticationRepository = sinon.mock(authenticationRepository)
//       mockAuthenticationRepository.expects('signup').never()
//       const { signup } = new AuthenticationService(authenticationRepository)
//
//       const expectedResult = new Error('Passwords do not match')
//
//       try {
//         await signup(user)
//       } catch (error) {
//         expect(error).to.be.an.instanceOf(Error)
//         expect(error.message).to.equal(expectedResult.message)
//       }
//     })
//
//     it('should call signup method from AuthenticationRepository', async () => {
//       const user = new IUserContract('email', 'password', 'password', 'fullName')
//
//       const prisma = new PrismaClient()
//       const authenticationRepository = new AuthenticationRepository(prisma)
//       const mockAuthenticationRepository = sinon.mock(authenticationRepository)
//       mockAuthenticationRepository.expects('signup').once()
//       const { signup } = new AuthenticationService(authenticationRepository)
//
//       await signup(user)
//
//       mockAuthenticationRepository.verify()
//     })
//   })
// })
