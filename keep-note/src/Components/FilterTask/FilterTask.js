
const FilterTask=(tasks,searchText)=>
{
  
  return(
  tasks.filter((task)=> task.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
  );
}

export default FilterTask;