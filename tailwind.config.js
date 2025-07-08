// tailwind.config.js
module.exports = {
    content: [
        "./node_modules/flowbite/**/*.js", // هنا بتضيف flowbite
        "./src/**/*.{html,js}", // ودي هي ملفات المشروع
    ],
    theme: {
        extend: {

            colors: {
                main: 'rgba(53, 175, 160, 1)',
                stock: '#00b853',
                addbtn: '#ffcd00',
            }



        },
    },
    plugins: [
        require('flowbite/plugin'), // إضافة البلوجين نفسه
    ],
}
