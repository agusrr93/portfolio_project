import axios from 'axios'

export default function () {
    return function (dispatch) {
        axios({
            method: 'GET',
            url: 'https://www.themealdb.com/api/json/v1/1/random.php'
        })
        .then(meal => {
            dispatch({
                type: 'RANDOMDATA',
                payload: meal.data.meals[0] 
             })
          })
          .catch(error => {
            console.log('ERROR Get Random Data ' ,error)
          })
    }
}