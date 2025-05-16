import { useEffect,useRef } from "react";
import axios from "axios";

const DeleteNote = ({ noteid, onDeleteSuccess }) => {
  const hasDeleted = useRef(false);
  useEffect(() => {
    if(hasDeleted.current) return;
    const deleteNote = async () => {
      try {
        await axios.delete(`http://localhost:3000/notes/${noteid}`);
        hasDeleted.current=true;
        onDeleteSuccess();
      } catch (err) {
        console.error("Error deleting note:", err);
      }
    };

    deleteNote(); 
  }, [noteid, onDeleteSuccess]);

  return null; 
};

export default DeleteNote;
