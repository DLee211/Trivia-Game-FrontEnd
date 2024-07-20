import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-game-type',
  templateUrl: './add-game-type.component.html',
  styleUrl: './add-game-type.component.css'
})
export class AddGameTypeComponent {
  gameTypeForm: FormGroup;

  constructor(private apiService: ApiService,private router: Router) {
    this.gameTypeForm = new FormGroup({
      gameType: new FormControl('', Validators.required)
    });
  }


  addGameType() {
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
        this.router.navigate(['/game']);
      },
      error: (err) => {
        console.log('Error:', err);
      }
    });
  }
}
