
import { useEffect ,useState} from "react";



export function Header() {
    const [owner,setowner]=useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch("http://localhost:3001/owner");
           
            const result = await response.json();
            console.log(result)
            setowner(result)
        
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchData();
      }, []);
   return (
    <>
      <h1 className="p-6 text-3xl bg-lime-500 text-white">Owner list---</h1>
      {owner.map((item) => (
        <h3 className="font-bold m-4" key={item.id}>{item.o_name}</h3>
      ))}
    </>
  );
}
  export default Header;