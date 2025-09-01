import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';

interface QuizQuestion {
  question: string;
  answers: string[];
  correct: number;
}

@Component({
  selector: 'app-quiz',
  imports: [
      CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatRippleModule
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {

  quizData: QuizQuestion[] = [
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      answers: [
        "var myVariable;",
        "variable myVariable;",
        "v myVariable;",
        "declare myVariable;"
      ],
      correct: 0
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      answers: [
        "append()",
        "push()",
        "add()",
        "insert()"
      ],
      correct: 1
    },
    {
      question: "What does '===' operator do in JavaScript?",
      answers: [
        "Checks only value equality",
        "Checks only type equality", 
        "Checks both value and type equality",
        "Assigns a value"
      ],
      correct: 2
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      answers: [
        "undefined",
        "boolean",
        "float",
        "string"
      ],
      correct: 2
    },
    {
      question: "How do you create a function in JavaScript?",
      answers: [
        "function = myFunction() {}",
        "create myFunction() {}",
        "function myFunction() {}",
        "def myFunction() {}"
      ],
      correct: 2
    }
  ];

  currentQuestion = 0;
  score = 0;
  selectedAnswer: number | null = null;
  answered = false;
  showResults = false;
  showFeedback = false;
  feedbackMessage = '';
  isLastAnswerCorrect = false;
  resultsMessage = '';

  ngOnInit() {
    this.initQuiz();
  }

  get progressValue(): number {
    return ((this.currentQuestion + 1) / this.quizData.length) * 100;
  }

  getCurrentQuestion(): QuizQuestion | undefined {
    return this.quizData[this.currentQuestion];
  }

  initQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.answered = false;
    this.showResults = false;
    this.showFeedback = false;
    this.feedbackMessage = '';
  }

  selectAnswer(index: number) {
    if (this.answered) return;
    this.selectedAnswer = index;
  }

  nextQuestion() {
    this.checkAnswer();
    
    setTimeout(() => {
      if (this.currentQuestion < this.quizData.length - 1) {
        this.currentQuestion++;
        this.resetForNextQuestion();
      } else {
        this.showQuizResults();
      }
    }, 1500);
  }

  private checkAnswer() {
    if (this.selectedAnswer === null || this.answered) return;
    
    this.answered = true;
    const correct = this.getCurrentQuestion()?.correct ?? -1;
    this.isLastAnswerCorrect = this.selectedAnswer === correct;
    
    if (this.isLastAnswerCorrect) {
      this.score++;
      this.feedbackMessage = '✓ Correct! Well done!';
    } else {
      const correctAnswer = this.getCurrentQuestion()?.answers[correct];
      this.feedbackMessage = `✗ Incorrect. The correct answer was: ${correctAnswer}`;
    }
    
    this.showFeedback = true;
  }

  private resetForNextQuestion() {
    this.selectedAnswer = null;
    this.answered = false;
    this.showFeedback = false;
    this.feedbackMessage = '';
  }

  private showQuizResults() {
    this.showResults = true;
    this.generateResultsMessage();
  }

  private generateResultsMessage() {
    const percentage = (this.score / this.quizData.length) * 100;
    
    if (percentage >= 80) {
      this.resultsMessage = "🎉 Excellent! You're a JavaScript expert!";
    } else if (percentage >= 60) {
      this.resultsMessage = "👍 Good job! You have solid JavaScript knowledge.";
    } else if (percentage >= 40) {
      this.resultsMessage = "📚 Not bad! Keep studying to improve your skills.";
    } else {
      this.resultsMessage = "💪 Keep practicing! JavaScript mastery takes time.";
    }
  }

  getResultsIcon(): string {
    const percentage = (this.score / this.quizData.length) * 100;
    
    if (percentage >= 80) return 'emoji_events';
    if (percentage >= 60) return 'thumb_up';
    if (percentage >= 40) return 'menu_book';
    return 'fitness_center';
  }

  getResultsIconClass(): string {
    const percentage = (this.score / this.quizData.length) * 100;
    
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'okay';
    return 'needs-practice';
  }

  restartQuiz() {
    this.initQuiz();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.showResults || this.answered) return;
    
    // Handle number keys 1-4 for answer selection
    if (event.key >= '1' && event.key <= '4') {
      const index = parseInt(event.key) - 1;
      if (index < (this.getCurrentQuestion()?.answers.length ?? 0)) {
        this.selectAnswer(index);
      }
    }
    
    // Handle Enter key for next question
    if (event.key === 'Enter' && this.selectedAnswer !== null) {
      this.nextQuestion();
    }
  }

}
