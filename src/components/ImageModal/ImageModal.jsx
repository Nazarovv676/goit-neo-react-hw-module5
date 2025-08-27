import ReactModal from "react-modal";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import css from "./ImageModal.module.css";
import { PiUserCircle } from "react-icons/pi";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ImageModal({ isOpen, closeModal, valuesForModal }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {Object.keys(valuesForModal).length && (
        <div className={css.container}>
          <div className={css["avatar-name-container"]}>
            <div className={css.avatar}>
              <PiUserCircle size={35} />
            </div>
            <div className={css["name-username-container"]}>
              <p className={css.name}>{valuesForModal.user.first_name}</p>
              <p className={css.username}>@{valuesForModal.user.username}</p>
            </div>
          </div>

          <p>{valuesForModal.description}</p>
          <img
            src={valuesForModal.urls.regular}
            width={400}
            alt={valuesForModal.alt_description}
          />
          <p className={css.date}>{valuesForModal.created_at.slice(0,10)}</p>
          <div className={css.icons}>
            <FaRegComment />
            <BiRepost size={20} />
            <div>
              <FaRegHeart /> {valuesForModal.likes}
            </div>
          </div>
        </div>
      )}
    </ReactModal>
  );
}
