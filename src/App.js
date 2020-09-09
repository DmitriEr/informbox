import React, { useState, useEffect } from 'react';
import getValue from './Services';
import './App.css';

function App() {
  const [items, setItems] = useState({});
  const [names, setNames] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getValue().then(value => setItems(value));
  }, [])

  useEffect(() => {
    if (typeof items.data !== 'undefined') {
      setNames(Object.keys(items.data[0]));
      setRows(items.data);
    }
  }, [items, setNames, setRows])

  const deletColumn = () => {
    return names.length < 5 ? getValue().then(value => setItems(value)) : null;
  }

  const showContent = (text, title) => {
    switch(title) {
      case 'name':
        return `${text[0].toUpperCase()}${text.substring(1, text.length)}`;
        break;
      case 'color':
        return (
             <>
               <span className="table__item-hex" style={{ backgroundColor: text }}></span>
               {text}
             </>
           )
        break;
      default:
        return text;
    }
  }

  const deleteColumn = (e) => {
    const value = e.target.name;
    const newNames = names.filter(item => item !== value);
    const arr = rows.map((item) => {
      delete item[value];
      return item;
    })
    setNames(newNames);
    setRows(arr);
  }

  return (
    <div className="wrapper">
      <div className="header">
        <h1 className="header__title">Pantone colors</h1>
        <button 
          className={names.length === 5 ? 'header__button' : 'header__button header__button-active'} 
          onClick={deletColumn}
        >
          <span>
            ↺
          </span>
          Reset
        </button>
      </div>
      <table>
        <thead>
          <tr className="table__header-row">
            {names.map((name, index) => {
              return (
                <td
                  key={name}
                  className={`table__column-${name} table__column table__column-header`}
                >
                  <input 
                    type="checkbox"
                    className="table__header-checkbox"
                    onChange={(e) => e.preventDefault()}
                    name={name}
                    onClick={deleteColumn}
                    checked
                    />
                    {name.replace(/(_)/g, ' ')}
                </td>
              )
            })}
          </tr>
        </thead>
        <tbody className="table__body">
          {rows.map((row, index) => {
            return(
              <tr key={row.id} className="table__body-row">
                 {Object.entries(row).map((column, index) => {
                  const [title, text] = column;
                  return (
                    <td key={text}
                      className={`table__column-${title} table__column`}
                    >
                      {showContent(text, title)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

}

export default App;
