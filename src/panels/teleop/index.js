import  { Joystick } from 'react-joystick-component'
import ROSLIB from 'roslib'
export const Teleop = ({ handleMove, handleStop}) => {


    const onHandleStop = (event) => {
        handleStop(event)
    }

    const onHandleMove = (event) => {
       handleMove(event)
    }

  return (
    <div>
    <Joystick size={200} baseColor='#EEE' stickColor='#BBB' move={onHandleMove}  stop={onHandleStop} />
  </div>
  );
  
}