import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleBoards, handleResetBoard } from "../../features/settingsSlice";

const BoardSettings = () => {
    const dispatch = useDispatch();
    const storedBoardStyle = useSelector(state => state.settings.boards);
    const [boardBorderColor, setBoardBorderColor] = useState(storedBoardStyle.borderColor || undefined);
    const [boardBorderSize, setBoardBorderSize] = useState(storedBoardStyle.borderSize || undefined);
    const [boardBoardSize, setBoardBoardSize] = useState(storedBoardStyle.boardSize || undefined);
    const [boardGap, setBoardGap] = useState(storedBoardStyle.gap || undefined);
    const [boardRadius, setBoardRadius] = useState(storedBoardStyle.radius || undefined);

    useEffect(() => {
        setBoardBorderColor(storedBoardStyle.borderColor || undefined);
    }, [storedBoardStyle.borderColor]);

    useEffect(() => {
        setBoardBorderSize(storedBoardStyle.borderSize || undefined);
    }, [storedBoardStyle.borderSize]);

    useEffect(() => {
        setBoardBoardSize(storedBoardStyle.boardSize || undefined);
    }, [storedBoardStyle.boardSize]);

    useEffect(() => {
        setBoardGap(storedBoardStyle.gap || undefined);
    }, [storedBoardStyle.gap]);

    useEffect(() => {
        setBoardRadius(storedBoardStyle.radius || undefined);
    }, [storedBoardStyle.radius]);

    const handleBoardSettings = () => {
        const obj = {
            borderColor: boardBorderColor,
            borderSize: boardBorderSize,
            boardSize: boardBoardSize,
            gap: boardGap,
            radius: boardRadius
        }
        dispatch(handleBoards(obj));
    }

    return (
        <div className="settingFooter">
            <div>
                <p>Boarder Color</p>
                <input type="color" defaultValue={boardBorderColor || '#005fa8'} onChange={e => (setBoardBorderColor(e.target.value), handleBoardSettings())} />
                <p>{boardBorderColor || '#005fa8'}</p>
            </div>
            <div>
                <p>Border Thickness</p>
                <input type="range" min='0' max='50' value={boardBorderSize || 1} onChange={e => (setBoardBorderSize(e.target.value), handleBoardSettings())} />
            </div>
            <div>
                <p>Board Sizes</p>
                <input type="range" min='200' max='700' value={boardBoardSize || 400} onChange={e => (setBoardBoardSize(e.target.value), handleBoardSettings())} />
            </div>
            <div>
                <p>Gap Among Boards</p>
                <input type="range" min='0' max='80' value={boardGap || 0} onChange={e => (setBoardGap(e.target.value), handleBoardSettings())} />
            </div>
            <div>
                <p>Corner Radius Degree</p>
                <input type="range" min='0' max='100' value={boardRadius || 20} onChange={e => (setBoardRadius(e.target.value), handleBoardSettings())} />
            </div>
            <i onClick={() => dispatch(handleResetBoard())}>Reset Board Settings</i>
        </div>
    )
}

export default BoardSettings;