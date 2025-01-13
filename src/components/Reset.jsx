import { useState } from 'react';

function Reset(props) {

    const [showForm, setShowForm] = useState(false);
    const [value, setValue] = useState("");
    const handleReset = () => {
        // Nollataan pelin tiedot ja tyhjennetään tekstikenttä.
        props.handleReset();
        setValue("");
      }
    
    
        if (showForm) {
            return (
                <div className="reset reset_box">
                  <h2>Reset</h2>
                  <p>Warning! Continuing will reset the data.</p>
                  <p>Write the text <span>{props.resetvalue}</span> in the field below.</p>
                  <div>
                   <input type="text"
                     value={value}
                     onChange={(e) => {setValue(e.target.value)}} />
        </div>

        <button disabled={props.resetvalue==value?false:true}
                onClick={handleReset}>Reset data</button>


                </div>
              );
           
          } else { 
            return (
              <div className="reset">
                <button onClick={()=>{setShowForm(true)}}>Reset data</button>
              </div>
            );
          }
        
        }
  export default Reset;
  