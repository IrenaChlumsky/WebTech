import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // dein App-Component
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // deine Routen

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});
