import React,{useState,useEffect} from 'react';
import {Badge, Space, Typography,Image, Drawer, List}from 'antd';
import { MailOutlined,BellFilled } from '@ant-design/icons';
import { getComments, getOrders } from '../../API';
import Item from 'antd/es/list/Item';

const {Title,Text,Paragraph,Link}=Typography;
function AppHeader() {
  const [comments, setComments] = useState(0);
  const [orders, setOrders] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationOpen,setNotificationOpen] = useState(false);
  useEffect(() => {
    getComments().then((res)=>{
   setComments(res.comments);

    });
    getOrders().then((res)=>{
      setOrders(res.products);
    })
    }, [])

  
  return (
    <div className='AppHeader'>
      <Image  width={40} src="https://images.pexels.com/photos/2697786/pexels-photo-2697786.jpeg?auto=compress&cs=tinysrgb&w=600"></Image>
  {/* <Image  width={40}src="https://images.pexels.com/photos/2697786/pexels-photo-2697786.jpeg?auto=compress&cs=tinysrgb&w=600"></Image> */}
  <Typography.Title level={3}>Admin Dashboard</Typography.Title>
  <Space>
    <Badge count={comments.length}dot><MailOutlined style={{fontSize:24}} onClick={()=>{
      setCommentsOpen(true);
    }}/></Badge>
    <Badge count={orders.length}> <BellFilled style={{fontSize:24}} onClick={()=>{
      
      setNotificationOpen(true);
    }}/></Badge>
   
  </Space>
  <Drawer title="comments" open={commentsOpen} onClose={()=>{
    setCommentsOpen(false);
  }}maskClosable>
<List dataSource={comments} renderItem={(item)=>{
  return (<List.Item>{item.body}</List.Item>);
}}></List>
  </Drawer>
  <Drawer title="notification" open={notificationOpen} onClose={()=>{
    setNotificationOpen(false);
  }}maskClosable>
    <List dataSource={orders} renderItem={(item)=>{
  return (<List.Item>{item.title} has been ordered !</List.Item>);
}}></List>

  </Drawer>
 
    </div>
  )
}

export default AppHeader