import React ,{useState}from 'react'
import DefaultLayout from '../components/DefaultLayout'
import{Row,Col,Tabs,Input,Form,Button} from 'antd'
import {useDispatch} from 'react-redux'
import { updatedUser } from '../redux/actions/userActions'

const Profile = () => {
  const { TabPane } = Tabs;
  const dispatch=useDispatch()
  const {TextArea}=Input
  const[personalInfo,setPersonalInfo]=useState()
  const[activeTab,setActiveTab]=useState('1')
  const onPersonalInfoSubmit=(values)=>{
    console.log('PersonalInfo=>',values)
    setPersonalInfo(values)
    setActiveTab('2')

  }
  const onFinalFinish=(values)=>{
    const finalObj={...personalInfo,...values}
    console.log('FinalObj=>',finalObj)
    dispatch(updatedUser(finalObj))
  }
  const user=JSON.parse(localStorage.getItem('user'))
  console.log('initialvalues_user=>',user)


  return (
    <div>
        <DefaultLayout>
        <Tabs defaultActiveKey="1" activeKey={activeTab} >
    <TabPane tab="Personal Info" key="1">
     <Form layout="vertical" onFinish={onPersonalInfoSubmit} initialValues={user}>
     <Row gutter={16}>
       <Col lg={8} sm={24}>
         <Form.Item label="first name" required rules={[{required:true}]} name="firstName">
           <Input/>
         </Form.Item>
       </Col>
       <Col lg={8} sm={24}>
         <Form.Item label="last name" required rules={[{required:true}]} name="lastName">
           <Input/>
         </Form.Item>
       </Col>
       <Col lg={8} sm={24}>
         <Form.Item label="Email" required rules={[{required:true}]} name="email">
           <Input/>
         </Form.Item>
       </Col>
       <Col lg={8} sm={24}>
         <Form.Item label="Mobile Number" required rules={[{required:true}]} name="mobileNumber">
           <Input/>
         </Form.Item>
       </Col>
       <Col lg={8} sm={24}>
         <Form.Item label="Portfolio" required rules={[{required:true}]} name="portfolio">
           <Input/>
         </Form.Item>
       </Col>
       <Col lg={24} sm={24}>
         <Form.Item label="About" required rules={[{required:true}]} name="about">
          <TextArea rows={4}/>
         </Form.Item>
       </Col>
       <Col lg={24} sm={24}>
         <Form.Item label="Address" required rules={[{required:true}]} name="address">
          <TextArea rows={4}/>
         </Form.Item>
       </Col>
     </Row>
     <Button htmlType='submit'>Next</Button>

     </Form>
    </TabPane>
    <TabPane tab="Skills Info" key="2">
      <Form initialValues={user} layout='vertical' onFinish={onFinalFinish}>
        <Row>
        <Col lg={24} sm={24}>
          <Form.List name='education'>

            {(education,{add,remove})=>{
             return <div>
                {education.map((field,index)=>{
                  return     <div className="flex">
                    <Form.Item {...field} label="Education" style={{width:"80%"}} required rules={[{required:true}]}>
                      <TextArea rows={4}/>
                    </Form.Item>
                    <Button onClick={()=>{add()}}>Add More</Button>
{index !==0 && (
  <Button onClick={()=>{remove(index)}}>Delete</Button>

)}                  </div>
                })}
              </div>
            }}
          </Form.List>
          </Col>

          <Col lg={24} sm={24}>
          <Form.List name='skills'>

            {(skills,{add,remove})=>{
             return <div>
                {skills.map((field,index)=>{
                  return     <div className="flex">
                    <Form.Item {...field} label="Skills" style={{width:"80%"}} required rules={[{required:true}]}>
                      <TextArea rows={4}/>
                    </Form.Item>
                    <Button onClick={()=>{add()}}>Add More</Button>
{index !==0 && (
  <Button onClick={()=>{remove(index)}}>Delete</Button>

)}                  </div>
                })}
              </div>
            }}
          </Form.List>
          </Col>
          <Col lg={24} sm={24}>
          <Form.List name='projects'>

            {(projects,{add,remove})=>{
             return <div>
                {projects.map((field,index)=>{
                  return     <div className="flex">
                    <Form.Item {...field} label="Projects" style={{width:"80%"}} required rules={[{required:true}]}>
                      <TextArea rows={4}/>
                    </Form.Item>
                    <Button onClick={()=>{add()}}>Add More</Button>
{index !==0 && (
  <Button onClick={()=>{remove(index)}}>Delete</Button>

)}                  </div>
                })}
              </div>
            }}
          </Form.List>
          </Col>
          <Col lg={24} sm={24}>
          <Form.List name='experience'>

            {(experience,{add,remove})=>{
             return <div>
                {experience.map((field,index)=>{
                  return     <div className="flex">
                    <Form.Item {...field} label="Experience" style={{width:"80%"}} required rules={[{required:true}]}>
                      <TextArea rows={4}/>
                    </Form.Item>
                    <Button onClick={()=>{add()}}>Add More</Button>
{index !==0 && (
  <Button onClick={()=>{remove(index)}}>Delete</Button>

)}                  </div>
                })}
              </div>
            }}
          </Form.List>
          </Col>

        </Row>
        <Button onClick={()=>{setActiveTab('1')}}>Previous</Button>
        <Button htmlType='submit'>Update</Button>

      </Form>
    </TabPane>
    
  </Tabs>
        </DefaultLayout>
    </div>
  )
}

export default Profile