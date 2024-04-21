import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleHeader, handleResetHeader } from "../../features/settingsSlice";

const HeaderSettings = () => {
    const dispatch = useDispatch();
    const headerSettings = useSelector(state => state.settings.header);
    const [logoSize, setLogoSize] = useState(headerSettings.logoSize || undefined);
    const [headerSize, setHeaderSize] = useState(headerSettings.headerSize || undefined);
    const [headerColor, setHeaderColor] = useState(headerSettings.headerColor || undefined);
    const [textSize, setTextSize] = useState(headerSettings.textSize || undefined);
    const [textColor, setTextColor] = useState(headerSettings.textColor || undefined);
    const [wordSpace, setWordSpace] = useState(headerSettings.wordSpace || undefined);

    const handleHeaderSettings = () => {
        const obj = {
            logoSize: logoSize,
            headerSize: headerSize,
            headerColor: headerColor,
            textSize: textSize,
            textColor: textColor,
            wordSpace: wordSpace
        }
        dispatch(handleHeader(obj));
    }

    useEffect(() => {
        setLogoSize(headerSettings.logoSize || undefined);
    }, [headerSettings.logoSize]);

    useEffect(() => {
        setHeaderSize(headerSettings.headerSize || undefined);
    }, [headerSettings.headerSize]);

    useEffect(() => {
        setHeaderColor(headerSettings.headerColor || undefined);
    }, [headerSettings.headerColor]);

    useEffect(() => {
        setTextSize(headerSettings.textSize || undefined);
    }, [headerSettings.textSize]);

    useEffect(() => {
        setTextColor(headerSettings.textColor || undefined);
    }, [headerSettings.textColor]);

    useEffect(() => {
        setWordSpace(headerSettings.wordSpace || undefined);
    }, [headerSettings.wordSpace]);

    return (
        <div className="settingFooter">
            <div>
                <p>Logo Size</p>
                <input type="range" min='50' max='150' value={logoSize || 83} onChange={e => (setLogoSize(e.target.value), handleHeaderSettings())} />
            </div>
            <div>
                <p>Header Size</p>
                <input type="range" min='80' max='200' value={headerSize || 85} onChange={e => (setHeaderSize(e.target.value), handleHeaderSettings())} />
            </div>
            <div>
                <p>Text Size</p>
                <input type="range" min='12' max='30' value={textSize || 18} onChange={e => (setTextSize(e.target.value), handleHeaderSettings())} />
            </div>
            <div>
                <p>Gap Among Words</p>
                <input type="range" min='0' max='100' value={wordSpace || 5} onChange={e => (setWordSpace(e.target.value), handleHeaderSettings())} />
            </div>
            <div>
                <p>Header Color</p>
                <input type="color" defaultValue={headerColor || '#dddddd'} onChange={e => (setHeaderColor(e.target.value), handleHeaderSettings())} />
                <p>{headerColor || '#dddddd'}</p>
            </div>
            <div>
                <p>Text Color</p>
                <input type="color" defaultValue={textColor || '#000000'} onChange={e => (setTextColor(e.target.value), handleHeaderSettings())} />
                <p>{textColor || '#000000'}</p>
            </div>
            <i onClick={() => dispatch(handleResetHeader())}>Reset Header Settings</i>
        </div>
    )
}

export default HeaderSettings;