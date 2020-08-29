import axios from 'axios'
import { BASE_URL } from '../../constants';

export const DeleteImage = (image)=>{
    axios({
        url: BASE_URL,
        method: 'post',
        data: {
          query: `
          {
            crushes(id: 713229238) {
              crusherid
              crushedid
              reacted
              mutual
              message
            }
          }
            `
        }
    }).then((result) => {
    
    });
}