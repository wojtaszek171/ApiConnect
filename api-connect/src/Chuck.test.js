import React from 'react';
import renderer from 'react-test-renderer';
import Chuck from "./Components/Chuck";
import NavComponent from "./Components/NavComponent";
import { mount, shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
import chuckApi from "./services/chuck";
import serializer from 'enzyme-to-json/serializer';

jest.unmock('jquery');  //jquery unmocked - internet connection needed
var $ = require('jquery') ;


describe('Chuck render',async () => {

    const doneChange = jest.fn();
    const wrapper = shallow(
        <Chuck />);

        var text = wrapper.find("#searchinput");
        const categories = wrapper.find("#categories");
         text.simulate("change", {target:{value:"chucki"}});
         expect(wrapper.state().text).toEqual('chucki');
         //wrapper.find('#search').simulate('click');

});

describe('Chuck api response', async () => {
    const wrapper = shallow(
        <Chuck />);
    jest.setTimeout(20000);
    const datas = await chuckApi('aaa');
    console.log(datas.result.length + " results");
    expect(datas.result.length).toBeGreaterThan(0);
    jest.setTimeout(5000);
    wrapper.setState({data : datas});
    var pag = wrapper.find('#paginator');
    expect(pag.is('[checked]')).toBe(false);
    // pag.simulate('change',{target: {checked: true}});
    // expect(pag.is('[checked]')).toBe(true);
    const p = wrapper.find('#result');
    //expect(p.find(p).exists()).toEqual(true);
});

expect.addSnapshotSerializer(serializer);

describe('Popup', () => {
    it('renders without crashing', () => {
        expect.hasAssertions();
        expect.assertions(2);

        const popup = shallow(<Chuck />);

        expect(popup).toMatchSnapshot();
    });
});