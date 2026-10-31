type LoaderOptions = {
    method?: string;
    headers?: Record<string, string>;
    [key: string]: unknown;
};

class Loader {
    protected baseLink: string;
    protected options?: LoaderOptions;

    constructor(baseLink: string, options?: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(params: { endpoint: string; options?: Record<string, unknown> }, callback: (data: T) => void): void {
        const { endpoint, options } = params;
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, unknown>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: string, 
        endpoint: string, 
        callback: (data: T) => void, 
        options: Record<string, unknown> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
