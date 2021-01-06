$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)

    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });

    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        removeToDo($(this).parent());
    });

    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });

});

function removeToDo(todo){
    var clickedID = todo.data('id');
    var deleteURL = '/api/todos/'+ clickedID;
    $.ajax({
        method: 'DELETE',
        url: deleteURL,
    })
    .then(function(data){
        todo.remove()
    })
    .catch(function(err){
        console.log(err)
    })
}

function addTodos(todos){
    // add the todos page here
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $('<li class="task">'+ todo.name + ' <span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
        if(todo.completed){
            newTodo.addClass('done');
        }
        $('.list').append(newTodo);
    
}
function createTodo(){
    //$.post(helpers.post(form.name))
    var usrInput = $('#todoInput').val();
    $.post('/api/todos', {name: usrInput})
    .then(function(newTodo){
        console.log(newTodo);
        $('#todoInput').val('');
        addTodo(newTodo);
        
    })
    .catch(function(err){
        console.log(err);
    })
}

function updateTodo(todo){
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    var updateURL = '/api/todos/'+ todo.data('id');
    $.ajax({
        method: "PUT", 
        url: updateURL,
        data: updateData

    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
    .catch(function(err){
        console.log(err);
    })
}