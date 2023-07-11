
onload = () => {
    let user = JSON.parse(localStorage.getItem('user'));
   
    if (!user) {
        window.location.href = '/login.html'
    }
    document.getElementById('user').innerHTML = "Hi, " + user.username;


    let activeDiv = localStorage.getItem('activeDiv')
    document.querySelectorAll('#main-div > section').forEach(div=> div.classList.add('hidden'))
    if(activeDiv){
        document.getElementById(activeDiv).classList.remove('hidden')
        }else{
            document.getElementById('main').classList.remove('hidden')

    }

}

document.getElementById('menu-btn').addEventListener('click',()=>{
    document.getElementById('menu-item').classList.toggle('hidden')
})

document.getElementById('logout').addEventListener('click',()=>{
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    window.location.href = '/login.html'
})

document.getElementById('back').addEventListener('click',()=>{
    document.getElementById('main').classList.remove('hidden')
    document.getElementById('start-quiz').classList.add('hidden')
    localStorage.setItem('activeDiv','main')
})

document.getElementById('start').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('main').classList.add('hidden')
    document.getElementById('start-quiz').classList.remove('hidden')
    localStorage.setItem('activeDiv','start-quiz')
   
    
})
document.getElementById('generate-quiz').addEventListener('click',(e)=>{
    e.preventDefault()
    const category = document.getElementsByName('category')[0].value
    const difficulty = document.getElementsByName('difficulty')[0].value
    let type = 'any'
    document.getElementsByName('type').forEach((t)=> t.checked && (type=t.value))
    
    let url = `quiz.html?type=${type}`
    if(category !== 'any'){
        url += `&category=${category}`
    }
    if(difficulty !== 'any'){
        url+= `&difficulty=${difficulty}`
    }
    
    window.location.href = url
})

const links = document.querySelectorAll('#menu-item a').forEach(tag=>{
    tag.addEventListener('click',()=>{
        localStorage.removeItem('activePanel')
        localStorage.removeItem('activeDiv')
    })
})
