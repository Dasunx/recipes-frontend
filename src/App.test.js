import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import toJson from 'enzyme-to-json';
import { Link } from 'react-router-dom';

it('renders without crashing', () => {
	shallow(<App />);
});

it('renders navbar', () => {
	const wrapper = mount(<App />);
	const welcome = wrapper.find('.navbar-brand');
	expect(welcome.first().text()).toBe('Unique Recipe');
});

it('Check Active tab', async () => {
	const wrapper = await mount(<App />);
	wrapper.update();
	const welcome = wrapper.find('.active');
	expect(welcome.first().text()).toBe('Home');
});
