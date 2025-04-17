
"use client"
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="bg-gray-900 text-white rounded-full px-4 pr-10 py-2 w-full focus:outline-none focus:ring-1 focus:ring-yellow-600"
      />
      <button 
        type="submit"
        className="absolute right-3 text-gray-400 hover:text-yellow-600"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
};

export default SearchBar;