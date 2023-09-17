import React, { FC } from 'react'

interface ModalProps {
    modalOpen: boolean
    setModalOpen: (open: boolean) => boolean | void
    children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {

    return <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                    onClick={() => setModalOpen(false)}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            {children}
        </div>
    </div>
}

export default Modal