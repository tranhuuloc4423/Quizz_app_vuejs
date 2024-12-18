module.exports = {
    content: ["./src/**/*.{vue,js,ts,jsx,tsx}", "./public/index.html"],
    theme: {
        extend: {
            screens: {
                "2xs": "300px",
                xs: "520px",
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
                "3xl": "1920px",
                "4xl": "2560px",
            },
        },
    },
    plugins: [],
};
