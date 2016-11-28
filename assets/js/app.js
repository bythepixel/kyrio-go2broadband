import styleSelect from 'styleSelect';
import { customEventPoly, classListPoly } from './components/polyfill';
import { formHandling, formRevealOnFill } from './components/form';
import { pageInit } from './components/load';
import { datePicker } from './components/datePicker';
// Shim 'CustomEvent'
customEventPoly();
// Shim 'classList' for IE9
classListPoly();
// Add IE class
if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/))) {
  document.querySelector('body').classList.add('ie');
}
formRevealOnFill();
// Run form handling
formHandling();
// Run page init
pageInit();
// Hook up styleSelect
styleSelect('.form__select');
// Run datePicker
datePicker('.form__date');
