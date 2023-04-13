import { useState } from 'react';

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
import { FormHelperText } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { DropzoneArea } from "mui-file-dropzone";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';


import axios from 'axios';
import { useNavigate } from "react-router-dom";


import BASE_API_ENDPOINT from './vars/BASE_API_ENDPOINT';
const CREATE_CHAT_URL = `${BASE_API_ENDPOINT}api/chat/create_chat/`


const NewChat = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState(null);
  const [type, setType] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [AImodel, setAImodel] = useState('GPT 3.5');
  const [isSent, setIsSent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSent(true);

    try{

      await axios.post(CREATE_CHAT_URL, {
          title: title,
          description: description,
          source: source,
          type: type,
          imagePreview: imagePreview,
          AImodel: AImodel,
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      navigate('/client/home/', { replace: true })
    }catch (error){
      console.log(error)
      setIsSent(false);
      alert('エラーが発生しました。')
    }

  }

  return (
    <div className='main-container__form'>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography onClick={()=>navigate(-1)}>ホーム</Typography>
        <Typography color="text.primary">新規作成</Typography>
      </Breadcrumbs>

      <h1>新規作成</h1>
      <form onSubmit={handleSubmit}>
        <div className='field-container'>
          <div className='form-field'>
            <DocTypeList setState={setSource} type={type} setType={setType} />
          </div>
          <div className='form-field'>
            <CustomTextField id="title-input" label="タイトル" state={title} setState={setTitle} rows={1} />
          </div>
          <div className='form-field'>
            <CustomTextField id="description-input" label="説明文" multiline state={description} setState={setDescription} rows={4}/>
          </div>
          <div className='form-field'>
            <CustomDropzone type="image" label="サムネイル画像 (1つのみ)" state={imagePreview} setState={setImagePreview} />
          </div>
          <div className='form-field'>
            <CustomRadioSelect id="radio-choice" label="モデル選択" options={['GPT 3.5', 'GPT 4']} state={AImodel} setState={setAImodel} />
          </div>

          <div className='form-field'>
            <SubmitButton isSent={isSent} />
          </div>
        </div>
      </form>
    </div>
  )
}

const DocTypeList = ({ setState, type, setType }) => {

  const [open, setOpen] = useState(false);
  const [tempState, setTempState] = useState(null);
  const [tempType, setTempType] = useState('pdf');

  const handleClickOpen = (new_type) => {
    setTempType(new_type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (new_type) => {
    setOpen(false);
    setState(tempState);
    setType(new_type);
  }

  return (
    <>
    <Grid container id="chat_list" spacing={2} padding={3} alignItems="stretch">
      <Grid item xs={6} sm={6} md={3} lg={3} maxWidth="md">
        <DocTypeButton type="pdf" current={type} label='PDFから作成' icon={<PictureAsPdfIcon />} handleClickOpen={handleClickOpen} />
      </Grid>
      <Grid item xs={6} sm={6} md={3} lg={3} maxWidth="md">
        <DocTypeButton type="url" current={type} label='URLから作成' icon={<HttpIcon />} handleClickOpen={handleClickOpen} />
      </Grid>
      <Grid item xs={6} sm={6} md={3} lg={3} maxWidth="md">
        <DocTypeButton type="csv" current={type} label='CSVから作成' icon={<BorderAllIcon />} handleClickOpen={handleClickOpen} />
      </Grid>
      <Grid item xs={6} sm={6} md={3} lg={3} maxWidth="md">
        <DocTypeButton type="text" current={type} label='テキストから作成' icon={<TextFieldsIcon />} handleClickOpen={handleClickOpen} />
      </Grid>
    </Grid>
    <SourceDialog open={open} handleClose={handleClose} handleConfirm={handleConfirm}
      type={tempType} state={tempState} setState={setTempState}/>
  </>
  )
}

const SourceDialog = ({open, handleClose, handleConfirm, type, state, setState}) => {

  let title;
  let description;
  let field;
  switch (type) {
    case 'pdf':
      title = 'PDFから作成';
      description = 'PDFファイルアップロードしてください。最大5MBまでです。';
      field = <CustomDropzone type="pdf" state={state} setState={setState} />
      break;
    case 'url':
      title = 'URLから作成';
      description = 'URLを入力してください。複数のURLを入力する場合は改行してください。最大10個まで取得されます。';
      field = <CustomTextField id="url-input" state={state} setState={setState} rows={10} multiline />
      break;
    case 'csv':
      title = 'CSVから作成'
      description = 'CSVファイルをアップロードしてください。text, reference_nameの2つのカラムを持つ必要があります。'
      field = <CustomDropzone type="csv" state={state} setState={setState} />
      break;
    case 'text':
      title = 'テキストから作成'
      description = 'テキストを入力してください。段落分けすることで参照されやすくなります。'
      field = <CustomTextField id="url-input" state={state} setState={setState} rows={10} multiline />
      break;
    default:
  }

  const handleFindUrl = async() => {
    const res = await axios.post(`${BASE_API_ENDPOINT}api/chat/find_more_url/`,{
      urls: state
    });
    const url = res.data.urls;
    setState(url);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
        {field}
      </DialogContent>
      <DialogActions>
        {type === 'url' && <Button onClick={handleFindUrl} style={{flex: '1 0 0'}}>URLを取得</Button>}
        <Button onClick={handleClose} style={{flex: '1 0 0'}}>キャンセル</Button>
        <Button onClick={() => handleConfirm(type)} style={{flex: '1 0 0'}}>確定</Button>
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
  return (
    <>
      <InputLabel component="legend">{label}</InputLabel>
      {
        type === 'image' ?
          <DropzoneArea
            acceptedFiles={['image/*']}
            filesLimit={1}
            required
            onChange={(files) => setState(files[0])}
          /> :
          type === 'pdf' ?
            <DropzoneArea
              acceptedFiles={['.pdf']}
              filesLimit={1}
              required
              onChange={(files) => setState(files[0])}
            />:
              <DropzoneArea
                acceptedFiles={['.csv']}
                filesLimit={1}
                required
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
        {options.map((option) => {
          return (
            <FormControlLabel value={option} control={<Radio />} label={option} />
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
      <Button variant="contained" type="submit">作成</Button>:
      <Button variant="contained" disabled><CircularProgress size={25}/></Button>
    }
    </>
  )
}

export default NewChat