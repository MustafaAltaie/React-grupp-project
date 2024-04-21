import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleTask, handleResetTask } from "../../features/settingsSlice";

const TaskSettings = () => {
    const dispatch = useDispatch();
    const storedTaskStyle = useSelector(state => state.settings.tasks);
    const [imageSize, setImageSize] = useState(storedTaskStyle.imageSize || undefined);
    const [padding, setPadding] = useState(storedTaskStyle.padding || undefined);
    const [gap, setGap] = useState(storedTaskStyle.gap || undefined);
    const [radius, setRadius] = useState(storedTaskStyle.radius || undefined);
    const [borderSize, setBorderSize] = useState(storedTaskStyle.borderSize || undefined);
    const [borderColor, setBorderColor] = useState(storedTaskStyle.borderColor || undefined);
    const [taskColor, setTaskColor] = useState(storedTaskStyle.taskColor || undefined);

    useEffect(() => {
        setImageSize(storedTaskStyle.imageSize || undefined);
    }, [storedTaskStyle.imageSize]);

    useEffect(() => {
        setPadding(storedTaskStyle.padding || undefined);
    }, [storedTaskStyle.padding]);

    useEffect(() => {
        setGap(storedTaskStyle.gap || undefined);
    }, [storedTaskStyle.gap]);

    useEffect(() => {
        setRadius(storedTaskStyle.radius || undefined);
    }, [storedTaskStyle.radius]);

    useEffect(() => {
        setBorderSize(storedTaskStyle.borderSize || undefined);
    }, [storedTaskStyle.borderSize]);

    useEffect(() => {
        setBorderColor(storedTaskStyle.borderColor || undefined);
    }, [storedTaskStyle.borderColor]);

    useEffect(() => {
        setTaskColor(storedTaskStyle.taskColor || undefined);
    }, [storedTaskStyle.taskColor]);

    const handleTaskSettings = () => {
        const obj = {
            imageSize: imageSize,
            padding: padding,
            gap: gap,
            radius: radius,
            borderSize: borderSize,
            borderColor: borderColor,
            taskColor: taskColor
        }
        dispatch(handleTask(obj));
    }

    return (
        <div className="settingFooter">
            <div>
                <p>Image Sizes</p>
                <input type="range" min='20' max='70' value={imageSize || 35} onChange={e => (setImageSize(e.target.value), handleTaskSettings())} />
            </div>
            <div>
                <p>Padding</p>
                <input type="range" min='0' max='50' value={padding || 20} onChange={e => (setPadding(e.target.value), handleTaskSettings())} />
            </div>
            <div>
                <p>Gap Among Tasks</p>
                <input type="range" min='0' max='100' value={gap || 20} onChange={e => (setGap(e.target.value), handleTaskSettings())} />
            </div>
            <div>
                <p>Corner Radius Degree</p>
                <input type="range" min='0' max='100' value={radius || 10} onChange={e => (setRadius(e.target.value), handleTaskSettings())} />
            </div>
            <div>
                <p>Border Thickness</p>
                <input type="range" min='0' max='20' value={borderSize || 1} onChange={e => (setBorderSize(e.target.value), handleTaskSettings())} />
            </div>
            <div>
                <p>Border Colors</p>
                <input type="color" defaultValue={borderColor || '#005fa8'} onChange={e => (setBorderColor(e.target.value), handleTaskSettings())} />
                <p>{borderColor || '#005fa8'}</p>
            </div>
            <div>
                <p>Task Colors</p>
                <input type="color" defaultValue={taskColor || '#dbdbdb'} onChange={e => (setTaskColor(e.target.value), handleTaskSettings())} />
                <p>{taskColor || '#dbdbdb'}</p>
            </div>
            <i onClick={() => dispatch(handleResetTask())}>Reset Task Settings</i>
        </div>
    )
}

export default TaskSettings;