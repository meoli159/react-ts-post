import style from './Modal.module.css';

type IProps = {
  children: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};
function Modal({ children, onClose }: IProps) {
  return (
    <>
      <div className={style.backdrop} onClick={onClose} />
      <dialog open className={style.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
