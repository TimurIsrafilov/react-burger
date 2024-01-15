import style from "./preloader.module.css";

function Preloader(): React.JSX.Element {
  return (
    <section className={style.preloader}>
      <div className={style.preloader__container}>
        <span className={style.preloader__round}></span>
      </div>
    </section>
  );
}

export default Preloader;
