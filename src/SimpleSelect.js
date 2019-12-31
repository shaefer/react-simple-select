import React from "react";
import "./SimpleSelect.css";
import "./SimpleSelect-cancel.css";
import "./SimpleSelect-openArrow.css";
import "./SimpleSelect-legend.css";
import "./SimpleSelect-options.css";
import "./SimpleSelect-display.css";

class SimpleSelect extends React.Component {
  constructor(props) {
    const createTime = new Date().getTime();
    super(props);
    this.optionContainerRef = React.createRef();
    this.dropdownButton = React.createRef();
    this.optionSelected = this.optionSelected.bind(this);
    this.cancelSelection = this.cancelSelection.bind(this);
    this.openSelect = this.openSelect.bind(this);
    this.handleOutsideOptionsClick = this.handleOutsideOptionsClick.bind(this);

    console.log(props);
    const optionValidation = this.checkOptionType(props.options);
    const blankValue = { value: "", label: "" };
    const defaultValue =
      props.defaultValue &&
      props.options.find(x => x.value === props.defaultValue)
        ? props.options.find(x => x.value === props.defaultValue)
        : blankValue;

    this.state = {
      createTime: createTime,
      blankValue: blankValue,
      validOptions: optionValidation.valid,
      invalidReason: optionValidation.reason,
      currentOptionSelected: defaultValue,
      legendLabel: props.legendLabel ? props.legendLabel : "Select...",
      selectOpen: false,
      options: props.options ? props.options : [],
      width: props.width ? props.width : "",
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideOptionsClick);
    const finishTime = new Date().getTime();
    console.log(
      `Id: ${this.props.id} CreateTime: ${finishTime - this.state.createTime}ms`
    );
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideOptionsClick);
  }

  checkOptionType(options) {
    if (!Array.isArray(options))
      return { valid: false, reason: "Illegal options. Expected an array." };
    //check first item as a courtesy
    const opt1 = options[0];
    if (
      !(
        typeof opt1 === "object" &&
        opt1.value !== undefined &&
        opt1.label !== undefined
      )
    ) {
      console.error(
        "Options expected to be objects with at least 2 props 'value' and 'label'",
        opt1
      );
      return {
        valid: false,
        reason:
          "Options expected to be objects with at least 2 props 'value' and 'label'"
      };
    }
    return {
      valid: true,
      reason: ""
    };
  }

  handleOutsideOptionsClick(e) {
    //console.log("outside Click handler", e.target, this.dropdownButton);
    const clickContainsOptionContainer =
      this.optionContainerRef.current &&
      this.optionContainerRef.current.contains(e.target);
    const clickContainsDropDownButton =
      this.dropdownButton.current &&
      this.dropdownButton.current.contains(e.target);
    if (!clickContainsOptionContainer && !clickContainsDropDownButton) {
      this.setState({
        ...this.state,
        selectOpen: false
      });
    }
  }

  optionSelected(e) {
    console.log(e.target);
    const optionByIndex = this.state.options[
      parseInt(e.target.getAttribute("index"), 10)
    ];
    if (this.props.onChange) {
      this.props.onChange(e, optionByIndex.value, optionByIndex);
    }
    this.setState({
      ...this.state,
      currentOptionSelected: optionByIndex,
      selectOpen: false
    });
  }

  openSelect(e) {
    const selectOpen = this.state.selectOpen;
    this.setState({
      ...this.state,
      selectOpen: !selectOpen
    });
  }

  cancelSelection(e) {
    console.log("cancel button");
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    this.setState({
      ...this.state,
      currentOptionSelected: this.state.blankValue,
      selectOpen: false
    });
    e.stopPropagation(); //since cancel and dropdown are part of same dom tree we don't want the open/close to fire as well.
  }

  render() {
    if (!this.state.validOptions)
      return <div>Invalid Options: {this.state.invalidReason}</div>;
    const opts = this.state.options.map((x, idx) => {
      return (
        <div
          onClick={this.optionSelected}
          key={`_select_opts${idx}`}
          index={idx}
        >
          {x.label}
        </div>
      );
    });

    const style = {
      width: this.state.width ? this.state.width : "100%"
    };
    const fixedHeightClassName = this.props.fixedHeight ? "fixedHeight" : "";
    const cornerClassName = this.props.hasSharpCorners ? "" : "roundedCorners";
    const selectOpenClosedClass = this.state.selectOpen ? "selectOpen" : "selectClosed";
    const valueSelected = this.state.currentOptionSelected.value === "" ? "" : "valueSelected";
    const coreCssClassNames = ['mySelectDefault', selectOpenClosedClass, valueSelected, fixedHeightClassName, cornerClassName];

    return (
      <div className={coreCssClassNames.filter(x => x).join(" ")} style={style}>
        <div className="fieldset">
          <div className="legend">{this.state.legendLabel}</div>
          <div className="mainSectionWrapper" onClick={this.openSelect} ref={this.dropdownButton}>
            <div className="selectedDisplay">
              {this.state.currentOptionSelected.label}
            </div>
            <div className="cancelContainer" onClick={this.cancelSelection}>
              <div className="cancelContent">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  height="20"
                  viewBox="0 0 20 20"
                  width="20"
                >
                  <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
                </svg>
              </div>
            </div>
            <div className="downArrowContainer">
              <div className="downArrowContent">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  height="20"
                  viewBox="0 0 20 20"
                  width="20"
                >
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                </svg>
              </div>
            </div>
          </div>
          <div
            className={`mySelectDefaultOptions`}
            ref={this.optionContainerRef}
          >
            {opts}
          </div>
        </div>
      </div>
    );
  }
}

export default SimpleSelect;
