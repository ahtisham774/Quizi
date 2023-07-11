onload = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = '/login.html'
    }

    const quizzes = JSON.parse(localStorage.getItem('quizzes'))
    let attemptQuizzes = []
    if (quizzes) {
        let current_user_quizzes = quizzes.filter(item => item.email === user.email)[0]
        if(current_user_quizzes){
            const username = current_user_quizzes.username
            const email = current_user_quizzes.email
            attemptQuizzes = current_user_quizzes.quizzes
            const div = document.getElementById('show_quizzes')
            if (email === user.email && attemptQuizzes.length > 0) {
                document.getElementById('username').innerHTML = `
            <h1 class="text-[var(--primary)]  text-2xl sm:text-5xl text-center font-bold transition-all fade-in">Hi, ${username}</h1>
                <h1 class="text-[var(--primary)]  text-md sm:text-4xl text-center font-bold transition-all fade-in">
                    Presenting a comprehensive list of the quizzes you have endeavored</h1>
            `
                displayResult(attemptQuizzes, div)
            }
            else {
                localStorage.removeItem('quiz')
                div.innerHTML = `
            <div class='flex absolute top-1/2 flex-col gap-3 justify-center items-center'>
            <h1 class="text-[var(--primary)]  text-2xl sm:text-5xl text-center font-bold transition-all fade-in">Hi, ${username}</h1>
                <h1 class="text-[var(--primary)]  text-md sm:text-4xl text-center font-bold transition-all fade-in">
                    You have not attempted any quiz yet</h1>
                    <a href="/" id="attempt_quiz" class="inline-block w-full text-center sm:w-auto text-sm px-4 py-2 leading-none border-[var(--primary)]  border rounded-xl hover:bg-[var(--primary)]  hover:text-white hover:border-white transition-all delay-150 text-[var(--primary)]  mt-4 lg:mt-0 text-[var(--primary)] text-md text-center font-bold transition-all fade-in">Attempt Quiz</a>
    
            </div>
                    
            `
            }
        }
        else {
            localStorage.removeItem('quiz')
            document.getElementById('show_quizzes').innerHTML = `
        <div class='flex absolute top-1/2 flex-col gap-3 justify-center items-center'>
        <h1 class="text-[var(--primary)]  text-2xl sm:text-5xl text-center font-bold transition-all fade-in">Hi, ${user.username}</h1>
            <h1 class="text-[var(--primary)]  text-md sm:text-4xl text-center font-bold transition-all fade-in">
                You have not attempted any quiz yet</h1>
                <a href="/" id="attempt_quiz" class="inline-block w-full text-center sm:w-auto text-sm px-4 py-2 leading-none border-[var(--primary)]  border rounded-xl hover:bg-[var(--primary)]  hover:text-white hover:border-white transition-all delay-150 text-[var(--primary)]  mt-4 lg:mt-0 text-[var(--primary)] text-md text-center font-bold transition-all fade-in">Attempt Quiz</a>
    
        </div>
                
        `
        }
        
    }
    else {
        localStorage.removeItem('quiz')
        document.getElementById('show_quizzes').innerHTML = `
    <div class='flex absolute top-1/2 flex-col gap-3 justify-center items-center'>
    <h1 class="text-[var(--primary)]  text-2xl sm:text-5xl text-center font-bold transition-all fade-in">Hi, ${user.username}</h1>
        <h1 class="text-[var(--primary)]  text-md sm:text-4xl text-center font-bold transition-all fade-in">
            You have not attempted any quiz yet</h1>
            <a href="/" id="attempt_quiz" class="inline-block w-full text-center sm:w-auto text-sm px-4 py-2 leading-none border-[var(--primary)]  border rounded-xl hover:bg-[var(--primary)]  hover:text-white hover:border-white transition-all delay-150 text-[var(--primary)]  mt-4 lg:mt-0 text-[var(--primary)] text-md text-center font-bold transition-all fade-in">Attempt Quiz</a>

    </div>
            
    `
    }
    document.querySelectorAll('#quiz').forEach(div => {
        div.addEventListener('click', () => {
            const index = parseInt(div.getAttribute('qz-id'))
            const quiz = attemptQuizzes[index]
            localStorage.setItem('quiz', JSON.stringify(quiz))
            window.location.href = '/result.html'
           
        })
    })
   

}
document.getElementById('attempt_quiz').addEventListener('click', () => {
    localStorage.setItem('activeDiv', 'start-quiz')
})
function displayResult(quizzes, div) {

    quizzes.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
    quizzes.map((quiz) => {
        let date = quiz.date
        let category = quiz.category === 'any' ? 'Random Quiz' : quiz.questions[0].category
        let subCategory = null
        if (category.includes(':')) {
            subCategory = category.split(':')[0]
            category = category.split(':')[1]
        }
        let type = quiz.type === 'multiple' ? "MCQs" : "True/False"
        let difficulty = quiz.difficulty === 'any' ? 'Mix' : quiz.questions[0].difficulty
        difficulty = getDifficultyClass(difficulty)
        const questionDiv = document.createElement('div')
        questionDiv.classList.add('w-full', 'lg:w-7/12', 'relative', 'flex', 'flex-col', 'items-center', 'cursor-pointer', 'justify-center', 'p-4', 'my-4', 'border-2', 'rounded-xl', 'shadow-xl', difficulty)
        questionDiv.setAttribute('id', 'quiz')
        questionDiv.setAttribute('qz-id', quizzes.indexOf(quiz))
        questionDiv.innerHTML = `

        <div class="flex flex-col-reverse  sm:flex-row items-center justify-center h-full w-full">

        <div class="flex flex-col items-center sm:items-start gap-4 justify-between  w-full">
            <h2 class="text-lg sm:text-2xl text-center font-bold text-slate-500">Title: ${category} ${subCategory ? `<small class="text-sm">(${subCategory})</small>` : ''} </h2>
            <h2 class="text-lg sm:text-2xl text-center font-bold text-slate-500">Quiz Type: ${type}</h2>
            <h2 class="text-lg sm:text-2xl text-center font-bold text-slate-500">Total Questions: ${quiz.questions.length}</h2>
        </div>
        <div class="flex flex-col items-center sm:items-end p-6 justify-center h-full w-full">
                
                    <div class="flex items-center justify-center border-2 bg-white rounded-full">
                        <div class="flex gap-2 items-center justify-center w-32 h-32">
                            <span class="text-xl text-center text-[var(--primary)]">${quiz.score}</span>
                            <hr class="bg-gray-900 skew-y-[-60deg] border-1 w-1/12 dark:bg-gray-700">
                             <span class="text-xl text-center text-[var(--primary)]">10</span>
                        </div>
                    </div>
            <h2 class="text-sm absolute top-2 right-5 text-center font-bold text-slate-500">${date}</h2>
        </div>
            
        </div >
        `
        div.appendChild(questionDiv)
    })


}

function getDifficultyClass(difficulty) {
    if (difficulty === 'easy') {
        return 'border-l-green-500'
    }
    else if (difficulty === 'medium') {
        return 'border-l-yellow-500'
    }
    else if (difficulty === 'hard') {
        return 'border-l-red-500'
    }
    else {
        return 'border-l-blue-500'
    }
}

document.getElementById('menu-btn').addEventListener('click', () => {
    document.getElementById('menu-item').classList.toggle('hidden')
})

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = '/login.html'
})
