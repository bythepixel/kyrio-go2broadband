import styleSelect from 'styleSelect';
import { classListPoly } from './components/class_list_poly';
import { formHandling } from './components/form';
import { pageInit } from './components/load';
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
