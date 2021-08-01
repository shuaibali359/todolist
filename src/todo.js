import React, { useEffect, useState } from 'react'
import './style.css';
const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return  JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEdition, setEditItem] = useState(null);
    //add items
    const addItem = () => {
        if (!inputData) {
            alert('plss fill the data');
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEdition) {
                        return{ ... elem, name:inputData}
                    }
                    return elem;
                })   
            )
            setToggleSubmit(true);
            setInputData('');
            setEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
         setItems([...items, allInputData]);
        setInputData('');   
        }
    }
    // add items by enter key
    const handlekeyPress = (evt) => {
        if (evt.which === 13) {
             if (!inputData) {
            alert('plss fill the data');
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEdition) {
                        return{ ... elem, name:inputData}
                    }
                    return elem;
                })   
            )
            setToggleSubmit(true);
            setInputData('');
            setEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
         setItems([...items, allInputData]);
        setInputData('');   
        }
        }
        }

    //delete items
    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });
        setItems(updateditems);
    }

    //Edit item
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setEditItem(id);
    }

    //remove All
    const removeAll = () => {
        setItems([]);
    }

    // store local storage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);
    return (
        <>
            <div className="container">
        <div className="main-div">
                <div className="todo-box">
                        <h2>Todo App</h2>
                    <div className="input-field">
                    <input type="text" placeholder="write your today.."
                        value={inputData}
                                onChange={(e) => setInputData(e.target.value)}
                                onKeyPress={handlekeyPress}
                            />
                            {
                                toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                    <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                            }
                            </div>
            </div>
                <div className="showItem">
                    
                    {
                        items.map((elem, ind) => {
                            return (
                                 <div className="each-items" key={elem.id}>
                                    <p>{elem.name}</p>
                                    <span><i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i></span>
                                    <span><i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i></span>
                                </div>
                            )
                        })
                    }
            </div>
            <div className="show-btn">
                <button className="btn" value="Remove All" onClick={removeAll}>Remove All</button>
            </div>
                </div>
                </div>
        </>
    )
}

export default Todo;