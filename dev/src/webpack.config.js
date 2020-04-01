
const path = require('path');


const cwd = path.resolve(process.cwd(), 'dev')

module.exports = {
    mode: 'development',
    entry: {
        app: path.join(cwd, 'src/dev.js'),
    },
    devServer: {
        contentBase: path.join(cwd, 'app'),
        watchContentBase: true,
        publicPath: '/build/'
    },
    output: {
        filename: '_dev.js',
        path: path.join(cwd, 'app/build')
    },
};
