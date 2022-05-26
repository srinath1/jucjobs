import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Modal,Table } from "antd";
import moment from "moment";
import { useNavigate ,Link} from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,  
  HomeOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  EditOutlined,OrderedListOutlined
  
} from '@ant-design/icons';

const PostedJobs = () => {
  const allJobs = useSelector((state) => state.jobsReducer.jobs);
  const allusers=useSelector(state=>state.usersReducer).users
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = allJobs.filter((job) => job.postedBy === userId);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const[selectedJob,setSelectedJob]=useState( )
  const showModal = (job) => {
    setIsModalVisible(true);
    setSelectedJob(job)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const history=useNavigate()
  const dataSource=[];
  for(var job of userPostedJobs){
      var obj={
          title:job.title,
          company:job.company,
          postedOn:moment(job.createdAt).format('MMM DD YYYY'),
          appliedCandidates:job.appliedCandidates.length,
          completeJobData:job
      }
      dataSource.push(obj)
  }
  function CandidatesList(){
    const candidateColumns=[
      {title:'Candidate Id',
    dataIndex:'candidateId',
    render:(text,data)=>{
      console.log('TextData',text,data);
     return <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>

    }
  }
    
    ,
    {
      title:'Full Name',
      dataIndex:'fullName'
    },
    {
      title:'Applied Date',
      dataIndex:'appliedDate'
    }
    ]
  var candidatesDataSource=[]
  for(var candidate of selectedJob.appliedCandidates){
    var user=allusers.find(user=>user._id==candidate.userid)
    var obj={
      candidateId:user._id,
      fullName:user.firstName + " " + user.lastName,
      appliedDate:candidate.appliedDate
    }
    candidatesDataSource.push(obj)
  }
  return  <Table columns={candidateColumns} dataSource={candidatesDataSource}/>

  }

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Company", dataIndex: "company" },
    { title: "Posted On", dataIndex: "postedOn" },
    { title: "Total Applicants", dataIndex: "appliedCandidates" },
    {
      title:'Actions',
      render:(text,data)=>{
        console.log('Data@render=>',data)
        return  <div className="flex">
        <EditOutlined
        className='mr-2'
          style={{fontSize:20}}
          onClick={() => {
            history(`/editjob/${data.completeJobData._id}`);
          }}
        />
        <OrderedListOutlined className='mr-2'
          style={{fontSize:20}} onClick={()=>{showModal(job)}}/>

        </div>
      }
    }
  ];
  console.log(userPostedJobs);

  
  return (
    <div>
      <DefaultLayout>
        <h1>Posted Jobs</h1>
        <Table columns={columns} dataSource={dataSource}/>
        <Modal 
        width={800}
        closable={false}
        title="Applied Candidates List" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
     <CandidatesList/>
      </Modal>
      </DefaultLayout>
    </div>
  );
};

export default PostedJobs;
