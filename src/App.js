import { useState, useEffect } from "react";

// const datas = [
//   {
//     description: "Lorem ipsum dolor",
//     packed: false,
//     id: 1,
//   },
//   {
//     description: "Lorem ipsum dolor",
//     packed: false,
//     id: 2,
//   },
//   {
//     description: "Lorem ipsum dolor",
//     packed: false,
//     id: 3,
//   },
// ];

export default function App() {
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState(function () {
    const storedItems = localStorage.getItem("item");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  function handelItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id == id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  useEffect(
    function () {
      localStorage.setItem("item", JSON.stringify(items));
    },
    [items]
  );
  return (
    <div className="App">
      <Input onHandelItem={handelItem} />
      <Items
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

function Input({ onHandelItem }) {
  const [description, setDescription] = useState("");
  function newData(e) {
    e.preventDefault();

    const newItems = {
      description,
      packed: false,
      id: Math.random() * 100,
    };
    onHandelItem(newItems);
    setDescription("");
  }
  return (
    <form className="boxInputBtn" onSubmit={newData}>
      <input
        type="text"
        placeholder="Add your Task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

function Items({ items, onToggleItem, onDeleteItem }) {
  return (
    <div className="containerItem">
      {items?.map((items) => (
        <Item
          item={items}
          key={items.id}
          onToggleItem={onToggleItem}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </div>
  );
}
function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <div className="item">
      <span
        style={item.packed ? { backgroundColor: "#EC407A" } : {}}
        onClick={() => onToggleItem(item.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </span>
      <p
        style={
          item.packed
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {item.description}
      </p>
      <svg
        onClick={() => onDeleteItem(item.id)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
      </svg>
    </div>
  );
}
