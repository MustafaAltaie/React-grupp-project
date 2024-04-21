import { useEffect, useState, useRef } from "react";
import propTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { handleDelete, handleUpdate } from "../../features/adminSlice";

const Participant = ({ index, participant }) => {
    const [start, setStart] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [userName, setUserName] = useState(participant.userName);
    const [email, setEmail] = useState(participant.email);
    const inputName = useRef(null);
    const inputEmail = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const int = setTimeout(() => {
            setStart(true);
        }, 100);

        return () => clearTimeout(int);
    }, []);

    const prepareDeletion = () => {
        setIsDeleted(true);
        dispatch(handleDelete(participant.id));
    }

    const prepareUpdate = (e) => {
        const newDetails = {
            id: participant.id,
            userName: userName,
            email: email
        }
        e.key === 'Enter' && (
            dispatch(handleUpdate(newDetails)),
            setIsUpdate(false),
            inputName.current.blur(),
            inputEmail.current.blur()
        )
    }

    return (
        !isDeleted &&
        <div
        className="participant"
        key={participant.id}
        style={!start ? {transform: `translateX(${index % 2 === 0 ? 110 : -110}%)`, opacity: 0} : {transform: `translateX(0)`}}>
            <div>
                <p>{participant.id}</p>
            </div>
            <div>
                <img src={participant.imageUrl} alt="Image" />
            </div>
            <div>
                <input type="text" style={{border: isUpdate ? 'dashed 2px #0a0' : 'none', pointerEvents: isUpdate ? 'unset' : 'none'}} ref={inputName} value={userName} onChange={e => setUserName(e.target.value)} onKeyDown={e => prepareUpdate(e)} />
            </div>
            <div>
                <input type="text" style={{border: isUpdate ? 'dashed 2px #0a0' : 'none', pointerEvents: isUpdate ? 'unset' : 'none'}} ref={inputEmail} value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => prepareUpdate(e)} />
            </div>
            <div>
                <p>{participant.joinDate}</p>
            </div>
            <div>
                <i className="fas fa-user-edit" onClick={() => setIsUpdate(!isUpdate)}></i>
                <i className="fas fa-trash-alt" onClick={prepareDeletion}></i>
            </div>
        </div>
    )
}

Participant.propTypes = {
    index: propTypes.number,
    participant: propTypes.object
}

export default Participant;