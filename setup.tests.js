import hook from 'css-modules-require-hook';
import sass from 'node-sass';
import path from 'path';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';

hook({
    extensions: ['.scss', '.css'],
    preprocessCss: data => sass.renderSync({
        data,
        includePaths: [path.resolve(__dirname, 'app/assets/scss')]
    }).css,
    generateScopedName: '[local]'
});

Enzyme.configure({
    adapter: new Adapter()
});

library.add( faCheckCircle, faBan );