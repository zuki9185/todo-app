import * as types from "../constant/todoConstant";

const initialState = {
    todo: [],
}

const todoReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        // Add With Redux 
        // case types.ADD_TODO:
        //     let newArry = [...state.todo, payload]
        //     return {
        //         ...state,
        //         todo: newArry,
        //     }

            
        case types.GET_TODO:
            return {
                ...state,
                todo: payload
            }
        case types.DELETE_TODO:
            const removeItem = [...state.todo].filter((todo) => {
                return todo.id !== payload;
            });
            return {
                ...state,
                todo: removeItem,
            }
        case types.UPDATE_TODO:
            const removeItem2 = [...state.todo].filter((todo) => {
                return todo.id !== payload.id;
            });
            removeItem2.push(payload)
            return {
                ...state,
                todo: removeItem2,
            }

        default:
            return state;
    }
}
export default todoReducer;