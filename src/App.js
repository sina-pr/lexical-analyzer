import './App.css';
import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import scanner from './scanner';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import GitHubIcon from '@mui/icons-material/GitHub';

const codeEditorStyle = {
  fontSize: 14,
  backgroundColor: '#f5f5f5',
  fontFamily:
    'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
  marginTop: '2rem',
  height: '20rem',
  overflowY: 'scroll',
};
const btnStyle = {
  margin: '1.5rem 0 ',
};

const columns = [
  { field: 'value', headerName: 'TOKEN', width: 160 },
  {
    field: 'type',
    headerName: 'TYPE',
    width: 160,
  },
  {
    field: 'row',
    headerName: 'ROW',
    width: 160,
  },
  {
    field: 'col',
    headerName: 'COLUMN',
    width: 160,
  },
];

function App() {
  const [code, setCode] = useState('');
  const [data, setData] = useState([]);

  const handleClickBtn = () => {
    setData(scanner(code));
  };

  const handleClickOnGithub = () => {
    window.location.href = 'https://github.com/sina-pr/lexical-analyzer';
  };

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Urmia University of Technology</Typography>
          <div style={{ flex: 1 }}></div>
          <IconButton onClick={handleClickOnGithub} color='inherit'>
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md'>
        <CodeEditor
          value={code}
          language='csharp'
          placeholder='Enter your code here...'
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          style={codeEditorStyle}
        />
        <Button
          disabled={code === ''}
          style={btnStyle}
          onClick={handleClickBtn}
          variant='contained'
        >
          Scan code
        </Button>
        <div style={{ height: 350, marginTop: '1rem' }}>
          <DataGrid pageSize={5} columns={columns} rows={data} />
        </div>
      </Container>
    </div>
  );
}

export default App;
