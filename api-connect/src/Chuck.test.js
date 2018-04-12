import React from 'react';
import renderer from 'react-test-renderer';
import Chuck from "./Components/Chuck";
import { mount } from 'enzyme';

var $ = require('jquery') ;



test('Chuck render', () => {
    const wrapper = mount(
        <Chuck />
    );

});