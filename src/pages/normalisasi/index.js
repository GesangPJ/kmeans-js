// Halaman Normalisasi Dataset

// Menampilkan hasil normalisasi sebelumnya
// Tombol aksi menjalankan normalisasi dengan data terbaru

import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import SendIcon from '@mui/icons-material/Send'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const columns = [
  { id: 'tanggaljam', label: 'Tanggal Jam', maxWidth: 100, align: 'left', sortable: true },
  { id: 'suhu', label: 'Suhu', align: 'left', sortable: true },
  { id: 'pH', label: 'pH', align: 'left', sortable: true },
  { id: 'kelembaban', label: 'Kelembaban', align: 'left', sortable: true },
  { id: 'kondisi', label: 'Kondisi', align: 'left', sortable: false } // No sorting for this column
]

// Fungsi Sortir kolom
function createData(tanggaljam, suhu, pH, kelembaban, kondisi) {
  return { tanggaljam, suhu, pH, kelembaban, kondisi };
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

// Get sorting order (asc or desc)
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

const DatasetNormalisasi = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sorting, setSorting] = useState({ column: 'tanggaljam', direction: 'asc' })

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



  /*
    useEffect(() => {
      // Fetch data from the server
      fetch('http://localhost:3001/api/get-normalize-data')
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setErrorMessage('Error fetching data');
        });
    }, []);*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/get-normalize-data');
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

  const sortedData = data;

  const handleNormalizationClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/start-normalization', {
        method: 'POST',
      });
      if (response.ok) {
        // Normalization process started successfully
        console.log('Normalization process started.');

        // Reload the page to get the latest data
        window.location.reload();
      } else {
        console.error('Normalization process failed.');
      }
    } catch (error) {
      console.error('Error starting normalization process:', error);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader title="Normalisasi Dataset" titleTypographyProps={{ variant: 'h6' }} />
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleNormalizationClick}
          >
            Mulai Normalisasi
          </Button>
        </CardContent>
      </Card><br></br>
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
                          {sorting.column === column.id && (
                            <>
                              {sorting.direction === 'asc' ? (
                                <ArrowUpwardIcon fontSize="small" />
                              ) : (
                                <ArrowDownwardIcon fontSize="small" />
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={sortedData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default DatasetNormalisasi;