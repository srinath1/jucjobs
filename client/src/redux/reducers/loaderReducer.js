const initialState={
    loader:false
}
export const loaderReducer=(state=initialState,action)=>{

    switch(action.type){
        case 'LOADING':{
            return{
                ...state,
                loading:action.payload
            }
        }
        default:return state
    }

}
