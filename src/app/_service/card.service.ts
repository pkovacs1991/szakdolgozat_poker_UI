import { Injectable } from '@angular/core';

@Injectable()
export class CardService {

  getHtmlFigure(color): string {
    if ( color === 'Hearts') {
      return '♥';
    } else if ( color === 'Diamonds') {
      return '♦';
    } else if ( color === 'Clubs') {
      return '♣';
    } else if ( color === 'Spades') {
      return '♠';
    }
  }


  getCardColor(color): string {
    if ( color === 'Hearts' || color === 'Diamonds') {
      return 'red';
    } else {
      return 'black';
    }
  }

}
