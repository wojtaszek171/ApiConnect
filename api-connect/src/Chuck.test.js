import React from 'react';
import renderer from 'react-test-renderer';
import Chuck from "./Components/Chuck";
import NavComponent from "./Components/NavComponent";
import { mount, shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
import chuckApi from "./services/chuck";

var $ = require('jquery') ;

test('Chuck render',async () => {

    const doneChange = jest.fn();
    const wrapper = shallow(
        <Chuck />);

        var text = wrapper.find("#searchinput");
        const categories = wrapper.find("#categories");
         text.simulate("change", {target:{value:"chucki"}});
         expect(wrapper.state().text).toEqual('chucki');
         //wrapper.find('#search').simulate('click');
        jest.setTimeout(10000);
        const datas = await chuckApi('chuck');
        console.log(datas.result.length);
        expect(datas.result.length).toBeGreaterThan(160);
        jest.setTimeout(5000);


});