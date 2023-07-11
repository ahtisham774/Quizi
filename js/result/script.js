onload = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = '/login.html'
    }

    const quiz = JSON.parse(localStorage.getItem('quiz'))
    console.log(quiz)
    if (quiz) {
        console.log('quiz')
        const score = quiz.score;
        const total = 10;
      
        const percent = (score / total) * 100;
        let timer = 0


        var animationInterval = setInterval(()=> {
        
          console.log('Percent',percent)
          document.getElementById('percent').setAttribute('x-data', `{circumference: 50 * 2 * Math.PI, percent: ${timer}}`)
          
 
          if (timer >= percent) {
            clearInterval(animationInterval);
          }
          timer+=1;
        },30); 
        // document.getElementById('percent').setAttribute('x-data', `{circumference: 50 * 2 * Math.PI, percent: ${percent}}`)
        displayResult(quiz, user)
        displayQuestions(quiz)
    } else {
        console.log('no quiz')
        alert('Please attempt Quiz first')
        window.location.href = '/index.html'

    }

    // fetchQuiz(type, category, difficulty) 




}
document.getElementById('info').addEventListener('load', () => {
    console.log('Element Load')
})
function displayResult(quiz, user) {
    let resultDiv = document.getElementById('info')
    let date = quiz.date
    let category = quiz.category === 'any' ? 'Random Quiz' : quiz.questions[0].category
    let subCategory = null
        if(category.includes(':')){
            subCategory = category.split(':')[0]
            category = category.split(':')[1]
        }  
    let type = quiz.type === 'multiple' ? "MCQs" : "True/False"
    let difficulty = quiz.difficulty === 'any' ? 'Mix' : quiz.questions[0].difficulty

    resultDiv.innerHTML = `
                <div class="flex gap-1"><h2  class="font-bold">Name:</h2><span class=" font-bold text-slate-500">${user.username}</span></div>
                <div class="flex gap-1"><h2 class="font-bold">Email:</h2><span class=" font-bold text-slate-500">${user.email}</span></div>
                <div class="flex gap-1"><h2 class="font-bold">Quiz Date:</h2><span class=" font-bold text-slate-500">${date}</span></div>
                <div class="flex flex-wrap gap-1"><h2 class="font-bold">Quiz Category:</h2><span class=" font-bold text-slate-500">${category} ${subCategory  ? `<small class="text-sm">(${subCategory})</small>`:''}</span></div>
                <div class="flex gap-1"><h2 class="font-bold">Quiz Type:</h2><span class=" font-bold text-slate-500">${type}</span></div>
                <div class="flex gap-1"><h2 class="font-bold">Difficulty Level: </h2><h2 class="${difficulty === 'Mix' ? 'text-slate-500' : difficultyClass(difficulty)}">${capitalize(difficulty)}</h2></div>
                <div class="flex gap-1"><h2 class="font-bold">Total Marks:</h2><span class=" font-bold text-slate-500">10</span></div>
                <div class="flex gap-1"><h2 class="font-bold">Obtain Marks:</h2><span class=" font-bold text-slate-500">${quiz.score}</span></div>
    `

    document.getElementById('quiz_info').classList.remove('hidden')

}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
function difficultyClass(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 'text-green-500'
        case 'medium':
            return 'text-yellow-500'
        case 'hard':
            return 'text-red-500'
    }
}


function displayQuestions(quiz) {
    let questions = quiz.questions
    let user_answers = quiz.user_answers
    let questionsDiv = document.getElementById('show_questions')
    questionsDiv.innerHTML = ''
    const type = quiz.type
    console.log(type)

    questions.map((question) => {

        const answers = [...question.incorrect_answers, question.correct_answer]
        let index = questions.indexOf(question)

        let str = ''

        if (type === 'multiple') {
            str = `
            <div class="flex flex-col gap-3 items-start justify-start w-full">
            <div  class="w-full flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm ${checkOption(user_answers[index].selectedAnswer, answers[0], question.correct_answer)}">
                            ${answers[0]}
                        </div>
                        <div class="w-full flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm ${checkOption(user_answers[index].selectedAnswer, answers[1], question.correct_answer)}">
                            ${answers[1]}
                        </div>
                        <div class="w-full flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm ${checkOption(user_answers[index].selectedAnswer, answers[2], question.correct_answer)}">
                            ${answers[2]}
                        </div>
                        <div class="w-full flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm ${checkOption(user_answers[index].selectedAnswer, answers[3], question.correct_answer)}">
                            ${answers[3]}
                        </div>
            </div>
                        `
        }
        else {
            str = `
            <div class="flex gap-3 items-center justify-center w-full">
            <div  class="flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm ${checkOption(user_answers[index].selectedAnswer, answers[0], question.correct_answer)}">
                            ${answers[0]}
                        </div>
                        <div class="flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm ${checkOption(user_answers[index].selectedAnswer, answers[1], question.correct_answer)}">
                            ${answers[1]}
                        </div>
            </div>     
            `
        }

        const questionDiv = document.createElement('div')
        questionDiv.classList.add('w-full', 'relative', 'flex', 'flex-col', 'items-center', 'justify-center', 'p-4', 'my-4', 'border-2', 'rounded-md', 'py-8')
        questionDiv.innerHTML = `
        <div class="flex flex-col items-center justify-center w-full">
            <div class="inline-flex items-center justify-center w-full ">
                <hr class="w-64 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700">
                <span class="absolute px-3 font-bold text-gray-900 -translate-x-1/5 bg-white dark:bg-gray-800">Question ${questions.indexOf(question) + 1}</span>
            </div>
            <div class="w-full flex flex-col items-center justify-center">
                <h1 class="text-lg text-center  text-gray-900 dark:text-white">${question.question}</h1>
                <div class="flex flex-col items-center justify-center w-full">
                    <hr class="w-72 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700">
                    <span class="absolute px-3 font-bold text-gray-900 -translate-x-1/5 bg-white dark:bg-gray-800">Answers</span>
                </div>
                <div class="w-full sm:w-7/12 flex flex-col items-start justify-start ">
                  
                        
                        ${str}
                   
                </div >
            </div>
            <div class="absolute top-3 right-5">
                <span id="status"></span>

            </div>
        </div >
        `
        questionsDiv.appendChild(questionDiv)
        updateStatus(user_answers, questions)

    })



}

function updateStatus(user_answer, questions) {
    
    let status = document.querySelectorAll('#status')
    status.forEach((s,index) =>{
        if (user_answer[index].selectedAnswer === questions[index].correct_answer) {
        s.innerHTML = 'Correct'
        s.classList.add('text-green-300','font-black')
        s.classList.remove('text-red-300')

    }
    else if(user_answer[index].selectedAnswer === null){
        s.innerHTML = 'Not Attempted'
        s.classList.add('text-gray-300','font-black')
        s.classList.remove('text-green-300')
    }
    else {
        s.innerHTML = 'Wrong'
        s.classList.add('text-red-300','font-black')
        s.classList.remove('text-green-300')
    }
    })
}


function checkOption(user_answer, option_answer, correct_answer) {
    let status = document.getElementById('status')
    if (user_answer === correct_answer && option_answer === user_answer) {

        return 'bg-green-300';
    } else if (option_answer === correct_answer && user_answer !== correct_answer) {
        return 'bg-green-300';
    } else if (user_answer === option_answer && user_answer !== correct_answer) {
        return 'bg-red-300';
    } else {
        return 'bg-white';
    }
}
document.getElementById('menu-btn').addEventListener('click',()=>{
    document.getElementById('menu-item').classList.toggle('hidden')
})

document.getElementById('logout').addEventListener('click',()=>{
    localStorage.removeItem('user');
    window.location.href = '/login.html'
})
