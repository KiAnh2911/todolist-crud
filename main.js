let btnAddTask = document.querySelector("button")
let taskName = document.querySelector("#content")

let tasks = getTaskLocal()
renderTask(tasks)

btnAddTask.addEventListener('click',function(){
    if(!taskName.value){
        alert('vui lòng nhập tên công việc')
        return false
    }
    let taskId = this.getAttribute('id')
    
    let tasks = getTaskLocal()
    let task = { name: taskName.value }
    if(taskId == 0 || taskId){
        tasks[taskId] = task
        this.removeAttribute('id')
    }else{
        tasks.push(task)
    }
    taskName.value = ''

    localStorage.setItem('tasks', JSON.stringify(tasks))

    renderTask(tasks)
})

function renderTask( tasks = []){
    let content ='<ul>'

    tasks.forEach((task,index) => {
        content +=`<li>
            <div class="task-name">${task.name}</div>
            <div class="crud">
                <a href="#" class="btn-up" onclick="editTask(${index})">Sửa</a>
                <a href="#" class="btn-dl" onclick="deleteTask(${index})">Xóa</a>

            </div>
        </li>`
    })
    content += "</ul>"
    document.querySelector("#result").innerHTML = content
}

function editTask(id){
    let tasks = getTaskLocal()
    if(tasks.length > 0){
        taskName.value = tasks[id].name
        btnAddTask.setAttribute('id', id)
    }
}
function deleteTask(id){
    if(confirm("bạn có muốn xóa không?")) {
        let tasks = getTaskLocal()
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTask(getTaskLocal())
    }
}
function getTaskLocal(){
   return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}