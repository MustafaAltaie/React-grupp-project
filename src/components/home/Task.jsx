import TaskSettingMenu from "./TaskSettingMenu";
import propTypes from 'prop-types';
import { useSelector } from "react-redux";
import { useState } from "react";

const Task = ({ taskStyle, task, handleMouseDown }) => {
    const style = useSelector(state => state.settings.tasks);
    const imageSize = style.imageSize;
    const [menu, setMenu] = useState(false);

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
                        <img key={user.id} style={{width: imageSize ? imageSize + 'px' : '35px', height: imageSize ? imageSize + 'px' : '35px'}} src={user.imageUrl} alt="Image" />)}
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