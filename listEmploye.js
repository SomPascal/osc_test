import EmployeStorage from "./services/employeStorage.js";

export default function listEmploye()
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