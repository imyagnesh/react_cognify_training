import React, { memo } from "react";

const Test = () => {
  console.log("Test rerender");
  return <div>Test component</div>;
};

export default memo(Test, (prevProps, nextProps) => {});
