import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useParams} from "react-router-dom";
import { useSelector } from 'react-redux';


const UserInfo = () => {
    let { id } = useParams();
    const {users}=useSelector(state=>state.usersReducer)
    const user=users.find(user=>user._id===id)
  return (
    <div>
<DefaultLayout>
{user && (
    <div>
    <h3><b>Personal Information</b></h3>
    <p><b>First Name:<b>{user.firstName}</b></b></p>
    <p><b>Last Name:<b>{user.lastName}</b></b></p>
    <p><b>Email :<b>{user.email}</b></b></p>

    <p><b>Mobile Number:<b>{user.mobileNumber}</b></b></p>
    <p><b>Address:<b>{user.address}</b></b></p>
    <hr/>
    <h3><b>Skill</b></h3>
    {user.skills.map(skill=>{
        return <li>{skill}</li>
    })}
    <hr/>
    <h3><b>Education</b></h3>
    {user.education.map(e=>{
        return <li>{e}</li>
    })}

    <hr/>
    <h3><b>Projects</b></h3>
    {user.projects.map(p=>{
        return <li>{p}</li>
    })}
    <hr/>
    <h3><b>Experiences</b></h3>
    {user.experience.map(e=>{
        return <li>{e}</li>
    })}





    </div>
)}

</DefaultLayout>

    </div>
  )
}

export default UserInfo