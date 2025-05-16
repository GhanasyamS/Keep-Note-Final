import Header from './Components/Header/Header'
import NoteView from './Components/NoteView/NoteView'
import Footer from './Components/Footer/Footer'
import { useState , useEffect } from "react";
import axios  from 'axios';
import { useErrorBoundary } from 'react-error-boundary'
import FilterTask from './Components/FilterTask/FilterTask';
import { CssBaseline } from '@mui/material';
import { Routes, Route,useNavigate } from 'react-router-dom';
import EditNote from './Components/EditNote/EditNote'
import NoteDetail from './Components/NoteDetail/NoteDetail';
import AddNoteSnackBar from './Components/AddNoteForm/AddNoteForm'
import RegistrationPage from './Components/RegistrationForm/RegistrationForm';
import LoginPage from './Components/LoginUser/LoginPage';
import { useAuth } from './Components/AuthContext/AuthContext'; 
import AccountDetails from './Components/AccountDetails/AccountDetails';
import PageNotFound from './Components/PageNotFound/PageNotFound'


export default function KeepNote()
{
const[tasks, setTasks]=useState([]);
  const [searchText, setSearchText] = useState("");
  const [ submittedNote, setSubmittedNote]=useState(false);
  const { showBoundary } = useErrorBoundary();
  const navigate=useNavigate();
  const { login } = useAuth();

// const url="http://localhost:3000/notes"
const url="http://192.168.18.43:3000/notes"



useEffect(() => {
  let flag = true;
  const fetchData = async () => {
    try {
      
      const response = await axios.get(url); 
      if(flag)
      { setTasks(response.data)
        const filteredTasks = FilterTask(response.data, searchText);
        setTasks(filteredTasks); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showBoundary(error);
    }
  };

  fetchData();
  return() =>
  {
    flag = false;
    setSubmittedNote(false);
  }
}, [searchText,showBoundary,submittedNote]);

const handleUpdateNote = async (updatedNote) => {
  try {
    const response = await axios.put(`${url}/${updatedNote.id}`, updatedNote);
    const updatedTasks = tasks.map(task =>
      task.id === updatedNote.id ? response.data : task
    );
    setTasks(updatedTasks);
  } catch (error) {
    console.error("Error updating note:", error);
    showBoundary(error);
  }
};
const onUpdateNote=()=>
{
  setSubmittedNote(true);
  navigate('/notes');
}
const handleLoginSuccess = () =>
{
  login();
  setTimeout(() => {
    navigate('/notes');
  }, 1500);
  
}


  return(
  <>
    
    
      
    <CssBaseline />
    <Header
      onSearchNote={setSearchText}
      onClearNote={() => setSearchText("")}
    />
    <hr />
    <>
      
        <Routes>
          <Route 
            path='/notes'
            element={<NoteView 
              taskList={tasks}
              onSubmitNote={()=>setSubmittedNote(true)} 
            />
            }
          /> 
          <Route path='/notedetail/:noteid' element={<NoteDetail onUpdateNote={onUpdateNote}/>}></Route>
          <Route path="/editnote/:noteid" element={<EditNote onUpdateNote={handleUpdateNote} />} />
          <Route path="/addnote" element={<AddNoteSnackBar onSubmitNote={onUpdateNote}/>}></Route>
          <Route path="/register" element={<RegistrationPage/>}></Route>
          <Route path="/" element={<LoginPage isLoggedIn={handleLoginSuccess}/>}></Route>
          <Route path="/accountdetail/:userid" element={<AccountDetails/>}></Route>
          <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
        
    </>
    <hr/>
    <Footer />
    
  </>
);
}