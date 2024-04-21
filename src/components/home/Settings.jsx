import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleMenu, handleReset } from "../../features/settingsSlice";
import HeaderSettings from "./HeaderSettings";
import TaskSettings from "./TaskSettings";
import BoardSettings from "./BoardSettings";

const Settings = () => {
    const dispatch = useDispatch();
    const menu = useSelector(state => state.settings.menu);
    const [header, setHeader] = useState(false);
    const [tasks, setTasks] = useState(true);
    const [boards, setBoards] = useState(false);

    return (
        <div id='settingsContainer' style={{pointerEvents: menu ? 'unset' : 'none'}}>
            <div id="settingsMenu" style={{transform: `translate(${menu ? 0 : 100}%, -50%)`}}>
                <p title='Close Settings' className='closeSettings' onClick={() => dispatch((handleMenu(false)))}>X</p>
                {/* Header */}
                <div className="headerSettings">
                    <div className="settingHeader" onClick={() => (setHeader(!header), setTasks(false), setBoards(false))}>
                        <h3>Header Settings</h3>
                        <i className={`fas fa-chevron-${header ? 'down' : 'up'}`}></i>
                    </div>
                    {header &&
                    <HeaderSettings />
                    }
                </div>
                {/* Tasks */}
                <div className="taskSettings">
                    <div className="settingHeader" onClick={() => (setTasks(!tasks), setHeader(false), setBoards(false))}>
                        <h3>Task Settings</h3>
                        <i className={`fas fa-chevron-${tasks ? 'down' : 'up'}`}></i>
                    </div>
                    {tasks &&
                    <TaskSettings />
                    }
                </div>
                {/* Boards */}
                <div className="taskSettings">
                    <div className="settingHeader" onClick={() => (setBoards(!boards), setHeader(false), setTasks(false))}>
                        <h3>Board Settings</h3>
                        <i className={`fas fa-chevron-${boards ? 'down' : 'up'}`}></i>
                    </div>
                    {boards &&
                    <BoardSettings />
                    }
                </div>
                <button onClick={() => dispatch(handleReset())}>Reset All Settings</button>
            </div>
        </div>
    )
}

export default Settings;