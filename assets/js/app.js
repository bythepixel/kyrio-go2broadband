import styleSelect from 'styleSelect';
import { formHandling } from './components/form';
import { pageInit } from './components/load.js';
// Run page init
pageInit();
// Run form handling
formHandling();
// Hook up styleSelect
styleSelect('.form__select');
