// 문서객체 (문제 하나당 객체로 지정)
function Question(text,choice,answer){
    this.text = text;       //문제의 내용
    this.choice = choice;   //선택한 번호
    this.answer = answer;   //정답 번호
}

//퀴즈 정보 객체 
function Quiz(questions){ //배열을 받는 매개변수 
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

}