let textInput = document.getElementById('input-text');
let divInput = document.getElementById('input-div');
let saveInput = document.getElementById('save-input');
let newTasks = document.getElementById('new-tasks'); //ცვლადში შევინახეთ ul
let arrInput =  [];
let timer;

textInput.addEventListener('keypress', event => {
    if(event.key == 'Enter' && textInput.value !== ""){
        addInput(textInput.value); //ფუნქციას ტექსტის სახით გადაეცემა ახალი ინფუთის ველიუ
        textInput.value = "";
    }
})

function addInput(text) { //ფუნქციას გადაეცემა ტექსტი
    const input = document.createElement('input');
    const li = document.createElement ('li');
    const span = document.createElement('span');
    input.type = "checkbox";
    newTasks.appendChild(li);
    li.appendChild(input);
    li.appendChild(span);
    span.textContent = text;
    const newTask = {
        id: Date.now(), 
        Text: span.textContent, 
        completed: false, 
        timer: null
    };
    arrInput.push(newTask);
    input.dataset.id = newTask.id;
}

newTasks.addEventListener('click', event => {  
    if(event.target.tagName=='INPUT'){
        //ცვადში შევინახეთ ფუნქცია, გადავეცით არსებული ევენთის აიდი და აბრუნბეს მაისივის ობიექტს 
        let currentTask = findTask(event.target.dataset.id);    
        if(event.target.checked){ // თუ ინფუთი მონიშნულია
            timer = setTimeout(() => {
                inputSave(event.target); //ფუნქცის გადავეცით ინფუთი event.target ის საშუალებით
            }, 4000);  

            currentTask.timer=timer; //
        }else{
            if(currentTask.timer) {
                clearTimeout(currentTask.timer);
                currentTask.timer=null;
            }            
        }              
   }
})

function findTask(id) {
    for(let i=0; i<arrInput.length; i++){
        if(id == arrInput[i].id){
            return arrInput[i];
        }
    } 
}

function removeTask(id) {
    let a=[];
    for(let i=0; i<arrInput.length; i++){
        if(arrInput[i].id !== id){            
            a.push(arrInput[i]);            
        }
    }
    arrInput = a;
    console.log(arrInput);
}

function inputSave(input){
    //ul დავუმატე ზედა ინფუთის მშობელი, ანუ li. ზემოთ ავტომატურად იშლება (ხდება გადაადგილება)
    saveInput.appendChild(input.parentElement); 
    input.remove(); //დავტოვე მხოლოდ span-ი
    const currentTask = findTask(input.dataset.id); //ეს ფუნქცია გვიბრუნებს ობიექტს
    currentTask.completed = true; //დაბრუნებულ ობიექტში completed ვანიჭებთ true
    setTimeout(() => {
        saveInput.firstChild.remove();
        removeTask(currentTask.id);
    }, 2000);   
}