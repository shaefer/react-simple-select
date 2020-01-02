//https://xifh2.csb.app/
import React from "react";
import ReactDOM from "react-dom";
import SimpleSelect from "./SimpleSelect";

import "./styles.css";
import "./flags.css"

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
  const flagOptions = [
    {label: "United States", value: "US", flag: "flag-us"},
    {label: "United Kingdom", value: "UK", flag: "flag-gb"}
  ];
  const lotsOfOpts = [...Array(1000).keys()].map(x => {
    return { value: x, label: "Label" + x };
  });
  const onChange = (e, value, fullOption) => {
    console.log("Component val and fullOpt", value, fullOption);
  };
  const flagOptionLabelRender = (opt) => {
    const flagClass = `flag ${opt.flag}`;
    return <React.Fragment><span className={flagClass}></span><span>{opt.label}</span></React.Fragment>;
  }
  return (
    <div className="App">
      <h1>Simple, Stylable, React Select Component</h1>
      <h3 style={{ textAlign: "left" }}>
        <ul>
          <li>Small codebase - easily customized</li>
          <li>Easily styled with basic css with lots of documentation</li>
          <li>Fluid or fixed width and height!</li>
          <li>Mobile Friendly</li>
          <li>
            Fast. Renders quickly 2-5ms for most use cases. &lt;30ms even with 1000+
            options
          </li>
        </ul>
      </h3>
      <SimpleSelect
        id="1"
        options={lotsOfOpts}
        legendLabel="Select things"
        width="200px"
        onChange={onChange}
        defaultValue="Some value that doesn't exist" //needs to match the value prop of at least one value or it will default to blank (if we ever support turning off the cancel button then we will default ot a non-error state by giving back first option).
        cornerStyle="Other" /*the classname to apply to the apply in place of the roundedCorners default style*/
        hasSharpCorners
      />
      <SimpleSelect
        id="2"
        options={options} //required
        legendLabel="Select things 2" //or blank for "Select..."
        width="300px" //or blank for 100%
        fixedHeight //height is fluid by default
        onChange={onChange} //optional
        defaultValue={specialVal} // matches an option value object by reference (so if the value IS an object you will need to pass in the actual object connected with the option. i.e. ===). If no match is found will leave blank.
      />
      <SimpleSelect
        id="3" options={options} onChange={onChange} //Simplest version (you could omit onChange but then how would you know what value the component currently is holding?)
      />
      <SimpleSelect
        id="4" options={options} onChange={onChange} 
        nonCancelable defaultValue={2} legendLabel="Select nonCancelable" 
        width="200px"//Non-cancelable 
      />
      <SimpleSelect id="5" options={flagOptions} onChange={onChange} width="300px" legendLabel="Custom Option Label Render"
        renderOptionLabel={flagOptionLabelRender}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
