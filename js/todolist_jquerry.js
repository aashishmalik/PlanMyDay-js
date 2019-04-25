$(() => {

    let newtaskvalue = $('#newtask')

    let tasks = []
    if (localStorage.list)
        tasks = JSON.parse(localStorage.list)

    function refreshList() {
        localStorage.list = JSON.stringify(tasks)
        $('#newlist').empty()
        for (let i in tasks) {
            let task = tasks[i]
            console.log(task)
            $('#newlist').attr('class', "list-group")
                .append(
                    $('<li>')
                        .attr('class', "list-group-item")
                        .append($('<div>')
                            .attr('class', task.done ? "row done" : "row ")
                            .append($('<span>')
                                .attr('class', "col my-1 px-2")
                                .text(task.name))

                            .append($('<button>')
                                .attr('class', "btn btn-warning col-2 mx-2")
                                .text(!task.done ? "DONE" : "NOT DONE")
                                .click(function () {
                                    task.done = !task.done
                                    refreshList()
                                }))
                            .append($('<button>')
                                .attr('class', "btn btn-danger col-2 mx-2")
                                .text("DELETE")
                                .click(function () {
                                    tasks.splice(tasks.indexOf(task), 1)
                                    refreshList()
                                })
                            )
                        ))
        }
    }
    refreshList()
    function addTask() {
        tasks.push({
            name: newtaskvalue.val(),
            done: false
        })
        newtaskvalue.val('')
        refreshList()
    }
    $('#addbtn').click(function () {
        addTask()
    })
    $('#newtask').keyup(function (ev) {
        if (ev.keyCode == '13')
            addTask()
    })
    $('#sortbtn').click(function () {
        tasks.sort(function (a, b) {
            return a.done - b.done;
        })
        refreshList()
    })
    $('#clearbtn').click(function () {
        tasks = tasks.filter(function (t) {
            return !t.done  //true then copy
        })
        refreshList()
    })
    $('#deleteallbtn').click(function () {
        let ans = window.prompt("Are You Sure y/n")
        if (ans == 'y')
            tasks = []
        refreshList()
    })
})