console.log('dsvsdbsdb')
window.onload = function () {
    let newtask = document.getElementById('newtask')
    let addbtn = document.getElementById('addbtn')
    let clearbtn = document.getElementById('clearbtn')
    let sortbtn = document.getElementById('sortbtn')
    let donebtn = document.getElementById('donebtn')
    let deletebtn = document.getElementById('deletebtn')
    let deleteallbtn = document.getElementById('deleteallbtn')
    let newlist = document.getElementById('newlist')

    let tasks = []
    if (localStorage.list) {
        tasks = JSON.parse(localStorage.list)
    }
    function refreshList() {
        localStorage.list = JSON.stringify(tasks)
        newlist.innerText = ''
        for (let i in tasks) {
            let task = tasks[i]
            let val = task.name
            let li = document.createElement('li')
            li.className = "list-group-item"
            let div = document.createElement('div')
            div.className = task.done ? "row done" : "row "
            let span = document.createElement('span')
            span.className = "col my-1 px-2"
            span.innerText = val
            let delbtn = document.createElement('button')
            delbtn.className = "btn btn-danger col-2 mx-2"
            delbtn.innerText = "DELETE"
            let dnbtn = document.createElement('button')
            dnbtn.className = "btn btn-warning col-2 mx-2"
            dnbtn.innerText = !task.done ? "DONE" : "NOT DONE"
            let upbtn = document.createElement('button')
            upbtn.className = "btn btn-secondary col-1 mx-2"
            upbtn.innerText = "UP"
            let downbtn = document.createElement('button')
            downbtn.className = "btn btn-secondary col-1 mx-2"
            downbtn.innerText = "DOWN"
            downbtn.id = "downbtn"+i+""
            dnbtn.onclick = function () {
                task.done = !task.done
                refreshList()
            }
            delbtn.onclick = function () {
                tasks.splice(i, 1)
                refreshList()
            }
            
            upbtn.onclick = function () {

                [tasks[i - 1], tasks[i]] = [tasks[i], tasks[i - 1]]
                refreshList()

            }
            
            downbtn.onclick = function () {
              
                [tasks[i + 1], tasks[i]] = [tasks[i], tasks[i + 1]]
                refreshList()

            }
            div.appendChild(span)
            if (i != 0)
                div.appendChild(upbtn)
            if (!(i == tasks.length - 1))
                div.appendChild(downbtn)
            if (i == 0) {
                downbtn.className = "btn btn-secondary col-2 mx-2"
            }
            if (i == tasks.length - 1) {
                upbtn.className = "btn btn-secondary col-2 mx-2"
            }
            div.appendChild(dnbtn)
            div.appendChild(delbtn)
            li.appendChild(div)
            newlist.appendChild(li)
        }
    }
    refreshList()
    function addTask() {
        tasks.push({
            name: newtask.value,
            done: false
        })
        newtask.value = ""
        refreshList()
    }

    addbtn.onclick = function () {
        addTask()
    }

    newtask.onkeyup = function (ev) {
        if (ev.keyCode == '13')
            addTask()
    }

    sortbtn.onclick = function () {
        tasks.sort(function (a, b) {
            return a.done - b.done;
        })
        refreshList()
    }

    clearbtn.onclick = function () {
        tasks = tasks.filter(function (t) {
            return !t.done  //true then copy
        })
        refreshList()
    }

    deleteallbtn.onclick = function () {
        let ans = window.prompt("Are You Sure y/n")
        if (ans == 'y')
            tasks = []
        refreshList()
    }
}
