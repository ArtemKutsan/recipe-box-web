import { Link, useParams } from 'react-router-dom';
import { PostCard, useGetPostByIdQuery } from '@/entities/post';
import { RouterPath } from '@/shared/config/routerPaths';

const PostDetailsPage = () => {
  const { id } = useParams();
  const { data: post, isLoading, isError, error } = useGetPostByIdQuery(id);

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  if (isError) {
    return <p>{error?.data?.message ?? 'Failed to load post'}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Link to={RouterPath.posts} className="self-start text-sm font-medium text-secondary">
        Back to posts
      </Link>
      <PostCard post={post} />
    </section>
  );
};

export default PostDetailsPage;
