import React, { useEffect, useState } from "react";

const AsyncAwait = () => {
  const [users, setUsers] = useState({});

  const fetchData = async () => {
    const response = await fetch(
      "https://mocki.io/v1/4f7bf80f-e4c8-44c5-9be2-afc649a5af96"
    );
    const data = await response.json();
    setUsers(data.cars);
    console.log(data.cars);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.carName}</li>;
        })}
      </ul>
    </>
  );
};

export default AsyncAwait;
