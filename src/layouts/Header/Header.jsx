import React from 'react';
import './Header.css';
import { SearchOutlined } from '@ant-design/icons';

export default function Header({ setSearchQuery }) {
    const handleSearch = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.search.value);
    };

    return (
        <div className="header">
            <div className="logo">
                <a href="/"><img src="https://cehsoft.com/wp-content/uploads/2024/11/logo-ceh-new-02.png" alt="Logo" /></a>
            </div>
            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="search-input"
                />
                <button className="search-button" type="submit">
                    <SearchOutlined />
                </button>
            </form>
        </div>
    );
}
