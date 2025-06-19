export default class Employee
{
    constructor ({name, surname, email, job}){
        this.name = name
        this.surname = surname
        this.email = email
        this.job = job
        this.id = Math.random().toString(15).slice(2)
    }
}