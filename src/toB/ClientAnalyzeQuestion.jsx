import { useEffect, useState, useCallback } from 'react'

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { visuallyHidden } from '@mui/utils';

import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useRefDetailState } from '../customHooks/useRefDetailState';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';

const BASE_API_ENDPOINT = import.meta.env.VITE_BASE_API_ENDPOINT;


const ClientAnalyzeQuestion = () => {

  const navigate = useNavigate();

  return (
    <div className='main-container__analysis'>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography onClick={()=>navigate(-2)}>ホーム</Typography>
        <Typography onClick={()=>navigate(-1)}>データ解析</Typography>
        <Typography color="text.primary">詳細</Typography>
      </Breadcrumbs>

      <h1>データ解析 詳細</h1>

      {/* overview */}
      <QuestionOverview />


      {/* 質問箇所 */}
      <EnhancedTable />
    </div>
  )
}

const QuestionOverview = () => {

  const {source, ref_id} = useParams();

  const reference = useRefDetailState({
    'source_id': source,
    'ref_id': ref_id,
  })

  return (
    <Box sx={{ width: '100%' }} padding='20px'>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {reference['source']} | {reference['target']}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {reference['text']}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

// Table -----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'date_created',
    numeric: false,
    disablePadding: false,
    label: '日付',
  },
  {
    id: 'question',
    numeric: false,
    disablePadding: false,
    label: '質問',
  },
  {
    id: 'answer',
    numeric: false,
    disablePadding: false,
    label: '回答',
  },
];

const DEFAULT_ORDER = 'desc';
const DEFAULT_ORDER_BY = 'date_created';
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align='center'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {

  return (
    <Toolbar
      sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          質問・回答一覧
        </Typography>
    </Toolbar>
  );
}

function EnhancedTable() {
  const {source, ref_id} = useParams();
  const [messages, setMessages] = useState([]);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [visibleRows, setVisibleRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${BASE_API_ENDPOINT}api/analytics/get_ref_messages/${source}/${ref_id}`);
      let temp_messages = result.data;
      for (let i = 0; i < temp_messages.length; i++) {
        let date = new Date(temp_messages[i]['date_created']);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let hour = ("0"+ date.getHours()).slice(-2);
        let minute = ("0" + date.getMinutes()).slice(-2);
        temp_messages[i]['date_created'] = `${year}/${month}/${day} ${hour}:${minute}`
      }
      setMessages(temp_messages)
    }
    fetchData()
  }, [])


  useEffect(() => {
    let rowsOnMount = stableSort(
      messages,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);
  }, [messages]);

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(messages, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage, messages],
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(messages, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - messages.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage, messages],
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(messages, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy, messages],
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <Box sx={{ width: '100%' }} padding="20px">
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row, index) => {
                    return (
                      <TableRow tabIndex={-1} key={row.id}>
                        <TableCell width="10%" align="left">
                          {row.date_created}
                        </TableCell>
                        <TableCell width="35%" align="left">
                          { dense? <Typography
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                              }}>
                              {row.question}
                            </Typography>:
                            <>
                              {row.question}
                            </>
                            }
                        </TableCell>
                        <TableCell width="55%" align="left">
                          { dense? <Typography
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                            }}>
                            {row.answer}
                          </Typography>:
                          <>
                            {row.answer}
                          </>
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
              {paddingHeight > 0 && (
                <TableRow
                  style={{
                    height: paddingHeight,
                  }}
                >
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={messages.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="縮小表示"
      />
    </Box>
  );
}

export default ClientAnalyzeQuestion