import { getAllPosts } from "../../lib/notionAPI";
import SinglePost from "./components/Post/SinglePost";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts,
    },
    revalidate: 60,
  };
};

export default function Home({ allPosts }: { allPosts: any[] }) {
  console.log(allPosts);
  return (
    <div className="container h-full w-full mx-auto font-serif">
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog🎈
        </h1>
        {allPosts.map((post) => (
          <div key={post.id} className=" font-sans">
            <SinglePost
              title={post.title}
              tags={post.tags}
              date={post.date}
              slug={post.slug}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
