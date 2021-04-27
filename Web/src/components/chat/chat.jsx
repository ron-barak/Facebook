import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import userService from "../../services/userService";
import postServies from "../../services/postServies";

const Chat = ({ userInfo, paramId }) => {
  const [state, setState] = useState({
    message: "",
    user_id: userInfo._id,
  });
  const [chat, setChat] = useState([]);
  const [userInfoByIdState, setUserState] = useState({ userInfoByParamId: "" });
  const socketRef = useRef();

  const { userInfoByParamId } = userInfoByIdState;

  useEffect(() => {
    dataFromServer();
    socketRef.current = io.connect("http://localhost:3900");
    socketRef.current.on("socketEvent", ({ message, user_id }) => {
      setChat([...chat, { message, user_id }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { message, user_id } = state;
    socketRef.current.emit("clientInput", { message, user_id });
    e.preventDefault();
    setState({ message: "", user_id });
  };

  const dataFromServer = async () => {
    const userInfoByParamId = await userService.userInfoById(paramId);
    setUserState({ userInfoByParamId });
  };

  const renderChat = () => {
    return chat.map(({ message, user_id }, index) => {
      if (user_id === userInfo._id) {
        return (
          <div key={index} className="outgoing_right">
            <img
              src={userInfo.image}
              alt="user_img"
              className="rounded-circle mr-2 ml-2"
              style={{ width: "28px", float: "left" }}
            />
            <div className="sent_right">
              <p>{message}</p>
              <span className="time_date">
                {new Date().getHours() + ":" + new Date().getMinutes()} | {""}
                {postServies.correctTime(new Date())}
              </span>
            </div>
          </div>
        );
      }
      return (
        <div className="outgoing_msg">
          <img
            src={userInfoByParamId.image}
            alt="user_img"
            className="rounded-circle mr-2 ml-2"
            style={{ width: "28px", float: "right" }}
          />
          <div className="sent_msg">
            <p>{message}</p>
            <span className="time_date">
              {new Date().getHours() + ":" + new Date().getMinutes()} | {""}
              {postServies.correctTime(new Date())}
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="shadow-lg border mt-3 "
      style={{ borderRadius: "14px", marginBottom: "500px" }}
    >
      <div className="p-3 border-bottom">
        {userInfoByParamId.name}
        <img
          src={userInfoByParamId.image}
          alt="user_img"
          className="rounded-circle mr-2 ml-2"
          style={{ width: "35px", float: "left" }}
        />
      </div>
      <div className="msg_history p-4">{renderChat()}</div>
      <form onSubmit={onMessageSubmit} className="type_msg">
        <div className="input_msg_write">
          <input
            rows="1"
            type="text"
            autoComplete="off"
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
            className="write_msg p-3"
            placeholder="     Type a message ..."
          />
          <button className="msg_send_btn mt-1 mr-2" type="submit">
            <i className="far fa-paper-plane pr-3"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
