import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '58168ae2d91b46508cf82f2ffd149c1a',
        });
    }
}

export default AppLoader;
