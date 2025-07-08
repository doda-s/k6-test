// #######################################################
// #   ATENÇÃO             ATENÇÃO             ATENÇÃO   #
// #######################################################
// 
// NÃO OLHAR O CÓDIGO LIXO QUE EU FIZ AQUI! É APENAS CONCEITUAL XD
// O IMPORTANTE É QUE FUNCIONA

const refreshButton = document.querySelector("#refresh-button")
const createUserButton = document.querySelector("#create-user-button")

const submitUserCreationForm = document.querySelector("#user-create-submit")
const userCreationForm = document.querySelector("#user-creation-form")
const formTextInputs = document.querySelectorAll("form#user-creation-form > section > input")
const formGenderSelector = document.querySelector("#gender-select")
const createUserCancelButton = document.querySelector("#user-create-cancel")

const editUserForm = document.querySelector("#user-edit-form")
const submitUserEdit = document.querySelector("#user-edit-submit")
const cancelUserEdit = document.querySelector("#user-edit-cancel")
const editFormInputs = document.querySelectorAll("#user-edit-form > section > input")
const editFormSelector = document.querySelector("#edit-gender-select")

const refreshTable = () => {
    fetch("http://localhost:8000/forms")
    .then(response => {
        if(!response.ok) {
            throw new Error("Rquest Error.")
        }
        return response.json()
    })
    .then(data => {
        const table = document.querySelector("#users-table")
        const tableHeader = "<tr><th>Nome</th><th>Idade</th><th>Gênero</th><th></th></tr>"
        const controlButtons = '<button class="edit-user-button">Editar</button><button class="delete-user-button">Deletar</button>'
        var tableContent = ""

        data.forEach(element => {
            tableContent += `<tr id="${element.id}"><td>${element.name}</td><td>${element.age}</td><td>${element.gender}</td><td>${controlButtons}</td></tr>`
        });

        table.innerHTML = tableHeader + tableContent

        const deleteUserButtons = document.querySelectorAll(".delete-user-button")
        deleteUserButtons.forEach(button => {
            button.addEventListener('click', () => {
                var userElement = button.parentElement.parentElement
                fetch(`http://localhost:8000/forms/delete/${userElement.id}`, {
                    method: 'DELETE'
                }).then(response => {
                    if (!response.ok) throw new Error("Error to delete user!")
                    refreshTable()
                })
            })
        })

        const editUserButtons = document.querySelectorAll(".edit-user-button")
        editUserButtons.forEach(button => {
            button.addEventListener('click', () => {
                editUserForm.name = button.parentElement.parentElement.id
                editUserForm.style.display = "flex"
            })
        })
    })
}

const resetForm = (type) => {
    if (type === "creation") {
        formTextInputs[0].value = ""
        formTextInputs[1].value = ""
        formGenderSelector.value = "Masculino"
        return
    }

    editFormInputs[0].value = ""
    editFormInputs[1].value = ""
    editFormSelector.value = "Masculino"
}

refreshTable()

createUserButton.addEventListener('click', () => {
    userCreationForm.style.display = "flex"
})

createUserCancelButton.addEventListener('click', () => {
    userCreationForm.style.display = "none"
    resetForm("creation")
})

submitUserCreationForm.addEventListener("click", () => {
    if (!formTextInputs[0].value) {
        alert("É neceesário informar um nome!")
        return
    }
    if (!formTextInputs[1].value) {
        alert("É neceesário informar uma idade!")
        return
    }

    fetch('http://localhost:8000/forms/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": formTextInputs[0].value,
            "age": formTextInputs[1].value,
            "gender": formGenderSelector.value
        })
    })
    .then(response => response.json())
    .then(data => {
        resetForm("creation")
        refreshTable()
    })
})

refreshButton.addEventListener('click', () => {
    refreshTable()
})

submitUserEdit.addEventListener('click', () => {
    fetch(`http://localhost:8000/forms/update/${editUserForm.name}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": editFormInputs[0].value,
            "age": editFormInputs[1].value,
            "gender": editFormSelector.value
        })
    })
    .then(response => response.json())
    .then(data => {
        resetForm()
        refreshTable()
    })
})

cancelUserEdit.addEventListener('click', () => {
    editUserForm.name = ""
    resetForm()
    editUserForm.style.display = "none"
})