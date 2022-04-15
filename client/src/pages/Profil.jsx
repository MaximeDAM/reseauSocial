import React from "react";
import IndexLog from "../components/Log/IndexLog";
import { UidContext } from "../components/AppContext";
import { useContext } from "react";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? 
        <UpdateProfil />
       : 
        <div className="log-container">
          <IndexLog signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      }
    </div>
  );
};

export default Profil;
