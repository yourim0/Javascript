//스크립트 문법    
// 문서객체 (문제 하나당 객체로 지정) //생성자함수 
function Question(text,choice,answer){
    this.text = text;       //문제의 내용
    this.choice = choice;   //선택한 번호
    this.answer = answer;   //정답 번호
}

//퀴즈 정보 객체 
function Quiz(questions){ //배열을 받는 매개변수(question매개변수로 받아서 초기화)
    this.score = 0; //점수관리
    this.questions = questions; //질문 (초기화)
    this.questionIndex = 0; //질문순서 (문제 1/4)
    
    //정답 확인하는 기능(함수)
    //프로토 타입으로 정의=즉 여러번 사용될거다
    //문제의 정답을 확인하는 역할 
}
Quiz.prototype.correctAnswer = function(answer){
    return answer == this.questions[this.questionIndex].answer; 
}


let questions = [
    new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', '인터넷익스플로러', '구글 크롬', '넷스케이프 네비게이터'], '넷스케이프 네비게이터'),
    new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'XML'], 'CSS'),
    new Question('명령어 기반의 인터페이스를 의미하는 용어는?', ['GUI', 'CLI', 'HUD', 'SI'], 'CLI'),
    new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-variant'], 'font-weight')
];

//퀴즈객체 생성
let quiz = new Quiz(questions);

//진행 상황에 맞게 문제를 화면에 표시하는 메서드
function update_quiz(){
    let questions = document.getElementById("question");
    //querySelector()은 특정 name, id, class를 제한하지않고 css선택자를 선택하여 배열형태로 가져옴
    let choice = document.querySelectorAll('.btn');
    let idx = quiz.questionIndex + 1;

    //문제출력
    questions.innerHTML= '문제' + idx +')' + quiz.questions[quiz.questionIndex].text;//일반태그는inner html쓰고 폼은 value()

    //보기출력
    for(let i=0;i<4;i++){
        choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
    }
    progress();

} //update_quiz() end

function progress(){
    let progress = document.getElementById("progress");
    progress.innerHTML = '문제' + (quiz.questionIndex + 1) + '/' + quiz.questions.length; //실제 문제의 전체 개수
} //progress() end


//마지막 결과 화면
function result(){
    let quiz_div = document.getElementById('quiz');
    let per = parseInt((quiz.score * 100)/quiz.questions.length); //100분율계산
    
    let txt = "<h1>결과</h1>" + "<h2 id='score'> 당신의 점수 : " + quiz.score + "/" +
    quiz.questions.length + '<br><br>' + per + '점</h2>';
    quiz_div.innerHTML = txt;

    if(per < 60){
        txt += '<h1 style="color:red">좀 더 분발하세요</h2>';
        quiz_div.innerHTML=txt;
    }else if(per >= 60 && per < 80){
        txt += '<h1 style="color:red">무난한 점수네요</h2>';
        quiz_div.innerHTML=txt;
    }else if(per >= 80){
        txt += '<h1 style="color:red">훌륭합니다</h2>';
        quiz_div.innerHTML=txt;
}
}

let btn = document.querySelectorAll('.btn'); //이벤트를 주기위함

//클릭이벤트
function checkAnswer(i){
    btn[i].addEventListener('click',function(){
        let answer = btn[i].innerHTML; //문자값을 가져와라
        if(quiz.correctAnswer(answer)){
            alert("정답입니다.");
            quiz.score++;
        }else{
            alert("틀렸습니다.");
        }
        if(quiz.questionIndex < quiz.questions.length -1){ //마지막 문제가 아니라는 조건 만족시 다음문제로 갱신
            quiz.questionIndex++;
            update_quiz();
        }else{
            result();
        }
    });
}

for(let i = 0;i<btn.length;i++){
    checkAnswer(i);
}


update_quiz();