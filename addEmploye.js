import listEmploye from "./listEmploye.js"
import EmployeStorage from "./services/employeStorage.js"

export default function addEmploye()
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

        const employe = new EmployeStorage().add({
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