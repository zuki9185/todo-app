import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, getTodo, updateTodo } from '../../redux/action/todoAction';
import './Todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Todo = () => {
  //Use Dispatch and Use Selector
  const dispatch = useDispatch();
  const { todo } = useSelector(state => state.todos);

  // for Add 
  const [inputData, setInputData] = useState('');

  // for Editing

  const [isEditing, setIsEditing] = useState(true);
  const [currentTodo, setCurrentTodo] = useState({});


  const date = new Date();
  const data = {
    createdAt: date,
    name: inputData
  }

  // Add Button Handler

  const btnHandler = () => {
    dispatch(addTodo(data));
    setInputData('');
  }

  //  Edit Button Handler

  const editHandle = (item) => {
    // set editing to true
    setIsEditing(false);
    // set the currentTodo to the todo item that was clicked
    setCurrentTodo(item);
  }

  function handleEditInputChange(e) {
    // set the new state value to what's currently in the edit input box
    setCurrentTodo({ ...currentTodo, name: e.target.value });
  }

  const updateHandler = () => {
    dispatch(updateTodo(currentTodo))
    setIsEditing(true);
  }

  useEffect(() => {
    dispatch(getTodo())
  }, [])
  
  return (

    <div className='main-div'>

      {
        isEditing ?
          <>
            <figure>
              <figcaption>Add Your List Here</figcaption>
            </figure>

            <div className='addItems'>
              <input
                className='inputSet'
                type="text"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Add items...."
              />
              <button
                style={{
                  border: '1px solid black',
                  borderLeft: 'none',
                  height: '30px'
                }}
                disabled={!inputData}
                onClick={btnHandler}> Add </button>
            </div>
            <br /><br />

            {
              todo.length > 0 ?
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>List Data</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todo.sort((a, b) => a.id - b.id).map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <button onClick={() => editHandle(item)}>Edit</button>
                            <button onClick={() => dispatch(deleteTodo(item.id))}>Delete</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table> : <></>
            }  </>
          : <>
            <figure>
              <figcaption>Update Your List Here</figcaption>
            </figure>

            <div className='addItems'>
              <input
                className='inputSet'
                type="text"
                value={currentTodo.name}
                onChange={handleEditInputChange}
                placeholder="Update items...."
              />
              <button
               style={{ border: '1px solid black', borderLeft: 'none', height: '30px' }} 
               disabled={!currentTodo.name}
               onClick={updateHandler}> update</button>
              <br />
              <br />
              <button onClick={() => setIsEditing(true)}>No,Cancel</button>
            </div>
          </>
      }

    </div>
  )
}

export default Todo;