import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { columnDisplayHandler } from "../../features/columnSlice";

const Header = () => {
    const columns = useSelector(state => state.columns.columns);
    const dispatch = useDispatch();

    return (
        <header>
            <nav>
                <img src="/src/images/logo.png" alt="Logo" />
                <ul>
                    <li onClick={() => dispatch(columnDisplayHandler(null))}>Show all</li>
                    <li onClick={() => dispatch(columnDisplayHandler('Todo'))}>Todo</li>
                    {columns.map((column, index) =>
                        <li key={index} onClick={() => dispatch(columnDisplayHandler(column))}>{column}</li>
                    )}
                </ul>
                <div>
                    <NavLink to='/login'>
                        <p><i className="fas fa-user-alt"></i></p>
                    </NavLink>
                    <NavLink to='/about'>
                        <p>About</p>
                    </NavLink>
                    <NavLink to='admin'>
                        <p>Admin <i className="fas fa-users-cog"></i></p>
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Header;