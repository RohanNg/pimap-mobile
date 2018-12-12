import { ImagePicker, Permissions } from 'expo'

export const pickImage = async () => {
  // Example https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

  if (status !== 'granted') {
    alert(
      'Hey! You might want to enable camera roll access for my app, they are good.',
    )
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  })
  return result
}
