import React from 'react'
import ForeCastList from '~/forecastlist/ForeCastList';
interface ForeCastListMbType {
    setCurrentIndex: (index: number) => void;
    showCelsius: boolean
}
const ForeCastListMb = ({ setCurrentIndex, showCelsius }: ForeCastListMbType) => {
  return (
    <div>
    <button
    className="btn"
    onClick={() => {
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
      if (modal) {
        modal.showModal(); // Open the modal
      } else {
        console.error("Modal not found");
      }
    }}
  >
    Open Modal
  </button>  
  <dialog id="my_modal_3" className="modal">
    <div className="modal-box">
      <form method="dialog">
        {/* Close button inside modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div className='mt-5'>
      <ForeCastList setCurrentIndex={setCurrentIndex} showCelsius={showCelsius}/>

      </div>
    </div>
  </dialog>
    </div>
  )
}

export default ForeCastListMb