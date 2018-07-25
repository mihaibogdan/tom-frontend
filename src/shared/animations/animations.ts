import {trigger, animate, style, group, query, transition, stagger, animateChild, sequence} from '@angular/animations';

export const FadeInOrOut = trigger('FadeInOrOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate("0.5s cubic-bezier(.35, 0, .25, 1)", style({ opacity: 1 }))
  ]),

  transition(':leave', [
    style({ opacity: 1 }),
    animate("0.5s cubic-bezier(.35, 0, .25, 1)", style({ opacity: 0 }))
  ])
]);
