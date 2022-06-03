import Swal from 'sweetalert2'
import { dangerColor, primaryColor } from './colors'

const openPopup = ({
  title,
  html,
  confirmButtonText = 'Ok',
  cancelButtonText = 'Cancel',
  confirmButtonColor = primaryColor,
  cancelButtonColor = dangerColor,
  showCloseButton = true,
  focusConfirm = false,
  icon = '',
  confirmCallback = () => {},
  deniedCallback = () => {}
}) => {
  Swal.fire({
    title,
    html,
    showCloseButton,
    focusConfirm,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
    icon
  }).then(({ isConfirmed, isDenied }) => {
    if (isConfirmed) {
      confirmCallback()
    } else if (isDenied) {
      deniedCallback()
    }
  })
}

export default openPopup
