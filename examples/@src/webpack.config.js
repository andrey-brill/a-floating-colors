
const { spa } = require('a-webpack-configs');


module.exports = (env) => spa(env, {

    entryPath: './examples/@src/examples.js',
    developmentPath: './examples/spa',
    productionPath: './docs',

    title: 'Floating Colors',

    plugins: {
        css: true,
        svg: true,
        clean: true,
        copy: true
    }
});