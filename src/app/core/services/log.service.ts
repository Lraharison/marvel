import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  info(operation: string, message: string): void {
    console.log(`${ operation }: ${ message }`);
  }

  error(operation: string, error: Error): void {
    console.error(`${ operation } failed: ${ error.message }`);
  }
}
