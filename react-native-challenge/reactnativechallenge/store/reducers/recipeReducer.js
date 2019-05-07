const defaultState = {
    listmeals: [],
    keyword: '',
    randomdata: {},
    detailmeal: '',
    detailmodalstatus: false
}

function mealdata (state=defaultState, action) {
    switch (action.type) {
        case 'ALLDATA':
            return {
                ...state,
                listmeals: action.payload
            }    
        
        case 'SEARCHDATA':
            return {
                ...state,
                listmeals: action.payload.sortedArr,
                keyword: action.payload.keyword
            }
        
        case 'DETAILDATA':  
            return {
                ...state,
                detailmeal: action.payload.detailmeal,
                detailmodalstatus: action.payload.detailmodalstatus
            }
        
        case 'RANDOMDATA':
            return {
                ...state,
                randomdata: action.payload
            }    

        default:
            return state;
    }
}

export default mealdata