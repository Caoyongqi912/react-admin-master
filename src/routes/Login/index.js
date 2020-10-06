import React from 'react' 
import './style.css'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react/index'
import Loading2 from '../../components/Loading2'
import 'animate.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'



@withRouter @inject('appStore') @observer
class Login extends React.Component {
  state = {
    showBox: 'login',   //展示当前表单
    url: '',  //背景图片
    loading:false,
    loading2:false,
  }

  componentDidMount () {
    const isLogin = this.props.appStore
    if(isLogin){
      this.props.history.go(1)     //当浏览器用后退按钮回到登录页时，判断登录页是否登录，是登录就重定向上个页面
      // this.props.appStore.toggleLogin(false) //也可以设置退出登录
    }
  }

  render () {
    const {showBox,loading} = this.state
    return (
      <div id='login-page'>
        {
          loading ?
            <div>
              <h3 style={styles.loadingTitle} className='animated bounceInLeft'>载入中...</h3>
              <Loading2/>
            </div>:
            <div>
              <div id='backgroundBox' style={styles.backgroundBox}/>
              <div className='container'>
                <LoginForm
                  className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'}/>
                <RegisterForm
                  className={showBox === 'register' ? 'box showBox' : 'box hiddenBox'}/>
              </div>
            </div>
        }
      </div>
    )
  }
}

const styles = {
  backgroundBox: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundSize: '100% 100%',
    transition:'all .5s'
  },
  focus: {
    // transform: 'scale(0.7)',
    width: '20px',
    opacity: 1
  },
  loadingBox:{
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)'
  },
  loadingTitle:{
    position:'fixed',
    top:'50%',
    left:'50%',
    marginLeft: -45,
    marginTop: -18,
    color:'#000',
    fontWeight:500,
    fontSize:24
  },
}

export default Login
