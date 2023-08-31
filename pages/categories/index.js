import CategoriesPage from "@/components/templates/CategoriesPage";

const Categories = ({ data }) => {
  return <CategoriesPage data={data} />;
};

export default Categories;

export async function getServerSideProps(context) {
  const {
    query: { Difficulty, Time },
  } = context;

  const res = await fetch("http://localhost:4000/data");
  const data = await res.json();

  const filterdata = data.filter((item) => {
    const filter_Difficulty = item.details.filter(
      (detail) => detail.Difficulty && detail.Difficulty === Difficulty
    );

    const filter_Time = item.details.filter((detail) => {
      const get_cooking_time = detail["Cooking Time"] || "";

      const split_cooking_time = get_cooking_time.split(" ")[0];

      if (Time === "less" && split_cooking_time && +split_cooking_time <= 30) {
        return detail;
      } else if (Time === "more" && +split_cooking_time > 30) {
        return detail;
      }
    });
    console.log(filter_Time);

    if (Difficulty && Time && filter_Difficulty.length && filter_Time.length) {
      return item;
    } else if (!Time && Difficulty && filter_Difficulty.length) {
      return item;
    } else if (Time && !Difficulty && filter_Time.length) {
      return item;
    }
  });

  return {
    props: { data: filterdata },
  };
}
