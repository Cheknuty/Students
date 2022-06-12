const elStack = document.querySelector("#students-table-body")
const elTemplate = document.querySelector("#student-template")
const count = document.querySelector(".count")
const averageMark = document.querySelector(".avmark")
//Create
const createForm = document.querySelector("#add-form")
const createBtn = document.querySelector(".btnCreate")
const createName = document.querySelector("#name")
const createLastname = document.querySelector("#lastname")
const createMark = document.querySelector("#mark")
//Search
const searchForm = document.querySelector(".filter")
const searchName = document.querySelector("#search")
const searchMarkFrom = document.querySelector("#from")
const searchMarkTo = document.querySelector("#to")
const searchSelect = document.querySelector("#sortby")
//Edit
const editForm = document.querySelector("#edit-form")
const editName = document.querySelector("#edit-name")
const editLastname = document.querySelector("#edit-lastname")
const editMark = document.querySelector("#edit-mark")
const editBtn = document.querySelector(".editBtn")
function renderList(arr, element) {
    element.innerHTML = null
    arr.forEach((item, index) => {
        const template = elTemplate.cloneNode(true).content
        template.querySelector(".student-id").textContent = item.id
        template.querySelector(".student-name").textContent = item.name + " " + item.lastName
        template.querySelector(".student-marked-date").textContent = item.markedDate.split("T")[0]
        template.querySelector(".student-mark").textContent = Math.ceil(item.mark/150*100)+"%"
        template.querySelector(".student-row").setAttribute("data-id",index )
        if(item.mark>=60) {
            template.querySelector(".student-pass-status").className = "badge rounded-pill student-pass-status bg-success"
            template.querySelector(".student-pass-status").textContent = "pass"
        }
        else {
            template.querySelector(".student-pass-status").className = "badge rounded-pill student-pass-status bg-danger"
            template.querySelector(".student-pass-status").textContent = "fail"
        }
        const newArray = []
        students.forEach(item => {
            newArray.push(item.mark)
        })
        if(students.length != 0) {
            averageMark.textContent = `Average mark: ${Math.ceil(Math.max(...newArray)/150*100)}%`
        }

        else if (students.length == 0){
            averageMark.textContent = `Average mark: 0%`
        }
        count.textContent = `Count: ${students.length}`
        element.append(template)
    });
}
function createData(event) {
    event.preventDefault()
    const today = new Date()
    students.push(
        {
            id: students[students.length - 1].id+1,
            name: createName.value,
            lastName: createLastname.value,
            mark: createMark.value,
            markedDate: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
        }
    )
    renderList(students, elStack)
    createForm.reset()
}
function filter(event) {
    event.preventDefault()
    const filterArray = []
    const regex = new RegExp(searchName.value, "gi")
    if(searchName.value.trim() != "" && searchMarkFrom.value.trim()  != "" && searchMarkFrom.value.trim() != "") {
        students.forEach((item) => {
            if (`${item.name} ${item.lastName}`.match(regex) != null) {
                if (item.mark >= searchMarkFrom.value && item.mark <= searchMarkTo.value) {
                    filterArray.push(item)
                }
            }
        })
    }
    else if (searchName.value.trim() != "" && searchMarkFrom.value.trim()  == "" && searchMarkFrom.value.trim() == "") {
        students.forEach((item) => {
            if (`${item.name} ${item.lastName}`.match(regex) != null) {
                filterArray.push(item)
            }
        })
    }
    else if (searchName.value.trim() == "" && searchMarkFrom.value.trim()  != "" && searchMarkFrom.value.trim() != "") {
        students.forEach((item) => {
            if (item.mark >= searchMarkFrom.value && item.mark <= searchMarkTo.value) {
                filterArray.push(item)
                console.log(searchMarkFrom.value," ", searchMarkTo.value);
            }
        })
    }
    else {
        renderList(students, elStack)
        return
    }
    renderList(filterArray, elStack)
    searchForm.reset()
}

function deleteOrEditData(event) {
    event.preventDefault()
    index = event.target.closest(".student-row").dataset.id
    if(event.target.matches(".student-delete")) {
        students.splice(index,1)
        renderList(students,elStack)
        if(students.length != 0) {
            averageMark.textContent = `Average mark: ${Math.ceil(Math.max(...newArray)/150*100)}%`
        }

        else if (students.length == 0){
            averageMark.textContent = `Average mark: 0%`
        }
        count.textContent = `Count: ${students.length}`
    }
    else if(event.target.matches(".student-edit")) {
        editForm.addEventListener("submit", (event) => {
            event.preventDefault()
            students.splice(index, 1, {
                id: students[index].id,
                name: editName.value,
                lastName: editLastname.value,
                mark: editMark.value,
                markedDate: students[index].markedDate
            })
            renderList(students, elStack)
        })
    }
}
renderList(students, elStack)
createBtn.addEventListener("click", createData)
searchForm.addEventListener("submit", filter)
elStack.addEventListener("click", deleteOrEditData)
var myArray = [1, 5, 6, 2, 3];
var m = Math.min(...myArray);
console.log(m)