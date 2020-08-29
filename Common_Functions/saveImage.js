import axios from 'axios';
import { BASE_URL } from '../constants';

const saveImage = (user, image) => {
    console.log(user)
    axios({
        url: BASE_URL,
        method: 'post',
        headers: { security: 'public'},
        data: {
          query: `
          mutation {
            addimage (ownerid: ${user.id} , is_profile: true, image_url: "${image}" ){
                message
                ownerid
                is_profile
                image_url
            }
          }
            `
        }
      }).then((result) => {
        if(result.data.data.addimage.message){
          if(result.data.data.addimage.message == "Insert success"){
            // props.navigation.navigate('Sign Up', {name: 'Sign Up'})
            // props.ToggleAuth()
            return result.data.data.addimage.message;
          }
        }
        else{ 
            console.log(`resse ${result}`)
        }
      })
}

module.exports = saveImage