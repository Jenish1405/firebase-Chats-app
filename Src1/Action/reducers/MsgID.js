const MsgID = ( state = [], action ) => {
    switch(action.type) {
        case 'INCDATA' : return state=action.ply;
        default: return state;
    }
}

export default MsgID;