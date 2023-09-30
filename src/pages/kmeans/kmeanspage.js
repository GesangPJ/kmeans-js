import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const columns = [
  { id: 'tanggaljam', label: 'Tanggal Jam', maxWidth: 100, align: 'left', sortable: true },
  { id: 'suhu', label: 'Suhu', align: 'left', sortable: true },
  { id: 'pH', label: 'pH', align: 'left', sortable: true },
  { id: 'kelembaban', label: 'Kelembaban', align: 'left', sortable: true },
  { id: 'kondisi', label: 'Kondisi', align: 'left', sortable: false }, // No sorting for this column
  { id: 'cluster', label: 'Cluster', align: 'left', sortable: true }, // New column to show cluster number
];

function createData(tanggaljam, suhu, pH, kelembaban, kondisi, cluster) {
  return { tanggaljam, suhu, pH, kelembaban, kondisi, cluster };
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

const KMeansView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState({ column: 'tanggaljam', direction: 'asc' });
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnId) => {
    const isAsc = sorting.column === columnId && sorting.direction === 'asc';
    setSorting({ column: columnId, direction: isAsc ? 'desc' : 'asc' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/get-sensordata');
        if (response.ok) {
          const result = await response.json();
          setData(result); // Update data state
        } else {
          console.error('Error Mendapatkan Data Dari Sensor Data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch K-means results from MongoDB and update the 'kmeansResults' state
    const fetchKMeansResults = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/get-kmeans-results');
        if (response.ok) {
          const kmeansResult = await response.json();
          setKMeansResults(kmeansResult);
        } else {
          console.error('Error Fetching K-means Results');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchKMeansResults();
  }, []);

  const rows = data.map((row, index) => createData(row.tanggaljam, row.suhu, row.pH, row.kelembaban, row.kondisi, kmeansResults[index]?.cluster));

  const sortedData = stableSort(rows, getComparator(sorting.direction, sorting.column));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => column.sortable && handleSort(column.id)}
                  >
                    {column.label}
                    {column.sortable && (
                      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4px' }}>
                        {column.sortable && (
                          <div style={{ height: '24px' }}>
                            {sorting.column === column.id && sorting.direction === 'asc' && (
                              <ArrowUpwardIcon fontSize="small" />
                            )}
                            {sorting.column === column.id && sorting.direction === 'desc' && (
                              <ArrowDownwardIcon fontSize="small" />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.tanggaljam}>
                {columns.map((column) => {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof row[column.id] === 'number'
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default KMeansView;
