import constants from "../constants.js";
import Employee from "../entities/Employe.js";

export default class EmployeStorage
{
    constructor()
    {
        
    }

    /**
     * @returns {Array<Employee>}
     */
    getEmployes()
    {
        const rawEmployes = JSON.parse(
            window.localStorage.getItem(constants.storageKeys.employes) ?? '[]'
        )
        const employes = []


        rawEmployes.map(employe => {
            employes.push(new Employee(employe))
        })

        return employes
    }

    /**
     * 
     * @param {String} fieldnName 
     * @param {String} value 
     */
    existByField(fieldName, value)
    {
        let exists = false

        this.getEmployes().forEach(employee => {
            if (employee[fieldName] && employee[fieldName] == value) {
                exists = true
                return
            }
        })
        return exists
    }

    /**
     * @returns {Array<Employee>}
     */
    getAll()
    {
        const rawEmployes = JSON.parse(
            window.localStorage.getItem(constants.storageKeys.employes) ?? '[]'
        )
        const employes = []


        rawEmployes.map(employe => {
            employes.push(new Employee(employe))
        })

        return employes
    }

    remove(id)
    {
        console.log(id);
        
        const storedData = JSON.parse(
            window.localStorage.getItem(constants.storageKeys.employes) ?? '[]'
        )

        console.log(storedData);
        
        window.localStorage.setItem(
            constants.storageKeys.employes, JSON.stringify(
                storedData.filter(employe => employe.id != id)
            )
        )
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