import { PuffLoader } from "react-spinners";
import css from "./Loader.module.css";

const override = {
  display: "block",
  margin: "0 auto",
};

export default function Loader() {
  return (
    <div className={css.loader}>
      <PuffLoader
        color="var(--color-primary)"
        size={80}
        loading={true}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
