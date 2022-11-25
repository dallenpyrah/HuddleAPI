export default interface UserContract {
    email: string
    password: string
    confirmPassword: string | ''
    fullName: string | ''
}
