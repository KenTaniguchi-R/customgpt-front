import { useEffect, useRef, useState } from 'react';

import { Grid, TextField } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import HttpIcon from '@mui/icons-material/Http';
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { Radio } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { InputLabel } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { DropzoneArea } from "mui-file-dropzone";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import axios from 'axios';
import { useNavigate } from "react-router-dom";


import BASE_API_ENDPOINT from './vars/BASE_API_ENDPOINT';
import useCustomReducer from './reducers/useCustomReducer';
import { useAuthContext } from './contexts/AuthContext';
import { redirect_to_home } from './utils/utils';
import { get_chat_limit } from './utils/check_plan';
import MyBreadcrumbs from './components/MyBreadcrumbs';
import useNewChatReducer from './reducers/useNewChatReducer';
import { usePlanContext } from './contexts/PlanContext';

const CREATE_CHAT_URL = `${BASE_API_ENDPOINT}api/chat/create_chat/`


const NewChat = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState(null);
  const [converted, setConverted] = useState([]);
  const [type, setType] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [AImodel, setAImodel] = useState('GPT 3.5');
  const [isSent, setIsSent] = useState(false);

  const { hasPermC } = useAuthContext();
  const session_key = useRef('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{

      setIsSent(true);

      await axios.post(CREATE_CHAT_URL, {
          title: title,
          source: source,
          description: description,
          session_key: session_key.current,
          type: type,
          imagePreview: imagePreview,
          AImodel: AImodel,
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

    }catch (error){
      console.log(error)
      setIsSent(false);
      alert('Error')
    }
  }

  return (
    <div className='main-container__form'>
      <MyBreadcrumbs routes={['Home']} current='New Chat' />

      <h1>New Chat</h1>
      <form onSubmit={handleSubmit}>
        <div className='field-container'>
          <div className='form-field'>
            <DocTypeList state={source} setState={setSource} type={type} setType={setType}
              converted={converted} setConverted={setConverted} session_key={session_key} />
          </div>
          <div className='form-field'>
            <CustomTextField id="title-input" label="Title" state={title} setState={setTitle} rows={1} />
          </div>
          <div className='form-field'>
            <CustomTextField id="description-input" label="Description" multiline state={description} setState={setDescription} rows={4}/>
          </div>
          <div className='form-field'>
            <CustomDropzone type="image" label="Thumbnail" state={imagePreview} setState={setImagePreview} />
          </div>
          {
            !hasPermC &&
            <div className='form-field'>
              <CustomRadioSelect id="radio-choice" label="Choose a model" options={['GPT 3.5', 'GPT 4']} state={AImodel} setState={setAImodel} />
            </div>
          }

          <div className='form-field'>
            <SubmitButton isSent={isSent} />
          </div>
        </div>
      </form>
      {isSent && <SubmitNotice />}
    </div>
  )
}

const DocTypeList = ({ state, setState, type, setType, converted, setConverted, session_key={session_key} }) => {

  const [tempState, setTempState] = useState(null);
  const [tempType, setTempType] = useState('pdf');

  const [modalState, modalStateDispatch] = useNewChatReducer();

  const handleClickOpen = (new_type) => {
    setTempType(new_type);
    modalStateDispatch({type: 'MODAL_OPEN'});
  };

  const handleClose = () => {
    modalStateDispatch({type: 'MODAL_CLOSE'});
  };

  const handleConfirm = async () => {
    try{
      if (tempType === null){
        return
      }

      // console.log(tempState)
      // modalStateDispatch({type: 'SEND_REQUEST'});
      // let res = await axios.post(`${BASE_API_ENDPOINT}api/chat/get_converted/`, {
      //   source: tempState,
      //   type: tempType,
      // }, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
      // setConverted(res.data.upsert_data)
      // session_key.current = res.data.session_key;
      setState(tempState);
      setType(tempType);
      modalStateDispatch({type: 'SHOW_EXTRACTED'});
    }catch{
      modalStateDispatch({type: 'ERROR'});
    }
  }

  return (
    <>
    <Grid container id="chat_list" spacing={2} padding={3} alignItems="stretch">
      <Grid item xs={6} sm={6} md={3} lg={3} maxWidth="md">
        <DocTypeButton type="pdf" current={type} label='From PDF' icon={<PictureAsPdfIcon />} handleClickOpen={() => handleClickOpen('pdf')} />
      </Grid>
      <Grid item xs={6} sm={6} md={3} lg={3} maxWidth="md">
        <DocTypeButton type="url" current={type} label='From URL' icon={<HttpIcon />} handleClickOpen={() => handleClickOpen('url')} />
      </Grid>
      <Grid item xs={6} sm={6} md={3} lg={3} maxWidth="md">
        <DocTypeButton type="csv" current={type} label='From CSV' icon={<BorderAllIcon />} handleClickOpen={() => handleClickOpen('csv')} />
      </Grid>
      <Grid item xs={6} sm={6} md={3} lg={3} maxWidth="md">
        <DocTypeButton type="text" current={type} label='From Text' icon={<TextFieldsIcon />} handleClickOpen={() => handleClickOpen('text')} />
      </Grid>
    </Grid>
    { modalState.isOpen && !modalState.showExtracted ?
      <SourceDialog handleClose={handleClose} handleConfirm={handleConfirm}
        type={tempType} state={tempState} setState={setTempState} modalState={modalState}/>:
      modalState.isOpen && modalState.showExtracted ?
      <ExtractedSource handleClose={handleClose} converted={converted} modalStateDispatch={modalStateDispatch}/>:
      <></>
    }
  </>
  )
}

const SourceDialog = ({handleClose, handleConfirm, type, state, setState, modalState}) => {

  const { myPlan } = usePlanContext();
  let limits = get_chat_limit(myPlan);

  let title;
  let description;
  let field;
  switch (type) {
    case 'pdf':
      title = 'From PDF';
      description = `Upload pdf files. ${limits.pdf_t} Takes 1-2 seconds per page`;
      field = <CustomDropzone type="pdf" state={state} setState={setState} />
      break;
    case 'url':
      title = 'From URL';
      description = `Add URLs here. ${limits.url_t} Takes 5-10 seconds per link`;
      field = <CustomTextField id="url-input" state={state} setState={setState} rows={10} multiline />
      break;
    case 'csv':
      title = 'From CSV'
      description = 'Upload CSV files here. They have to have two columns, text and reference_name'
      field = <CustomDropzone type="csv" state={state} setState={setState} />
      break;
    case 'text':
      title = 'From Text'
      description = 'Add texts here. '
      field = <CustomTextField id="url-input" state={state} setState={setState} rows={10} multiline />
      break;
    default:
  }

  const [ getMoreState, getMoreDispatch ] = useCustomReducer();

  const handleFindUrl = async() => {
    if (state === null || state === '') return;
    getMoreDispatch({type: 'SUBMIT'});
    try{
      const res = await axios.post(`${BASE_API_ENDPOINT}api/chat/find_more_url/`,{
        urls: state
      });
      const url = res.data.urls;
      setState(url);
      getMoreDispatch({type: 'SUCCESS'});
    }catch{
      getMoreDispatch({type: 'RESET'});
    }
  }

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
        {field}
      </DialogContent>
      <DialogActions>
        {type === 'url' &&
            getMoreState.isLoading ?
            <Button style={{flex: '1 0 0'}}><CircularProgress size={20} /></Button>:
            <Button onClick={handleFindUrl} style={{flex: '1 0 0'}}>Get More URLs</Button>
        }
        <Button onClick={handleClose} style={{flex: '1 0 0'}}>Cancel</Button>
        {
          modalState.isLoading ?
          <Button style={{flex: '1 0 0'}}><CircularProgress size={20} /></Button>:
          <Button onClick={() => handleConfirm(type)} style={{flex: '1 0 0'}}>Submit</Button>
        }
      </DialogActions>
    </Dialog>
  )

}

const ExtractedSource = ({handleClose, state, setState, converted, modalStateDispatch}) => {

  const handleEdit = () => {
    modalStateDispatch({type: 'CANCEL_EXTRACTED'});
  }

  return (
    <Dialog open>
      <DialogTitle>This will be used</DialogTitle>
      <DialogContent>
        {
          converted.map((item, index) => {
            return (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{item[1]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    component='pre'
                    style={{whiteSpace: 'pre-wrap'}}
                  >
                    {item[0]}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEdit} style={{flex: '1 0 0'}}>Edit</Button>
        <Button onClick={handleClose} style={{flex: '1 0 0'}}>Close</Button>
      </DialogActions>
    </Dialog>
  )

}

const DocTypeButton = ({type, current, label, icon, handleClickOpen}) => {
  return (
    <Button variant={type === current ? "contained":"outlined"} className='doc-type__btn' startIcon={icon} onClick={()=> handleClickOpen(type)}>
      {label}
    </Button>
  )
}

const CustomDropzone = ({type, label, state, setState}) => {

  const { myPlan } = usePlanContext();
  let limits = get_chat_limit(myPlan);

  return (
    <>
      <InputLabel component="legend">{label}</InputLabel>
      {
        type === 'image' ?
          <DropzoneArea
            acceptedFiles={['image/*']}
            filesLimit={1}
            required
            showFileNames
            dropzoneText="Upload a image"
            onChange={(files) => setState(files[0])}
          /> :
          type === 'pdf' ?
            <DropzoneArea
              acceptedFiles={['.pdf']}
              filesLimit={2}
              required
              showFileNames
              dropzoneText="Upload pdf files"
              maxFileSize={limits.pdf * 10000000000000000000}
              onChange={(files) => setState(files)}
            />:
              <DropzoneArea
                acceptedFiles={['.csv']}
                filesLimit={1}
                required
                showFileNames
                dropzoneText="Upload csv files"
                onChange={(files) => setState(files[0])}
              />
      }
    </>
  )
}

const CustomTextField = ({id, label, multiline, state, setState, rows}) => {
  return (
    <FormControl fullWidth>
      <FormLabel component="legend">{label}</FormLabel>
      <TextField
        id={id}
        fullWidth
        required
        multiline={multiline}
        minRows={rows}
        value={state}
        onChange={(event) => setState(event.target.value)}
        />
    </FormControl>
  )
}

const CustomRadioSelect = ({id, label, options, state, setState}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={id} name={id} defaultValue={state} value={state} onChange={(e)=>{setState(e.target.value)}}>
        {options.map((option, index) => {
          return (
            <FormControlLabel key={index}  value={option} control={<Radio />} label={option} />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}

const SubmitButton = ({isSent}) => {
  return (
    <>
    {
      !isSent ?
      <Button variant="contained" type="submit">Submit</Button>:
      <Button variant="contained" disabled><CircularProgress size={25}/></Button>
    }
    </>
  )
}

const SubmitNotice = () => {
  const {hasPermC} = useAuthContext();
  const navigate = useNavigate();

  const handleClose = () => {
    redirect_to_home(navigate, hasPermC);
  }

  // back to home after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      redirect_to_home(navigate, hasPermC);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog
      open
    >
      <DialogTitle id="alert-dialog-title">
        {/* {"チャットを作成中です。"} */}
        Creating a chat...
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* 作成が完了次第ホーム画面に追加されます。10秒後に自動的にホーム画面に戻ります。 */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {/* ホームへ戻る */}
          Back to Home
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewChat