import { useEffect, useState } from 'react';

const useFetch=(url)=>{
    const abortConst=new AbortController();
    const[data,setData]=useState(null);
    const[isPending,setIsPending]=useState(true);   
    const[error,seterror]=useState(null);  
    const fetchData=async ()=>{
        await fetch(url ,{signal:abortConst.signal})
        .then(res=>{
          if(!res.ok){
            throw Error('ERROR HAS OCCURED');
            setIsPending(false);
          }
          return res.json();
        })
        .then(data=>{
          setData(data);
          seterror(null);
          setIsPending(false);
        })
        .catch(err=>{

          if(err.name==="AbortError"){
            console.log("fetch aborted");
          }
          else{

            console.log(err.message);
            seterror(err.message);
            // setIsError(true);
            setIsPending(false);
          }
        });
        return()=>abortConst.abort();
      }
      useEffect(()=>{
        setTimeout(()=>{fetchData();},2000
        )
        
      },[]);
      return  {data,isPending,error}
}
export default useFetch;

