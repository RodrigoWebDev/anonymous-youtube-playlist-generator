import Swal from "sweetalert2";

export const showWarningPopup = (text) => {
  Swal.fire({
    title: `<strong>${text}</strong>`,
    icon: "warning",
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText: "OK",
  });
};

export const openPopup = ({ title, html, callBack, confirmButtonText }) => {
  Swal.fire({
    title,
    html,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText,
  }).then(({ isConfirmed }) => {
    if (isConfirmed) {
      callBack();
    }
  });
};
