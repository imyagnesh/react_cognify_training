import React, { PureComponent } from "react";
// import shallowCompare from "react-addons-shallow-compare";

export class Test extends PureComponent {
  //   shouldComponentUpdate(nextProps, nextState) {
  //     return shallowCompare(this, nextProps, nextState);
  //   }
  render() {
    console.log("render test");
    return <div>Test Component</div>;
  }
}

export default Test;
