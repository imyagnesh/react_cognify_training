import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import TodoFilter from "../todoFilter";

// mock function
const fnFilter = jest.fn();

const setup = () => {
  const props = {
    filterType: "all",
    onFilter: fnFilter,
  };
  return render(<TodoFilter {...props} />);
};

describe("todofilter component", () => {
  test("should render snapshot", () => {
    const { container } = setup();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render todoFilter component", () => {
    const { findByTestId } = setup();
    expect(findByTestId("todofilter-container")).not.toBeNull();
  });

  test("should have 3 buttons", () => {
    const { queryAllByRole } = setup();
    const buttons = queryAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toBe("All");
    expect(buttons[1].textContent).toBe("Pending");
    expect(buttons[2].textContent).toBe("Completed");
    expect(buttons[0].style.border).toBe("1px solid red");
    expect(buttons[1].style.border).toBe("");
    expect(buttons[2].style.border).toBe("");
  });

  test("should click all button", () => {
    const { queryByText } = setup();
    const allButton = queryByText("All");
    expect(allButton).not.toBeNull();
    fireEvent.click(allButton);
    expect(fnFilter).toBeCalledTimes(1);
    expect(fnFilter).toBeCalledWith("all");
  });

  test("should click pending button", () => {
    const { queryByText } = setup();
    const pendingButton = queryByText("Pending");
    expect(pendingButton).not.toBeNull();
    fireEvent.click(pendingButton);
    expect(fnFilter).toBeCalledTimes(1);
    expect(fnFilter).toBeCalledWith("pending");
  });

  test("should click completed button", () => {
    const { queryByText } = setup();
    const completedButton = queryByText("Completed");
    expect(completedButton).not.toBeNull();
    fireEvent.click(completedButton);
    expect(fnFilter).toBeCalledTimes(1);
    expect(fnFilter).toBeCalledWith("completed");
  });

  test("should highlight pending button", () => {
    const { rerender } = setup();
    rerender(<TodoFilter onFilter={fnFilter} filterType="pending" />);
    const pendingButton = screen.queryByText("Pending");
    expect(pendingButton.style.border).toBe("1px solid red");
  });

  test("should highLight completed button", () => {
    const { rerender } = setup();
    rerender(<TodoFilter onFilter={fnFilter} filterType="completed" />);
    const competedButton = screen.queryByText("Completed");
    expect(competedButton.style.border).toBe("1px solid red");
  });
});

// // global scope

// beforeAll(() => {
//   console.log("before all");
// });

// beforeEach(() => {
//   console.log("before each");
// });

// afterAll(() => {
//   console.log("afterAll");
// });

// afterEach(() => {
//   console.log("afterEach");
// });

// test("should return 4", () => {
//   expect(2 + 2).toBe(4);
// });

// test("should return 0.3", () => {
//   expect(0.1 + 0.2).toBeCloseTo(0.3);
// });

// describe("positive scenario", () => {
//   beforeAll(() => {
//     console.log("positive scenario before all");
//   });

//   beforeEach(() => {
//     console.log("positive scenario before each");
//   });

//   afterAll(() => {
//     console.log("positive scenario afterAll");
//   });

//   afterEach(() => {
//     console.log("positive scenario afterEach");
//   });

//   test("should return 4", () => {
//     expect(2 + 2).toBe(4);
//   });
// });

// describe("negative scenario", () => {
//   beforeAll(() => {
//     console.log("negative scenario before all");
//   });

//   beforeEach(() => {
//     console.log("negative scenario before each");
//   });

//   afterAll(() => {
//     console.log("negative scenario afterAll");
//   });

//   afterEach(() => {
//     console.log("negative scenario afterEach");
//   });

//   test("should return 0.3", () => {
//     expect(0.1 + 0.2).toBeCloseTo(0.3);
//   });
// });
