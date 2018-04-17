import React from 'react';
import renderer from 'react-test-renderer';
import Chuck from "./Components/Chuck";
import NavComponent from "./Components/NavComponent";
import { mount, shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var $ = require('jquery') ;

test('Chuck render',async () => {

    const doneChange = jest.fn();
    const wrapper = shallow(
        <Chuck />);

        var text = wrapper.find("#searchinput");
        const categories = wrapper.find("#categories");
         text.simulate("change", {target:{value:"chucki"}});
         expect(wrapper.state().text).toEqual('chucki');
         wrapper.find('#search').simulate('click');
         wrapper.setState({ text: 'test' });


        expect(wrapper.state().text).toEqual('test');

         const datas = await wrapper.instance().getResult();
         console.log(datas);
});