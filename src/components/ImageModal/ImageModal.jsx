import css from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(16, 17, 17, 0.89)",
  },
};

const ImageModal = ({ data, modalIsOpen, closeModal }) => {
  console.log(data.slug);
  return (
    <div>
      <Modal
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
        style={customStyles}
      >
        <div className={css.container}>
          <img
            className={css.img}
            src={data.urls.regular}
            alt={data.alt_description}
          />
        </div>
        <ul className={css.list}>
          <li>
            <p className={css.text}>
              Description:{" "}
              <span className={css.span}>{data.alt_description}</span>
            </p>
          </li>
          <li>
            <p className={css.text}>
              Likes: <span className={css.span}>{data.likes}</span>
            </p>
          </li>
        </ul>
      </Modal>
    </div>
  );
};
export default ImageModal;
