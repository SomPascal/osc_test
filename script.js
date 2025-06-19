import addEmploye from "./addEmploye.js"
import listEmploye from "./listEmploye.js"
import EmployeStorage from "./services/employeStorage.js"

document.addEventListener('DOMContentLoaded', ()=> {
    listEmploye()
    addEmploye()
})