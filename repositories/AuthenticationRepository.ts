import UserContract from '../contracts/UserContract'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { auth } from '../firebase-config'
import { PrismaClient } from '@prisma/client'

export default class AuthenticationRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
    this.signup = this.signup.bind(this)
    this.login = this.login.bind(this)
  }

  async signup (user: UserContract): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(auth, user.email, user.password)
    } catch (error) {
      throw new Error(error)
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async login (user: UserContract): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, user.email, user.password)
    } catch (error) {
      throw new Error(error)
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
