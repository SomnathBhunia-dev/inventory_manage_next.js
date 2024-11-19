// Reducer function
const inventoryReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                inventory: [...state.inventory, action.payload]
            };
        case 'UPDATE_PAYMENT':
            return {
                ...state,
                totalPayments: state.totalPayments + action.payload
            };
        default:
            return state;
    }
};
