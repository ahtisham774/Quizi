

onload = ()=>{
    
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        window.location.href = '/index.html'
    }
   
}

function handleLogin(e){
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    const user = findUser(email)
    if(!user){
        console.log("user not register yet")
        showToast(
            "User not registered yet",
            "error"
        )
    }
    else{
        if(user.password === password){
          
            localStorage.setItem('user', JSON.stringify(user));
          
            showToast(
                "Login Successful",
                "success",
                function(){
                    window.location.href = '/index.html'
                }
            )
            setTimeout(()=>{
                window.location.href = '/index.html'
            },1500)
        }
        else{
            console.log("password incorrect")
            showToast(
                "Password incorrect",
                "error"
            )
        }
    }

}

function handleRegister(e){
    e.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    const user = findUser(email)
    if(user){
        console.log("user already register")
        showToast(
            "User already registered",
            "warning"
           
        )
    }
    else{
        const newUser = {
            username,
            email,
            password
        }
        let users = JSON.parse(localStorage.getItem('users'));
        if(users){
            users.push(newUser);
        }
        else{
            users = [newUser];
        }
        localStorage.setItem('users', JSON.stringify(users));
        showToast(
            "User registered successfully",
            "success",
            function(){
                window.location.href = '/login.html'
            }
        )
        setTimeout(()=>{
            window.location.href = '/login.html'
        }
        ,1500)
        
}
}

function findUser(email){
    const users = JSON.parse(localStorage.getItem('users'));
    let user = null;
    for(let i = 0; i < users?.length; i++){
        if(users[i].email === email){
            user = users[i];
            break;
        }
    }
    return user
}

function showToast(message,type,callback=function(){}){
    Toastify({
        text: message,
        duration: 1000,
        className:type+ ' toast',
        close: true,
        callback:callback,
        
      }).showToast();
}