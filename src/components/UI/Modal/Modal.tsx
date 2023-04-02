import { ModalProps } from '../../../types'
import cl from './Modal.module.css'

export const Modal = ({props}: ModalProps)=> {

   return (
      <div
      className={`alert ${cl.modal} alert-${props.modalStatus}`}
      >
         {props.modalText}
      </div>
   )
}