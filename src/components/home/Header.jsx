import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const columns = useSelector(state => state.columns.columns);

    return (
        <header>
            <nav>
                <img src="/src/images/logo.png" alt="Logo" />
                <ul>
                    <NavLink to='/'>
                        <li>Show all</li>
                    </NavLink>
                    <NavLink to='/columns/Todo'>
                        <li>Todo</li>
                    </NavLink>
                    {columns.map(column =>
                        <NavLink to={'/columns/' + column} key={column}>
                            <li>{column}</li>
                        </NavLink>
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