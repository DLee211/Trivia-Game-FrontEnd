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
    gameType: new FormControl( { value: '', disabled: false }),
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
    if (this.data.gameId) {
      this.api.getGameById(this.data.gameId).subscribe({
        next: (gameDetails) => {
          gameDetails.gameType = this.editGameForm.value.gameType;
          this.api.updateGame(gameDetails, this.data.gameId).subscribe({
            next: (res) =>
              console.log('Response:', res),
            error: (err) => {
              console.log('Error:', err);
              console.log('Body:', gameDetails);
              console.log('Game ID:', this.data.gameId);
            }
          });
          location.reload()
        },
        error: (err) => console.error('Failed to fetch game details', err)
      });
    } else {
      console.error('Game ID is missing');
    }
  }
}
