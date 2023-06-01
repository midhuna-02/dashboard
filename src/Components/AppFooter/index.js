import React from 'react'
import { Typography} from 'antd';
const {Link,target } = Typography;


function AppFooter() {
  return (
    <div className='AppFooter'>
    <Typography><Link>+123456789</Link></Typography> 
    <Typography><Link href="https://www.google.com/">Privacy of Policy</Link></Typography>
    <Typography><Link href="https://www.google.com/">Terms of Use</Link></Typography>
   
    </div>
  )
}

export default AppFooter