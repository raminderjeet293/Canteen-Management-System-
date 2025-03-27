import React, { useEffect, useState } from "react";
import classes from "./search.module.css";
import { useNavigate, useParams } from "react-router-dom";



Search.defaultProps={
       searchRoute : '/search/' , 
       defaultRoute: '/'
};



export default function Search({searchRoute, defaultRoute,margin}) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm ?? "");
  }, [searchTerm]);



  const search = async () => {
    term ? navigate(searchRoute + term) : navigate(defaultRoute);
  };




  return (
    <div className={classes.container} style={{margin}}>
      <input
        type="text"
        placeholder="search Food"
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && search()}
        value={term}
      ></input>
      <button onClick={search}>Search</button>
    </div>
  );
}
