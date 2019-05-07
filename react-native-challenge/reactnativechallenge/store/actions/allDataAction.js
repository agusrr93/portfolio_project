import axios from 'axios'

export default function (){
    return function (dispatch){
        axios({
            method: 'GET',
            url: 'https://www.themealdb.com/api/json/v1/1/latest.php'
        })
        .then(meals => {
            dispatch({
                type: 'ALLDATA',
                payload: meals.data.meals 
             })
          })
          .catch(error => {
            console.log('ERROR Get All recipes' ,error)
          })
    }
}