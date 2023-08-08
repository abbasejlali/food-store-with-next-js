// Hooks
import { useRouter } from "next/router";

// Components
import DetailsFood from "@/components/templates/DetailsFood";

const DetailsMenu = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading Page ...</h2>;
  }

  return <DetailsFood {...data} />;
};

export default DetailsMenu;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/data");
  const data = await res.json();
  const data_customize = data.slice(0, 10);
  const paths = data_customize.map((food) => ({
    params: { name: food.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { name },
  } = context;
  const res = await fetch(`http://localhost:4000/data/${name}`);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 10,
  };
}
