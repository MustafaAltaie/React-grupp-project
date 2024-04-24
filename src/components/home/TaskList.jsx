import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeTask } from "../../features/taskSlice";

const TaskList = () => {
    const tasks = useSelector(state => state.tasks.tasks);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const taskRefs = useRef({});

    useEffect(() => {
        const int = setInterval(() => {
            setCount(prevCount => prevCount < tasks.length ? prevCount + 1 : tasks.length)
        }, 70);

        return () => clearInterval(int);
    }, [count, tasks.length]);

    const handleDelete = (id) => {
        const delTimeout = setTimeout(() => {
            dispatch(removeTask(id));
        }, 400);

        if(taskRefs.current[id])
        taskRefs.current[id].style.transform = 'translateX(-100%)';

        return () => clearTimeout(delTimeout);
    }

    return (
        <div id='taskList'>
            <NavLink to='/'>
            <div id='adminLogo'>
                <img src="/src/images/logo.png" alt="Logo" />
            </div>
            </NavLink>
            <div id="taslListWrapper">
                {tasks.map((task, index) => 
                    <div
                        key={task.id}
                        className='listTask'
                        style={{transform: index < count && 'translateX(0)'}}
                        ref={el => taskRefs.current[task.id] = el}
                    >
                        <div>
                            <h1>P{task.priority}</h1>
                            <p>{task.title}</p>
                        </div>
                        <div>
                            <p>{task.content}</p>
                        </div>
                        <div>
                            <p>Starts: {task.startDate}</p>
                            <p>Ends: {task.endDate}</p>
                        </div>
                        <div>
                            <p>{task.columnName}</p>
                        </div>
                        <div>
                            {task.assignees.map(user => 
                            <img key={user.id} src={user.imageUrl} alt='UserImage' />
                            )}
                        </div>
                        <div onClick={() => handleDelete(task.id)}></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskList;