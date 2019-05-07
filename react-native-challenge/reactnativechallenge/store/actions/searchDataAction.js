import axios from 'axios'
export default function (payload) {
    
    const keyword = payload.keyword
    let regex = new RegExp(`${keyword}`,'i')
    let sortedArr = []

    return function(dispatch) {
        axios({
            method: 'GET',
            url: 'https://www.themealdb.com/api/json/v1/1/latest.php'
        })
            .then(meals => {
                const recipes = meals.data.meals

                recipes.forEach(meal => {
                    if(regex.test(meal.strMeal)){
                        sortedArr.push(meal)
                    }     
                });
    
                let obj = {
                    sortedArr, keyword
                }

                dispatch({
                    type: 'SEARCHDATA',
                    payload:  obj
                })
            })
            .catch(error => {
                console.log('ERROR Search Data' ,error)
            })
    }
}