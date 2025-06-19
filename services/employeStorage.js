import constants from "../constants.js";
import Employee from "../entities/Employe.js";

export default class EmployeStorage
{
    constructor()
    {
        
    }

    /**
     * 
     * @param {Object} employe
     * @return {Employee} 
     */
    add({
        name,
        email,
        surname,
        job
    })
    {

        const storedData = JSON.parse(
            window.localStorage.getItem(constants.storageKeys.employes) ?? '[]'
        )

        const employe = new Employee({
            name: name,
            surname: surname,
            email: email,
            job: job
        })

        storedData.push(employe)
        window.localStorage.setItem(
            constants.storageKeys.employes, JSON.stringify(storedData)
        )

        return employe
    }
}