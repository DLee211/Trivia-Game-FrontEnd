import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrl: './dialog-component.component.css'
})
export class DialogComponentComponent {
  actionBtn: string = "Save"

  questionForm !: FormGroup;

  addQuestionForm() {

  }
}
