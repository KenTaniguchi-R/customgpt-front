import { useEffect, useState } from 'react';

import { Grid, TextField } from '@mui/material';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '@mui/material';
import { Radio } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { InputLabel } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogActions } from '@mui/material';

import { DropzoneArea } from "mui-file-dropzone";

import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from './contexts/AuthContext';

import BASE_API_ENDPOINT from './vars/BASE_API_ENDPOINT';
import { redirect_to_home } from './utils/utils';
import MyBreadcrumbs from './components/MyBreadcrumbs';


const EditChat = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [AImodel, setAImodel] = useState('GPT 3.5');
  const [isSent, setIsSent] = useState(false);

  const { hasPermC } = useAuthContext();

  const navigate = useNavigate();
  const source_id = useParams().source;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${BASE_API_ENDPOINT}api/chat/get_chat/${source_id}`);
      setTitle(result.data.name)
      setDescription(result.data.description)
      const model_type = result.data.model_type.name;
      if (model_type === 'GPT-3.5') {
        setAImodel('GPT 3.5')
      } else {
        setAImodel('GPT 4')
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSent(true);

    try{
      await axios.post(`${BASE_API_ENDPOINT}api/chat/update/`, {
          source: source_id,
          title: title,
          description: description,
          imagePreview: imagePreview,
          AImodel: AImodel,
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      redirect_to_home(navigate, hasPermC);

    }catch (error){
      console.log(error)
      setIsSent(false);
    }

  }

  const handleDelete = async (event) => {
    event.preventDefault();

    try{
      await axios.post(`${BASE_API_ENDPOINT}api/chat/delete/`, {
          source: source_id,
        }
      )
      redirect_to_home(navigate, hasPermC);

    }catch (error){
      console.log(error)
      setIsSent(false);
      alert('Error')
    }
  }

  return (
    <div className='main-container__form'>
      <MyBreadcrumbs routes={['Home']} current='Edit' />

      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        <div className='field-container'>
          <div className='form-field'>
            <p>Cannot edit sources.</p>
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
          <div className='form-field'>
            <CustomRadioSelect id="radio-choice" label="Choose a model" options={['GPT 3.5', 'GPT 4']} state={AImodel} setState={setAImodel} />
          </div>

          <div className='form-field'>
            <SubmitButton isSent={isSent} />
          </div>
        </div>
      </form>

      {/* delete button */}
      <DeleteButton handleDelete={handleDelete}/>
    </div>
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
        {options.map((option, index) => {
          return (
            <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
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
      <Button variant="contained" type="submit">Update</Button>:
      <Button variant="contained" disabled><CircularProgress size={25}/></Button>
    }
    </>
  )
}

const DeleteButton = ({handleDelete}) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='main-container__form__delete'>
        <Typography variant="h6" gutterBottom>
          Do you want to delete this chat?
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleClickOpen}
        >
          Delete
        </Button>

        <DeleteModal
          open={open}
          onClose={handleClose}
          handleDelete={handleDelete}
        />
      </div>
  )
}

const DeleteModal = ({ onClose, open, handleDelete }) => {

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Are you sure you want to delete this chat?</DialogTitle>

      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditChat