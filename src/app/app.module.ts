import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GameComponentComponent } from './game-component/game-component.component';
import { QuizComponentComponent } from './quiz-component/quiz-component.component';
import { QuestionComponentComponent } from './question-component/question-component.component';
import {MatButton, MatIconButton} from "@angular/material/button";
import { HomeComponentComponent } from './home-component/home-component.component';
import {MatCell, MatColumnDef, MatHeaderCell, MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardModule,
  MatCardSmImage,
  MatCardSubtitle
} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    GameComponentComponent,
    QuizComponentComponent,
    QuestionComponentComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButton,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    HttpClientModule,
    MatTableModule,
    MatCard,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardModule,
    MatFormField,
    FormsModule,
    MatIcon,
    MatFormFieldModule,
    MatInput,
    MatIconButton
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
