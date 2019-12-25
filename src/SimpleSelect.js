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
    const fixedHeightClassName = this.props.fixedHeight ? this.props.fixedHeight : "";
    const cornerClassName = this.props.hasSharpCorners ? "" : "roundedCorners";
    const selectOpenClosedClass = this.state.selectOpen ? "selectOpen" : "selectClosed";
    const valueSelected = this.state.currentOptionSelected.value === "" ? "" : "valueSelected";
    const coreCssClassNames = ['mySelectDefault', selectOpenClosedClass, valueSelected, fixedHeightClassName, cornerClassName];

    return (
      <div className={coreCssClassNames.filter(x => x).join(" ")} style={style}>
        <div className="fieldset">
          <div className="legend">{this.state.legendLabel}</div>
          <div className="selectedDisplay">
            {this.state.currentOptionSelected.label}
          </div>
          <div className="cancelContainer" onClick={this.cancelSelection}>
            <div className="cancelContent">×</div>
          </div>
          <div
            className="downArrowContainer"
            onClick={this.openSelect}
            ref={this.dropdownButton}
          >
            <div className="downArrowContent">&#9660;</div>
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
