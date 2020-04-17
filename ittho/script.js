const STORAGE_KEY="todo-APP";
let todoStorage = {
    fetch: function(){
        let todos=JSON.parse(localStorage.getItem(STORAGE_KEY)|| "[]");
        return todos;
    },
    save: function(todos){
        localStorage.setItem(STORAGE_KEY,JSON.stringify(todos));
    }
};


function Todo(name) {
    this.name = name;
    this.completed = false;
    this.editing = false;
}

var app = new Vue({
    el: '#todoapp',
    data: {
        message: 'Hello Vue!',
        //todoCollection: [
        // 'Todo 1',
        //'Todo 2',
        //'Todo 3',
        //'Todo 4',
        // 'Todo 5'
        //  ]
       // todoCollection: [
          //  new Todo('Todo 1'),
          //  new Todo('Todo 2'),
          //  new Todo('Todo 3'),
          //  new Todo('Todo 4'),
          //  new Todo('Todo 5')
        //],
        todoCollection: todoStorage.fetch(),


        newTodoName:'',
        editingTodoName:'',
        filter:'all'
    },
    methods: {
        // függvények helye
        onEnterAddTodo: function(){
            if(!this.newTodoName){
                return;
            }
            this.todoCollection.push(new Todo(this.newTodoName));
            this.newTodoName="";
        },
        onDbClickTodoName: function(todo){
            if ( todo.completed){
                return;
            }
            this.editingTodoName=todo.name;
            todo.editing=true;
    },
    onEnterTodoName: function(todo){
        todo.name=this.editingTodoName;
        todo.editing=false;
    },
    computed: {
        counter: function(){
            return this.todoCollection.length;
        }
    },
    watch: {
        todoCollection: {
            hander: function(todoCollection){
                todoStorage.save(todoCollection);
            },
            deep:true
        }
    }
})