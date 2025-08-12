// Filter Component
import { Filter as FilterIcon, CheckCircle2, Circle } from 'lucide-react';

const Filter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: FilterIcon },
    { key: 'pending', label: 'Pending', icon: Circle },
    { key: 'completed', label: 'Completed', icon: CheckCircle2 }
  ];

  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-2xl">
      {filters.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
            currentFilter === key
              ? 'bg-white text-blue-600 shadow-md transform scale-105'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default Filter;