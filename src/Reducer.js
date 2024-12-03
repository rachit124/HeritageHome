import { badgeClasses } from "@mui/material";

export const initialState = {
    basket: [],
    user: null,
};

//Selector
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price * (item.quantity || 1) + amount, 0);

const reducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_BASKET':
            const existingItemIndex = state.basket.findIndex(
                (basketItem) => basketItem.id === action.item.id
            );

            if (existingItemIndex >= 0) {
                // Item already in basket, increase the quantity
                const newBasket = [...state.basket];
                newBasket[existingItemIndex].quantity += 1; // Increase quantity
                return {
                    ...state,
                    basket: newBasket
                };
            } else {
                // Item not in basket, add it with quantity 1
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, quantity: 1 }],
                };
            }

        case 'CHANGE_QUANTITY':
                const updatedBasket = state.basket.map(item => {
                    if (item.id === action.id) {
                        return { ...item, quantity: action.quantity }; // Update quantity
                    }
                    return item;
                });
                return {
                    ...state,
                    basket: updatedBasket
                };

        case 'REMOVE_FROM_BASKET':
            
                const index = state.basket.findIndex(
                    (basketItem) => basketItem.id === action.id
                );
                let newBasket = [...state.basket];

                if(index>=0){
                    newBasket.splice(index, 1);
                }else{
                    console.warn(`not possible (id: ${action.id})not in the basket!`)
                }
                return{
                    ...state,
                    basket: newBasket
                }

        case 'SET_USER':
            return{
                ...state,
                user: action.user
            };

        case 'EMPTY_BASKET':
            return{
                ...state,
                basket: []
            }
            

        default:
            return state;
    }
}

export default reducer;