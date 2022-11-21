//제이쿼리 문법 (요소선택 방법차이)
$(function(){
// 문서객체 (문제 하나당 객체로 지정) //생성자함수 
    function Question(text,choice,answer){
    this.text = text;       //문제의 내용
    this.choice = choice;   //선택한 번호
    this.answer = answer;   //정답 번호
}

//퀴즈 정보 객체 
    function Quiz(questions){
    this.score = 0; //점수
    this.questions = questions; //질문[]
    this.questionIndex = 0; //질문순서
}

    Quiz.prototype.correctAnswer = function(answer){
        return answer == this.questions[this.questionIndex].answer; 
    };

    let questions = [
        new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', '인터넷익스플로러', '구글 크롬', '넷스케이프 네비게이터'], '넷스케이프 네비게이터'),
        new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'XML'], 'CSS'),
        new Question('명령어 기반의 인터페이스를 의미하는 용어는?', ['GUI', 'CLI', 'HUD', 'SI'], 'CLI'),
        new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-variant'], 'font-weight')
    ];
        
    //퀴즈객체 생성
    let quiz = new Quiz(questions);

    function update_quiz(){
        let $question = $('#question');//제목표시 객체정보(=getElementById)
        let idx = quiz.questionIndex +1;

        $question.html('문제'+idx+')'+quiz.questions[quiz.questionIndex].text); //(=innerHTML)

        for(let i=0;i<4;i++){
            let $choice = $('.btn').eq(i);
            $choice.html(quiz.questions[quiz.questionIndex].choice[i]);
        }
        progress();
    }

    function progress(){
        let $progress = $('#progress');
        $progress.html('문제' + (quiz.questionIndex + 1)+ '/' +quiz.questions.length);
    }


    function result(){
        let $quiz = $("#quiz");
        let per = parseInt((quiz.score * 100)/quiz.questions.length);
        let txt =  "<h1>결과</h1>" + "<h2 id='score'> 당신의 점수 : " + quiz.score + "/" +
        quiz.questions.length + '<br><br>' + per + '점</h2>';
        $quiz.html(txt);

        if(per < 60){
            txt += '<h1 style="color:red">좀 더 분발하세요</h2>';
            $quiz.html(txt);
        }else if(per >= 60 && per < 80){
            txt += '<h1 style="color:red">무난한 점수네요</h2>';
            $quiz.html(txt);
        }else if(per >= 80){
            txt += '<h1 style="color:red">훌륭합니다</h2>';
            $quiz.html(txt);
    }
    }

    //즉시실행 함수
    (function(){
        $('.btn').click(function(){
            let answer = $(this).text();

            if(quiz.correctAnswer(answer)){
                alert("정답입니다");
                quiz.score++; 
            }else{
                alert("틀렸습니다.");
            }
            if(quiz.questionIndex < quiz.questions.length -1){
                quiz.questionIndex++;
                update_quiz();
            }else{
                result();
            }
        });
        update_quiz();
    })();


});