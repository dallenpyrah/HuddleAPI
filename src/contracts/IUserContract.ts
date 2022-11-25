export default interface IUserContract {
  email: string
  password: string
  confirmPassword: string | ''
  fullName: string | ''
}
