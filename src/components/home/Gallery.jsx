import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    handleNewImage,
    handleDeleteImage,
    handleSlideshowSpeed,
    handlePauseSlideshow,
    handleWhiteBack
} from "../../features/settingsSlice";

const Gallery = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.settings.gallery);
    const [input, setInput] = useState(false);
    const [settings, setSettings] = useState(100);
    const [speedInput, setSpeedInput] = useState(false);
    const [speed, setSpeed] = useState(0);
    const slideshowSpeed = useSelector(state => state.settings.slideshowSpeed);
    const isSlidePlayed = useSelector(state => state.settings.isSlidePlayed);
    const useWhiteBack = useSelector(state => state.settings.useWhiteBack);

    useEffect(() => {
        setSpeed(parseInt(slideshowSpeed, 10));
    }, [slideshowSpeed]);

    const handleKeyDown = (e) => {
        e.key === 'Enter' && e.target.value.trim() && (
            setInput(false),
            dispatch(handleNewImage(e.target.value))
        )
        e.key === 'Escape' && setInput(false);
    }

    return (
        <div id='galleryWrapper' className="settingFooter">
            <div id='gallerySettingsBtn' onClick={() => setSettings(0)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div id="gallerySettingsMenu" style={{transform: `translate(-50%, -${settings}%)`}}>
                <p onClick={() => (setInput(!input), setSpeedInput(false))}>Add Image +</p>
                {input &&
                <input type="text" autoFocus onKeyDown={handleKeyDown} />}
                {!useWhiteBack &&
                <p onClick={() => (setSpeedInput(!speedInput), setSpeed(''), setInput(false))}>Slideshow Speed</p>}
                {speedInput &&
                <input type="range" min='1' max='10' value={speed || slideshowSpeed} onChange={e => setSpeed(parseInt(e.target.value, 10))} />}
                {speed && speedInput &&
                <p onClick={() => (dispatch(handleSlideshowSpeed(speed)), setSpeedInput(false))} style={{background: '#aca'}}>Apply {speed}s</p>}
                {!useWhiteBack &&
                <p onClick={() => dispatch(handlePauseSlideshow())}>{isSlidePlayed ? 'Pause' : 'Play'} Slideshow</p>}
                <p onClick={() => dispatch(handleWhiteBack())}>{useWhiteBack ? 'Use Image Background' : 'Use White Background'}</p>
                <p onClick={() => (setSettings(100), setSpeedInput(false), setInput(false))}>Close Menu</p>
            </div>
            <div id='gallery'>
                {images.map((image, index) =>
                <div
                key={image}
                style={{width: (index === images.length - 1 && index % 2 === 0) ? '100%' : '49%'}}
                title='Delete Image'
                onClick={() => confirm('Confirm deleting image') && dispatch(handleDeleteImage(image))}
                >
                    <img src={image} alt="Image" />
                </div>
                )}
            </div>
        </div>
    )
}

export default Gallery;