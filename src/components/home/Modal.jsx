import { useSelector, useDispatch } from "react-redux";
import { handleCloseModal, handleEdit } from "../../features/modalSlice";
import { removeTask, updateTask } from "../../features/taskSlice";
import { useState, useEffect } from "react";

const Modal = () => {
    const displayModal = useSelector(state => state.modal.displayModal);
    const task = useSelector(state => state.modal.obj);
    const dispatch = useDispatch();
    const isEdit = useSelector(state => state.modal.isEdit);
    const [title, setTitle] = useState(task.title || '');
    const [content, setContent] = useState(task.content || '');
    const [endDate, setEndDate] = useState(task.endDate || '');

    const handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
            dispatch(handleEdit(false));
        }
    }

    useEffect(() => {
        setTitle(task.title || '');
    }, [task.title]);

    useEffect(() => {
        setContent(task.content || '');
    }, [task.content]);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
    }

    useEffect(() => {
        setEndDate(task.endDate || '');
    }, [task.endDate]);

    const handleEditOrUpdate = () => {
        if (!isEdit) dispatch(handleEdit(true));
        else {
            const obj = {
                id: task.id,
                title: title,
                content: content,
                endDate: endDate
            }
            dispatch(updateTask(obj));
            dispatch(handleCloseModal(false))
        }
    }

    return (
        <div id='modal' onKeyDown={e => handleEscapeKey(e)} style={displayModal ? {transform: 'translate(-50%, -50%)', opacity: 1, pointerEvents: 'all'} : {transform: 'translate(-70%, -50%)', opacity: 0, pointerEvents: 'none'}}>
            <div id="closeModal" title='Close' onClick={() => dispatch(handleCloseModal(false))}></div>
            <input value={title} onChange={handleChangeTitle} style={isEdit ? {border: 'dashed 2px #070', pointerEvents: 'unset'} : {border: 'none', pointerEvents: 'none'}} />
            <div id='priorityContent'>
                <h1>P{task.priority}</h1>
                <textarea value={content} onChange={handleChangeContent} style={isEdit ? {border: 'dashed 2px #070', pointerEvents: 'unset'} : {border: 'none', pointerEvents: 'none'}}></textarea>
            </div>
            <div id='modalUsers'>
                {task.assignees && task.assignees.map((user, index) =>
                    <div key={index}>
                        <img src={user.imageUrl} alt="Image" />
                        <p>{user.userName}</p>
                    </div>
                )}
            </div>
            <div id='modalSettings'>
                <h4>Task is located in <span>{task.columnName}</span> board</h4>
                {!isEdit &&
                <button onClick={() => (dispatch(removeTask(task.id), dispatch(handleCloseModal(false))))}>Delete</button>}
                <button onClick={() => handleEditOrUpdate()} style={{width: `${isEdit ? '500' : '200'}px`}}>{isEdit ? 'Save Changes' : 'Edit'}</button>
            </div>
            <div id='modalDate'>
                <p>Start Date: {task.startDate}</p>
                <p>End Date: 
                    <input
                    type="text"
                    value={endDate}
                    style={isEdit ? {border: 'dashed 2px #070', pointerEvents: 'unset'} : {border: 'none', pointerEvents: 'none'}}
                    onChange={handleChangeEndDate}
                    />
                </p>
            </div>
        </div>
    )
}

export default Modal;