import ImagePicker from 'react-native-image-crop-picker';

const onSelectImage = (cloudinaryUpload)=>{
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
       cropping: true
    }).then(image => {
      const source = {
        uri: image.path,
        type: image.mime,
        name: "thisimage",
      }
      cloudinaryUpload(source)
      console.log(source);
      // changeValue4(image)
    }).catch((err) => {
      console.log(`erro is ${err}`)
    })
  }

  module.exports = onSelectImage