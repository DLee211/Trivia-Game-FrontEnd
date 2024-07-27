import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-game-type-dialog',
  templateUrl: './add-game-type-dialog.component.html',
  styleUrl: './add-game-type-dialog.component.css'
})
export class AddGameTypeDialogComponent {
  gameTypeForm: FormGroup;

  constructor(private apiService: ApiService,private router: Router,     public dialogRef: MatDialogRef<AddGameTypeDialogComponent>
  ) {
    this.gameTypeForm = new FormGroup({
      gameType: new FormControl('', [Validators.required, Validators.maxLength(30)])
    });
  }


  addGameType() {
    if (this.gameTypeForm.valid) {
      const requestBody = {
        gameId: 0,
        gameType: this.gameTypeForm.value.gameType,
        score: 0
      };
      console.log('Sending request with body:', requestBody);
      this.apiService.postGame(requestBody).subscribe({
        next: (res) => {
          console.log('Response:', res);
          alert("Game type added successfully");
          this.gameTypeForm.reset();
          this.dialogRef.close();
          this.router.navigate(['/game']);
        },
        error: (err) => {
          console.log('Error:', err);
        }
      });
    }
  }
}
