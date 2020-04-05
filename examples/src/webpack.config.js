
const { spa } = require('a-webpack-configs');


module.exports = (env) => spa(env, {

    entryPath: './examples/src/examples.js',
    productionPath: './docs',
    developmentPath: './examples/spa',

    title: 'FC',

    plugins: {
        css: true,
        svg: true,
        clean: true,
        copy: true
    }
});