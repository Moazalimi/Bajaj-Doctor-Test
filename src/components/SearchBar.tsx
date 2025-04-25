import React, { useState, useEffect } from 'react';
import { Doctor } from '../types/Doctor';

interface SearchBarProps {
    doctors: Doctor[];
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ doctors, onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (query) {
            const matches = doctors
                .filter(doctor => doctor.name.toLowerCase().includes(query.toLowerCase()))
                .map(doctor => doctor.name)
                .slice(0, 3);
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    }, [query, doctors]);

    const handleClear = () => {
        setQuery('');
        onSearch('');
        setSuggestions([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
        setSuggestions([]);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-container">
                    <input
                        type="text"
                        data-testid="autocomplete-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search doctors..."
                        className="search-input"
                    />
                    {query && (
                        <button 
                            type="button" 
                            className="clear-button" 
                            onClick={handleClear}
                            aria-label="Clear search">
                            ✕
                        </button>
                    )}
                    <button 
                        type="submit" 
                        className="search-button"
                        aria-label="Search">
                        🔍
                    </button>
                </div>
                {suggestions.length > 0 && (
                    <ul className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                data-testid="suggestion-item"
                                onClick={() => {
                                    setQuery(suggestion);
                                    onSearch(suggestion);
                                    setSuggestions([]);
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
