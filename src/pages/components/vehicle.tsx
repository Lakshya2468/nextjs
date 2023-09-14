import { useEffect ,useState} from "react";



export function Vehicle() {
    const [vehicle,setvehicle]=useState([]);
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
   return (
    <>
      <h1 className="p-6 text-2xl bg-lime-500 text-white">Vehicle list---</h1>
     
        <ul>
        {vehicle.map((item) => (
            <li className="font-bold m-4" key={item.id}> {item.v_name}</li>
            ))}
        </ul>
    
    
    </>
  );
}
  export default Vehicle;