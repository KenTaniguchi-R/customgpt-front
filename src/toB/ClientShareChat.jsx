import { useEffect, useState, useCallback } from 'react'

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
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';


import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { visuallyHidden } from '@mui/utils';

import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { useShareCodeState } from '../customHooks/useShareCodeState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';
import MyBreadcrumbs from '../components/MyBreadcrumbs';


const ClientShareChat = () => {

  const navigate = useNavigate();

  return (
    <div className='main-container__analysis'>
      <MyBreadcrumbs routes={['ホーム']} current='シェア' />

      <h1>シェア</h1>

      <EnhancedTable />
      <AddTrigger />
      <br></br>
      <br></br>

      <SharePublic />

    </div>
  )
}

const SharePublic = () => {

  const source_id = useParams().source;
  const code = useShareCodeState({source_id: source_id});
  const [copied, setCopied] = useState(false);

  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    setIsPublic(code.is_public);
  }, [code.is_public])
  console.log(code.is_public)

  const handleChange = async (event) => {
    let checked = event.target.checked;

    setIsPublic(checked);
    res = axios.post(`${BASE_API_ENDPOINT}api/chat/change_publicity/`, {
      source_id: source_id,
      is_public: checked,
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code.code)
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000)
  }

  return (
    <>
      <FormGroup>
        <FormControlLabel control={<Switch checked={isPublic} onChange={handleChange} />} label="一般公開" />
      </FormGroup>
      { isPublic &&
      <>
        <Typography variant="body2" gutterBottom component="div">
          このコードを共有すると、誰でもこのチャットに参加できます。クリックでコピーされます。
        </Typography>
        <Tooltip title={copied ? 'コピーしました': 'クリックでコピー'}>
          <TextField fullWidth disabled id="share_id" value={code.code}
            style={{ cursor: 'pointer' }}
            onClick={handleCopy}
            InputProps={{
              startAdornment: <InputAdornment position="start"><ContentCopyIcon /></InputAdornment>,
            }}
            />
        </Tooltip>
      </>
        }
    </>
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
    label: '追加日',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'メールアドレス',
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

        <TableCell key='detail' align='center'>削除</TableCell>
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({search, handleSearch}) {

  return (
    <Toolbar
      sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          シェア済み一覧
        </Typography>
        <TextField id="outlined-basic" label="検索" variant="outlined" value={search} onChange={handleSearch} fullWidth />
    </Toolbar>
  );
}

function EnhancedTable() {

  const source_id = useParams().source;
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);

  const [shares, setShares] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${BASE_API_ENDPOINT}api/chat/get_shares/${source_id}`,{
        params: { search: search },
      });
      let temp_share = result.data;
      for (let i = 0; i < temp_share.length; i++) {
        let date = new Date(temp_share[i]['date_created']);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let hour = ("0"+ date.getHours()).slice(-2);
        let minute = ("0" + date.getMinutes()).slice(-2);
        temp_share[i]['date_created'] = `${year}/${month}/${day} ${hour}:${minute}`
        temp_share[i]['email'] = temp_share[i]['user']['email']
      }
      setShares(temp_share)
    }
    const delayDebounceFn = setTimeout(() => {
      fetchData()
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [search])

  useEffect(() => {
    let rowsOnMount = stableSort(
      shares,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);

  }, [shares]);

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(shares, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage, shares],
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

      const newPaddingHeight = 33 * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, rowsPerPage, shares],
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(shares, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy, shares],
  );

  const handleDelete = async (email) => {
    await axios.post(`${BASE_API_ENDPOINT}api/chat/delete_share/`, {
      source: source_id,
      email: email
    })
    setShares(shares.filter(share => share.email !== email))
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <Box sx={{ width: '100%' }} padding="20px">
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar search={search} handleSearch={handleSearch} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='small'
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
                      <TableRow tabIndex={-1} key={row.email}>
                        <TableCell width="20%" align="center">
                          {row.date_created}
                        </TableCell>
                        <TableCell width="50%" align="left">
                          <Typography
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                            }}>
                            {row.email}
                          </Typography>
                        </TableCell>
                        <TableCell width="30%" align="center">
                          <Button onClick={()=> handleDelete(row.email)} color="error">削除</Button>
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
          count={shares.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

const AddTrigger = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box sx={{ width: '100%' }} padding="20px">
      <Button variant="contained" color="primary" fullWidth onClick={handleClickOpen}>追加</Button>
    </Box>
    <AddDialog open={open} handleClose={handleClose} />
    </>
  )
}

const AddDialog = ({open, handleClose}) => {

  const [text, setText] = useState('');
  const source = useParams().source;

  const handleConfirm = async () => {

    const res = await axios.post(`${BASE_API_ENDPOINT}api/chat/share_chat/`, {
      text: text,
      source: source,
    })

    console.log(res )

    if (res.status === 200) {
      handleClose();
      setText('');
    }

  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>シェア追加</DialogTitle>
      <DialogContent>
        <DialogContentText>
          シェアするメールアドレスを入力してください。改行で複数のアドレスを登録することができます。
        </DialogContentText>
        <FormControl fullWidth>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            required
            multiline
            minRows={5}
            value={text}
            onChange={(event) => setText(event.target.value)}
            />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleConfirm}>確定</Button>
      </DialogActions>
    </Dialog>
  )

}


export default ClientShareChat