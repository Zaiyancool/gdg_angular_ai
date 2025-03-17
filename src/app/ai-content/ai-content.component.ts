import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-content',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule],
  template: `
    <div class="container">
      <h2 class="title">AI Content Generator (Google Gemini API)</h2>
      <input [(ngModel)]="userPrompt" placeholder="Enter a topic..." class="input" />
      <button (click)="generateContent()" [disabled]="loading" class="btn" [ngClass]="{'btn-loading': loading}">Generate</button>

      <div *ngIf="loading" class="loading">Generating...</div>
      
      <div *ngIf="aiResponse" class="output" [innerHTML]="formattedResponse">
        <!-- The generated content will be inserted as HTML here -->
      </div>
    </div>
  `,
  styles: [`
    .container { 
      max-width: 600px; 
      margin: 30px auto; 
      text-align: center; 
      padding: 20px; 
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .title { 
      font-size: 24px; 
      font-family: 'Proza Libre', sans-serif; 
      color: #333; 
      margin-bottom: 20px; 
    }
    .input { 
      width: 80%; 
      padding: 12px; 
      margin: 10px 0; 
      border: 1px solid #ccc; 
      border-radius: 5px; 
      font-size: 16px; 
      outline: none; 
    }
    .input:focus { 
      border-color: #4CAF50; 
    }
    .btn { 
      padding: 12px 20px; 
      background-color: #4CAF50; 
      color: white; 
      border: none; 
      border-radius: 5px; 
      cursor: pointer; 
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    .btn:hover { 
      background-color: #45a049; 
    }
    .btn:disabled { 
      background-color: #ccc; 
      cursor: not-allowed; 
    }
    .loading { 
      color: orange; 
      font-weight: bold; 
      margin-top: 20px;
      font-size: 18px; 
    }
    .output { 
      margin-top: 20px; 
      background: #f3f3f3; 
      padding: 15px; 
      border-radius: 8px; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: left;
      font-size: 16px; 
    }
    .output h3 { 
      font-size: 18px; 
      color: #333; 
      margin-bottom: 10px; 
    }
  `]
})
export class AiContentComponent {
  userPrompt: string = '';
  aiResponse: string = '';
  formattedResponse: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  generateContent() {
    if (!this.userPrompt.trim()) return;

    this.loading = true;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR-GEMINI-API-KEY`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: `Generate a informative article about: ${this.userPrompt}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7
      }
    };

    this.http.post(apiUrl, requestBody).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response && response.candidates && response.candidates[0]?.content?.parts[0]?.text) {
          this.aiResponse = response.candidates[0].content.parts[0].text;
          this.formatResponseToParagraphs();
        } else {
          this.aiResponse = 'No response from AI.';
          this.formattedResponse = this.aiResponse;
        }
        this.loading = false;
      },
      (error) => {
        console.error('API Request Error:', error);
        this.aiResponse = `Error: ${error.message || 'An unknown error occurred.'}`;
        this.formattedResponse = this.aiResponse;
        this.loading = false;
      }
    );
  }

  formatResponseToParagraphs() {
    // This method will format the response into paragraphs
    if (this.aiResponse) {
      this.formattedResponse = this.aiResponse.split('\n').map(paragraph => `<p>${paragraph.trim()}</p>`).join('');
    }
  }
}
