import axios from 'axios';
import { BASE_URL } from '../constants';

const deleteImage = (user, image) => {
    // console.log(user)
    return axios({
        url: BASE_URL,
        method: 'post',
        headers: { security: 'public'},
        data: {
          query: `
          mutation {
            deleteImage (ownerid: ${user.id} , image_url: ${image} ){
                message
            }
          }
            `
        }
      }).then((result) => {
        if(result.data.data.deleteImage.message){
          if(result.data.data.deleteImage.message == "Insert success"){
            // props.navigation.navigate('Sign Up', {name: 'Sign Up'})
            // props.ToggleAuth()
            return result.data.data.deleteImage.message;
          }
        }
        else{ 
            console.log(`resse ${result}`)
        }
      })
}

module.exports = deleteImage