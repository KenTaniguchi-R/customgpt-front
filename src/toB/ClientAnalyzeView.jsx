import { useEffect, useState, useCallback } from 'react'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { OpenLink } from '../components/OpenLink'
import { useAnalyticsState } from '../customHooks/useAnalyticsState'
import { useRefsState } from '../customHooks/useRefsState'

import { Card } from '@mui/material'
import { CardContent } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { visuallyHidden } from '@mui/utils';
import Breadcrumbs from '@mui/material/Breadcrumbs'

import { useParams } from 'react-router-dom';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useNavigate } from 'react-router-dom';

const ClientAnalyzeView = () => {

  const navigate = useNavigate();

  return (
    <div className='main-container__analysis'>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography className='pointer' onClick={()=>navigate(-1)}>ホーム</Typography>
        <Typography color="text.primary">データ解析</Typography>
      </Breadcrumbs>

      <h1>データ解析</h1>

      {/* overview */}
      <AnalysisOverview />

      {/* 質問箇所 */}
      <EnhancedTable />
    </div>
  )
}

const AnalysisOverview = () =>{

  const source_id = useParams().source;

  const analytics = useAnalyticsState({source_id: source_id})

  return (
    <div className='analysis_overview'>
        <Card className='overview_card-content'>
          <CardContent align="center" >
            <div className='card_content_main'>
              <ChatIcon fontSize='large' />
              <Typography variant="p">{analytics.total_messages}回</Typography>
            </div>
            <Typography variant="h5">総チャット回数</Typography>
          </CardContent>
        </Card>
        <Card className='overview_card-content'>
          <CardContent align="center">
            <div className='card_content_main'>
              <ChatIcon fontSize='large' />
              <Typography variant="p">{analytics.weekly_counts[analytics.weekly_counts.length - 1]}回</Typography>
            </div>
            <Typography variant="h5">本日のチャット回数</Typography>
          </CardContent>
        </Card>
        <Card >
          <CardContent>
            <LineChart weekly_counts={analytics.weekly_counts} />
          </CardContent>
        </Card>
      </div>
  )
}

// chart.js --------------------------------------------------------------------
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({weekly_counts}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: '1ヶ月のチャット回数推移',
      },
    },
  }
  const labels = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'チャット回数',
        data: weekly_counts,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <Line options={options} data={data} />
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
    id: 'page_number',
    numeric: false,
    disablePadding: false,
    label: 'ページ番号',
  },
  {
    id: 'text',
    numeric: false,
    disablePadding: false,
    label: 'テキスト',
  },
  {
    id: 'count',
    numeric: true,
    disablePadding: false,
    label: '参照回数',
  },
];

const DEFAULT_ORDER = 'desc';
const DEFAULT_ORDER_BY = 'count';
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow key={-1}>

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

        <TableCell key='detail' align='center'>詳細</TableCell>
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {

  return (
    <Toolbar
      sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          質問箇所一覧
        </Typography>
    </Toolbar>
  );
}

function EnhancedTable() {

  const source_id = useParams().source;
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [visibleRows, setVisibleRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const navigate = useNavigate();

  const references = useRefsState({source_id})

  useEffect(() => {
    let rowsOnMount = stableSort(
      references,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);

  }, [references]);

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(references, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage, references],
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage, references],
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(references, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy, references],
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDetail = (ref_id) => {
    navigate(`${ref_id}`)
  }

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
                  let has_link = row.page_number.includes('http');
                    return (
                      <TableRow tabIndex={-1} key={row.name}>
                        <TableCell width="20%" align="center">
                          {row.page_number}
                          <OpenLink has_link={has_link} href={row.page_number} />
                        </TableCell>
                        <TableCell width="52%" align="left">
                          { dense? <Typography
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                            }}>
                            {row.text}
                          </Typography>:
                          <>
                            {row.text}
                          </>
                          }
                        </TableCell>
                        <TableCell width="13%" align="right">{row.count}</TableCell>
                        <TableCell width="15%" align="center">
                          <Button onClick={()=> handleDetail(row.ref_id)}>詳細</Button>
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
          count={references.length}
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

export default ClientAnalyzeView