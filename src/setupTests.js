import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });
window.alert = (msg) => { console.log(msg); };