import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp,faChevronDown, faPlay, faPowerOff,faPause} from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {
    
    state={
        breakLength:5,
        sessionLength:25,
        session:25,
        seconds:`00`,
        timerLabel:'Session',
        isPlayed:false,
        count:0,
        time2:'',
        time:'',
        break:false
    
    }
   
    time
    time2
   
  
   
    increment=(event)=>{
     
  
      if(event.target.id==='break-increment'){
        
        
        if (this.state.breakLength>=60)return
        
        this.setState({breakLength:this.state.breakLength+1})
        }
        
       if(event.target.id==='session-increment'){
      
         
        if (this.state.sessionLength>=60)return
        
        this.setState({sessionLength:this.state.sessionLength+1}) 
        console.log(this.state.isPlayed)
        
        if(this.state.isPlayed===true||this.state.count===0){ return   this.setState({session:this.state.sessionLength+1,seconds:`00`,count:0})}
        
        
      
        
        
            }
        
        
        }
    
  numDigits=(x)=> {
  
      
     
}
    
    decrement=(event)=>{
//        if(this.state.count>1)return
        
    if(event.target.id==='break-decrement'){
        
        if (this.state.breakLength<=1)return
        
        this.setState({breakLength:this.state.breakLength-1})
        
        
        }
        
       if(event.target.id==='session-decrement'){
        
        
         
        if (this.state.sessionLength<=1)return
         this.setState({sessionLength:this.state.sessionLength-1})
             if(this.state.isPlayed===true||this.state.count===0){ return   this.setState({session:this.state.sessionLength-1,seconds:`00`,count:0})}
        
       
        }
    }
    
    start=()=> {
       
        
        clearInterval(this.time2)
        if(this.state.timerLabel==="Break"){
            this.setState({session:this.state.sessionLength,timerLabel:'Session'})}
        
            
 
//        this.count+=1
//        if(this.count>1)return 
          console.log(this.state.count)
        
if(this.state.count===2||this.state.count===0) this.setState({session:this.state.session-1,seconds:59})
       
        
    this.time=window.setInterval(()=>{
           this.setState(prevState => {
                            if(prevState.session===0&&prevState.seconds===0)return this.decreaseBreak()
                            if(prevState.seconds===0) return{session:this.state.session-1, seconds:59}
                            
                            return {seconds:this.state.seconds-1}}
           )},1000
       );
        
//        
        
    }
    
    decreaseBreak=()=>{
        
      
//        if(this.state.count===1)return
        clearInterval(this.time)
        console.log(this.state.breakLength)
        let session=this.state.breakLength
        this.setState({timerLabel:'Break'})
        
//        this.count+=1
//        if(this.count>1)return 
       
        this.setState({session:session-1,seconds:59})
       
        
    this.time2=window.setInterval(()=>{
           this.setState(prevState => {
                            if(prevState.session===0&&prevState.seconds===0)return this.start('break')
                            if(prevState.seconds===0) return{session:this.state.session-1, seconds:59}
                            
                            return {seconds:this.state.seconds-1}}
           )},1000
       );
    }
    
    pause=()=>{
        
        
        clearInterval(this.time)
         clearInterval(this.time2)
        
    }
    
    reset=()=>{
        
        this.setState({
            session:25,
            sessionLength:25,
            breakLength:5,
            seconds:`00`,
            timerLabel:'Session',
            count:0
            
        })
        this.pause()
    }
    
    handleClick=()=>{
        this.opposite=!this.state.isplayed
        let count=this.state.count+2
        
        this.setState({isPlayed:!this.state.isPlayed,count:count})
        console.log(this.state.isPlayed)
        this.state.isPlayed?this.start():this.pause()
        
        
    }
    
     render(){        
        
         let second=''
         
         if(this.state.seconds<10&&this.state.seconds!=='00'){
            second='0';
             
         }
         if(this.state.session===0&this.state.seconds===0){
              this.audioRef.play()
         }
        
        return (
            <div className="App">
                 <h1 style={{fontSize: '4em'}}>Pomodoro Clock</h1>

                  <div className="content">

                  <div className="break">
                    <h4 id="break-label">Break Length</h4>
            
            <div className="fav-icons">

                       <FontAwesomeIcon icon={faChevronUp} id="break-increment" onClick={this.increment}/> 
                  <h4 id="break-length">{this.state.breakLength}</h4>
                  <FontAwesomeIcon icon={faChevronDown} id="break-decrement" className="break" onClick={this.decrement}/> 

              </div>

                    </div>
              <div className="session">
                    <h4 id="session-label">Session Length</h4>

                <div className="fav-icons">
                   <FontAwesomeIcon icon={faChevronUp} id="session-increment" onClick={this.increment}/> 
                  <h4 id="session-length">{this.state.sessionLength}</h4>
                  <FontAwesomeIcon icon={faChevronDown} id="session-decrement" onClick={this.decrement}/> 

            
                        </div>
             </div>
            
                </div>
            
            <div className="session-content">

              <h2 id="timer-label"> {this.state.timerLabel}</h2>
            
             {
                this.state.session<10 ? <h2 id="time-left">0{this.state.session}: {second}{this.state.seconds}</h2> : <h2 id="time-left">{this.state.session}: {second}{this.state.seconds}</h2>
             }
             </div>
            
           <div className="fav-icons">
              <FontAwesomeIcon icon={faPlay } className="font-awesome-icon" id="start_stop" onClick={this.handleClick}/> 
              <FontAwesomeIcon icon={faPause } className="font-awesome-icon" id="stop" onClick={this.pause}/> 
              <FontAwesomeIcon icon={faPowerOff } className="font-awesome-icon" id="reset" onClick={this.reset}/> 
              </div>
            <audio id="beep" ref={(input) => {this.audioRef = input}} src="https://goo.gl/65cBl1"/>
            </div>
            
            
  );
        
        
    }
  
}

export default App;
