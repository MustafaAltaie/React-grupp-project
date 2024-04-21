import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { columnDisplayHandler } from "../../features/columnSlice";
import { handleMenu } from "../../features/settingsSlice";

const Header = () => {
    const columns = useSelector(state => state.columns.columns);
    const dispatch = useDispatch();
    const style = useSelector(state => state.settings.header);
    const logoSize = style.logoSize;
    const headerSize = style.headerSize;
    const headerColor = style.headerColor;
    const textSize = style.textSize;
    const textColor = style.textColor;
    const wordSpace = style.wordSpace;

    const headerStyle = {
        height: headerSize ? headerSize + 'px' : 'unset',
        background: headerColor
    }

    const headerTextStyle = {
        fontSize: textSize ? textSize + 'px' : '18px',
        color: textColor
    }

    return (
        <header>
            <nav style={headerStyle}>
                <img src="/src/images/logo.png" alt="Logo" style={{width: logoSize ? logoSize + 'px' : '83px'}} />
                <ul style={{gap: wordSpace ? wordSpace + 'px' : '5px'}}>
                    <li style={headerTextStyle} onClick={() => dispatch(columnDisplayHandler(null))}>Show all</li>
                    <li style={headerTextStyle} onClick={() => dispatch(columnDisplayHandler('Todo'))}>Todo</li>
                    {columns.map((column, index) =>
                        <li style={headerTextStyle} key={index} onClick={() => dispatch(columnDisplayHandler(column))}>{column}</li>
                    )}
                </ul>
                <div>
                    <NavLink to='/login'>
                        <p style={headerTextStyle}><i className="fas fa-user-alt"></i></p>
                    </NavLink>
                    <NavLink to='/about'>
                        <p style={headerTextStyle}>About</p>
                    </NavLink>
                    <NavLink to='admin'>
                        <p style={headerTextStyle}>Admin <i className="fas fa-users-cog"></i></p>
                    </NavLink>
                    <div id="navSetting" title='Settings' onClick={() => dispatch(handleMenu(true))}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;