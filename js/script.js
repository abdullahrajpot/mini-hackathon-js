const getInputFieldValue = (id) =>{
    return document.getElementById(id).value;
    
}

const randomId = () =>{
     let randomId ="";
    let limit = 8
    let possibleId="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    for(let i=0;i<=limit;i++){
        let randomNumber =Math.random()
        randomId += possibleId.charAt(Math.floor(randomNumber * possibleId.length))

    }
    return randomId
    
    
    
}

let users = []


// register function
const register = () =>{
    event.preventDefault();
   
    let email= getInputFieldValue("email")
    let password= getInputFieldValue("password")
    if(email.length < 3){
        notify("Enter correct Email ","error")
        return
    }
     if(password.length < 6){
        notify("Enter correct Password","error")
        return
    }
    let user = {email,password ,id: randomId(), status:"active",createdAt:new Date()}

    let userFound = users.find(item => item.email === user.email )




    // else 
    if(userFound){
        notify("User already Exsit","error")
        return
    }
    else{
        users.push(user)
        notify("User Registered Successfully","success")
        document.getElementById("LoginCard").style.display="block"
        document.getElementById("RegisterCard").style.display="none"
        document.getElementById("handelLoginPage").style.display="block"
        document.getElementById("handelRegisterPage").style.display="none"
        return
        
    }
}


// login function
const login = () =>{
    event.preventDefault();
   
    let email= getInputFieldValue("email1")
    let password= getInputFieldValue("password1")
    let user = {email,password}
    let userFound= users.find(item =>item.email === user.email )


    if(email.length<3){
        notify("Enter correct Email ","error")
        return
    }
    else if(password.length<6){
        notify("Enter correct Password","error")
        return
    }


    // else 
    if(!userFound){
        notify("User not Registered","error")
        document.getElementById("LoginCard").style.display="none"
        document.getElementById("RegisterCard").style.display="block"
        document.getElementById("handelLoginPage").style.display="none"
        document.getElementById("handelRegisterPage").style.display="block"

        return
    }
    else{
        
        notify("Login Successfully","success")
        document.getElementById("LoginCard").style.display="none"
        document.getElementById("RegisterCard").style.display="none"
        document.getElementById("handelLoginPage").style.display="none"
        document.getElementById("handelRegisterPage").style.display="none"
        document.getElementById("handelLogoutPage").style.display="block"
        document.getElementById("HomePage").style.display="block"
        document.getElementById("loginnav").innerHTML= "WellCome! " + email
        return
        
    }
}




// todos
let todos=[]

// create
const create =() =>{
    event.preventDefault()
    let title=getInputFieldValue("title")
    let description= getInputFieldValue("description")
    let date = getInputFieldValue("date")
    
    let userData= {title, description, date, id:randomId(), status:"Incompete",createdAt:new Date(), userId:""}
    let isTodoExists = todos.find(item => item.title === userData.title)

    if (isTodoExists) {
        return notify("Tasks Already exists!", "error")
    } else {
        todos.push(userData)
        return notify("Task added successfully!", "success")
    }
    
}

const readData = ()  => {
    console.log(todos)
}

const update = () => {
    let index = parseInt(prompt("Enter the index of the todo to update (starting from 1):")) - 1;
    if (index >= 0 && index < todos.length) {
        todos[index].status = "Completed";
        notify("Todo updated", "success");
    } else {
        notify("Invalid index", "error");
    }
};

const deleted = () => {
    let index = parseInt(prompt("Enter the index of the todo to delete (starting from 1):")) - 1;
    if (index >= 0 && index < todos.length) {
        todos.splice(index, 1);
        notify("Todo deleted", "success");
    } else {
        notify("Invalid index", "error");
    }
};

const showTable =() =>{
    let tableStart= '<div class="table-responsive"><table class="table table-striped-columns border border-dark"> '
    let tableEnd=' </table></div>'
    let tableHead ='<thead><tr><th scope="col">#</th><th scope="col">Title</th><th scope="col">Description</th><th scope="col">Date</th><th scope="col">Status</th><th scope="col">Id</th></tr></thead>'
let tableBody=""
    for(let i=0 ;i<todos.length; i++){
tableBody +=  '<tbody><tr><th scope="row">'+(i + 1) +'</th><td>'+ todos[i].title +'</td><td>'+ todos[i].description +'</td><td>'+ todos[i].date +'</td><td>' + todos[i].status + '</td><td>' + randomId() + '</td></tr></tbody>' 
    }
    let table= tableStart + tableHead + tableBody + tableEnd;
    document.getElementById("table").innerHTML=table

}

window.onload = () =>{
    let year= new Date().getFullYear();
    document.getElementById("year").innerHTML=year
}



const handelRegister = () =>{
    document.getElementById("LoginCard").style.display="none"
        document.getElementById("RegisterCard").style.display="block"
        document.getElementById("handelLoginPage").style.display="none"
        document.getElementById("handelRegisterPage").style.display="block"
        document.getElementById("handelLogoutPage").style.display="none"
        document.getElementById("HomePage").style.display="none"
        document.getElementById("loginnav").style.display="none"
}
const handelLogin = () =>{
    document.getElementById("LoginCard").style.display="block"
        document.getElementById("RegisterCard").style.display="none"
        document.getElementById("handelLoginPage").style.display="block"
        document.getElementById("handelRegisterPage").style.display="none"
        document.getElementById("handelLogoutPage").style.display="none"
        document.getElementById("HomePage").style.display="none"
        document.getElementById("loginnav").style.display="none"
}



// to notify
const notify = (text,type) =>{
    let color;
    switch(type){
        case "success":
            color="green"
            break;
            case "error":
            color="red"
            break;
            default:
                color="black"
                break;
    }

    Toastify({
        text: text,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: color,
        },
        onClick: function(){} // Callback after click
      }).showToast();
}