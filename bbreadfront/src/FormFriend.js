import React, {useState} from 'react';

function FormFriend(props) {
    
    const [friend, setFriend] = useState("");

    function handleChange(event) { 
        const { name, value } = event.target;
        setFriend(value)
        
    }

    async function submitForm() {
        if(props.operation === "addFriend"){
            props.addFriend(friend);
        }else{
            props.deleteFriend(friend);
        }
        props.setAskFriend(false);

        setFriend("");
    }

    return (
        <form className="user-form"> 
            <label htmlFor="friend">Friend to Add</label> 
            <input type="text" name="friend" id="friend" value={friend} onChange={handleChange} /> 
            <input type="button" value="Submit" onClick={submitForm} />
        </form>        
    );
}

export default FormFriend;