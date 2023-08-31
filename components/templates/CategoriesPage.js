import { useEffect, useState } from "react";
import styles from "./CategoriesPage.module.css";
import { useRouter } from "next/router";
import Card from "../modules/Card";

const CategoriesPage = ({ data }) => {
  const [query, setQuery] = useState({ Difficulty: "", Time: "" });

  const changeHandeler = (event) => {
    setQuery({ ...query, [event.target.name]: event.target.value });
  };

  const router = useRouter();
  const clickHandeler = (event) => {
    router.push({
      pathname: "/categories",
      query,
    });
  };

  useEffect(() => {
    const { Difficulty, Time } = router.query;

    if (query.Difficulty !== Difficulty || query.Time !== Time) {
      setQuery({ Difficulty, Time });
    }
    console.log(Difficulty);
  }, []);
  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.subContainer}>
        <div className={styles.select}>
          <select
            value={query.Difficulty}
            name="Difficulty"
            onChange={changeHandeler}
          >
            <option value="">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select value={query.Time} name="Time" onChange={changeHandeler}>
            <option value="">Cooking Time</option>
            <option value="more">More than 30 min</option>
            <option value="less">Less than 30 min</option>
          </select>
          <button onClick={clickHandeler}>Search</button>
        </div>
        <div className={styles.cards}>
          {!data.length ? <img src="/images/search.png" /> : null}
          {data.map((food) => (
            <Card key={food.id} {...food} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
