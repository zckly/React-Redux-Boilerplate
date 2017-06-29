import Calendar from '../src/views/App/Calendar.jsx';
import React from 'react';
import { mount } from 'enzyme';


test('Calendar renders the text: "nub" ', () => {
  const wrapper = mount(
    <Calendar/>
  );
  const div = wrapper.find('.calendar');
  expect(div.text()).toBe('nub');
});