import axios from 'axios'
import { message } from 'antd'
export const getAllJobs=()=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const jobs=await axios.get('/api/jobs/getAllJobs')
        console.log(jobs)
        dispatch({
            type:'GET_ALL_JOBS',
            payload:jobs.data
        })
        dispatch({type:'LOADING',payload:false})

        
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})

        
    }
}
export const postJob=(values)=>async dispatch=>{
    console.log('values=>',values)
    values.postedBy=JSON.parse(localStorage.getItem('user'))._id
    dispatch({type:'LOADING',payload:true})

    try {
        const jobs=await axios.post('/api/jobs/postjob',values)
        console.log(jobs)
       
        dispatch({type:'LOADING',payload:false})
        message.success('Job posted successfully')
        setTimeout(()=>{
            window.location.href="/"
        },1000)

        
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})

        
    }
}

export const editJob=(values)=>async dispatch=>{
    console.log('EditValues=>',values)
    dispatch({type:'LOADING',payload:true})

    try {
        const jobs=await axios.post('/api/jobs/editjob',values)
        console.log(jobs)
       
        dispatch({type:'LOADING',payload:false})
        message.success('Job edited successfully')
        setTimeout(()=>{
            window.location.href="/"
        },1000)


        
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})

        
    }
}

export const applyJob = (job) => async (dispatch) => {


    const user = JSON.parse(localStorage.getItem("user"))
  
    dispatch({ type: "LOADING", payload: true });
    try {
      const response = await axios.post("/api/jobs/applyjob", {job , user});
  
      dispatch({ type: "LOADING", payload: false });
      message.success("Job applied Successfully");
  
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
    }
  };

  export const getAllUsers=()=>async dispatch=> {
      dispatch({type:'LOADING',payload:true})
      try {
        const users=await axios.get('/api/users/getallusers')
        dispatch({
            type:'GET_ALL_USERS',
            payload:users.data
        })
        dispatch({type:'LOADING',payload:false})

        
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})

        
    }

  }

  export const searchJobs=(searchKey)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response=await axios.get('/api/jobs/getAllJobs')
        const jobs=response.data
        const filteredJobs=jobs.filter(job=>job.title.toLowerCase().includes(searchKey.toLowerCase()))
        dispatch({
            type:'GET_ALL_JOBS',
            payload:filteredJobs
        })
        dispatch({type:'LOADING',payload:false})

        
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})

        
    }
}
export const sortJobs = (values) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    try {
      const response = await axios.get("/api/jobs/getalljobs");
  
      const jobs = response.data
  
      var filteredJobs = jobs
  
      if(values.experience !== undefined) {
  
           filteredJobs = jobs.filter(job=>job.experience <= values.experience)
  
      }
      if(values.salary!==undefined){
        filteredJobs = jobs.filter(job=>job.salaryTo >= values.salary)
      }
  
      dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
    }
  };