import Menu from '../components/Menu'
import { Outlet } from "react-router-dom";

function Root(props) {
  return (
    <div className="root">
      <div className="root_content">
        <Outlet />
      </div>
      <Menu items={props.items}/>
    </div>
  )
}

export default Root;
/*import Menu from '../components/Menu';
import { Outlet } from "react-router-dom";
import MusicPlayer from '../components/MusicPlayer';

function Root(props) {
  return (
    <div className="root">
      <div className="root_content">
        <Outlet />
      </div>
      <Menu items={props.items}/>
      <MusicPlayer src={props.currentMusic} /> { Käytetään propsia valitun musiikin kanssa 
      </div>
    )
  }
  
  export default Root;*/