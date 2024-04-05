import css from "./ImageCard.module.css";

const ImageCard = ({ data, openModal }) => {
  return (
    <div className={css.container}>
      <img
        className={css.img}
        onClick={() => openModal(data)}
        src={data.urls.small}
        alt={data.slug}
      />
    </div>
  );
};

export default ImageCard;
