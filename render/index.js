import 'core-js/stable';
import 'regenerator-runtime/runtime';

import wdrLoader from 'wdr-loader';
import { router } from './src/router';

wdrLoader(data => {
    router(data);
})
