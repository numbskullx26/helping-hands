import React, { useState } from 'react';

function Education() {
  // Sample data
  const [items, setItems] = useState([
	{ id: 1, name: 'Mathematics' },
	{ id: 2, name: 'Physics' },
	{ id: 3, name: 'Chemistry' },
	// Add more items here
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Update search term
  const handleSearchChange = (event) => {
	setSearchTerm(event.target.value);
  };

  // Filter items based on search term
  const filteredItems = items.filter(item =>
	item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click on item
  const handleItemClick = (itemName) => {
	console.log(`${itemName} clicked`);
	// Here you can add actions like navigation
  };

  return (
	<div>
	  <h1>Education</h1>
	  <input
		type="text"
		placeholder="Search..."
		value={searchTerm}
		onChange={handleSearchChange}
	  />
	  <div>
		{filteredItems.map((item) => (
		  <div key={item.id} onClick={() => handleItemClick(item.name)} style={{ cursor: 'pointer' }}>
			{item.name}
		  </div>
		))}
	  </div>
	</div>
  );
}

export default Education;