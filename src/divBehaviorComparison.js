//https://xifh2.csb.app/
import React from "react";
import ReactDOM from "react-dom";
import MySelect from "./MySelect";

import "./styles.css";

function App() {
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
  const lotsOfOpts = [...Array(1000).keys()].map(x => {
    return { value: x, label: "Label" + x };
  });
  const onChange = (e, value, fullOption) => {
    console.log("Component val and fullOpt", value, fullOption);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div
        style={{ width: "100px", height: "400px", border: "1px solid red" }}
      />
      <div style={{ width: "100px", border: "1px solid red" }}>
        <MySelect
          id="1"
          options={lotsOfOpts}
          legendLabel="Select things"
          width="200px"
          onChange={onChange}
          defaultValue="Some value that doesn't exist" //needs to match the value prop of at least one value or it will default to blank (if we ever support turning off the cancel button then we will default ot a non-error state by giving back first option).
        />
      </div>
      <div style={{ width: "100%", border: "1px solid red" }}>
        <MySelect
          options={options} //required
          legendLabel="Select things 2" //or blank for "Select..."
          width="" //or blank for 100%
          fixedHeight="true" //or "true"
          onChange={onChange} //optional
          defaultValue={specialVal} // matches an option by reference (so if it is an object you will need to pass in the actual object connected with the option)...otherwise it will default to first option. (trying to avoid error states on iniital render.)
        />
      </div>
      <div style={{ width: "100px", border: "1px solid red" }}>
        <div style={{ width: "200px", border: "1px solid blue" }}>Testing</div>
      </div>
      <div style={{ width: "300px", border: "1px solid red" }}>
        <div style={{ width: "100%", border: "1px solid blue" }}>Testing</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          border: "1px solid red"
        }}
      >
        Testing
        <div style={{ width: "100%", border: "1px solid red" }}>
          <MySelect
            options={options} //required
            legendLabel="Select things 2" //or blank for "Select..."
            width="" //or blank for 100%
            fixedHeight="true" //or "true"
            onChange={onChange} //optional
            defaultValue={specialVal} // matches an option by reference (so if it is an object you will need to pass in the actual object connected with the option)...otherwise it will default to first option. (trying to avoid error states on iniital render.)
          />
          <select>
            <option>Test 1</option>
            <option>Test 2</option>
            <option>Test 3</option>
            <option>Test 4</option>
            <option>Test 5</option>
            <option>Test 1</option>
            <option>Test 2</option>
            <option>Test 3</option>
            <option>Test 4</option>
            <option>Test 5</option>
            <option>Test 1</option>
            <option>Test 2</option>
            <option>Test 3</option>
            <option>Test 4</option>
            <option>Test 5</option>
          </select>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
