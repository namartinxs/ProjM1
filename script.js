const rulesContainer = document.querySelector(".rules-container");
const buttonStart = document.getElementById("comeca-quiz");
const questionsContainer = document.querySelector(".questions-container");
const answersContainer = document.querySelector(".answers-container");
const questionText = document.querySelector(".questions");
const spnQtd = document.querySelector(".spnQtd");
const nextQuestion = document.getElementById("next-question");
const fatherContainer = document.querySelector(".game");
const startPlay = document.querySelector(".startPlay");
const timerDisplay = document.getElementById("timer-display");
const saudacao = document.getElementById("saudacao");

let timer;
let timeLeft = 10;


function userName(){
    
    const startPlayP = document.getElementById("startPlayP");
    const showRulesButton = document.getElementById('showRulesButton');
    let name = prompt("Insira seu nome:");
    let stop = true 
    
    

    while (stop) {
        if (name === null || name.trim() === "") {
            name = prompt("Nome inválido. Por favor, insira seu nome:");
        } else {
            stop = false;
            console.log("Nome válido:", name);
        }
    }
   
    startPlayP.textContent = "Seja bem-vindo(a), " + name + "!";
    showRulesButton.style.display = 'inline-block';
    showRulesButton.addEventListener("click", showRules) 

}   
    

function showRules(){
    
    startPlay.classList.add("hide");
    /* mostra resgras do jogo*/
    fatherContainer.classList.remove("hide")
    rulesContainer.classList.remove("hide");
    saudacao.style.display = 'none'
    buttonStart.style.display = 'inline-block';
    buttonStart.addEventListener("click", startGame);
    nextQuestion.addEventListener("click", displayNextQuestion);
}


/*do array*/ 
let indexPergunta = 0;
function startGame(){
    
    buttonStart.style.display = 'none';
    rulesContainer.classList.add("hide");
    questionsContainer.classList.remove("hide");

    displayNextQuestion()
} 

function displayNextQuestion(){
    resetState()
    /*mostra o timer quando estiver nas perguntas*/
    timerDisplay.style.display = 'inline-block'
    /*apaga o tempo e seta um novo timer*/
    timeLeft = 10;
    timerDisplay.textContent = `Tempo restante: ${timeLeft}s`;
    /*chama a função*/
    startTimer();

    /*contador*/
    spnQtd.innerHTML = `${indexPergunta + 1}/${perguntas.length}`;

    /*verifica se o jogo chegou ao fim*/
    if (perguntas.length==indexPergunta)
       return fimDoJogo();

    questionText.textContent = perguntas[indexPergunta].quest;
    /*para cada uma das respostas do array*/
    perguntas[indexPergunta].resp.forEach(resp => {
        /*um elemento button para cada uma*/
        const respReplace = document.createElement("button");
        respReplace.classList.add("button", "resp");
        respReplace.textContent =resp.option;
        /*resposta correta ou nao*/
        /*verifica se o objeto resp tem a correct ==true*/
        if(resp.correct){
            respReplace.dataset.correct = resp.correct;
        }
        answersContainer.appendChild(respReplace);
        /*sabermos se a certa foi selecionada*/
        respReplace.addEventListener("click", selectAnserw);
    });
}

function resetState(){
    /*remove os filhos*/
    while(answersContainer.firstChild){
        answersContainer.removeChild(answersContainer.firstChild);
    }
    /*esconde o botao se a pergunta nao for selecionada*/
    nextQuestion.style.display = 'none';
   
    /*apaga e seta novo tempo quando muda a pergunta*/
    clearInterval(timer);
}

function startTimer(){
    timer = setInterval(()=> {
        timeLeft --;
        timerDisplay.textContent = `Tempo restante: ${timeLeft}s`

        if (timeLeft === 0){
            clearInterval(timer);
            reStart()/*começar o jogo se o tempo acabar*/

        }
    },1000);
}

function selectAnserw(event){
    /*salva qual foi clicado*/
    const answersClicked = event.target;
    /*verifica se o dataset é igual a true*/
    let isCorrect = answersClicked.dataset.correct;

    document.querySelectorAll(".resp").forEach(button=>{
        if(button.dataset.correct){
            clearInterval(timer);
            button.classList.add("correct");
        }else{
            button.classList.add("incorrect");
            
        }
        button.disabled = true;
    });

    if(isCorrect){
        nextQuestion.style.display = 'inline-block';
     
        indexPergunta++;
    }else{
        
        reStart();
    }
    
   
}

function fimDoJogo(){
    clearInterval(timer);
    timerDisplay.style.display = 'none'
    questionsContainer.innerHTML =
    `
        <p>
            Parabéns você acertou todas as perguntas do jogo.
        </p>
        <button onclick = window.location.reload()>
            Refazer Quiz
        </button>
    `;
}

function reStart(){
    /*esconde o botão em caso de erro ou recomeço*/
    timerDisplay.style.display = 'none'
    document.getElementById("imgSuperior").src ="./Imagens/hulk-bravo.png"
    document.getElementById("imgInferior").src ="./Imagens/hulk-soco.png"
    questionsContainer.innerHTML = 
    `
        <ul class="erro-list">
            <h1>
               Você errou!
            <h2/>
        </ul>
        
        <button onclick = window.location.reload()>
            Recomeçar Quiz
        </button>

    `;

}

/*chama a função do nome ao recarregar a página*/
window.onload = function() {
    userName();
    
    
}
/*const perguntas*/
const perguntas = [
    /*a*/
    {
        quest: "No filme 'Vingadores: Ultimato', lançado em 2019, qual dos seguintes heróis sacrifica sua vida para obter a Joia da Alma?",
        resp: [
            {option: "Thor",correct:false},
            {option: "Hulk",correct:false},
            {option: "Viúva Negra",correct: true},
            {option: "Capitão América",correct:false}

        ]
    }, 
    /*b*/
    {
        quest: "Na obra 'Vingadores: Guerra Infinita', de 2018, qual é o motivo de Thanos coletar as Joias do Infinito?",
        resp:[
            {option: "Criar uma arma para destruir os Vingadores ",correct:false},
            {option: "Aumentar seu poder para se tornar imortal ",correct:false},
            {option: "Restaurar o equilíbrio no universo eliminando metade da vida ",correct: true},
            {option: "Conquistar todos os planetas do sistema solar",correct:false}
        ]
    },
    /*c*/
    {
        quest:"No longa-metragem 'Os Vingadores', lançado em 2012, qual é o principal objetivo de Loki ao chegar à Terra?",
        resp:[
            {option: "Destruir o planeta com a ajuda dos Chitauri",correct:false},
            {option: "Capturar o Homem de Ferro",correct:false},
            {option: "Roubar a tecnologia dos Vingadores ",correct: false},
            {option: "Governar a Terra usando o Tesseract",correct:true}
        ]
    },
    /*d*/
    {
        quest:"Durante o filme 'Vingadores: Ultimato', de 2019, quem empunha o Mjolnir além de Thor durante a batalha final contra Thanos?",
        resp:[
            {option: "Hulk",correct:false},
            {option: "Capitão América",correct:true},
            {option: "Viúva Negra",correct: false},
            {option: "Homem de Ferro",correct:false}
        ]
    }
]
