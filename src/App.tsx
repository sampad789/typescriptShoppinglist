import React, { Fragment, useState } from "react";
import "./App.css";

// ANCHOR  Type variables (event type )
type FormElem = React.FormEvent<HTMLFormElement>;

// Typescript interface
interface IItem {
  text: string;
  complete: boolean;
}
export default function App(): JSX.Element {
  // Using hooks
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<IItem[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addItem(value);
    setValue("");
  };
  const addItem = (text: string): void => {
    const newItems: IItem[] = [...items, { text, complete: false }];
    setItems(newItems);
  };

  const completeItem = (index: number): void => {
    const newItems: IItem[] = [...items];
    newItems[index].complete = !newItems[index].complete;
    setItems(newItems);
  };
  const deleteItem = (index: number): void => {
    const newItems: IItem[] = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <Fragment>
      <div className="App">
        <h1>Shopping list </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            required
          />
          <button type="submit">Add Item </button>
        </form>
        <section>
          {items.map((item: IItem, index: number) => {
            return (
              <Fragment key={index}>
                <div
                  style={{
                    textDecoration: item.complete ? " red line-through " : ""
                  }}
                >
                  {item.text}
                </div>
                <button
                  type="button"
                  style={{ background: "yellow", margin: "5px" }}
                  onClick={() => completeItem(index)}
                >
                  {item.complete ? "Uncheck" : "Check"}
                </button>
                <button type="button" onClick={() => deleteItem(index)}>
                  &times;
                </button>
              </Fragment>
            );
          })}
        </section>
      </div>
    </Fragment>
  );
}
