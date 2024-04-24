import { useSelector } from "react-redux";

const Progress = () => {
    const tasks = useSelector(state => state.tasks.tasks);
    let done = 0;
    let other = 0;

    tasks.forEach(task => {
        task.columnName === 'Done' ? done ++ : other ++
    });

    const style = {
        background: `conic-gradient(#06f 0 ${done / tasks.length * 100}%, #ddd ${done / tasks.length * 100}% ${done / tasks.length * 100 + other}%)`
    }

    return (
        <>
        <p>All tasks: {tasks.length}</p>
        <p>Done: {done}</p>
        <p>Others: {other}</p>
        <div id='progressWrapper'>
            <div id="progress" style={style}>
                <div id='progressInnerCircle'></div>
            </div>
        </div>
        </>
    )
}

export default Progress;