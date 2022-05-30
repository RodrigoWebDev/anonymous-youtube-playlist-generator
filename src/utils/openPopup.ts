import Swal from 'sweetalert2'
import { dangerColor, primaryColor } from './colors'

interface SwalTypes{
  title: string;
  html?: string;
  showCloseButton?: boolean;
  focusConfirm?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  icon?: string;
  confirmCallback?: () => void;
  deniedCallback?: () => void;
}

const openPopup = ({
  title,
  html,
  confirmButtonText = "Ok",
  cancelButtonText = "Cancel",
  confirmButtonColor = primaryColor,
  cancelButtonColor = dangerColor,
  showCloseButton = true,
  focusConfirm = false,
  icon = "",
  confirmCallback = () => {},
  deniedCallback = () => {},
}: SwalTypes) => {
  //@ts-ignore
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
    }else if (isDenied){
      deniedCallback()
    }
  })
}

export default openPopup