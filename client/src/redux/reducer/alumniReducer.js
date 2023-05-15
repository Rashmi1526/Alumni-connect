import { SET_ALUMNI, SET_FLAG } from '../actionTypes';
import isEmpty from '../validation/is-empty';



const initialState = {
  isAuthenticated: false,
  alumni: {},
  flag: false,
  chatHistory: [],
  regNumAlumni: {},
  privateChat: [],
  privateChat2: [],
  newerChats: [],
  previousChats: [],
};

const alumniReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALUMNI:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        alumni: action.payload,
      };
      case "CHAT_HELPER":
            return {
                ...state,
                alongsideStudent: action.payload
            }
        case SET_FLAG:
            return {
                ...state,
                flag: true
            }
        case "SET_CHAT":
            return {
                ...state, 
                chatHistory : [state.chatHistory, action.payload]
            }
        case "GET_ALUMNI_BY_REG_NUM": {
            return {
                ...state,
                regNumAlumni: action.payload
            }
        }
        case "GET_PRIVATE_CONVERSATION": {
            return {
                ...state,
                privateChat: action.payload
            }
        }
        case "GET_PRIVATE_CONVERSATION2": {
            return {
                ...state,
                privateChat2: action.payload
            }
        }
        case "GET_NEWER_CHATS": {
            return {
                ...state,
                newerChats: action.payload
            }
        }
        case "GET_PREVIOUS_CHATS": {
            return {
                ...state,
                previousChats: action.payload
            }
        }
    default:
      return state;
  }
};

export default alumniReducer;
