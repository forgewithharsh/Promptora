import React, { useEffect } from "react";
import "./Sidebar.css";
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";

function Sidebar() {
  const { allThreads, setAllThreads, currThreadId } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  return (
    <section className="sidebar">
      <button>
        <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <div>
            <li key={idx}>{thread.title}</li>
          </div>
        ))}
      </ul>

      <div className="sign">
        <p>By forgewithharsh &hearts;</p>
      </div>
    </section>
  );
}

export default Sidebar;
