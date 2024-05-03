import TaskSettingMenu from "./TaskSettingMenu";
import propTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { handleFilterTasks } from "../../features/taskSlice";

const Task = ({ taskStyle, task, handleMouseDown }) => {
    const style = useSelector(state => state.settings.tasks);
    const imageSize = style.imageSize;
    const [menu, setMenu] = useState(false);
    const dispatch = useDispatch();
    const chosenAssignee = useSelector(state => state.tasks.assignee);
    const filterTasks = useSelector(state => state.tasks.filterTasks);

    return (
        <div className='task' id={task.id} style={taskStyle} onMouseDown={handleMouseDown}>
            <div className='taskSettingBtn' onClick={() => setMenu(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <TaskSettingMenu setMenu={setMenu} menu={menu} task={task} />
            <div style={{pointerEvents: 'none'}}>
                <div className='taskHeader'>
                    <div className="taskTitleSettingWrapper">
                        <p>{task.title}</p>
                    </div>
                    <div className='taskImageWrapper'>
                        {task.assignees.map(user =>
                        <img
                        className={(user.email === chosenAssignee.email && filterTasks) ? 'chosenUser' : ''}
                        key={user.id}
                        style={{width: imageSize ? imageSize + 'px' : '35px', height: imageSize ? imageSize + 'px' : '35px', border: (user.email === chosenAssignee.email && filterTasks) ? 'solid 4px #5f5' : 'none'}}
                        src={user.imageUrl}
                        alt="Image"
                        onClick={() => {dispatch(handleFilterTasks(user))}}
                        />)}
                    </div>
                </div>
                <p className='taskContent'>{task.content}</p>
                <div className='taskFooter'>
                    <h5>P{task.priority}</h5>
                    <div>
                        <p>Starts: {task.startDate}</p>
                        <p>Ends: {task.endDate}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

Task.propTypes = {
    taskStyle: propTypes.object,
    task: propTypes.object,
    handleMouseDown: propTypes.func
}

export default Task;