import NoteCard from '../NoteCard/NoteCard';
import styled from 'styled-components';

const CardContainer =  styled.div
`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap:40px;
  margin: 50px;
`;

export default function NoteList({taskList})
{
    return(
    <CardContainer  data-testid="note-list">
    {   
    taskList.map((taskData)=>(
    <NoteCard key={taskData.id} taskData={taskData} />
    ))
    }
    </CardContainer>
    );
}