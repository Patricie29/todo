'use client'

import { ITask } from '@/types/tasks'
import { FC, FormEventHandler, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Modal from './Modal'
import { deleteTodo, editTodo } from '../api'

interface TaskProps {
    task: ITask
}

const Task: FC<TaskProps> = ({ task }) => {

    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await editTodo({
            id: task.id,
            text: taskToEdit
        })
        setOpenModalEdit(false)
        router.refresh()
    }

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id)
        setOpenModalDelete(false)
        router.refresh()
    }


    return <>
        <tr>
            <td className='w-full'>{task.text}</td>
            <td className='flex gap-5'>
                <FiEdit
                    onClick={() => setOpenModalEdit(true)}
                    size={20}
                    cursor='pointer'
                    className="text-blue-500" />
                {/*  edit modal */}
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className='font-bold text-lg'>Edit Task</h3>
                        <div className='modal-action'>
                            <input
                                value={taskToEdit}
                                onChange={(e) => setTaskToEdit(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full" />
                            <button type='submit' className='btn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>

                <FiTrash2
                    onClick={() => setOpenModalDelete(true)}
                    size={20}
                    cursor='pointer'
                    className="text-red-500"
                />
                {/*  delete modal */}
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className='text-lg'>Are you sure you want to delete this task?</h3>
                    <div className='modal-action'>
                        <button className='btn' onClick={() => handleDeleteTask(task.id)}>Yes</button>
                    </div>
                </Modal>
            </td>
        </tr>
    </>
}

export default Task