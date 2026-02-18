const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h3>Filters</h3>

            <ul>
                <li className="active">All</li>
                    <li>Income</li>
                    <li>Expenses</li>
            </ul>

            <h3>Categories</h3>

            <ul>
                <li>Food</li>
                <li>Transport</li>
                <li>Rent</li>
                <li>Utilities</li>
                <li>General</li>
            </ul>
        </aside>
    );
};

export default Sidebar;