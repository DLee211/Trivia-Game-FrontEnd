import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrl: './dialog-component.component.css'
})
export class DialogComponentComponent implements OnInit{
  actionBtn: string = "Save"
  questionForm! : FormGroup;
  gameId!: number;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      difficulty: new FormControl('', Validators.required),
      problem: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required)
    });

    if(this.data){
      this.gameId = this.data.gameId;
      const urlSegments = this.data.currentUrl.split('/');
      this.gameId = +urlSegments[urlSegments.length - 1]; // Convert the last segment to a number
      console.log('Game ID:', this.gameId);
    }
  }

  questions: any[] = [];

  addQuestionForm() {
    if (this.questionForm.valid) {
      const payload = {
        gameId: this.gameId,
        difficulty: String(this.questionForm.value.difficulty),
        problem: String(this.questionForm.value.problem),
        answer: String(this.questionForm.value.answer)
      };

      console.log('Payload:', payload);

      this.api.postQuestion(payload).subscribe({
        next: (res) => {
          console.log('Question added successfully', res);
          this.dialogRef.close();
          location.reload();
        },
        error: (err) => {
          console.error('Error adding question', err);
        }
      });
    }

  }
}
