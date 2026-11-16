import { ToDo } from "../../../../../api-types";
import { ToDosState } from "./ToDosState";

describe(`ToDosState`, () => {
  describe(`Initialization`, initializationTests);

  describe(`Selection`, selectionTests);
});

function initializationTests() {
  it(`
  GIVEN initial state with no ToDos
  WHEN ask for them
  SHOULD return an empty array
  `, () => {
    const { toDosState } = createState();

    expect(toDosState.toDos).to.deep.eq([]);
  });

  it(`
  GIVEN initial state with no ToDos
  WHEN initialize it with two ToDos
  SHOULD return them from toDos
  `, () => {
    const toDosForInitialization = [
      {
        name: `First Fizz`,
      },
      {
        name: `Second Buzz`,
      },
    ];

    const { toDosState } = createState({
      toDosForInitialization,
    });

    expect(toDosState.toDos).to.deep.eq(toDosForInitialization);
  });
}

function selectionTests() {
  it(`
    GIVEN three ToDos
    WHEN select them one by one
    SHOULD end up in list of selected ids
    `, () => {
    const toDosForInitialization = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ];

    const { toDosState } = createState({
      toDosForInitialization,
    });

    expect(toDosState.selectedToDoIds).to.deep.eq([]);

    toDosState.toggleToDoSelection({
      toDoId: 2,
    });

    expect(toDosState.selectedToDoIds).to.deep.eq([2]);

    toDosState.toggleToDoSelection({
      toDoId: 1,
    });

    toDosState.toggleToDoSelection({
      toDoId: 3,
    });

    expect(toDosState.selectedToDoIds).to.deep.eq([2, 1, 3]);
  });

  it(`
  GIVEN two selected ToDos
  WHEN unselect them on by one
  SHOULD disappear from the list of selected ids
  `, () => {
    const toDosForInitialization = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];

    const { toDosState } = createState({
      toDosForInitialization,
    });

    toDosState.toggleToDoSelection({
      toDoId: 1,
    });
    toDosState.toggleToDoSelection({
      toDoId: 2,
    });

    toDosState.toggleToDoSelection({
      toDoId: 2,
    });

    expect(toDosState.selectedToDoIds).to.deep.eq([1]);

    toDosState.toggleToDoSelection({
      toDoId: 1,
    });

    expect(toDosState.selectedToDoIds).to.deep.eq([]);
  });

  it(`
  GIVEN one selected ToDo
  WHEN clear the selection
  SHOULD return empty list of selected ids
  `, () => {
    const toDosForInitialization = [
      {
        id: 1,
      },
    ];

    const { toDosState } = createState({
      toDosForInitialization,
    });

    toDosState.toggleToDoSelection({
      toDoId: 1,
    });

    toDosState.clearSelection();

    expect(toDosState.selectedToDoIds).to.deep.eq([]);
  });
}

function createState(
  {
    toDosForInitialization,
  }: {
    toDosForInitialization: unknown[];
  } = {
    toDosForInitialization: [],
  },
) {
  const toDosState = new ToDosState();

  toDosState.initialize({
    toDos: toDosForInitialization as ToDo[],
  });

  return {
    toDosState,
  };
}
