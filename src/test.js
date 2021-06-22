import React, { memo } from "react";

const Test = () => {
  console.log("Test rerender");
  return <div>Test component</div>;
};

export default memo(Test, (prevProps, nextProps) => {});
// import React, { PureComponent } from "react";
// // import shallowCompare from "react-addons-shallow-compare";

// export class Test extends PureComponent {
//   //   shouldComponentUpdate(nextProps, nextState) {
//   //     return shallowCompare(this, nextProps, nextState);
//   //   }
//   render() {
//     console.log("render test");
//     return <div>Test Component</div>;
//   }
// }

// export default Test;
