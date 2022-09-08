import { subscriptionEventEnum } from 'app/blocks/enum/subscription-events.enum';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentEventSubscription } from '../generated/gqlServices';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsEventCallbackService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  showPopup(data: AppointmentEventSubscription["appointmentEvent"]) {

    let message = '';
    if (data.event == subscriptionEventEnum.appointment_created) message =
      `A new appointment has been created ${data?.content?.type == 'Visit' ? 'for ' + this.capitalizeWords(data?.content?.subject) : ''}.`;
    if (data.event == subscriptionEventEnum.appointment_updated) message = `An appointment is updated.`;
    if (data.event == subscriptionEventEnum.appointment_status_changed) message = `${this.capitalizeWords(data?.content?.subject)} ${this.capitalizeWords(data?.content.status)}.`;

    setTimeout(() => {
      // let audio: HTMLAudioElement = new Audio('https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7');
      let audio: HTMLAudioElement = new Audio('assets/toast_sound.mp3');
      audio.play();

      this._snackBar.open(this.capitalizeFirst(message), 'Ok', {
        duration: 15000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      })
    }, 200);
  }
  capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  capitalizeWords(string) {
    return string.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
  };
}
