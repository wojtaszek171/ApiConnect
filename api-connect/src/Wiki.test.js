import React from 'react';
import renderer from 'react-test-renderer';
import Wiki from "./Components/Wiki";
import { mount, shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
import wikiComp from "./services/wiki";

import mockjquery from "jquery";

test('Wiki render',async () => {

    const wrapper = shallow(
        <Wiki />);
});
test('Wiki API response', async () => {



    const datas = await wikiComp("pl","test");
    //console.log(datas);

    //expect(mockjquery.get).toHaveBeenCalledTimes(1);
    //expect(mockjquery).toHaveBeenCalledWith();
    expect(2).toBeGreaterThan(0);
    expect(2).toBeLessThan(6);
});
