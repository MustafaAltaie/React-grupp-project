import propTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { handleModal, handleEdit } from "../../features/modalSlice";
import { removeTask } from '../../features/taskSlice';

const TaskSettingMenu = ({ menu, setMenu, task }) => {
    const dispatch = useDispatch();

    return (
        menu &&
        <div id='taskSettingMenu'>
            <p onClick={() => (setMenu(false), dispatch(handleModal(task)), dispatch(handleEdit(true)))}>Edit</p>
            <p onClick={() => dispatch(removeTask(task.id))}>Delete</p>
            <p onClick={() => setMenu(false)}>Close Menu</p>
        </div>
    )
}

TaskSettingMenu.propTypes = {
    menu: propTypes.bool,
    setMenu: propTypes.func,
    task: propTypes.object
}

export default TaskSettingMenu;