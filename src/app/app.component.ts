import { Component } from '@angular/core';
import { AiContentComponent } from './ai-content/ai-content.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AiContentComponent, HttpClientModule],
  template: `<app-ai-content></app-ai-content>`,
})
export class AppComponent {}
