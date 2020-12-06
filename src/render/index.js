import wdrLoader from 'wdr-loader';
import { router } from './src/router';

wdrLoader(data => {
    router(data);
})
