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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import { EditQuestionComponent } from './edit-question/edit-question.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatPaginator} from "@angular/material/paginator";
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import {MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    GameComponentComponent,
    QuizComponentComponent,
    QuestionComponentComponent,
    HomeComponentComponent,
    EditQuestionComponent,
    DialogComponentComponent
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
    MatIconButton,
    MatToolbar,
    MatPaginator,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    ReactiveFormsModule,
    MatSelect,
    MatOption
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
