import DragDrop2048 from "./Components/DragDrop2048";
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';

const sum = require('./Components/DragDrop2048');

test('render nothing', () => {
    //expect(sum(1, 2)).toBe(3);
});

test('new game test', async () => {
    const wrapper = shallow(
        <DragDrop2048 />);
    var matrix = wrapper.state().matrix;
    var count = 0;
    for(var i=0; i<matrix.length;i++){
        for(var j=0; j<matrix.length;j++){
            if(matrix[i][j]!=0)
                count++;
        }
    }
    expect(count).toBe(0);
    const newGame = wrapper.find('button');
    await newGame.simulate('click');
    matrix = wrapper.state().matrix;
    count = 0;
    for(var i=0; i<matrix.length;i++){
        for(var j=0; j<matrix.length;j++){
            if(matrix[i][j]!=0)
                count++;
        }
    }
    expect(count).toBe(1);
    var points = wrapper.find('.drag h4');
    expect(points.text()).toBe("Points : 0");
});
