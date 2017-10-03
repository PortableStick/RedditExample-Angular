import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDistance'
})
export class TimeDistancePipe implements PipeTransform {

  transform(date: number): string {
    const minutes = Math.floor(( Date.now() - date ) / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years >= 1) {
        return `${ years } ${ years < 2 ? 'year' : 'years' }`;
    } else if (days >= 1) {
        return `${ days } ${ days < 2 ? 'day' : 'days' }`;
    } else if (hours >= 1) {
        return `${ hours } ${ hours < 2 ? 'hour' : 'hours'}`;
    } else {
        return `${ minutes } ${ minutes < 2 ? 'minute' : 'minutes'}`;
    }
  }

}
