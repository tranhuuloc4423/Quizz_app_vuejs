import axios from "axios";

// const local = "http://localhost:8080";
const vercel = "https://quizz-app-vuejs.vercel.app";

if (!localStorage.getItem("QuizAuth")) {
    location.href = `${vercel}/`;
}

const instance = axios.create({
    baseURL: "https://quizz-app-backend-web.vercel.app",
});

instance.interceptors.request.use(
    function (config) {
        const auth = localStorage.getItem("QuizAuth");
        if (auth) {
            config.headers.Authorization = "Bearer " + auth;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default instance;
