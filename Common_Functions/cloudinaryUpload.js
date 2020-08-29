const cloudinaryUpload = (photo, setUser, newUserData) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'ngeli_preset')
    data.append("cloud_name", "greglimo")
    fetch("https://api.cloudinary.com/v1_1/greglimo/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setUser({...User, image: data.secure_url})
        changeValue4({path: data.secure_url})
      }).catch(err => {
        console.log(err)
        Alert.alert("An Error Occured While Uploading")
      })
  }

  module.exports = cloudinaryUpload