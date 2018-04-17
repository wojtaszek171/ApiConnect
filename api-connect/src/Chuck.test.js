import React from 'react';
import renderer from 'react-test-renderer';
import Chuck from "./Components/Chuck";
import { mount, shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';

var $ = require('jquery') ;



test('Chuck render',async () => {
    let props;
    let mountedChuck;
    const doneChange = jest.fn();
    const wrapper = shallow(
        <Chuck doneChange={doneChange} />
    );
   beforeEach(() =>{
        props = {

        };
       mountedChuck = undefined;
    });

        var text = wrapper.find("#searchinput");
        const categories = wrapper.find("#categories");
         text.simulate("change", {target:{value:"chucki"}});
         expect(wrapper.state().text).toEqual('chucki');
         wrapper.find('#search').simulate('click');
         wrapper.setState({ text: 'chuck' });
        expect(wrapper.state().text).toEqual('chuck');
        try {

        } catch (e) {
            console.log(e);

        }

         await console.log(wrapper.state());
});