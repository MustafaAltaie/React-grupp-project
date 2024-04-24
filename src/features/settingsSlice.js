import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: false,
    header: JSON.parse(localStorage.getItem('headerSettings')) || {},
    tasks: JSON.parse(localStorage.getItem('taskSettings')) || {},
    boards: JSON.parse(localStorage.getItem('boardSettings')) || {},
    gallery: JSON.parse(localStorage.getItem('gallery')) || [],
    slideshowSpeed: localStorage.slideshowSpeed || 2,
    isSlidePlayed: JSON.parse(localStorage.getItem('isSlidePlayed')) || false,
    useWhiteBack: JSON.parse(localStorage.getItem('useWhiteBack')) || false,
    clockBackground: JSON.parse(localStorage.getItem('clockBackground')) || false
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        handleMenu: (state, action) => {
            state.menu = action.payload;
        },
        handleHeader: (state, {payload: {logoSize, headerSize, headerColor, textSize, textColor, wordSpace}}) => {
            state.header = {
                ...state.header,
                logoSize,
                headerSize,
                headerColor,
                textSize,
                textColor,
                wordSpace
            }
            localStorage.setItem('headerSettings', JSON.stringify(state.header));
        },
        handleResetHeader: (state) => {
            state.header = {};
            localStorage.removeItem('headerSettings');
        },
        handleTask: (state, {payload: {imageSize, padding, gap, radius, borderSize, borderColor, taskColor}}) => {
            state.tasks = {
                ...state.tasks,
                imageSize,
                padding,
                gap,
                radius,
                borderSize,
                borderColor,
                taskColor
            }
            localStorage.setItem('taskSettings', JSON.stringify(state.tasks));
        },
        handleResetTask: (state) => {
            state.tasks = {};
            localStorage.removeItem('taskSettings');
        },
        handleBoards: (state, {payload: {borderColor, borderSize, boardSize, gap, radius}}) => {
            state.boards = {
                ...state.boards,
                borderColor,
                borderSize,
                boardSize,
                gap,
                radius
            }
            localStorage.setItem('boardSettings', JSON.stringify(state.boards));
        },
        handleResetBoard: (state) => {
            state.boards = {};
            localStorage.removeItem('boardSettings');
        },
        handleNewImage: (state, action) => {
            if(state.gallery.some(image => image === action.payload)){
                alert('Image is already uploaded');
            } else {
                state.gallery = [...state.gallery, action.payload];
                localStorage.setItem('gallery', JSON.stringify(state.gallery));
            }
        },
        handleDeleteImage: (state, action) => {
            state.gallery = state.gallery.filter(image => image !== action.payload);
            localStorage.setItem('gallery', JSON.stringify(state.gallery));
        },
        handleSlideshowSpeed: (state, action) => {
            state.slideshowSpeed = action.payload;
            localStorage.slideshowSpeed = state.slideshowSpeed;
        },
        handlePauseSlideshow: (state) => {
            state.isSlidePlayed = !state.isSlidePlayed;
            localStorage.setItem('isSlidePlayed', JSON.stringify(state.isSlidePlayed));
        },
        handleWhiteBack: (state) => {
            state.useWhiteBack = !state.useWhiteBack;
            localStorage.setItem('useWhiteBack', JSON.stringify(state.useWhiteBack));
            if(state.useWhiteBack) state.isSlidePlayed = false;
            if(!state.useWhiteBack){
                state.clockBackground = false;
                localStorage.setItem('clockBackground', JSON.stringify(state.clockBackground));
            }
        },
        handleClockBackground: (state) => {
            state.clockBackground = !state.clockBackground;
            state.useWhiteBack = false;
            localStorage.setItem('useWhiteBack', JSON.stringify(state.useWhiteBack));
            localStorage.setItem('clockBackground', JSON.stringify(state.clockBackground));
        },
        handleReset: (state) => {
            state.header = {};
            localStorage.removeItem('headerSettings');
            state.tasks = {};
            localStorage.removeItem('taskSettings');
            state.boards = {};
            localStorage.removeItem('boardSettings');
        }
    }
});

export const { handleMenu,
    handleHeader,
    handleResetHeader,
    handleTask,
    handleResetTask,
    handleBoards,
    handleResetBoard,
    handleNewImage,
    handleDeleteImage,
    handleSlideshowSpeed,
    handlePauseSlideshow,
    handleWhiteBack,
    handleClockBackground,
    handleReset
} = settingsSlice.actions;

export default settingsSlice.reducer;