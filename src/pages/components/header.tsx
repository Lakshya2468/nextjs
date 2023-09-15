import React, { useEffect, useState } from "react";

export function Header() {
  const [owners, setOwners] = useState([]);
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newOwnerGender, setNewOwnerGender] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/owner");
        const result = await response.json();
        console.log(result);
        setOwners(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
     
      await fetch(`http://localhost:3001/owner/${id}`, {
        method: "DELETE",
      });

      const updatedOwners = owners.filter((item) => item.id !== id);
      setOwners(updatedOwners);
    } catch (error) {
      console.error("Error deleting owner:", error);
    }
  };

  const handleCreate = async () => {
    try {
   
      const response = await fetch("http://localhost:3001/owner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          o_name: newOwnerName,
          gender: newOwnerGender,
        }),
      });
      if (response.ok) {
   
        const updatedResponse = await fetch("http://localhost:3001/owner");
        const updatedResult = await updatedResponse.json();
        setOwners(updatedResult);
      } else {
        console.error("Error creating owner:", response.status);
      }
      setNewOwnerName("");
      setNewOwnerGender("");
    } catch (error) {
      console.error("Error creating owner:", error);
    }
  };

  return (
    <>
      <h1 className="p-6 text-3xl bg-lime-500 text-white">Owner list---</h1>
      <input className="mr-3" placeholder="Enter Owner Name" type="text" value={newOwnerName} onChange={(e) => setNewOwnerName(e.target.value)} />
      <input className="mr-3" placeholder="Gender" type="text" value={newOwnerGender} onChange={(e) => setNewOwnerGender(e.target.value)} />
      <button onClick={handleCreate}>Create</button>

      <table className="m-5 ">
        <thead>
          <tr >
            <th>Owner name</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((item) => (
            <tr key={item.id}>
              <td>{item.o_name}</td>
              <td>{item.gender}</td>
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

export default Header;
