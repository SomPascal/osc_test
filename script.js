class Employee
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

class EmployeStorage
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

const constants = {
    storageKeys: {
        employes: 'employes'
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    function listEmploye()
    {
        const employeStorage = new EmployeStorage()
        const employes = employeStorage.getAll()
        const listEmployes = document.querySelector('#list-employes')
        
        if (! listEmployes) {
            return
        }
    
        let employessToAdd = ''
    
        employes.forEach(employe => {
            employessToAdd += `
            <tr id="employe-${employe.id}">
                <td>${employe.fullName()}</td>
                <td>${employe.email}</td>
                <td>${employe.job}</td>
    
                <td>
                  <button class="button-danger">
                    Supprimer
                  </button>
                </td>
            </tr>
            `
        })
    
        listEmployes
        .querySelector('table tbody')
        .innerHTML = employessToAdd
    
        employes.forEach(employe => {        
            const HTMLEmploye = document.querySelector('#employe-' + employe.id)
    
            if (! HTMLEmploye) {
                return
            }
    
            HTMLEmploye.querySelector('button')?.addEventListener('click', (e)=> {
                e.preventDefault()
                employeStorage.remove(employe.id)
    
                alert(employe.name + " suppromé avec succès!")
                HTMLEmploye.remove()
            })
        })
    }

    function addEmploye()
    {
        const mainForm = document.querySelector('#main-form')
        const name = document.querySelector('#name')
        const email = document.querySelector('#email')
        const surname = document.querySelector('#surname')
        const job = document.querySelector('#job')
    
        if (! mainForm) {
            return
        }
    
        const clearForm = ()=> {
            name.value = ''
            surname.value = ''
            email.value = ''
            job.value = ''
        }
    
        mainForm.addEventListener('submit', (e)=> {
            e.preventDefault()
    
            const employeStorage = new EmployeStorage()
    
            if (employeStorage.existByField('email', email.value.trim())) {
                alert('L\'email "' + email.value + '" existes déjà!')
                return
            }
    
            const employe = employeStorage.add({
                name: name.value.trim(),
                email: email.value.trim(),
                surname: surname.value.trim(),
                job: job.value.trim()
            })
            console.log(employe);
            
            clearForm()
            listEmploye()
            alert(employe.name + ' a été ajouté avec succès!')
        })
        
    }

    listEmploye()
    addEmploye()
})