import React, { useEffect, useState } from 'react';
import { getData, postData } from '../api/ApiService';

interface DataItem {
  id: number;
  name: string;
  description: string;
}

const DataComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getData();
        setData(responseData);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddData = async () => {
    if (!newItem.name || !newItem.description) {
      setError('Both name and description are required.');
      return;
    }

    try {
      const responseData = await postData(newItem);
      setData([...data, responseData]);
      setNewItem({ name: '', description: '' }); // Limpiar el formulario
      setError(null);
    } catch (error) {
      setError('Error adding data');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}: {item.description}
          </li>
        ))}
      </ul>

      <h2>Add New Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <button onClick={handleAddData}>Add</button>
    </div>
  );
};

export default DataComponent;
