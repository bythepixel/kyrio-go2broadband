import styleSelect from 'styleSelect';
import { customEventPoly, classListPoly } from './components/polyfill';
import { formHandling, formRevealOnFill, formCheckboxValReplace } from './components/form';
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
// Bind form reveal
formRevealOnFill();
// Run form handling
formHandling();
// Replace checkbox values with true/false values on submit
formCheckboxValReplace();
// Run page init
pageInit();

// Hook up styleSelect
const selects = document.querySelectorAll('.form__select');
if(selects.length)
{
    styleSelect('.form__select');
}

// Run datePicker
const dates = document.querySelectorAll('.form__date')
{
    datePicker('.form__date');
}
