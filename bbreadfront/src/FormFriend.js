import React, {useState} from 'react';

function FormFriend(props) {
    
    const [friend, setFriend] = useState("");

    function handleChange(event) { 
        const { name, value } = event.target;
        setFriend(value)
        
    }

    async function submitForm() {
        if(props.operation === "addFriend"){
            await props.addFriend(friend);
        }else{
        
            await props.deleteFriend(friend);
        }
        await props.updateCurrentUser();
        setFriend("");
        props.setAskFriend(false);
        props.setReload(true);


    }

    return (
        <form className = "form2"> 
            <label htmlFor="friend">Friend</label> 
            <input type="text" name="friend" id="friend" value={friend} onChange={handleChange} /> 
            <input type="button" value="Submit" onClick={submitForm} />
        </form>        
    );
}

export default FormFriend;