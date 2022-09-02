class UserContract {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;

    constructor(email: string, password: string, confirmPassword: string = "", fullName: string = "") {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.fullName = fullName;
    }
}

export default UserContract;