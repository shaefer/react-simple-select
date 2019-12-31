import React from 'react';
import ReactDOM from 'react-dom';

import SimpleSelect from '../SimpleSelect'
const specialVal = { test: "valueObject" };
const options = [
    {
      label: "Something Else That is Extra Long and Probably Won't fit",
      value: "Something Else 4"
    },
    { label: "Option 1", value: "Option 1" },
    { label: "Option 2", value: 2 },
    { label: "Something Else", value: "Something Else" },
    { label: "Something Else", value: "Something Else" },
    { label: "Something Else", value: "Something Else" },
    { label: "New Option", value: specialVal }
  ];
describe('test component render', () => {
    it('should render', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SimpleSelect options={options}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})