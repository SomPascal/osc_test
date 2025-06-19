export default class Employee
{
    constructor ({name, surname, email, job, id}){
        this.name = name
        this.surname = surname
        this.email = email
        this.job = job
        this.id = id ?? Math.random().toString(15).slice(2)
    }

    fullName()
    {
        return this.name + ' ' + this.surname
    }
}