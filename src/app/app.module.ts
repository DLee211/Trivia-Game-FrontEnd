import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GameComponentComponent } from './game-component/game-component.component';
import { QuizComponentComponent } from './quiz-component/quiz-component.component';
import { QuestionComponentComponent } from './question-component/question-component.component';
import {MatButton} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    GameComponentComponent,
    QuizComponentComponent,
    QuestionComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButton
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
