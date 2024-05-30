import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  postGame(data: any) {
    return this.http.post<any>('http://localhost:5249/Game/', data)
  }

  getGame() {
    return this.http.get<any>('http://localhost:5249/Game/')
  }

  getGameById(id: number) {
    return this.http.get<any>('http://localhost:5249/Game/' + id)
  }

  updateGame(data: any, id: number) {
    return this.http.put<any>('http://localhost:5249/Game/' + id, data)
  }

  deleteGame(id: number) {
    return this.http.delete<any>('http://localhost:5249/Game/' + id)
  }

  postQuiz(data: any) {
    return this.http.post<any>('http://localhost:5249/Quiz/', data)
  }

  getQuiz() {
    return this.http.get<any>('http://localhost:5249/Quiz/')
  }

  getQuizById(id: number) {
    return this.http.get<any>('http://localhost:5249/Quiz/' + id)
  }

  updateQuiz(data: any, id: number) {
    return this.http.put<any>('http://localhost:5249/Quiz/' + id, data)
  }

  deleteQuiz(id: number) {
    return this.http.delete<any>('http://localhost:5249/Quiz/' + id)
  }

  postQuestion(data: any) {
    return this.http.post<any>('http://localhost:5249/Question/', data)
  }

  getQuestion() {
    return this.http.get<any>('http://localhost:5249/Question/')
  }

  getQuestionById(id: number) {
    return this.http.get<any>('http://localhost:5249/Question/' + id)
  }

  updateQuestion(data: any, id: number) {
    return this.http.put<any>('http://localhost:5249/Question/' + id, data)
  }

  deleteQuestion(id: number) {
    return this.http.delete<any>('http://localhost:5249/Question/' + id)
  }
}
