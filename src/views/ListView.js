 

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

const ListView = () => {
  const [universities, setUniversities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('universities');
        if (cachedData) {
          setUniversities(JSON.parse(cachedData));
        } else {
          const response = await axios.get('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
          const dataWithId = response.data.map((item, index) => ({
            ...item,
            id: index.toString(),  // Generate id based on the index
          }));
          setUniversities(dataWithId);
          localStorage.setItem('universities', JSON.stringify(dataWithId));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  const handleRowClick = useCallback((id) => {
    // Your code to handle row clicking goes here
  }, [universities]);
 
  const handleDelete = useCallback((id) => {
    console.log("Deleting university with ID:", id); 

   
    console.log("Deleting university with ID:", id);
    const updatedUniversities = universities.filter(university => university.id !== id);
    setUniversities(updatedUniversities);
    localStorage.setItem('universities', JSON.stringify(updatedUniversities));
  }, [universities]);  // Dependency on universities

  const data = React.useMemo(() => universities, [universities]);

  const columns = React.useMemo(
    () => [
      {
        Header: '🔽Name',
        accessor: 'name',
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
      {
  
        accessor: 'state-province',
      },
      {
        Header: 'Website',
        accessor: 'web_pages',
        Cell: ({ value }) => (<a href={value[0]} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>{value[0]}</a>)

      },
      {
        Header: 'Actions',
        Cell: ({ row }) => {
          console.log(row); // Add this line to check the structure of the row object
          return <button style={{background:'black',color:'white'}} onClick={() => handleDelete(row.original.id)}>Delete</button>;
        }
      }
      
      
      
    ],
    [handleDelete]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return ( 
    <div style={{ 
    
    }}>
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif' ,fontWeight:'bold'}}>List of Universities</h1>
        <div style={{ textAlign: 'center' }}>
          <input
            type="text"
            value={globalFilter || ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search universities..."
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '2px solid #ccc',
              width: '80%',
              margin: 'auto',
              boxSizing: 'border-box',
              marginBottom: '20px',
            }}
          />
        </div>
      </div>
  
      <table {...getTableProps()} style={{ 
        borderCollapse: 'collapse', 
        fontFamily: 'Arial, sans-serif', 
        width: '80%', 
        margin: 'auto', 
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'box-shadow 0.3s ease-in-out', // Add transition for box-shadow
        '&:hover': {
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)', // Increase box-shadow on hover
        },
      }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: '2px solid #ddd',
                    background: 'black',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '18px',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                  borderBottom: '1px solid #ddd',
                }}
                onClick={() => handleRowClick(row.original.id)}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '14px',
                      textAlign: 'left',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  
};

export default ListView;





 