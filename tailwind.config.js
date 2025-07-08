// tailwind.config.js
module.exports = {
    content: [
        "./node_modules/flowbite/**/*.js", // هنا بتضيف flowbite
        "./src/**/*.{html,js}", // ودي هي ملفات المشروع
    ],
    theme: {
        extend: {





        },
    },
    plugins: [
        require('flowbite/plugin'), // إضافة البلوجين نفسه
    ],
}
