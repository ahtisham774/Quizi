onload = () => {
    console.log('Document Load')
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        user = JSON.parse(sessionStorage.getItem('user'));
    }
    if (!user) {
        window.location.href = '/login.html'
    }

    // get params
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type')
    const category = urlParams.get('category')
    const difficulty = urlParams.get('difficulty')
    console.log(type, category, difficulty)

    const quiz = JSON.parse(localStorage.getItem('quiz'))
    var quizzes = JSON.parse(localStorage.getItem('quizzes'))
    console.log('quizzes: ',quizzes)
    !quizzes && (quizzes = [])
    console.log('current user quizzes: ',quizzes.filter((q) => q.email == user.email))
    user_quizzes = quizzes.filter((q) => q.email == user.email)
        if(user_quizzes.length === 0){
            user_quizzes = {
                username:JSON.parse(localStorage.getItem('user')).username,
                email: JSON.parse(localStorage.getItem('user')).email,
                quizzes: []
            }
            quizzes.push(user_quizzes)
            localStorage.setItem('quizzes', JSON.stringify(quizzes))
        }
   
    
    if (quiz) {
        console.log(quiz)
        if (quiz.type == type && quiz.category == category && quiz.difficulty == difficulty) {
            console.log('same quiz')
            displayQuiz()

        } else {
            console.log('different quiz')
            fetchQuiz(type, category, difficulty)
        }
    } else {
        console.log('no quiz')
        fetchQuiz(type, category, difficulty)

    }

    // fetchQuiz(type, category, difficulty) 




}



function fetchQuiz(type, category, difficulty) {
    let url = `https://opentdb.com/api.php?amount=10&type=${type}`
    if (category) {
        url += `&category=${category}`
    }
    if (difficulty) {
        url += `&difficulty=${difficulty}`
    }
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.results)
                if (data.results.length > 0) {
                    ans = []
                    for (i = 0; i < data.results.length; i++) {
                        ans.push({
                            q_id: i,
                            selectedAnswer: null

                        })
                    }
                    const quiz = {
                        category: category ? category : 'any',
                        difficulty: difficulty ? difficulty : 'any',
                        type: type,
                        questions: data.results,
                        user_answers:
                            ans,
                        score: 0,
                        date: ''
                    }
                   
                    localStorage.setItem('quiz', JSON.stringify(quiz))
                    displayQuiz()
                }
                else {
                    // window.location.href = '/sorry.html'
                }
            }).catch(err => console.log('error', err))
    }
    catch (err) {
        console.log(err)
    }
}
function displayQuiz() {
    const questions = JSON.parse(localStorage.getItem('quiz')).questions
    const type = JSON.parse(localStorage.getItem('quiz')).type
    console.log(type)

    questions.map((question) => {

        const answers = [...question.incorrect_answers, question.correct_answer]

        const shuffledAnswers = answers.sort(() => Math.random() - 0.5)
        let str = ''

        if (type === 'multiple') {
            str = `
            <div class="flex flex-col gap-3 items-center justify-center w-full  fade-in" id="answers_group">
            <button  q-id = ${questions.indexOf(question)} a-id='${answers.indexOf(shuffledAnswers[0])}' id="answers"class="w-full flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm hover:bg-[var(--primary-light)] hover:text-white focus:outline-none focus:bg-[var(--primary-light)] focus:text-white focus:ring-offset-2 focus:ring-[var(--primary)]">
                            ${shuffledAnswers[0]}
                        </button>
                        <button q-id = ${questions.indexOf(question)} a-id='${answers.indexOf(shuffledAnswers[1])}' id="answers"class="w-full flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm hover:bg-[var(--primary-light)] hover:text-white focus:outline-none focus:bg-[var(--primary-light)] focus:text-white focus:ring-offset-2 focus:ring-[var(--primary)]">
                            ${shuffledAnswers[1]}
                        </button>
                        <button q-id = ${questions.indexOf(question)} a-id='${answers.indexOf(shuffledAnswers[2])}' id="answers"class="w-full flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm hover:bg-[var(--primary-light)] hover:text-white focus:outline-none focus:bg-[var(--primary-light)] focus:text-white  focus:ring-offset-2 focus:ring-[var(--primary)]">
                            ${shuffledAnswers[2]}
                        </button>
                        <button q-id = ${questions.indexOf(question)} a-id='${answers.indexOf(shuffledAnswers[3])}' id="answers"class="w-full flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm hover:bg-[var(--primary-light)] hover:text-white focus:outline-none focus:bg-[var(--primary-light)] focus:text-white bfocus:ring-offset-2 focus:ring-[var(--primary)]">
                            ${shuffledAnswers[3]}
                        </button>
            </div>
                        `
        }
        else {
            str = `
            <div class="flex gap-3 items-center justify-center w-full fade-in" id="answers_group">
            <button  q-id = ${questions.indexOf(question)} a-id='${answers.indexOf(shuffledAnswers[0])}' id="answers"class="flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm hover:bg-[var(--primary-light)] hover:text-white focus:outline-none focus:bg-[var(--primary-light)] focus:text-white focus:ring-offset-2 focus:ring-[var(--primary)]">
                            ${shuffledAnswers[0]}
                        </button>
                        <button q-id = ${questions.indexOf(question)} a-id='${answers.indexOf(shuffledAnswers[1])}' id="answers"class="flex items-center justify-center px-4 py-2 text-base font-medium  border border-[var(--primary)]  bg-white text-[var(--primary)] rounded-md shadow-sm hover:bg-[var(--primary-light)] hover:text-white focus:outline-none focus:bg-[var(--primary-light)] focus:text-white focus:ring-offset-2 focus:ring-[var(--primary)]">
                            ${shuffledAnswers[1]}
                        </button>
            </div>     
            `
        }

        const questionDiv = document.createElement('div')
        questionDiv.classList.add('w-full', 'flex', 'flex-col', 'items-center', 'justify-center', 'p-4', 'my-4')
        questionDiv.setAttribute('id',`div-${questions.indexOf(question)}`)
        questionDiv.innerHTML = `
        <div class=" relative flex flex-col items-center justify-center">
            <div class="inline-flex items-center justify-center w-full ">
                <hr class="w-64 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700">
                <span class="absolute px-1 font-bold text-gray-900 -translate-x-1/5 bg-white dark:bg-gray-800">Question ${questions.indexOf(question) + 1}</span>
            </div>
            <div class="w-full flex flex-col items-center justify-center">
            
                <span class="absolute top-0 sm:top-3 right-8 text-[var(--secondary)]">1/${answers.length}</span>
      
                <h1 class="text-2xl text-center sm:text-start font-medium text-gray
                -900 dark:text-white fade-in">${question.question}</h1>
                <div class="flex flex-col items-center justify-center w-full">
                    <hr class="w-72 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700">
                    <span class="absolute px-1 font-bold text-gray-900 -translate-x-1/5 bg-white dark:bg-gray-800">Select Correct Option</span>
                </div>
                        
                        ${str}
            </div >
        </div >
        `
        document.getElementById('show-quiz').appendChild(questionDiv)

    })
    markAnswers()
    let activePanel = localStorage.getItem('activePanel')

    document.querySelectorAll('#show-quiz > div').forEach((div) => div.classList.add('hidden'))
    
    if (activePanel) {
        console.log(activePanel)
        activePanel === '#div-0' && document.querySelector('#prev').classList.add('hidden')
        activePanel === '#div-9' && (document.querySelector('#next').innerText = 'Submit')
        document.querySelector(`#show-quiz > ${activePanel}`).classList.remove('hidden')
    }
    else {
        
        document.querySelector('#show-quiz > #div-0').classList.remove('hidden')
        localStorage.setItem('activePanel', '#div-0')
        document.querySelector('#prev').classList.add('hidden')
    }
    document.getElementById('buttons').classList.remove('hidden')
    let category = JSON.parse(localStorage.getItem('quiz')).category === 'any' ? 'Random Quiz' : questions[0].category
    let subCategory = null ;
    if(category.includes(':')){
        subCategory = category.split(':')[0]
        category = category.split(':')[1]
    } 
    document.getElementById('quiz_title').innerHTML = `
    <h1 class='text-xl font-black sm:text-4xl'>Title: ${category} ${subCategory  ? `<small class="text-sm">(${subCategory})</small>`:''}</h1>
    `
   
}
function markAnswers() {
    const answers = JSON.parse(localStorage.getItem('quiz')).user_answers
    const options = document.querySelectorAll('#answers')


    for (var i = 0; i < answers.length; i++) {
        var optionIndex = i * 4; // Reset the optionIndex for each answer

        for (var j = 0; j < 4; j++) {
            var option = options[optionIndex + j];
            //  console.log(option.innerText, '===', answers[i].selectedAnswer, answers[i].selectedAnswer === option.innerText);

            if (answers[i].selectedAnswer && answers[i].selectedAnswer === option.innerText) {
                option.classList.remove('bg-white');
                option.classList.add('bg-[var(--primary-light)]', 'text-white');
                // console.log(option);
            }
        }
    }

}


document.getElementById('next').addEventListener('click', () => {

    console.log('next Click')
    if (document.getElementById('next').innerText === 'Submit') {
        console.log('Submitted')
        const quiz_answers = JSON.parse(localStorage.getItem('quiz')).questions
        const u_answers = JSON.parse(localStorage.getItem('quiz')).user_answers
        let score = 0
        console.log(quiz_answers)
        for (let i = 0; i < quiz_answers.length; i++) {
            if (quiz_answers[i].correct_answer === u_answers[i].selectedAnswer) {
                score += 1
            }
        }
        console.log(score)
        let getQuiz = JSON.parse(localStorage.getItem('quiz'))
        getQuiz.score = score
        getQuiz.date = new Date().toLocaleString()
        //get quiz of current user
        let temQuizzes = JSON.parse(localStorage.getItem('quizzes'))
        temQuizzes.map((quiz)=>{
           
            if(quiz.email === JSON.parse(localStorage.getItem('user')).email){
                quiz.quizzes.push(getQuiz)
            }
        })
        
        // temQuizzes.quizzes.push(getQuiz)
        localStorage.setItem('quizzes', JSON.stringify(temQuizzes))
        localStorage.setItem('quiz', JSON.stringify(getQuiz))
        localStorage.removeItem('activePanel')
        window.location.href = '/response.html'
    }
    else {
        const questions = document.querySelectorAll('#show-quiz > div')
       
        //get div with active class
        let active = null
        let activeIndex = -1
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].classList.contains('hidden')) {
                active = questions[i]
                activeIndex = i
                localStorage.setItem('activePanel',`#${questions[i+1].getAttribute('id')}`)
                break
            }
        }
        console.log(activeIndex, questions.length - 1)
        if (activeIndex === 0) {
            document.getElementById('prev').classList.remove('hidden')
        }
        if (activeIndex === questions.length - 2) {
            document.getElementById('next').innerText = 'Submit'
        }
        active.classList.add('hidden')
        questions[activeIndex + 1].classList.remove('hidden')

    }

})
document.getElementById('prev').addEventListener('click', () => {
    const questions = document.querySelectorAll('#show-quiz > div')
    //get div with active class
    document.getElementById('next').innerText = 'Next'
    let active = null
    let activeIndex = -1
    for (let i = 0; i < questions.length; i++) {
        if (!questions[i].classList.contains('hidden')) {
            active = questions[i]
            activeIndex = i
            localStorage.setItem('activePanel',`#${questions[i-1].getAttribute('id')}`)
            break
        }
    }

    if (activeIndex === 1) {
        document.getElementById('prev').classList.add('hidden')
    }
    active.classList.add('hidden')
    questions[activeIndex - 1].classList.remove('hidden')

})
document.querySelector('#show-quiz').addEventListener('click', (e) => {

    if (e.target.closest('button')) {
        const questionNumber = parseInt(e.target.closest("button").getAttribute('q-id'))
        const answer = e.target.closest("button").getAttribute('a-id')
        const quiz = JSON.parse(localStorage.getItem('quiz'))
        const answers = [...quiz.questions[questionNumber].incorrect_answers, quiz.questions[questionNumber].correct_answer]
        let user_answers = quiz.user_answers
        user_answers[questionNumber].selectedAnswer = answers[answer]
        localStorage.setItem('quiz', JSON.stringify(quiz))
        let children;
        document.querySelectorAll('#show-quiz > div').forEach(div => !div.classList.contains('hidden') && (children = div.querySelector('div > div ~ div > #answers_group').children))
        console.log('children:',children)
        for (let i = 0; i < children.length; i++) {
            children[i].classList.remove('bg-[var(--primary-light)]', 'text-white')
            children[i].classList.add('bg-white', 'text-[var(--primary-light)]')
        }
        console.log('target option:',e.target.closest("button"))
        e.target.closest("button").classList.add('bg-[var(--primary-light)]', 'text-white')
        e.target.closest("button").classList.remove('text-[var(--primary-light)]', 'bg-white')

    }


})

  document.getElementById('menu-btn').addEventListener('click',()=>{
    document.getElementById('menu-item').classList.toggle('hidden')
})

document.getElementById('logout').addEventListener('click',()=>{
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    window.location.href = '/login.html'
})

const links = document.querySelectorAll('#menu-item a').forEach(tag=>{
    console.log(tag)
    tag.addEventListener('click',()=>{
        localStorage.removeItem('activePanel')
        localStorage.removeItem('activeDiv')
    })
})