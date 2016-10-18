import styleSelect from 'styleSelect';
import { customEventPoly, classListPoly } from './components/polyfill';
import { formHandling } from './components/form';
import { pageInit } from './components/load';
// Shim 'CustomEvent'
customEventPoly();
// Shim 'classList' for IE9
classListPoly();
// Add IE class
if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/))) {
  document.querySelector('body').classList.add('ie');
}
// Run page init
pageInit();
// Run form handling
formHandling();
// Hook up styleSelect
styleSelect('.form__select');
