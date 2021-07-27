import React, { Component } from "react";
export class Legend extends Component<any> {
  handleSelectLegend = (label: any) => {
    this.props.handleSelectLegend(label);
  };
  render() {
    const { colors, fields, query }: any = this.props;
    return (
      <div className="legend">
        {fields.map((field: any, index: any) => (
          <div
            className="legend-field"
            key={index}
            onClick={this.handleSelectLegend.bind(this, field)}
          >
            <div
              className={`legend-icon ${query === field ? "legend-icon-active" : ""
                }`}
              style={{
                backgroundColor: colors[index],
              }}
            />
            <div
              className={`legend-label ${query === field ? "legend-label-active" : ""
                }`}
            >
              {field}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

