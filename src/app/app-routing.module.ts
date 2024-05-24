import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameComponentComponent} from "./game-component/game-component.component";
import {QuizComponentComponent} from "./quiz-component/quiz-component.component";
import {QuestionComponentComponent} from "./question-component/question-component.component";
import {HomeComponentComponent} from "./home-component/home-component.component";

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'game', component: GameComponentComponent },
  { path: 'quiz', component: QuizComponentComponent },
  { path: 'question', component: QuestionComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
