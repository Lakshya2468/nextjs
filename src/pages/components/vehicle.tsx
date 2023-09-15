import { useEffect ,useState} from "react";



export function Vehicle() {
    const [vehicle,setvehicle]=useState([]);
    const [newvehiclename, setNewvehicleName] = useState("");
    const [newvehicletype, setNewvehicletype] = useState("");
    const [newvehicleid, setNewvehicleid] = useState("");
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch("http://localhost:3001/vehicle");
           
            const result = await response.json();
            console.log(result)
            setvehicle(result)
        
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchData();
      }, []);

      const handleDelete = async (id) => {
        try {
         
          await fetch(`http://localhost:3001/vehicle/${id}`, {
            method: "DELETE",
          });
    
          const updatedVehicle = vehicle.filter((item) => item.id !== id);
          setvehicle(updatedVehicle);
        } catch (error) {
          console.error("Error deleting vehicle:", error);
        }
      };
      
  const handleCreate = async () => {
    try {
   
      const response = await fetch("http://localhost:3001/vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({
          v_name: newvehiclename,
          type: newvehicletype,
          id:newvehicleid
        }),
       
        
      });
      if (response.ok) {
   
        const updatedResponse = await fetch("http://localhost:3001/vehicle");
        const updatedResult = await updatedResponse.json();
        setvehicle(updatedResult);
      } else {
        console.error("Error creating owner:", response.status);
      }
      setNewvehicleName("");
      setNewvehicletype("");
      setNewvehicleid("");
    } catch (error) {
      console.error("Error creating owner:", error);
    }
  };
   return (
    <>
    <h1 className="p-6 text-3xl bg-lime-500 text-white">Vehicle list---</h1>
      <input className="mr-3" placeholder="Enter Vehicle name" type="text" value={newvehiclename} onChange={(e) => setNewvehicleName(e.target.value)} />
      <input className="mr-3" placeholder="Type" type="text" value={newvehicletype} onChange={(e) => setNewvehicletype(e.target.value)} />
      <input className="mr-3" type="number" placeholder="Owner id" value={newvehicleid} onChange={(e) => setNewvehicleid((e.target.value))} />

      <button onClick={handleCreate}>Create</button>
    <table className="m-5 ">
        <thead>
          <tr >
            <th>Vehicle name</th>
            <th>Type</th>
            <th>ownerid</th>
            
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vehicle.map((item) => (
            <tr key={item.id}>
              <td>{item.v_name}</td>
              <td>{item.type}</td>
              <td>{item.ownerid}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
  export default Vehicle;