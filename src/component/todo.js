import React, { useState, useEffect } from 'react'
import Logo from '../Logo.svg'
import { Button } from 'react-bootstrap';

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list)
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {


    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);



    const addItem = () => {
        if (!inputData) {
            alert('enter somethig...');
        }
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem) =>{
                    if(elem.id === isEditItem){
                        return{...elem, name: inputData}
                    }
                    return elem;
                })
            )

            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData])
            setInputData('')
        }
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });

        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        })
        setItems(updateditems)
    }

    const onKeyUp = (event: KeyboardEvent) => {
        if(event.key === 'Enter' || event.charCode === 13){
            addItem();
        }
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
     }, [items]);

    return (
        <div>
            <div className="main_div">
                <div className="child_div">
                    <div className="addItems">
                        <figure>
                            <img src={Logo} alt="TODOLOGO" />
                            <h3>ADD A LIST IN TODO APP</h3>
                        </figure>
                        <input type="text" placeholder="ADD ITEM..."
                            value={inputData} onChange={(e) => setInputData(e.target.value)} onKeyPress={onKeyUp}
                        />

                        {
                            toggleSubmit ? <Button className="add_btn" variant="success"  title="Add Item" onClick={addItem}>ADD ITEM</Button> :
                            <Button className="add_btn" variant="success" title="Update Item" onClick={addItem}>UPDATE ITEM</Button>
                        }

                    </div>
                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <Button className="todo_btn" variant="success" onClick={() => editItem(elem.id)}>EDIT ITEM</Button>
                                        <Button className="todo_btn" variant="danger" onClick={() => deleteItem(elem.id)}>DELETE</Button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Todo;