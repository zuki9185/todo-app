import * as types from '../constant/todoConstant';
import firebase from '../../firebase-config';


// ADD with Redux

// export const addTodo = (payload) => async dispatch =>{

//     dispatch({ type:types.ADD_TODO,payload:payload})

// }


// ADD with FireBase

export const addTodo = (payload) => async dispatch => {

    firebase.firestore().collection('todos').add(payload);

}

// GET With Birebase

export const getTodo = () => async dispatch => {

    firebase.firestore().collection('todos').onSnapshot((query) => {
        let temp = [];
        query.forEach(doc => {
            temp.push(
                {
                    id: doc.id,
                    ...doc.data()
                }
            )
        })
        dispatch({ type: types.GET_TODO, payload: temp })
    })
}


//update With Redux 

// export const updateTodo = (payload) => async dispatch => {

//     dispatch({ type: types.UPDATE_TODO, payload: payload })

// }


export const updateTodo = (payload) => async dispatch => {

    firebase.firestore().collection('todos').doc(payload.id).update({
        name:payload.name,
    })

}


// Delete With Redux

// export const deleteTodo = (id) => async dispatch => {

//     dispatch({ type: types.DELETE_TODO, payload: id })

// }

// Delete With firebase

export const deleteTodo = (id) => async dispatch => {

    firebase.firestore().collection('todos').doc(id).delete();

}