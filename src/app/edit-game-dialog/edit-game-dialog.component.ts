import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-edit-game-dialog',
  templateUrl: './edit-game-dialog.component.html',
})
export class EditGameDialogComponent {
  editGameForm = new FormGroup({
    gameType: new FormControl(this.data.gameType)
  });
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EditGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    const body = JSON.stringify({
      gameId: this.data.gameId,
      gameType: this.data.gameType,
      score: this.data.score
    });

    this.api.updateGame(body, this.data.gameId).subscribe({
      next: (res) => {
        console.log('Response:', res);
      },
      error: (err) => {
        console.log('Error:', err);
        console.log('Body:', body);
        console.log('Game ID:', this.data.gameId);
      }
    });
    this.dialogRef.close();
  }
}
